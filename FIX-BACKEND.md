# 🔧 رفع خطای Backend

<div dir="rtl">

اگر خطای "خطا در دریافت سوالات" یا مشکل در Backend دارید، این مراحل را دنبال کنید:

## ✅ راه‌حل سریع (استفاده از اسکریپت)

```bash
cd /Users/reyhunkhosravi/Desktop/BOOM/StyleSync

# نصب کامل
./setup.sh

# اجرای پروژه
./run.sh
```

---

## 📝 راه‌حل دستی (گام به گام)

### مرحله ۱: نصب وابستگی‌های Backend

```bash
cd /Users/reyhunkhosravi/Desktop/BOOM/StyleSync/backend
rm -rf node_modules
npm install
```

**چک کنید:**
```bash
ls node_modules
```
باید پوشه‌های `express`، `cors`، `body-parser` و `nodemon` را ببینید.

---

### مرحله ۲: تست اجرای Backend

```bash
cd /Users/reyhunkhosravi/Desktop/BOOM/StyleSync/backend
npm run dev
```

**باید ببینید:**
```
🚀 سرور در حال اجرا بر روی پورت 5000
```

**اگر خطا دیدید:**

#### خطا: "Cannot find module 'express'"
```bash
npm install express cors body-parser
```

#### خطا: "nodemon: command not found"
```bash
npm install -D nodemon
```

#### خطا: "Port 5000 already in use"
```bash
# پیدا کردن process
lsof -i :5000

# Kill کردن
kill -9 <PID>
```

---

### مرحله ۳: تست API

**در ترمینال جدید:**

```bash
# تست Health
curl http://localhost:5000/api/health
```

**باید ببینید:**
```json
{"status":"ok","message":"سرور StyleSync در حال اجراست"}
```

```bash
# تست Questions
curl http://localhost:5000/api/questions
```

**باید لیست سوالات JSON را ببینید.**

---

### مرحله ۴: اجرای Frontend

```bash
cd /Users/reyhunkhosravi/Desktop/BOOM/StyleSync/frontend
npm run dev
```

**باید ببینید:**
```
➜  Local:   http://localhost:3000/
```

---

## 🐛 خطاهای رایج و راه‌حل

### ❌ خطا: "Error: Cannot find module './services/personalityService.js'"

**علت:** مسیر فایل اشتباه است

**راه‌حل:**
```bash
cd /Users/reyhunkhosravi/Desktop/BOOM/StyleSync/backend
ls services/
```

باید فایل `personalityService.js` را ببینید.

---

### ❌ خطا: "SyntaxError: Cannot use import statement"

**علت:** `"type": "module"` در package.json نیست

**راه‌حل:**
در `backend/package.json` چک کنید که این خط وجود داشته باشد:
```json
"type": "module"
```

---

### ❌ خطا: "CORS Error" در مرورگر

**راه‌حل:**
در `backend/server.js` چک کنید:
```javascript
app.use(cors());
```

---

### ❌ Backend اجرا می‌شود اما Quiz کار نمی‌کند

**تست کنید:**
```bash
# باید JSON برگرداند
curl http://localhost:5000/api/questions | python3 -m json.tool
```

**اگر خطا داد:**
- Backend درست اجرا نشده
- پورت اشتباه است
- Firewall API را بلاک کرده

---

## 🎯 تست کامل با اسکریپت

```bash
cd /Users/reyhunkhosravi/Desktop/BOOM/StyleSync
./test-backend.sh
```

این اسکریپت خودکار Backend را تست می‌کند.

---

## 🔄 ریست کامل Backend

اگر همه چیز خراب شد:

```bash
cd /Users/reyhunkhosravi/Desktop/BOOM/StyleSync/backend

# پاک کردن همه چیز
rm -rf node_modules
rm package-lock.json

# نصب از اول
npm install

# اجرا
npm run dev
```

---

## 📊 چک‌لیست نهایی

قبل از اجرا این موارد را چک کنید:

- [ ] Node.js نصب شده (v18+)
- [ ] وابستگی‌های backend نصب شده
- [ ] `backend/services/personalityService.js` موجود است
- [ ] `"type": "module"` در package.json هست
- [ ] پورت 5000 آزاد است
- [ ] `curl http://localhost:5000/api/health` جواب می‌دهد

---

## 💡 نکات مهم

1. **همیشه از ترمینال جدید استفاده کنید** برای Frontend و Backend
2. **Backend را اول اجرا کنید** بعد Frontend
3. **Console مرورگر را چک کنید** (F12) برای خطاهای دقیق
4. **Terminal Backend را چک کنید** برای خطاهای سرور

---

## 🆘 هنوز کار نمی‌کند؟

اگر همچنان مشکل دارید:

### ۱. Log های دقیق Backend
```bash
cd backend
DEBUG=* npm run dev
```

### ۲. تست دستی API
```bash
# در Python
python3 -c "import urllib.request; print(urllib.request.urlopen('http://localhost:5000/api/health').read())"
```

### ۳. بررسی Network در مرورگر
- F12 → Network
- به `/quiz` بروید
- ببینید `/api/questions` چه status code دارد

### ۴. خطای دقیق را به من بفرست
لطفاً این اطلاعات را بفرستید:
- خطای دقیق در Terminal
- خطای Console مرورگر
- نسخه Node.js: `node -v`
- نسخه npm: `npm -v`

</div>

