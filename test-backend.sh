#!/bin/bash

# اسکریپت تست سرور Backend

echo "🧪 تست Backend StyleSync"
echo ""

# تست Health Endpoint
echo "📡 تست Health Endpoint..."
HEALTH_RESPONSE=$(curl -s http://localhost:5000/api/health)

if [ $? -eq 0 ] && [ ! -z "$HEALTH_RESPONSE" ]; then
    echo "✅ Backend در حال اجرا است"
    echo "   پاسخ: $HEALTH_RESPONSE"
else
    echo "❌ Backend در حال اجرا نیست!"
    echo ""
    echo "لطفا backend را اجرا کنید:"
    echo "  cd backend"
    echo "  npm run dev"
    exit 1
fi

echo ""

# تست Questions Endpoint
echo "📡 تست Questions Endpoint..."
QUESTIONS_RESPONSE=$(curl -s http://localhost:5000/api/questions)

if [ $? -eq 0 ] && [ ! -z "$QUESTIONS_RESPONSE" ]; then
    # شمارش تعداد سوالات
    QUESTION_COUNT=$(echo $QUESTIONS_RESPONSE | grep -o '"id"' | wc -l)
    echo "✅ API سوالات کار می‌کند"
    echo "   تعداد سوالات: $QUESTION_COUNT"
else
    echo "❌ خطا در دریافت سوالات"
    exit 1
fi

echo ""
echo "🎉 تمام تست‌ها موفق بودند!"
echo "✅ Backend به درستی کار می‌کند"

