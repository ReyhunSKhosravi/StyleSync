#!/bin/bash

# اسکریپت اجرای سریع StyleSync

echo "🚀 اجرای StyleSync..."
echo ""

# بررسی نصب وابستگی‌ها
if [ ! -d "node_modules" ]; then
    echo "⚠️  وابستگی‌ها نصب نشده‌اند. در حال نصب..."
    ./setup.sh
fi

if [ ! -d "backend/node_modules" ]; then
    echo "⚠️  وابستگی‌های backend نصب نشده‌اند."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "⚠️  وابستگی‌های frontend نصب نشده‌اند."
    cd frontend && npm install && cd ..
fi

echo "✅ همه چیز آماده است!"
echo ""
echo "در حال اجرای Backend و Frontend..."
echo ""
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "برای توقف Ctrl+C را فشار دهید"
echo ""

# اجرای همزمان
npm run dev

