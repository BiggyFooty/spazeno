#!/bin/bash
# GitHub Push Helper Shell Script for Linux/macOS
# This script sets the GitHub token and runs the push-to-github-fix.js script

echo "Sparez - GitHub Push Helper Shell Script"
echo "====================================="
echo

# Prompt for GitHub token
read -p "Enter your GitHub personal access token: " GITHUB_TOKEN

# Check if token was provided
if [ -z "$GITHUB_TOKEN" ]; then
  echo "No token provided. Will use password authentication."
else
  echo "Token provided. Will use token authentication."
  # Export the token as an environment variable
  export GITHUB_TOKEN
fi

# Run the push-to-github-fix.js script with the token
echo
echo "Starting GitHub push..."
echo
node push-to-github-fix.js

echo
echo "Push process completed."
echo

# Wait for user input before closing
read -p "Press Enter to continue..."
