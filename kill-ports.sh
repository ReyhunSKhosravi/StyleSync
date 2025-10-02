#!/bin/bash

# اسکریپت برای Kill کردن تمام Processهای روی پورت‌های 3000 و 5000

echo "🔧 در حال آزادسازی پورت‌ها..."
echo ""

# Kill کردن همه processهای روی پورت 5000
echo "🔍 بررسی پورت 5000..."
PIDS_5000=$(lsof -ti :5000)
if [ ! -z "$PIDS_5000" ]; then
    echo "⚠️  پورت 5000 در حال استفاده است"
    echo "   PIDs: $PIDS_5000"
    echo "   در حال Kill کردن..."
    echo "$PIDS_5000" | xargs kill -9 2>/dev/null
    sleep 1
    echo "✅ پورت 5000 آزاد شد"
else
    echo "✅ پورت 5000 آزاد است"
fi

echo ""

# Kill کردن همه processهای روی پورت 3000
echo "🔍 بررسی پورت 3000..."
PIDS_3000=$(lsof -ti :3000)
if [ ! -z "$PIDS_3000" ]; then
    echo "⚠️  پورت 3000 در حال استفاده است"
    echo "   PIDs: $PIDS_3000"
    echo "   در حال Kill کردن..."
    echo "$PIDS_3000" | xargs kill -9 2>/dev/null
    sleep 1
    echo "✅ پورت 3000 آزاد شد"
else
    echo "✅ پورت 3000 آزاد است"
fi

echo ""

# Kill کردن تمام node processهای nodemon
echo "🔍 بررسی nodemon processes..."
NODEMON_PIDS=$(pgrep -f nodemon)
if [ ! -z "$NODEMON_PIDS" ]; then
    echo "⚠️  Nodemon در حال اجراست"
    echo "   در حال Kill کردن..."
    pkill -f nodemon 2>/dev/null
    sleep 1
    echo "✅ Nodemon متوقف شد"
else
    echo "✅ Nodemon در حال اجرا نیست"
fi

echo ""

# Kill کردن تمام vite processes
echo "🔍 بررسی vite processes..."
VITE_PIDS=$(pgrep -f vite)
if [ ! -z "$VITE_PIDS" ]; then
    echo "⚠️  Vite در حال اجراست"
    echo "   در حال Kill کردن..."
    pkill -f vite 2>/dev/null
    sleep 1
    echo "✅ Vite متوقف شد"
else
    echo "✅ Vite در حال اجرا نیست"
fi

echo ""
echo "🎉 همه پورت‌ها آزاد شدند!"
echo ""
echo "حالا می‌توانید پروژه را اجرا کنید:"
echo "  ./run.sh"
echo "یا:"
echo "  npm run dev"

