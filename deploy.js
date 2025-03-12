#!/usr/bin/env node

/**
 * Deployment helper script for Sparez
 * 
 * This script helps deploy the Sparez application to various platforms.
 * 
 * Usage:
 *   node deploy.js [platform]
 * 
 * Platforms:
 *   vercel    - Deploy to Vercel
 *   netlify   - Deploy to Netlify
 *   heroku    - Deploy to Heroku
 *   all       - Show all deployment options
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check if required files exist
const requiredFiles = [
  'index.html',
  'server.js',
  'package.json',
  'vercel.json',
  'netlify.toml',
  'Procfile'
];

const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(__dirname, file)));

if (missingFiles.length > 0) {
  console.error('Error: The following required files are missing:');
  missingFiles.forEach(file => console.error(`  - ${file}`));
  console.error('Please make sure all required files are present before deploying.');
  process.exit(1);
}

// Platform deployment functions
const platforms = {
  vercel: {
    name: 'Vercel',
    check: () => {
      try {
        execSync('vercel --version', { stdio: 'ignore' });
        return true;
      } catch (error) {
        return false;
      }
    },
    install: () => {
      console.log('Installing Vercel CLI...');
      execSync('npm install -g vercel', { stdio: 'inherit' });
    },
    deploy: () => {
      console.log('Deploying to Vercel...');
      try {
        execSync('vercel --prod', { stdio: 'inherit' });
        console.log('\n✅ Deployment to Vercel completed successfully!');
      } catch (error) {
        console.error('\n❌ Deployment to Vercel failed.');
        console.error('Try the following:');
        console.error('1. Make sure you are logged in to Vercel: vercel login');
        console.error('2. Check your vercel.json configuration');
        console.error('3. Try deploying via the Vercel dashboard: https://vercel.com/dashboard');
      }
    }
  },
  netlify: {
    name: 'Netlify',
    check: () => {
      try {
        execSync('netlify --version', { stdio: 'ignore' });
        return true;
      } catch (error) {
        return false;
      }
    },
    install: () => {
      console.log('Installing Netlify CLI...');
      execSync('npm install -g netlify-cli', { stdio: 'inherit' });
    },
    deploy: () => {
      console.log('Deploying to Netlify...');
      try {
        execSync('netlify deploy', { stdio: 'inherit' });
        console.log('\n✅ Deployment to Netlify completed successfully!');
      } catch (error) {
        console.error('\n❌ Deployment to Netlify failed.');
        console.error('Try the following:');
        console.error('1. Make sure you are logged in to Netlify: netlify login');
        console.error('2. Check your netlify.toml configuration');
        console.error('3. Try deploying via the Netlify dashboard: https://app.netlify.com/');
      }
    }
  },
  heroku: {
    name: 'Heroku',
    check: () => {
      try {
        execSync('heroku --version', { stdio: 'ignore' });
        return true;
      } catch (error) {
        return false;
      }
    },
    install: () => {
      console.log('Heroku CLI needs to be installed manually:');
      console.log('- Windows: https://devcenter.heroku.com/articles/heroku-cli');
      console.log('- macOS: brew tap heroku/brew && brew install heroku');
      console.log('- Ubuntu/Debian: sudo snap install --classic heroku');
      process.exit(1);
    },
    deploy: () => {
      console.log('Deploying to Heroku...');
      try {
        // Check if git is initialized
        if (!fs.existsSync(path.join(__dirname, '.git'))) {
          console.log('Initializing git repository...');
          execSync('git init', { stdio: 'inherit' });
          execSync('git add .', { stdio: 'inherit' });
          execSync('git commit -m "Initial commit"', { stdio: 'inherit' });
        }
        
        // Check if Heroku app exists
        try {
          execSync('heroku apps:info', { stdio: 'ignore' });
        } catch (error) {
          console.log('Creating Heroku app...');
          execSync('heroku create', { stdio: 'inherit' });
        }
        
        console.log('Pushing to Heroku...');
        execSync('git push heroku main', { stdio: 'inherit' });
        console.log('\n✅ Deployment to Heroku completed successfully!');
      } catch (error) {
        console.error('\n❌ Deployment to Heroku failed.');
        console.error('Try the following:');
        console.error('1. Make sure you are logged in to Heroku: heroku login');
        console.error('2. Check your Procfile configuration');
        console.error('3. Try deploying manually: heroku create && git push heroku main');
      }
    }
  }
};

// Main function
function main() {
  const args = process.argv.slice(2);
  const platform = args[0]?.toLowerCase();
  
  if (platform === 'all' || !platform) {
    showAllOptions();
    return;
  }
  
  if (!platforms[platform]) {
    console.error(`Error: Unknown platform "${platform}"`);
    showAllOptions();
    return;
  }
  
  deployToPlatform(platform);
}

// Show all deployment options
function showAllOptions() {
  console.log('Sparez Deployment Helper');
  console.log('=======================\n');
  console.log('Available deployment platforms:');
  
  Object.keys(platforms).forEach(key => {
    const platform = platforms[key];
    const installed = platform.check() ? '✅ Installed' : '❌ Not installed';
    console.log(`- ${platform.name} (${key}): ${installed}`);
  });
  
  console.log('\nTo deploy to a specific platform, run:');
  console.log('  node deploy.js <platform>');
  console.log('\nExample:');
  console.log('  node deploy.js vercel');
  
  rl.question('\nWhich platform would you like to deploy to? ', (answer) => {
    const platform = answer.toLowerCase();
    
    if (platforms[platform]) {
      deployToPlatform(platform);
    } else {
      console.log('Invalid platform. Exiting.');
      rl.close();
    }
  });
}

// Deploy to a specific platform
function deployToPlatform(platform) {
  const platformInfo = platforms[platform];
  
  console.log(`\nDeploying to ${platformInfo.name}...`);
  
  if (!platformInfo.check()) {
    console.log(`${platformInfo.name} CLI is not installed.`);
    
    rl.question(`Would you like to install ${platformInfo.name} CLI? (y/n) `, (answer) => {
      if (answer.toLowerCase() === 'y') {
        platformInfo.install();
        platformInfo.deploy();
      } else {
        console.log('Deployment cancelled.');
      }
      rl.close();
    });
  } else {
    platformInfo.deploy();
    rl.close();
  }
}

// Run the main function
main();
