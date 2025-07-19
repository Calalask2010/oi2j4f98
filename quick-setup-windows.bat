@echo off
echo ========================================
echo   HireHand - Быстрая настройка Windows
echo ========================================
echo.

REM Проверяем Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js не найден! 
    echo 📥 Скачайте и установите с https://nodejs.org/
    echo    Выберите версию LTS и отметьте "Add to PATH"
    pause
    exit /b 1
)

echo ✅ Node.js найден

REM Устанавливаем зависимости если их нет
if not exist "node_modules" (
    echo 📦 Устанавливаем зависимости...
    npm install
)

REM Создаем .env файл если его нет
if not exist ".env" (
    echo 📝 Создаю .env файл...
    
    set /p db_password="🔑 Введите пароль PostgreSQL (который вы задали при установке): "
    
    (
    echo # База данных PostgreSQL
    echo DATABASE_URL=postgresql://postgres:%db_password%@localhost:5432/hirehand
    echo PGHOST=localhost
    echo PGPORT=5432  
    echo PGDATABASE=hirehand
    echo PGUSER=postgres
    echo PGPASSWORD=%db_password%
    echo.
    echo # Настройки приложения
    echo NODE_ENV=development
    echo PORT=5000
    ) > .env
    
    echo ✅ Файл .env создан
) else (
    echo ✅ Файл .env уже существует
)

echo.
echo 🗄️  Создаю базу данных...

REM Пытаемся создать базу данных
for /f "tokens=2 delims==" %%a in ('findstr "PGPASSWORD" .env') do set DB_PASS=%%a
psql -U postgres -c "CREATE DATABASE hirehand;" 2>nul

echo 📋 Применяю схему базы данных...
npm run db:push

echo.
echo 🎉 Настройка завершена!
echo.
echo 🚀 Запускаю сервер...
echo    Сайт будет доступен: http://localhost:5000
echo.
npx cross-env NODE_ENV=development tsx server/index.ts

pause