// «Свои» — сервис-воркер для установки на главный экран.
// Ничего не кэширует: страницы всегда свежие. Без интернета показывает короткую заглушку.
const OFFLINE = `<!doctype html><html lang="ru"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Свои</title></head>
<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0b0b0d;color:#fff;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;text-align:center;padding:24px;box-sizing:border-box">
<div><div style="font-size:44px">📡</div><h2 style="margin:12px 0 6px">Нет интернета</h2>
<p style="color:#8e8e93;margin:0 0 20px">Проверьте соединение и попробуйте снова.</p>
<button onclick="location.reload()" style="font:inherit;font-weight:600;border:0;border-radius:999px;padding:13px 26px;background:#fff;color:#000">Обновить</button></div>
</body></html>`

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))
self.addEventListener('fetch', (e) => {
  if (e.request.mode !== 'navigate') return
  e.respondWith(fetch(e.request).catch(() => new Response(OFFLINE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })))
})
