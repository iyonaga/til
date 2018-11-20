this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/style.css',
        '/app.js',
        '/image-list.js',
        '/star-wars-logo.jpg',
        '/gallery/',
        '/gallery/bountyHunters.jpg',
        '/gallery/myLittleVader.jpg',
        '/gallery/snowTroopers.jpg'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  console.log(caches);
  event.respondWith(
    caches.match(event.request).then(function(response) {

      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function(response) {
          let responseClone = response.clone();

          caches.open('v1').then(function(cache) {
            cache.put(event.request, responseClone);
          });

          return response;
        }).catch(function() {
          return cache.match('/gallery/myLittleVader.jpg');
        });
      }
    })
  );
});
