// Auto Cache Refresher Service Worker for Prime Trans Group PWA
const CACHE_VERSION = '2.1.0';
const STATIC_CACHE = `prime-static-v${CACHE_VERSION}`;
const DYNAMIC_CACHE = `prime-dynamic-v${CACHE_VERSION}`;
const API_CACHE = `prime-api-v${CACHE_VERSION}`;

// Resources to precache
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/favicon.png',
  '/assets/warehouse_hero.gif',
  '/assets/transportation_hero.mp4'
];

// API endpoints to cache with network-first strategy
const API_ENDPOINTS = ['/api/jobs', '/api/blog', '/api/stats'];

// Cache expiration times (in milliseconds)
const CACHE_EXPIRY = {
  API: 5 * 60 * 1000, // 5 minutes for API data
  STATIC: 24 * 60 * 60 * 1000, // 24 hours for static assets
  DYNAMIC: 60 * 60 * 1000 // 1 hour for dynamic content
};

// Install event - precache essential resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing auto cache refresher...');
  
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(STATIC_CACHE);
        await cache.addAll(PRECACHE_URLS);
        console.log('[SW] Precaching completed successfully');
        
        // Skip waiting to activate immediately
        await self.skipWaiting();
      } catch (error) {
        console.error('[SW] Precaching failed:', error);
      }
    })()
  );
});

// Fetch event - implement smart caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle API requests with network-first strategy
  if (API_ENDPOINTS.some(endpoint => url.pathname.startsWith(endpoint))) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }
  
  // Handle static assets with stale-while-revalidate
  if (isStaticAsset(request)) {
    event.respondWith(staleWhileRevalidateStrategy(request));
    return;
  }
  
  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(navigationStrategy(request));
    return;
  }
  
  // Default: cache-first strategy
  event.respondWith(cacheFirstStrategy(request));
});

// Activate event - cleanup old caches and claim clients
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating auto cache refresher...');
  
  event.waitUntil(
    (async () => {
      try {
        // Clean up old cache versions
        const cacheNames = await caches.keys();
        const deletePromises = cacheNames
          .filter(cacheName => {
            return cacheName.startsWith('prime-') && 
                   ![STATIC_CACHE, DYNAMIC_CACHE, API_CACHE].includes(cacheName);
          })
          .map(cacheName => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          });
        
        await Promise.all(deletePromises);
        
        // Take control of all clients immediately
        await self.clients.claim();
        
        // Notify clients about the update
        broadcastMessage({ type: 'CACHE_UPDATED', version: CACHE_VERSION });
        
        console.log('[SW] Auto cache refresher activated successfully');
      } catch (error) {
        console.error('[SW] Activation failed:', error);
      }
    })()
  );
});

// === CACHING STRATEGIES ===

// Network-first strategy for API calls
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await Promise.race([
      fetch(request),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Network timeout')), 3000)
      )
    ]);
    
    if (networkResponse.ok) {
      // Update cache with fresh data
      const cache = await caches.open(API_CACHE);
      const responseClone = networkResponse.clone();
      
      // Add timestamp for cache expiry
      const cachedResponse = new Response(responseClone.body, {
        status: responseClone.status,
        statusText: responseClone.statusText,
        headers: {
          ...Object.fromEntries(responseClone.headers),
          'sw-cached-at': Date.now().toString()
        }
      });
      
      await cache.put(request, cachedResponse);
      return networkResponse;
    }
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', error.message);
  }
  
  // Fallback to cache
  const cachedResponse = await caches.match(request);
  if (cachedResponse && !isCacheExpired(cachedResponse, CACHE_EXPIRY.API)) {
    return cachedResponse;
  }
  
  // Return network error or stale cache
  return cachedResponse || new Response('Network and cache unavailable', { status: 503 });
}

// Stale-while-revalidate strategy for static assets
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Start network request (don't await)
  const networkPromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Wait for network if no cache
  return networkPromise || new Response('Resource unavailable', { status: 503 });
}

// Navigation strategy for page requests
async function navigationStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('[SW] Navigation network failed:', error);
  }
  
  // Fallback to cached version or offline page
  const cachedResponse = await caches.match(request);
  return cachedResponse || caches.match('/');
}

// Cache-first strategy for other resources
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('Resource unavailable', { status: 503 });
  }
}

// === UTILITY FUNCTIONS ===

// Check if request is for static assets
function isStaticAsset(request) {
  const url = new URL(request.url);
  return /\.(css|js|png|jpg|jpeg|gif|svg|mp4|webm|woff2?|ttf|eot)$/i.test(url.pathname);
}

// Check if cached response is expired
function isCacheExpired(response, maxAge) {
  const cachedAt = response.headers.get('sw-cached-at');
  if (!cachedAt) return false;
  
  return (Date.now() - parseInt(cachedAt)) > maxAge;
}

// Broadcast message to all clients
function broadcastMessage(message) {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage(message);
    });
  });
}

// === MESSAGE HANDLING ===

// Handle messages from main thread
self.addEventListener('message', (event) => {
  const { action, data } = event.data;
  
  switch (action) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'FORCE_UPDATE_CACHE':
      forceUpdateCache().then(() => {
        event.ports[0]?.postMessage({ success: true });
      }).catch(error => {
        event.ports[0]?.postMessage({ success: false, error: error.message });
      });
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0]?.postMessage({ success: true });
      }).catch(error => {
        event.ports[0]?.postMessage({ success: false, error: error.message });
      });
      break;
  }
});

// Force update all caches
async function forceUpdateCache() {
  console.log('[SW] Force updating all caches...');
  
  const urlsToUpdate = [
    ...PRECACHE_URLS,
    ...API_ENDPOINTS
  ];
  
  const updatePromises = urlsToUpdate.map(async (url) => {
    try {
      const response = await fetch(url, { cache: 'no-cache' });
      if (response.ok) {
        const cacheName = API_ENDPOINTS.includes(url) ? API_CACHE : STATIC_CACHE;
        const cache = await caches.open(cacheName);
        await cache.put(url, response);
        console.log(`[SW] Updated cache for: ${url}`);
      }
    } catch (error) {
      console.error(`[SW] Failed to update ${url}:`, error);
    }
  });
  
  await Promise.allSettled(updatePromises);
  broadcastMessage({ type: 'FORCE_UPDATE_COMPLETED' });
}

// Clear all caches
async function clearAllCaches() {
  console.log('[SW] Clearing all caches...');
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map(name => caches.delete(name)));
  broadcastMessage({ type: 'CACHE_CLEARED' });
}

// === BACKGROUND SYNC ===

// Periodic cache refresh (every 10 minutes)
setInterval(() => {
  if (self.clients) {
    self.clients.matchAll().then(clients => {
      if (clients.length > 0) { // Only refresh if app is active
        console.log('[SW] Performing background cache refresh...');
        forceUpdateCache();
      }
    });
  }
}, 10 * 60 * 1000);