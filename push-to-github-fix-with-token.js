#!/usr/bin/env node

/**
 * GitHub Push Helper with Token for Sparez (Fixed for Detached HEAD)
 * 
 * This script runs the push-to-github-fix.js script with the provided personal access token.
 * It specifically addresses the detached HEAD state issue.
 * 
 * Usage:
 *   node push-to-github-fix-with-token.js
 */

const { spawn } = require('child_process');
const path = require('path');

// The personal access token should be provided as an environment variable
// DO NOT hardcode tokens in source code as they will be detected by GitHub's secret scanning
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

// If no token is provided, inform the user
if (!GITHUB_TOKEN) {
  console.log('⚠️ No GitHub token found in environment variables.');
  console.log('To use this script with a token, set the GITHUB_TOKEN environment variable:');
  console.log('  Windows: set GITHUB_TOKEN=your_token_here');
  console.log('  Linux/macOS: export GITHUB_TOKEN=your_token_here');
  console.log('Alternatively, you can enter the token when prompted during the script execution.');
}

console.log('Sparez - GitHub Push Helper with Token (Fixed for Detached HEAD)');
console.log('===========================================================\n');

console.log('Starting GitHub push with the provided personal access token...');
console.log('This script will automatically fix any detached HEAD state issues.\n');

// Run the push-to-github-fix.js script with the token as an environment variable
const pushScript = path.join(__dirname, 'push-to-github-fix.js');
const child = spawn('node', [pushScript], {
  env: { ...process.env, GITHUB_TOKEN },
  stdio: 'inherit'
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ GitHub push completed successfully!');
  } else {
    console.error(`\n❌ GitHub push failed with code ${code}.`);
    console.error('If you\'re still having issues, try the following:');
    console.error('1. Make sure your repository exists on GitHub');
    console.error('2. Check if the personal access token has the correct permissions (repo scope)');
    console.error('3. Try manually running these commands:');
    console.error('   git checkout -b main');
    console.error('   git add .');
    console.error('   git commit -m "Initial commit"');
    console.error('   git push -u origin main');
  }
});
