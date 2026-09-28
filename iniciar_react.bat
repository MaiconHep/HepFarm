@echo off
setlocal
title HepFarm - Servidor Local

echo ===================================================
echo   Iniciando ambiente de desenvolvimento...
echo   1. Emuladores do Firebase
echo   2. Servidor React (Vite)
echo ===================================================
echo.

:: Inicia os Emuladores do Firebase em uma nova janela para não travar o console principal
echo [1/2] Iniciando Firebase Emulators...
start "Firebase Emulators" cmd /c "npx firebase emulators:start"

:: Aguarda uns segundos para o emulador subir antes de abrir o app
timeout /t 5 /nobreak >nul

:: Entra na pasta do frontend e inicia o Vite
cd web-app
echo [2/2] Iniciando React (Vite)...
start "Vite Server" cmd /c "npm run dev"

echo.
echo Abrindo o navegador...
:: Vite costuma usar a 5173 ou 5174. Como tiramos a porta fixa, ele abrirá na primeira livre.
:: A UI do Firebase Emulator estará na 4000.
start http://localhost:5173
start http://localhost:4000

echo.
:loop
set /p usr_input="Sistemas rodando. Digite 'exit' para fechar tudo com seguranca: "
if /I "%usr_input%"=="exit" goto shutdown
goto loop

:shutdown
echo.
echo ===================================================
echo Encerrando servidores...
echo ===================================================
:: Mata o processo do Firebase e do Vite
taskkill /FI "WindowTitle eq Firebase Emulators*" /T /F >nul 2>&1
taskkill /FI "WindowTitle eq Vite Server*" /T /F >nul 2>&1
:: Garante que as portas sejam liberadas
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":4000" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5174" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8080" ^| findstr "LISTENING"') do taskkill /F /PID %%a >nul 2>&1
echo Servidores encerrados com sucesso!
exit
