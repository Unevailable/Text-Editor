import { CacheFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';

// Use precacheAndRoute with the self.__WB_MANIFEST array to precache URLs.
precacheAndRoute(self.__WB_MANIFEST);

// Set up caching strategy for assets using CacheFirst
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  new CacheFirst({
    cacheName: 'asset-cache',
    plugins: [
      // CacheableResponsePlugin to cache responses with status codes 0 and 200.
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
