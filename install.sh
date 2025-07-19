#!/bin/bash
# Скрипт установки зависимостей для проекта HireHand

echo "🚀 Установка зависимостей HireHand..."

# Проверка наличия Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен. Пожалуйста, установите Node.js 18+ или 20+"
    exit 1
fi

# Проверка наличия Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 не установлен. Пожалуйста, установите Python 3.11+"
    exit 1
fi

echo "✅ Node.js версия: $(node --version)"
echo "✅ Python версия: $(python3 --version)"

# Установка Node.js зависимостей
echo "📦 Установка Node.js зависимостей..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Ошибка установки Node.js зависимостей"
    exit 1
fi

# Установка Python зависимостей
echo "🐍 Установка Python зависимостей..."
pip3 install flask flask-cors psycopg2-binary pydantic python-dotenv requests
if [ $? -ne 0 ]; then
    echo "❌ Ошибка установки Python зависимостей"
    exit 1
fi

# Применение схемы базы данных
echo "🗄️  Применение схемы базы данных..."
npm run db:push
if [ $? -ne 0 ]; then
    echo "⚠️  Предупреждение: Не удалось применить схему базы данных. Проверьте DATABASE_URL"
fi

echo "🎉 Установка завершена!"
echo ""
echo "Для запуска приложения используйте:"
echo "  npm run dev"
echo ""
echo "Для проверки статуса:"
echo "  npm list          # Проверить Node.js зависимости"
echo "  pip3 list         # Проверить Python зависимости"