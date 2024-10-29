// ชื่อแคชและรายการไฟล์ที่ต้องการแคช
const CACHE_NAME = 'astro-cache-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// ติดตั้ง Service Worker และแคชไฟล์ที่กำหนด
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// ใช้ไฟล์แคชเมื่อมีการร้องขอ
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // ถ้าเจอไฟล์ในแคช ให้ใช้จากแคช
        if (response) {
          return response;
        }
        // ถ้าไม่เจอ ให้ดึงข้อมูลจาก network แล้วแคชไว้ด้วย
        return fetch(event.request).then((response) => {
          // ตรวจสอบว่าเป็นไฟล์ที่แคชได้
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          return response;
        });
      })
  );
});

// ลบแคชเก่าเมื่อมีการอัพเดต Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});