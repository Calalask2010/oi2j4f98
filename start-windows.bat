@echo off
echo ================================
echo   HireHand - Windows Startup
echo ================================
echo.

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js not found! Install from https://nodejs.org/
    pause
    exit /b 1
)

REM Check npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: npm not found! Reinstall Node.js
    pause
    exit /b 1
)

echo Success: Node.js found: 
node --version
echo Success: npm found:
npm --version
echo.

REM Check package.json
if not exist "package.json" (
    echo Error: package.json not found! Make sure you are in the right folder
    pause
    exit /b 1
)

REM Check node_modules
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
) else (
    echo Success: Dependencies already installed
)

REM Check .env file
if not exist ".env" (
    echo Warning: .env file not found
    if exist ".env.example" (
        echo Copying .env.example to .env
        copy ".env.example" ".env"
        echo.
        echo IMPORTANT: Edit .env file with your database settings!
        echo    Open .env in notepad and set correct PostgreSQL password
        echo.
        pause
    ) else (
        echo Error: .env.example not found either. Create .env file manually
        pause
    )
)

REM Применяем схему базы данных
echo Applying database schema...
npm run db:push
if %errorlevel% neq 0 (
    echo Warning: Could not apply database schema
    echo    Check settings in .env file
    echo.
)

echo Starting server...
echo.
echo    Website available at: http://localhost:5000
echo    Press Ctrl+C to stop
echo.
echo ================================

REM Start with cross-env for Windows compatibility
npx cross-env NODE_ENV=development tsx server/index.ts

pause