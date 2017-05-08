const CACHE_NAME = 'blacknoise.v1.0.0';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/assets/css/main.css',
  '/assets/js/bundle.js',
  '/assets/audio/baby-crying.mp3',
  '/assets/audio/construction.mp3',
  '/assets/audio/garbage-truck.mp3',
  '/assets/audio/car-alarm.mp3',
  '/assets/audio/high-pitch.mp3',
  '/assets/audio/plastic.mp3',
  '/assets/audio/vomiting.mp3',
  '/assets/audio/fingernail-clipping.mp3',
  '/assets/audio/dog-barking.mp3',
  '/assets/audio/subway.mp3',
  '/assets/img/skull.png',
  '/assets/img/baby-crying.svg',
  '/assets/img/construction.svg',
  '/assets/img/garbage-truck.svg',
  '/assets/img/car-alarm.svg',
  '/assets/img/high-pitch.svg',
  '/assets/img/plastic.svg',
  '/assets/img/vomiting.svg',
  '/assets/img/fingernail-clipping.svg',
  '/assets/img/dog-barking.svg',
  '/assets/img/subway.svg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
      caches.match(e.request)
        .catch(noop)
        .then(res => res || fetch(e.request))
  );
});

/**
 * noop
 * @return {undefined}
 */
function noop() {}
