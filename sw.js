var cacheName = "pwa-offline-v1";
var fileList = ["./", "./capt.jpeg", "./thor.jpg"];

// 서비스워커가 설치될 때 캐쉬를 생성(등록)하는 로직
self.addEventListener("install", function(event) {
  event.waitUntil(
    // caches.open('어떤 이름으로 캐시를 만들건가? 위에서 캐시 이름 정의함..')
    caches
      .open(cacheName)
      .then(function(cache) {
        return cache.addAll(fileList);
      })
      .catch(function(error) {
        console.log(error);
      })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(function(error) {
        console.log(error);
      })
  );
});
