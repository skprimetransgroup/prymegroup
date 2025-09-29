// Auto Cache Refresher PWA Service Worker Registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    // Only register service worker in production to avoid HMR conflicts
    if (import.meta.env.PROD) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Auto Cache Refresher Service Worker registered:', registration);
        
        // Set up automatic update checking every 60 seconds
        setupAutoUpdateChecker(registration);
        
        // Listen for service worker messages
        setupMessageListener();
        
        // Enhanced update handling
        handleServiceWorkerUpdates(registration);
        
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    } else {
      // In development, unregister any existing service workers and clear caches
      // This prevents service workers from interfering with Vite's HMR system
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
          console.log('Service Worker unregistered for development mode');
        }
        
        // Clear all caches
        if ('caches' in window) {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
          );
          console.log('All caches cleared for development mode');
        }
      } catch (error) {
        console.error('Error clearing service workers/caches:', error);
      }
    }
  }
};

// Check if PWA is installed
export const isPWAInstalled = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone === true;
};

// Check if device supports PWA installation
export const supportsPWAInstall = (): boolean => {
  return 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;
};

// === AUTO CACHE REFRESH FUNCTIONALITY ===

// Setup automatic update checking
function setupAutoUpdateChecker(registration: ServiceWorkerRegistration) {
  // Check for updates every 60 seconds when app is active
  const updateInterval = setInterval(() => {
    if (!document.hidden) {
      registration.update().catch(error => {
        console.log('Auto update check failed:', error);
      });
    }
  }, 60000);
  
  // Clean up interval when page is unloaded
  window.addEventListener('beforeunload', () => {
    clearInterval(updateInterval);
  });
  
  // Also check for updates when page becomes visible
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      registration.update();
    }
  });
}

// Handle service worker updates with user notifications
function handleServiceWorkerUpdates(registration: ServiceWorkerRegistration) {
  registration.addEventListener('updatefound', () => {
    const newWorker = registration.installing;
    if (!newWorker) return;
    
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        // New version is available
        showUpdateNotification();
      }
    });
  });
}

// Listen for messages from service worker
function setupMessageListener() {
  navigator.serviceWorker.addEventListener('message', (event) => {
    const { type, data } = event.data;
    
    switch (type) {
      case 'CACHE_UPDATED':
        console.log(`Cache updated to version ${data?.version}`);
        showCacheUpdateToast();
        break;
        
      case 'FORCE_UPDATE_COMPLETED':
        console.log('Force cache update completed');
        showSuccessToast('Cache refreshed successfully!');
        break;
        
      case 'CACHE_CLEARED':
        console.log('All caches cleared');
        showSuccessToast('Cache cleared successfully!');
        break;
    }
  });
}

// Show update notification to user
function showUpdateNotification() {
  // Create update notification banner
  const updateBanner = document.createElement('div');
  updateBanner.id = 'cache-update-banner';
  updateBanner.className = 'fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-lg z-50 transform -translate-y-full transition-transform duration-300';
  updateBanner.innerHTML = `
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        <span class="font-medium">New content available!</span>
        <span class="text-blue-200">Get the latest updates.</span>
      </div>
      <div class="flex items-center space-x-3">
        <button onclick="refreshApp()" class="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors">
          Update Now
        </button>
        <button onclick="dismissUpdateBanner()" class="text-blue-200 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(updateBanner);
  
  // Animate in
  setTimeout(() => {
    updateBanner.style.transform = 'translateY(0)';
  }, 100);
  
  // Auto-dismiss after 10 seconds
  setTimeout(() => {
    window.dismissUpdateBanner();
  }, 10000);
}

// Manual cache refresh functions
export const forceRefreshCache = async (): Promise<boolean> => {
  if (!navigator.serviceWorker.controller) {
    console.error('No service worker controller available');
    return false;
  }
  
  try {
    const messageChannel = new MessageChannel();
    
    const response = await new Promise<{success: boolean, error?: string}>((resolve) => {
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data);
      };
      
      navigator.serviceWorker.controller!.postMessage(
        { action: 'FORCE_UPDATE_CACHE' },
        [messageChannel.port2]
      );
      
      // Timeout after 30 seconds
      setTimeout(() => resolve({ success: false, error: 'Timeout' }), 30000);
    });
    
    if (response.success) {
      console.log('Cache force refresh completed successfully');
      return true;
    } else {
      console.error('Cache force refresh failed:', response.error);
      return false;
    }
  } catch (error) {
    console.error('Force refresh cache error:', error);
    return false;
  }
};

export const clearAllCaches = async (): Promise<boolean> => {
  if (!navigator.serviceWorker.controller) {
    console.error('No service worker controller available');
    return false;
  }
  
  try {
    const messageChannel = new MessageChannel();
    
    const response = await new Promise<{success: boolean, error?: string}>((resolve) => {
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data);
      };
      
      navigator.serviceWorker.controller!.postMessage(
        { action: 'CLEAR_CACHE' },
        [messageChannel.port2]
      );
      
      // Timeout after 10 seconds
      setTimeout(() => resolve({ success: false, error: 'Timeout' }), 10000);
    });
    
    if (response.success) {
      console.log('All caches cleared successfully');
      return true;
    } else {
      console.error('Clear caches failed:', response.error);
      return false;
    }
  } catch (error) {
    console.error('Clear caches error:', error);
    return false;
  }
};

// === UTILITY FUNCTIONS ===

// Global functions (attached to window for onclick handlers)
declare global {
  interface Window {
    refreshApp: () => void;
    dismissUpdateBanner: () => void;
  }
}

window.refreshApp = () => {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ action: 'SKIP_WAITING' });
  }
  setTimeout(() => {
    window.location.reload();
  }, 500);
};

window.dismissUpdateBanner = () => {
  const banner = document.getElementById('cache-update-banner');
  if (banner) {
    banner.style.transform = 'translateY(-100%)';
    setTimeout(() => {
      banner.remove();
    }, 300);
  }
};

// Toast notifications
function showCacheUpdateToast() {
  showToast('Cache updated in background', 'success');
}

function showSuccessToast(message: string) {
  showToast(message, 'success');
}

function showToast(message: string, type: 'success' | 'info' | 'error' = 'info') {
  const toast = document.createElement('div');
  const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';
  
  toast.className = `fixed bottom-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-y-full transition-transform duration-300 max-w-sm`;
  toast.innerHTML = `
    <div class="flex items-center space-x-2">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span class="font-medium">${message}</span>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
  }, 100);
  
  // Auto-dismiss after 4 seconds
  setTimeout(() => {
    toast.style.transform = 'translateY(100%)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// Get cache refresh status
export const getCacheStatus = async (): Promise<{version: string, cacheSize: number}> => {
  try {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const name of cacheNames) {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      totalSize += keys.length;
    }
    
    return {
      version: '2.1.0', // Should match SW version
      cacheSize: totalSize
    };
  } catch (error) {
    console.error('Failed to get cache status:', error);
    return { version: 'unknown', cacheSize: 0 };
  }
};