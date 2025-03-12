@echo off
REM GitHub Push Helper Batch File for Windows
REM This script sets the GitHub token and runs the push-to-github-fix.js script

echo Sparez - GitHub Push Helper Batch File
echo =====================================
echo.

REM Prompt for GitHub token
set /p GITHUB_TOKEN="Enter your GitHub personal access token: "

REM Check if token was provided
if "%GITHUB_TOKEN%"=="" (
  echo No token provided. Will use password authentication.
) else (
  echo Token provided. Will use token authentication.
)

REM Run the push-to-github-fix.js script with the token
echo.
echo Starting GitHub push...
echo.
node push-to-github-fix.js

echo.
echo Push process completed.
echo.

pause
