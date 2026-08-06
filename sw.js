self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('sw.cache').then(function(cacha) {
            return caches.add('index.html');
        })
    );
});