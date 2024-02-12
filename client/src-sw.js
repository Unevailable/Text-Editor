const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// The precacheAndRoute() method takes an array of URLs to precache.
// The self._WB_MANIFEST is an array that contains the list of URLs to precache.
precacheAndRoute(self.__WB_MANIFEST);

// Set up asset cache using CacheFirst strategy
registerRoute(
  // Here we define the callback function that will filter the requests we want to cache (stylesheets and scripts)
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  new CacheFirst({
    // Name of the cache storage.
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
