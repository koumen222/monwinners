@echo off
echo ========================================
echo   Demarrage du serveur backend
echo ========================================
echo.
cd /d "%~dp0"
echo Chemin: %CD%
echo.
echo Installation des dependances...
call npm install
echo.
echo Demarrage du serveur sur le port 5000...
echo.
node backend/server.js
pause

