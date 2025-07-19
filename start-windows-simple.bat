@echo off
echo Starting HireHand...
echo Website will be available at: http://localhost:5000
echo.
copy ".env.memory" ".env" >nul 2>&1
npx cross-env NODE_ENV=development tsx server/index.ts
pause