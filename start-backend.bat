@echo off
echo Starting XZMovies Backend Server...
cd /d "c:\Users\USER\OneDrive\Documentos\XZMovies\backend-movie-app"
echo Current directory: %CD%
echo.
echo Checking if Node.js is installed...
node --version
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    pause
    exit /b 1
)
echo.
echo Checking if package.json exists...
if not exist package.json (
    echo Error: package.json not found in current directory
    pause
    exit /b 1
)
echo.
echo Installing dependencies (if needed)...
npm install
echo.
echo Starting server...
npm start
pause
