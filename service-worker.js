const CACHE_NAME = "pwa_14";
var urlsToCache = [
	"/",
	"/ilkom512.png",
	"/ilkom192.png",
	"/manifest.json",
	"/img/1.jpeg",
	"/img/2.jpg",
	"/img/3.jpg",
	"/img/4.jpg",
	"/img/5.jpg",
	"/img/6.jpg",
	"/img/8.jpeg",
	"/img/7.jpg",
	"/img/1slider.jpg",
	"/nav.html",
	"/index.html",
	"/footer.html",
	"/pages/home.html",
	"/pages/gallery.html",
	"/pages/news.html",
	"/pages/profile.html",
	"/css/materialize.min.css",
	"/css/style.css",
	"/js/materialize.min.js",
	"/js/nav.js"
];

self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", function (event) {
	event.respondWith(
		caches
		.match(event.request, {
			cacheName: CACHE_NAME
		})
		.then(function (response) {

			if (response) {
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			console.log(
				"ServiceWorker: Memuat dari server: ", event.request.url
			);
			return fetch(event.request);
		})
	);
});

self.addEventListener("activate", function (event) {
	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheName != CACHE_NAME) {
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});