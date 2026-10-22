@echo off
chcp 65001 >nul
title EstudaIA - Servidor de Desenvolvimento
cd /d "%~dp0"

echo ========================================================
echo           EstudaIA - Leitor Inteligente de Livros
echo ========================================================
echo.

:: Verifica se as dependencias ja foram instaladas
if not exist "node_modules\" (
    echo [1/2] Instalando dependencias pela primeira vez...
    call npm.cmd install
    echo.
)

echo Enderecos para acessar o sistema:
echo   - No Computador:     http://localhost:3000
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    for /f "tokens=* delims= " %%b in ("%%a") do (
        echo   - Na Rede / Celular: http://%%b:3000
    )
)
echo.
echo Abrindo o navegador...
echo (Para encerrar o servidor, pressione Ctrl + C ou feche esta janela)
echo ========================================================
echo.

:: Abre o navegador padrao automaticamente apos 3 segundos em paralelo
start "" cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:3000"

:: Inicia o servidor Next.js
call npm.cmd run dev

pause
