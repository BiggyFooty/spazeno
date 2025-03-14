#!/usr/bin/env node

/**
 * GitHub Push Helper for Sparez (Fixed for Detached HEAD)
 * 
 * This script helps push the Sparez application to GitHub,
 * with special handling for detached HEAD state.
 * 
 * Usage:
 *   node push-to-github-fix.js
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check if git is installed
function checkGit() {
  try {
    execSync('git --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Check if the directory is a git repository
function isGitRepo() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Check if HEAD is detached
function isDetachedHead() {
  try {
    const output = execSync('git status', { encoding: 'utf8' });
    return output.includes('HEAD detached');
  } catch (error) {
    return false;
  }
}

// Fix detached HEAD state
function fixDetachedHead(branchName) {
  console.log('Fixing detached HEAD state...');
  try {
    // Create a new branch at the current commit
    execSync(`git checkout -b temp-${branchName}`, { stdio: 'inherit' });
    console.log(`✅ Created temporary branch temp-${branchName}`);
    
    // Create or checkout the target branch
    try {
      execSync(`git checkout ${branchName}`, { stdio: 'inherit' });
      console.log(`✅ Checked out existing branch ${branchName}`);
    } catch (error) {
      execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });
      console.log(`✅ Created and checked out new branch ${branchName}`);
    }
    
    // Merge the temporary branch
    try {
      execSync(`git merge temp-${branchName}`, { stdio: 'inherit' });
      console.log(`✅ Merged changes from temporary branch`);
    } catch (error) {
      console.error(`❌ Failed to merge temporary branch.`);
      console.error('Error:', error.message);
      return false;
    }
    
    // Delete the temporary branch
    try {
      execSync(`git branch -D temp-${branchName}`, { stdio: 'inherit' });
      console.log(`✅ Deleted temporary branch`);
    } catch (error) {
      console.warn(`⚠️ Could not delete temporary branch, but this is not critical.`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Failed to fix detached HEAD state.');
    console.error('Error:', error.message);
    return false;
  }
}

// Initialize git repository
function initGitRepo() {
  console.log('Initializing git repository...');
  try {
    execSync('git init', { stdio: 'inherit' });
    console.log('✅ Git repository initialized successfully!');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize git repository.');
    console.error('Error:', error.message);
    return false;
  }
}

// Create .gitignore file
function createGitignore() {
  const gitignorePath = path.join(__dirname, '.gitignore');
  
  if (fs.existsSync(gitignorePath)) {
    console.log('✅ .gitignore file already exists.');
    return true;
  }
  
  console.log('Creating .gitignore file...');
  try {
    const gitignoreContent = `# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/dist

# Misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`;
    fs.writeFileSync(gitignorePath, gitignoreContent);
    console.log('✅ .gitignore file created successfully!');
    return true;
  } catch (error) {
    console.error('❌ Failed to create .gitignore file:', error.message);
    return false;
  }
}

// Add all files to git
function addAllFiles() {
  console.log('Adding all files to git...');
  try {
    execSync('git add .', { stdio: 'inherit' });
    console.log('✅ All files added to git successfully!');
    return true;
  } catch (error) {
    console.error('❌ Failed to add files to git.');
    console.error('Error:', error.message);
    return false;
  }
}

// Check if there are changes to commit
function hasChangesToCommit() {
  try {
    const output = execSync('git status --porcelain', { encoding: 'utf8' });
    return output.trim().length > 0;
  } catch (error) {
    return false;
  }
}

// Commit changes
function commitChanges(message) {
  console.log('Committing changes...');
  
  // Check if there are changes to commit
  if (!hasChangesToCommit()) {
    console.log('⚠️ No changes to commit. Continuing with push...');
    return true;
  }
  
  try {
    execSync(`git commit -m "${message}"`, { stdio: 'inherit' });
    console.log('✅ Changes committed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Failed to commit changes.');
    console.error('Error:', error.message);
    return false;
  }
}

// Check if remote exists
function remoteExists(name) {
  try {
    execSync(`git remote get-url ${name}`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Add remote
function addRemote(name, url) {
  console.log(`Adding remote ${name}...`);
  try {
    if (remoteExists(name)) {
      execSync(`git remote set-url ${name} ${url}`, { stdio: 'inherit' });
      console.log(`✅ Remote ${name} updated successfully!`);
    } else {
      execSync(`git remote add ${name} ${url}`, { stdio: 'inherit' });
      console.log(`✅ Remote ${name} added successfully!`);
    }
    return true;
  } catch (error) {
    console.error(`❌ Failed to add remote ${name}.`);
    console.error('Error:', error.message);
    return false;
  }
}

// Push to remote
function pushToRemote(name, branch, token, repoUrl) {
  console.log(`Pushing to ${name}/${branch}...`);
  
  try {
    // If token is provided, use it for authentication
    if (token) {
      // Extract owner and repo from the URL
      let owner, repo;
      
      if (repoUrl.includes('github.com')) {
        const urlParts = repoUrl
          .replace(/^https?:\/\//, '')
          .replace(/\.git$/, '')
          .split('/');
        
        if (urlParts.length >= 3) {
          owner = urlParts[1];
          repo = urlParts[2];
        }
      }
      
      if (owner && repo) {
        // Create URL with token
        const tokenUrl = `https://${token}@github.com/${owner}/${repo}.git`;
        console.log(`Using personal access token for authentication...`);
        execSync(`git push -u ${name} ${branch}`, { 
          stdio: 'inherit',
          env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
          input: tokenUrl
        });
      } else {
        // Fallback to using the token directly in the URL
        const tokenUrl = repoUrl.replace('https://', `https://${token}@`);
        execSync(`git remote set-url ${name} "${tokenUrl}"`, { stdio: 'ignore' });
        execSync(`git push -u ${name} ${branch}`, { stdio: 'inherit' });
        // Reset the URL to not include the token (for security)
        execSync(`git remote set-url ${name} "${repoUrl}"`, { stdio: 'ignore' });
      }
    } else {
      // Regular push without token
      execSync(`git push -u ${name} ${branch}`, { stdio: 'inherit' });
    }
    
    console.log(`✅ Successfully pushed to ${name}/${branch}!`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to push to ${name}/${branch}.`);
    console.error('Error:', error.message);
    return false;
  }
}

// Configure git user if not set
async function configureGitUser() {
  try {
    const name = execSync('git config --global user.name', { encoding: 'utf8' }).trim();
    const email = execSync('git config --global user.email', { encoding: 'utf8' }).trim();
    
    if (name && email) {
      console.log(`✅ Git user already configured as: ${name} <${email}>`);
      return true;
    }
  } catch (error) {
    // Git user not configured
  }
  
  console.log('Git user not configured. Please provide your information:');
  
  const name = await new Promise(resolve => {
    rl.question('Name: ', answer => resolve(answer.trim()));
  });
  
  const email = await new Promise(resolve => {
    rl.question('Email: ', answer => resolve(answer.trim()));
  });
  
  if (!name || !email) {
    console.error('❌ Name and email are required.');
    return false;
  }
  
  try {
    execSync(`git config --global user.name "${name}"`, { stdio: 'inherit' });
    execSync(`git config --global user.email "${email}"`, { stdio: 'inherit' });
    console.log('✅ Git user configured successfully!');
    return true;
  } catch (error) {
    console.error('❌ Failed to configure git user.');
    console.error('Error:', error.message);
    return false;
  }
}

// Main function
async function main() {
  console.log('Sparez - GitHub Push Helper (Fixed for Detached HEAD)');
  console.log('=================================================\n');
  
  // Check if git is installed
  if (!checkGit()) {
    console.error('❌ Git is not installed. Please install Git first:');
    console.error('https://git-scm.com/downloads');
    rl.close();
    return;
  }
  
  // Configure git user if not set
  if (!await configureGitUser()) {
    rl.close();
    return;
  }
  
  // Check if the directory is a git repository
  if (!isGitRepo()) {
    console.log('❌ This directory is not a git repository.');
    
    const initAnswer = await new Promise(resolve => {
      rl.question('Would you like to initialize a git repository? (y/n) ', answer => {
        resolve(answer.toLowerCase() === 'y');
      });
    });
    
    if (initAnswer) {
      if (!initGitRepo()) {
        rl.close();
        return;
      }
    } else {
      console.log('Push cancelled.');
      rl.close();
      return;
    }
  } else {
    console.log('✅ Git repository already initialized.');
  }
  
  // Create .gitignore file
  createGitignore();
  
  // Get GitHub repository URL
  console.log('\nTo push to GitHub, you need a GitHub repository URL.');
  console.log('If you don\'t have one yet, create a new repository at:');
  console.log('https://github.com/new\n');
  
  const repoUrl = await new Promise(resolve => {
    rl.question('GitHub repository URL: ', answer => {
      resolve(answer.trim());
    });
  });
  
  if (!repoUrl) {
    console.error('❌ GitHub repository URL is required.');
    rl.close();
    return;
  }
  
  // Get commit message
  const commitMessage = await new Promise(resolve => {
    rl.question('Commit message (default: "Initial commit"): ', answer => {
      resolve(answer.trim() || 'Initial commit');
    });
  });
  
  // Get branch name
  const branchName = await new Promise(resolve => {
    rl.question('Branch name (default: "main"): ', answer => {
      resolve(answer.trim() || 'main');
    });
  });
  
  // Check if HEAD is detached and fix it if needed
  if (isDetachedHead()) {
    console.log('⚠️ Detected detached HEAD state. Attempting to fix...');
    if (!fixDetachedHead(branchName)) {
      console.error('❌ Failed to fix detached HEAD state. Cannot continue.');
      rl.close();
      return;
    }
  }
  
  // Add all files to git
  if (!addAllFiles()) {
    rl.close();
    return;
  }
  
  // Commit changes
  if (!commitChanges(commitMessage)) {
    rl.close();
    return;
  }
  
  // Add remote
  if (!addRemote('origin', repoUrl)) {
    rl.close();
    return;
  }
  
  // Get personal access token from environment variable
  const defaultToken = process.env.GITHUB_TOKEN || '';
  
  let token;
  
  if (!defaultToken) {
    // If no token is provided in environment variables, ask the user
    token = await new Promise(resolve => {
      rl.question('GitHub personal access token (leave blank to use password authentication): ', answer => {
        resolve(answer.trim());
      });
    });
  } else {
    console.log('✅ Using GitHub personal access token from environment variables.');
    token = defaultToken;
  }
  
  // Push to remote
  if (!pushToRemote('origin', branchName, token, repoUrl)) {
    console.log('\nIf you\'re seeing an authentication error, you might need to:');
    console.log('1. Use a different personal access token with the correct scopes (repo)');
    console.log('2. Set up SSH keys for GitHub');
    console.log('3. Use the GitHub CLI to authenticate');
    
    console.log('\nFor more information, see:');
    console.log('https://docs.github.com/en/authentication');
    
    rl.close();
    return;
  }
  
  console.log('\n✅ Successfully pushed to GitHub!');
  console.log(`Repository URL: ${repoUrl}`);
  
  // Suggest next steps
  console.log('\nNext steps:');
  console.log('1. Set up GitHub Pages or deploy to a hosting platform');
  console.log('2. Connect your repository to Netlify, Vercel, or Heroku');
  console.log('3. Set up CI/CD for automated deployments');
  
  rl.close();
}

// Run the main function
main().catch(error => {
  console.error('An error occurred:', error);
  rl.close();
});
