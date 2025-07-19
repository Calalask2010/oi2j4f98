@echo off
echo =======================================
echo     HireHand - Start without database
echo =======================================
echo.

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: Node.js not found! 
    echo Please download and install from https://nodejs.org/
    pause
    exit /b 1
)

echo Success: Node.js found
echo.

REM Install dependencies if missing
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo Success: Dependencies installed
) else (
    echo Success: Dependencies already installed
)

REM Create .env file for memory version
echo Configuring for memory storage...
copy ".env.memory" ".env" >nul 2>&1

echo Success: Configuration ready
echo.
echo Starting server (memory version)...
echo.
echo    Data stored in memory (no PostgreSQL required)
echo    Website available at: http://localhost:5000
echo    Press Ctrl+C to stop
echo.
echo =======================================

npx cross-env NODE_ENV=development HOST=localhost tsx server/index.ts

pause