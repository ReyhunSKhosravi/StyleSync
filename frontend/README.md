# 🎨 StyleSync Frontend

<div dir="rtl">

## معرفی

Frontend پروژه StyleSync که با React و Tailwind CSS ساخته شده و رابط کاربری زیبا و مدرن با پشتیبانی کامل RTL ارائه می‌دهد.

## فناوری‌ها

- **React 18** - کتابخانه UI
- **Vite** - ابزار Build سریع
- **Tailwind CSS** - فریمورک CSS
- **React Router** - مدیریت مسیرها
- **Axios** - HTTP Client
- **Vazirmatn Font** - فونت فارسی

## نصب

```bash
npm install
```

## اجرا

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production
```bash
npm run preview
```

## صفحات

### 1. Home (`/`)
صفحه اصلی با معرفی و دکمه شروع تست

### 2. Quiz (`/quiz`)
صفحه تست شخصیت با ۸ سوال و نوار پیشرفت

### 3. Results (`/results`)
نمایش نتایج تحلیل و پیشنهادات استایل

### 4. About (`/about`)
توضیحات درباره پروژه

## ساختار پروژه

```
frontend/
├── src/
│   ├── pages/              # صفحات
│   │   ├── Home.jsx
│   │   ├── Quiz.jsx
│   │   ├── Results.jsx
│   │   └── About.jsx
│   ├── App.jsx            # Router اصلی
│   ├── main.jsx           # Entry Point
│   └── index.css          # استایل‌های Global
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## تنظیمات

### تغییر پورت

در `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    port: 3001  // پورت دلخواه
  }
})
```

### تغییر Backend URL

در `vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5001',  // آدرس backend
    changeOrigin: true
  }
}
```

## استایل‌ها

### رنگ‌های اصلی

در `tailwind.config.js` می‌توانید رنگ‌ها را تغییر دهید:

```javascript
colors: {
  primary: {
    500: '#ef4444',
    600: '#dc2626',
    // ...
  }
}
```

### انیمیشن‌ها

سه انیمیشن اصلی در `index.css`:
- `fade-in` - محو شدن تدریجی
- `slide-in` - اسلاید از کنار
- `scale-in` - بزرگ شدن تدریجی

### کلاس‌های سفارشی

در `index.css`:
- `.btn-primary` - دکمه اصلی با گرادیانت
- `.btn-secondary` - دکمه ثانویه
- `.card` - کارت با سایه و گوشه‌های گرد
- `.input-field` - فیلد ورودی

## کامپوننت‌ها

### Home
- معرفی پروژه
- سه ویژگی اصلی با آیکون
- دکمه شروع

### Quiz
- نوار پیشرفت
- نمایش سوالات یکی یکی
- انتخاب گزینه با کلیک
- دکمه‌های قبلی/بعدی
- حالت بارگذاری
- مدیریت خطا

### Results
- نمایش نوع شخصیت
- ویژگی‌های شخصیتی
- پالت رنگی
- پیشنهادات لباس
- اکسسوری‌ها
- نکات استایل
- دکمه‌های اقدام

### About
- توضیحات پروژه
- نحوه کار
- انواع شخصیت
- ویژگی‌ها

## API Integration

تمام API Calls در `Quiz.jsx`:

```javascript
// دریافت سوالات
axios.get('/api/questions')

// ارسال پاسخ‌ها
axios.post('/api/analyze', { answers })
```

## RTL Support

پشتیبانی کامل راست به چپ:
- `dir="rtl"` در HTML
- `direction: rtl` در CSS
- فونت Vazirmatn
- آیکون‌ها و فلش‌ها معکوس

## Responsive Design

طراحی واکنش‌گرا برای:
- 📱 موبایل (< 768px)
- 📱 تبلت (768px - 1024px)
- 💻 دسکتاپ (> 1024px)

استفاده از Tailwind Breakpoints:
- `md:` - برای تبلت و بالاتر
- `lg:` - برای دسکتاپ

## State Management

State در کامپوننت‌ها با React Hooks:
- `useState` - برای state محلی
- `useEffect` - برای API calls
- `useNavigate` - برای تغییر مسیر
- `useLocation` - برای دریافت state از navigation

## خطایابی

### صفحه سفید
1. Console مرورگر را چک کنید (F12)
2. Network tab را بررسی کنید
3. مطمئن شوید backend اجراست

### استایل‌ها کار نمی‌کنند
```bash
npm run dev  # Vite خودکار rebuild می‌کند
```

### فونت فارسی نمایش نمی‌شود
- اتصال اینترنت را چک کنید
- Google Fonts باید قابل دسترسی باشد

## Build برای Production

```bash
npm run build
```

فایل‌های build در `dist/` قرار می‌گیرند.

### Preview Production Build
```bash
npm run preview
```

## بهینه‌سازی

- Code Splitting خودکار توسط Vite
- Lazy Loading برای مسیرها (می‌توان اضافه کرد)
- Asset Optimization
- CSS Purging توسط Tailwind

## مشارکت

برای اضافه کردن صفحه جدید:

1. در `src/pages/` کامپوننت بسازید
2. در `App.jsx` مسیر اضافه کنید:
```jsx
<Route path="/new" element={<NewPage />} />
```

## Performance

- Vite برای Dev سریع
- React 18 با Concurrent Features
- Tailwind JIT برای CSS کوچک‌تر
- Code Splitting خودکار

</div>

