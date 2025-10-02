# ✅ تست سریع پروژه

<div dir="rtl">

این فایل برای تست سریع و مطمئن شدن از اینکه همه چیز کار می‌کند، طراحی شده است.

## قبل از شروع

مطمئن شوید:
```bash
node --version  # باید 18+ باشد
npm --version   # باید نصب باشد
```

---

## مرحله ۱: تست Backend

```bash
# اجرای backend
cd backend
npm run dev
```

**✅ چک کنید:**
- باید ببینید: `🚀 سرور در حال اجرا بر روی پورت 5000`
- خطایی نباید باشد

**تست API:**

در ترمینال دیگر:
```bash
# تست health endpoint
curl http://localhost:5000/api/health

# باید دریافت کنید:
# {"status":"ok","message":"سرور StyleSync در حال اجراست"}

# تست questions endpoint
curl http://localhost:5000/api/questions

# باید لیست سوالات را دریافت کنید
```

اگر این کارها جواب داد، backend سالم است ✅

---

## مرحله ۲: تست Frontend

**ترمینال جدید:**
```bash
cd frontend
npm run dev
```

**✅ چک کنید:**
- باید ببینید: `➜ Local: http://localhost:3000/`
- خطایی نباید باشد

**تست در مرورگر:**
1. به `http://localhost:3000` بروید
2. صفحه اصلی باید لود شود
3. F12 بزنید → Console → نباید خطای قرمز باشد

---

## مرحله ۳: تست Quiz (مهم‌ترین بخش)

1. روی دکمه "شروع تست شخصیت" کلیک کنید
2. باید ۸ سوال نمایش داده شود
3. یک گزینه را انتخاب کنید
4. روی "بعدی" کلیک کنید
5. تا آخر ادامه دهید
6. صفحه نتایج باید نمایش داده شود

**اگر Quiz کار نکرد:**

در Console مرورگر (F12) چک کنید:
- آیا خطای `Failed to fetch` وجود دارد؟
  → Backend اجرا نیست، مرحله ۱ را دوباره انجام دهید

- آیا خطای `Network Error` وجود دارد؟
  → CORS یا Proxy مشکل دارد

---

## تست کامل (All-in-One)

در root پروژه:
```bash
npm run dev
```

این دستور هر دو سرور را اجرا می‌کند.

**✅ چک کنید:**
- دو سرور باید Start شوند
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`

---

## چک‌لیست نهایی

قبل از گزارش مشکل، این موارد را چک کنید:

- [ ] Node.js نصب شده (v18+)
- [ ] تمام `node_modules` نصب شدند
- [ ] Backend در حال اجراست (`localhost:5000`)
- [ ] Frontend در حال اجراست (`localhost:3000`)
- [ ] پورت‌ها آزاد هستند
- [ ] Console مرورگر خطا ندارد
- [ ] `curl http://localhost:5000/api/health` جواب می‌دهد

---

## تست سریع API (یک خطی)

```bash
# اگر این دستور جواب داد، backend سالم است
curl http://localhost:5000/api/questions | python3 -m json.tool
```

باید JSON زیبایی از سوالات ببینید.

---

## تست Network (در مرورگر)

1. F12 → تب Network
2. به Quiz بروید
3. باید ببینید:
   - `GET /api/questions` → Status 200
   - `POST /api/analyze` → Status 200 (بعد از اتمام تست)

اگر Status 200 نیست:
- 404: مسیر API اشتباه است
- 500: خطای Backend
- Failed: Backend در حال اجرا نیست

---

## دیباگ سریع

### اگر صفحه سفید است:
```bash
# Console مرورگر را باز کنید
# معمولاً خطا آنجاست
```

### اگر Quiz لود نمی‌شود:
```bash
# تست کنید backend جواب می‌دهد
curl http://localhost:5000/api/questions
```

### اگر انیمیشن‌ها کار نمی‌کنند:
```bash
# Tailwind را rebuild کنید
cd frontend
npm run dev
```

---

## تست Production Build

```bash
cd frontend
npm run build
npm run preview
```

باید بدون خطا build شود.

---

## ✅ همه چیز کار می‌کند!

اگر همه تست‌ها موفق بودند، پروژه شما آماده است! 🎉

حالا می‌توانید:
1. استفاده کنید و لذت ببرید
2. کد را سفارشی‌سازی کنید
3. ویژگی جدید اضافه کنید

</div>

