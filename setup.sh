#!/bin/bash

# اسکریپت نصب و راه‌اندازی StyleSync

echo "🚀 شروع نصب StyleSync..."
echo ""

# بررسی Node.js
echo "📦 بررسی Node.js..."
if ! command -v node &> /dev/null
then
    echo "❌ Node.js نصب نیست! لطفا Node.js را نصب کنید."
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js نصب شده: $NODE_VERSION"
echo ""

# نصب وابستگی‌های root
echo "📦 نصب وابستگی‌های root..."
npm install
echo "✅ وابستگی‌های root نصب شد"
echo ""

# نصب وابستگی‌های backend
echo "📦 نصب وابستگی‌های backend..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "✅ وابستگی‌های backend نصب شد"
else
    echo "❌ خطا در نصب وابستگی‌های backend"
    exit 1
fi
cd ..
echo ""

# نصب وابستگی‌های frontend
echo "📦 نصب وابستگی‌های frontend..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo "✅ وابستگی‌های frontend نصب شد"
else
    echo "❌ خطا در نصب وابستگی‌های frontend"
    exit 1
fi
cd ..
echo ""

echo "🎉 نصب با موفقیت انجام شد!"
echo ""
echo "برای اجرای پروژه از دستورات زیر استفاده کنید:"
echo ""
echo "  روش 1 (پیشنهادی):"
echo "    npm run dev"
echo ""
echo "  روش 2 (جداگانه):"
echo "    ترمینال 1: cd backend && npm run dev"
echo "    ترمینال 2: cd frontend && npm run dev"
echo ""
echo "سپس به آدرس http://localhost:3000 بروید"
echo ""

