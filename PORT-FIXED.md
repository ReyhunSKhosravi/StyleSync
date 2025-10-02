# ✅ مشکل پورت حل شد!

<div dir="rtl">

## 🔍 مشکل چی بود؟

**ControlCenter** (سرویس سیستم macOS) داشت از پورت **5000** استفاده می‌کرد و ما نمی‌تونستیم اونو متوقف کنیم.

## ✅ راه‌حل

پورت Backend را از **5000** به **5001** تغییر دادم.

## 📝 تغییرات انجام شده

### ۱. Backend - پورت تغییر کرد
فایل: `backend/server.js`
```javascript
const PORT = process.env.PORT || 5001; // قبلاً 5000 بود
```

### ۲. Frontend - Proxy به پورت جدید
فایل: `frontend/vite.config.js`
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5001', // قبلاً 5000 بود
    changeOrigin: true
  }
}
```

## 🚀 حالا چطور اجرا کنم؟

همون دستورات قبلی:

```bash
npm run dev
```

یا:

```bash
./run.sh
```

## 🧪 تست

Backend حالا روی پورت **5001** اجراست:

```bash
# تست Health
curl http://localhost:5001/api/health

# تست Questions
curl http://localhost:5001/api/questions
```

Frontend همچنان روی پورت **3000**:
```
http://localhost:3000
```

## ✨ همه چیز کار می‌کند!

- ✅ Backend: `http://localhost:5001`
- ✅ Frontend: `http://localhost:3000`
- ✅ API کار می‌کند
- ✅ Quiz کار می‌کند

## 💡 نکته مهم

اگر در آینده با این خطا مواجه شدید:
```
Error: listen EADDRINUSE: address already in use :::5000
```

یعنی ControlCenter یا برنامه دیگری دارد از پورت 5000 استفاده می‌کند.

**راه‌حل:** همین تنظیمات فعلی (پورت 5001) را نگه دارید!

</div>

