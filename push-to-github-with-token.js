#!/usr/bin/env node

/**
 * GitHub Push Helper with Token for Sparez
 * 
 * This script runs the push-to-github.js script with the provided personal access token.
 * 
 * Usage:
 *   node push-to-github-with-token.js
 */

const { spawn } = require('child_process');
const path = require('path');

// The personal access token provided by the user
const GITHUB_TOKEN = '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';

console.log('Sparez - GitHub Push Helper with Token');
console.log('=====================================\n');

console.log('Starting GitHub push with the provided personal access token...');

// Run the push-to-github.js script with the token as an environment variable
const pushScript = path.join(__dirname, 'push-to-github.js');
const child = spawn('node', [pushScript], {
  env: { ...process.env, GITHUB_TOKEN },
  stdio: 'inherit'
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ GitHub push completed successfully!');
  } else {
    console.error(`\n❌ GitHub push failed with code ${code}.`);
  }
});
