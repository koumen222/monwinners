Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Demarrage du serveur backend" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Chemin: $PWD" -ForegroundColor Yellow
Write-Host ""

Write-Host "Installation des dependances..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "Demarrage du serveur sur le port 5000..." -ForegroundColor Green
Write-Host ""

node backend/server.js

