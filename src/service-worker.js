importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);
    workbox.precaching.precacheAndRoute([
        { url: "/", revision: '1' },
        { url: "/nav.html", revision: '1' },
        { url: "/index.html", revision: '1' },
        { url: "/team.html", revision: '1' },
        { url: "/manifest.json", revision: '1' },
        { url: "/pages/favorite.html", revision: '1' },
        { url: "/pages/inggris.html", revision: '1' },
        { url: "/pages/perancis.html", revision: '1' },
        { url: "/pages/profil.html", revision: '1' },
        { url: "/css/materialize.min.css", revision: '1' },
        { url: "/css/style.css", revision: '1' },
        { url: "/img/icon-128.png", revision: '1' },
        { url: "/img/icon-192.png", revision: '1' },
        { url: "/img/icon-512.png", revision: '1' },
        { url: "/img/default.png", revision: '1' },
        { url: "/img/ligue1.jpg", revision: '1' },
        { url: "/img/premier.jpg", revision: '1' },
        { url: "/js/materialize.min.js", revision: '1' },
        { url: "/js/api_football.js", revision: '1' },
        { url: "/js/db_football.js", revision: '1' },
        { url: "/js/idb.js", revision: '1' },
        { url: "/js/index.js", revision: '1' },
        { url: "/js/push.js", revision: '1' },
        { url: "/js/script.js", revision: '1' },
    ], {
        ignoreUrlParametersMatching: [/.*/]
    });

    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2/'),
        workbox.strategies.staleWhileRevalidate()
    );

} else {
    console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/icon-128.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});