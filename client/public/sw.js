const CACHE_NAME = 'yelpcamp-v1.0.0';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json',
  // Add other static assets as needed
];

const API_CACHE_NAME = 'yelpcamp-api-v1.0.0';
const API_URLS = [
  '/api/campgrounds',
  // Add other API endpoints that should be cached
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      }),
      caches.open(API_CACHE_NAME)
    ])
  );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(API_CACHE_NAME).then((cache) => {
        return fetch(request).then((response) => {
          // Only cache successful GET requests
          if (request.method === 'GET' && response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        }).catch(() => {
          // If network fails, try to return cached version
          return cache.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Return a custom offline response for API calls
            return new Response(JSON.stringify({
              success: false,
              message: 'You are currently offline. Some content may not be available.',
              offline: true
            }), {
              status: 503,
              statusText: 'Service Unavailable',
              headers: {
                'Content-Type': 'application/json',
              },
            });
          });
        });
      })
    );
  }
  // Handle static assets and pages
  else {
    event.respondWith(
      caches.match(request).then((response) => {
        // Return cached version or fetch from network
        return response || fetch(request).catch(() => {
          // If both cache and network fail, return offline page for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/');
          }
          return new Response('Offline content not available', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      })
    );
  }
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME, API_CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle any queued offline actions here
      console.log('Background sync triggered')
    );
  }
});

// Handle push notifications (for future implementation)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey || 1
      },
      actions: [
        {
          action: 'explore',
          title: 'View Campground',
          icon: '/icons/icon-96x96.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/icons/icon-96x96.png'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/campgrounds')
    );
  }
});