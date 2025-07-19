@echo off
echo ========================================
echo   Настройка базы данных PostgreSQL
echo ========================================
echo.

REM Запрашиваем данные у пользователя
set /p db_password="Введите пароль для PostgreSQL (который вы задали при установке): "
set /p db_name="Введите имя базы данных (по умолчанию: hirehand): "
if "%db_name%"=="" set db_name=hirehand

echo.
echo 📝 Создаем .env файл с настройками...

REM Создаем .env файл
(
echo # Переменные окружения для HireHand
echo.
echo # База данных PostgreSQL
echo DATABASE_URL=postgresql://postgres:%db_password%@localhost:5432/%db_name%
echo PGHOST=localhost
echo PGPORT=5432
echo PGDATABASE=%db_name%
echo PGUSER=postgres
echo PGPASSWORD=%db_password%
echo.
echo # Настройки приложения
echo NODE_ENV=development
echo PORT=5000
echo DEBUG=true
echo.
echo # Секретные ключи
echo SESSION_SECRET=your-session-secret-here-change-in-production
echo JWT_SECRET=your-jwt-secret-here-change-in-production
) > .env

echo ✅ Файл .env создан!
echo.

echo 🗄️  Создаем базу данных...
echo.

REM Пытаемся создать базу данных
psql -U postgres -c "CREATE DATABASE %db_name%;" 2>nul
if %errorlevel% equ 0 (
    echo ✅ База данных '%db_name%' создана успешно!
) else (
    echo ⚠️  База данных '%db_name%' уже существует или произошла ошибка
    echo    Это нормально, если база данных уже создана
)

echo.
echo 📋 Применяем схему базы данных...
npm run db:push

if %errorlevel% equ 0 (
    echo ✅ Схема базы данных применена успешно!
    echo.
    echo 🎉 Настройка завершена! Теперь можете запустить:
    echo    start-windows.bat
) else (
    echo ❌ Ошибка применения схемы базы данных
    echo.
    echo 🔧 Проверьте:
    echo    1. PostgreSQL запущен
    echo    2. Пароль правильный
    echo    3. База данных создана
    echo.
    echo 💡 Можете попробовать:
    echo    - Открыть pgAdmin и создать базу данных '%db_name%' вручную
    echo    - Проверить, что PostgreSQL служба запущена в диспетчере задач
)

echo.
pause