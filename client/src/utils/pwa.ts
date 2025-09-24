// PWA Service Worker Registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    // Only register service worker in production to avoid HMR conflicts
    if (import.meta.env.PROD) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully:', registration);
        
        // Optional: Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, notify user about update
                console.log('New content available, please refresh.');
              }
            });
          }
        });
        
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