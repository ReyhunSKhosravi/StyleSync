# 🔧 رفع مشکلات StyleSync

<div dir="rtl">

## مشکلات رایج و راه‌حل‌ها

### ❌ خطا: "Cannot GET /api/questions"

**علت:** سرور backend اجرا نشده است.

**راه‌حل:**
```bash
cd backend
npm run dev
```

---

### ❌ Quiz کار نمی‌کند / صفحه سفید

**علت‌های احتمالی:**
1. Backend اجرا نشده
2. خطا در اتصال به API
3. پورت اشتباه

**راه‌حل:**

**گام ۱:** بررسی Backend
```bash
# چک کنید backend اجراست
curl http://localhost:5000/api/health
```

باید پاسخ دریافت کنید:
```json
{"status":"ok","message":"سرور StyleSync در حال اجراست"}
```

**گام ۲:** بررسی Console مرورگر
- F12 را بزنید
- به تب Console بروید
- خطاها را بررسی کنید

**گام ۳:** بررسی Network
- F12 → تب Network
- صفحه را رفرش کنید
- `/api/questions` را پیدا کنید
- Status Code باید 200 باشد

---

### ❌ خطا: "Port 3000 is already in use"

**راه‌حل ۱:** پورت را آزاد کنید
```bash
# پیدا کردن process
lsof -i :3000

# Kill کردن process
kill -9 <PID>
```

**راه‌حل ۲:** تغییر پورت
در `frontend/vite.config.js`:
```javascript
server: {
  port: 3001  // به جای 3000
}
```

---

### ❌ خطا: "Port 5000 is already in use"

**راه‌حل ۱:** پورت را آزاد کنید
```bash
lsof -i :5000
kill -9 <PID>
```

**راه‌حل ۲:** تغییر پورت Backend
در `backend/server.js`:
```javascript
const PORT = process.env.PORT || 5001;
```

**مهم:** اگر پورت backend را تغییر دادید، باید proxy در frontend هم تغییر کند:
```javascript
// frontend/vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:5001'  // پورت جدید
  }
}
```

---

### ❌ خطا: "CORS Error"

**علت:** مشکل در ارتباط frontend و backend

**راه‌حل:**
مطمئن شوید در `backend/server.js` این خط وجود دارد:
```javascript
app.use(cors());
```

---

### ❌ فونت فارسی درست نمایش نمی‌شود

**راه‌حل:**
1. اتصال اینترنت را چک کنید (فونت از Google Fonts لود می‌شود)
2. در صورت نیاز، فونت را به صورت محلی نصب کنید

---

### ❌ Tailwind CSS کار نمی‌کند

**راه‌حل:**
```bash
cd frontend
npm install -D tailwindcss postcss autoprefixer
```

---

### ❌ خطا در نصب وابستگی‌ها

**راه‌حل:**
```bash
# پاک کردن node_modules و نصب مجدد
rm -rf node_modules
rm -rf frontend/node_modules
rm -rf backend/node_modules
rm package-lock.json

# نصب مجدد
npm install
cd frontend && npm install
cd ../backend && npm install
```

---

### ❌ صفحه Results خالی است

**علت:** مشکل در ارسال داده‌ها از Quiz

**راه‌حل:**
1. مطمئن شوید به تمام سوالات پاسخ داده‌اید
2. Console را برای خطاهای API بررسی کنید
3. Backend logs را چک کنید

---

### ❌ انیمیشن‌ها کار نمی‌کنند

**راه‌حل:**
مطمئن شوید `frontend/src/index.css` شامل animationهای زیر است:
```css
@keyframes fadeIn { ... }
@keyframes slideIn { ... }
@keyframes scaleIn { ... }
```

---

## 🧪 تست سلامت سیستم

### تست Backend:
```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/questions
```

### تست Frontend:
1. مرورگر را باز کنید: `http://localhost:3000`
2. F12 → Console → نباید خطایی باشد
3. F12 → Network → همه requestها باید 200 باشند

---

## 📝 Logs مهم

### Backend Logs:
```bash
cd backend
npm run dev

# باید این پیام را ببینید:
# 🚀 سرور در حال اجرا بر روی پورت 5000
```

### Frontend Logs:
```bash
cd frontend
npm run dev

# باید این پیام را ببینید:
# ➜  Local:   http://localhost:3000/
```

---

## 🔄 ریست کامل پروژه

اگر همه چیز خراب شد:

```bash
# پاک کردن همه چیز
rm -rf node_modules
rm -rf frontend/node_modules
rm -rf backend/node_modules
rm -rf frontend/dist
rm package-lock.json
rm frontend/package-lock.json
rm backend/package-lock.json

# نصب از اول
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# اجرا
npm run dev
```

---

## 💡 نکات مفید

1. **همیشه هر دو سرور را اجرا کنید** (frontend + backend)
2. **Console مرورگر را چک کنید** (F12)
3. **Network tab را بررسی کنید** برای مشکلات API
4. **Terminal را نگاه کنید** برای خطاهای سرور

---

## 🆘 هنوز مشکل دارید؟

1. مطمئن شوید Node.js نسخه 18+ دارید:
   ```bash
   node --version
   ```

2. npm را بروز کنید:
   ```bash
   npm install -g npm@latest
   ```

3. تمام processها را kill کنید و از نو شروع کنید:
   ```bash
   # Kill همه node processes
   pkill -f node
   
   # اجرای مجدد
   npm run dev
   ```

</div>

