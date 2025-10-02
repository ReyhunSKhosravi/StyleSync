# 🔧 StyleSync Backend

<div dir="rtl">

## معرفی

Backend پروژه StyleSync که با Express.js نوشته شده و API های مورد نیاز برای تحلیل شخصیت را فراهم می‌کند.

## فناوری‌ها

- **Express.js** - فریمورک وب
- **CORS** - Cross-Origin Resource Sharing
- **Body Parser** - پردازش JSON
- **ES Modules** - استفاده از import/export

## نصب

```bash
npm install
```

## اجرا

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

سرور روی پورت `5000` اجرا می‌شود.

## API Endpoints

### 1. Health Check
```
GET /api/health
```

**پاسخ:**
```json
{
  "status": "ok",
  "message": "سرور StyleSync در حال اجراست"
}
```

---

### 2. دریافت سوالات
```
GET /api/questions
```

**پاسخ:**
```json
{
  "questions": [
    {
      "id": 1,
      "question": "سوال...",
      "options": [
        {
          "id": "a",
          "text": "گزینه...",
          "traits": {
            "extrovert": 2,
            "confident": 2
          }
        }
      ]
    }
  ]
}
```

---

### 3. تحلیل شخصیت
```
POST /api/analyze
```

**Body:**
```json
{
  "answers": [
    {
      "id": "a",
      "traits": { ... }
    }
  ]
}
```

**پاسخ:**
```json
{
  "personality": {
    "type": "elegant_professional",
    "typeName": "شخصیت شیک و حرفه‌ای",
    "description": "...",
    "traits": [...]
  },
  "recommendations": {
    "colors": [...],
    "clothing": [...],
    "accessories": [...],
    "tips": [...]
  }
}
```

## ساختار پروژه

```
backend/
├── server.js              # سرور اصلی و Routes
├── services/
│   └── personalityService.js  # منطق تحلیل شخصیت
└── package.json
```

## انواع شخصیت

سیستم ۷ نوع شخصیت را پشتیبانی می‌کند:

1. `elegant_professional` - شیک و حرفه‌ای
2. `creative_artistic` - خلاق و هنری
3. `casual_comfortable` - راحت‌طلب و کژوال
4. `bold_adventurous` - جسور و ماجراجو
5. `minimalist_calm` - مینیمال و آرام
6. `trendy_modern` - مدرن و مدگرا
7. `romantic_soft` - رمانتیک و ملایم

## تنظیمات

### تغییر پورت

در `server.js`:
```javascript
const PORT = process.env.PORT || 5000;
```

یا با متغیر محیطی:
```bash
PORT=3001 npm run dev
```

## تست

```bash
# تست health endpoint
curl http://localhost:5000/api/health

# تست questions endpoint
curl http://localhost:5000/api/questions

# تست analyze endpoint
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"answers": [...]}'
```

## توسعه

### اضافه کردن سوال جدید

در `server.js` به آرایه `questions` اضافه کنید:

```javascript
{
  id: 9,
  question: 'سوال جدید شما؟',
  options: [
    { 
      id: 'a', 
      text: 'گزینه ۱', 
      traits: { trait1: 2, trait2: 1 } 
    },
    // ...
  ]
}
```

### اضافه کردن نوع شخصیت جدید

در `services/personalityService.js` در تابع `determinePersonalityType`:

```javascript
{
  type: 'new_type',
  name: 'نام فارسی',
  description: 'توضیحات...',
  weights: { trait1: 3, trait2: 2 }
}
```

و در `getStyleRecommendations` پیشنهادات را اضافه کنید.

## خطایابی

### خطا: "Port already in use"
```bash
lsof -i :5000
kill -9 <PID>
```

### خطا: "Cannot find module"
```bash
npm install
```

### خطا در CORS
مطمئن شوید `app.use(cors())` در `server.js` وجود دارد.

## مشارکت

برای اضافه کردن ویژگی:
1. Fork کنید
2. Branch جدید بسازید
3. تغییرات را Commit کنید
4. Pull Request ارسال کنید

</div>

