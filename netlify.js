#!/usr/bin/env node

/**
 * Netlify Deployment Helper for Sparez
 * 
 * This script helps deploy the Sparez application to Netlify,
 * addressing common issues like 404 errors.
 * 
 * Usage:
 *   node netlify.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check if netlify-cli is installed
function checkNetlifyCLI() {
  try {
    execSync('netlify --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Install netlify-cli if not installed
function installNetlifyCLI() {
  console.log('Installing Netlify CLI...');
  try {
    execSync('npm install -g netlify-cli', { stdio: 'inherit' });
    console.log('✅ Netlify CLI installed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Failed to install Netlify CLI.');
    console.error('Please install it manually: npm install -g netlify-cli');
    return false;
  }
}

// Check if user is logged in to Netlify
function checkNetlifyLogin() {
  try {
    execSync('netlify status', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Login to Netlify
function loginToNetlify() {
  console.log('Logging in to Netlify...');
  try {
    execSync('netlify login', { stdio: 'inherit' });
    console.log('✅ Logged in to Netlify successfully!');
    return true;
  } catch (error) {
    console.error('❌ Failed to log in to Netlify.');
    return false;
  }
}

// Verify Netlify configuration files
function verifyNetlifyConfig() {
  let configValid = true;
  
  // Check netlify.toml file
  const netlifyTomlPath = path.join(__dirname, 'netlify.toml');
  
  if (!fs.existsSync(netlifyTomlPath)) {
    console.error('❌ netlify.toml file not found!');
    configValid = false;
  } else {
    const netlifyToml = fs.readFileSync(netlifyTomlPath, 'utf8');
    
    // Check for required configurations
    const requiredConfigs = [
      '[build]',
      'publish',
      '[[redirects]]',
      'from = "/*"',
      'to = "/index.html"',
      'status = 200'
    ];
    
    const missingConfigs = requiredConfigs.filter(config => !netlifyToml.includes(config));
    
    if (missingConfigs.length > 0) {
      console.error('❌ netlify.toml file is missing required configurations:');
      missingConfigs.forEach(config => console.error(`  - ${config}`));
      configValid = false;
    } else {
      console.log('✅ netlify.toml file is valid!');
    }
  }
  
  // Check _redirects file
  const redirectsPath = path.join(__dirname, '_redirects');
  
  if (!fs.existsSync(redirectsPath)) {
    console.warn('⚠️ _redirects file not found. This is optional but recommended as a fallback.');
  } else {
    const redirects = fs.readFileSync(redirectsPath, 'utf8');
    
    // Check for required redirects
    if (!redirects.includes('/*') || !redirects.includes('/index.html') || !redirects.includes('200')) {
      console.warn('⚠️ _redirects file might be missing the SPA redirect rule.');
      console.warn('  Recommended: /*    /index.html   200');
    } else {
      console.log('✅ _redirects file is valid!');
    }
  }
  
  // Create _redirects file if it doesn't exist
  if (!fs.existsSync(redirectsPath)) {
    console.log('Creating _redirects file as a fallback...');
    try {
      const redirectsContent = `# Netlify redirects file
# This file provides an alternative way to configure redirects in addition to netlify.toml

# Handle SPA routing - redirect all paths to index.html
/*    /index.html   200

# Handle direct file access
/*.html    /:splat.html    200
/css/*     /css/:splat     200
/js/*      /js/:splat      200
/img/*     /img/:splat     200
`;
      fs.writeFileSync(redirectsPath, redirectsContent);
      console.log('✅ _redirects file created successfully!');
    } catch (error) {
      console.error('❌ Failed to create _redirects file:', error.message);
    }
  }
  
  return configValid;
}

// Check for critical files in the last deployment
function checkDeploymentFiles() {
  console.log('\nChecking for critical files in the last deployment...');
  
  try {
    // Get the site ID
    const siteInfo = execSync('netlify sites:current --json', { encoding: 'utf8' });
    let siteId;
    
    try {
      const siteData = JSON.parse(siteInfo);
      siteId = siteData.id;
    } catch (jsonError) {
      console.error('❌ Could not parse site information.');
      return false;
    }
    
    if (!siteId) {
      console.error('❌ Could not determine site ID.');
      return false;
    }
    
    // Get the latest deploy ID
    const deploysInfo = execSync(`netlify api listSiteDeploys --data '{"site_id":"${siteId}","limit":1}'`, { encoding: 'utf8' });
    let deployId;
    
    try {
      const deploysData = JSON.parse(deploysInfo);
      if (deploysData && deploysData.length > 0) {
        deployId = deploysData[0].id;
      }
    } catch (jsonError) {
      console.error('❌ Could not parse deployment information.');
      return false;
    }
    
    if (!deployId) {
      console.error('❌ No deployments found for this site.');
      return false;
    }
    
    console.log(`\nChecking files in deployment: ${deployId}`);
    
    // Check for critical files
    const criticalFiles = [
      'index.html',
      '_redirects',
      'netlify.toml'
    ];
    
    let missingFiles = [];
    
    for (const file of criticalFiles) {
      try {
        execSync(`netlify api getDeployFile --data '{"deploy_id":"${deployId}","path":"/${file}"}'`, { stdio: 'ignore' });
        console.log(`✅ ${file} exists in the deployment`);
      } catch (error) {
        console.error(`❌ ${file} is missing from the deployment`);
        missingFiles.push(file);
      }
    }
    
    if (missingFiles.length > 0) {
      console.error('\n⚠️ Some critical files are missing from your deployment:');
      missingFiles.forEach(file => console.error(`  - ${file}`));
      console.error('\nThis could be causing your 404 errors. Make sure these files are in your publish directory.');
      return false;
    } else {
      console.log('\n✅ All critical files are present in the deployment.');
      return true;
    }
  } catch (error) {
    console.error('❌ Failed to check deployment files.');
    console.error('Error:', error.message);
    return false;
  }
}

// Deploy to Netlify
function deployToNetlify(production = false) {
  console.log(`Deploying to Netlify (${production ? 'production' : 'draft'})...`);
  
  try {
    const command = production ? 'netlify deploy --prod' : 'netlify deploy';
    execSync(command, { stdio: 'inherit' });
    
    // If we get here, the deployment was successful
    let deploymentSuccess = true;
    
    // Try to get site URL
    try {
      const siteUrl = execSync('netlify sites:current --json', { encoding: 'utf8' });
      try {
        const siteData = JSON.parse(siteUrl);
        console.log(`\nSite URL: ${siteData.ssl_url || siteData.url}`);
      } catch (jsonError) {
        console.log('\nCould not parse site URL. Please check your Netlify dashboard for the site URL.');
        console.log('You can find your sites at: https://app.netlify.com/');
      }
    } catch (error) {
      console.log('\nCould not retrieve site URL. Please check your Netlify dashboard for the site URL.');
      console.log('You can find your sites at: https://app.netlify.com/');
      // This is not a deployment failure, just a failure to get the URL
    }
    
    // Check for missing files in the deployment
    checkDeploymentFiles();
    
    if (deploymentSuccess) {
      console.log(`\n✅ Deployment to Netlify ${production ? 'production' : 'draft'} completed successfully!`);
      
      console.log('\nIf you encounter a "Page not found" error:');
      console.log('1. Wait a few minutes for the deployment to propagate');
      console.log('2. Check the Netlify dashboard for any build errors');
      console.log('3. Verify that the netlify.toml file has the correct redirects');
      console.log('4. Make sure the _redirects file is properly deployed');
      console.log('5. Ensure your publish directory is correctly configured (should be ".")')
    }
    
    return true;
  } catch (error) {
    console.error(`\n❌ Deployment to Netlify ${production ? 'production' : 'draft'} failed.`);
    console.error('Error:', error.message);
    console.error('\nTroubleshooting tips:');
    console.error('1. Make sure you have the correct permissions for the site');
    console.error('2. Check if you need to link to an existing site first: netlify link');
    console.error('3. Try creating a new site: netlify sites:create');
    console.error('4. Verify your publish directory is correctly set to "."');
    return false;
  }
}

// Check if a Netlify site exists for this project
function checkNetlifySite() {
  try {
    execSync('netlify sites:current', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Create a new Netlify site
function createNetlifySite() {
  console.log('Creating a new Netlify site...');
  try {
    execSync('netlify sites:create --name sparez', { stdio: 'inherit' });
    console.log('✅ Netlify site created successfully!');
    return true;
  } catch (error) {
    console.error('❌ Failed to create Netlify site.');
    console.error('Error:', error.message);
    
    // Try with a random name suffix
    try {
      const randomSuffix = Math.floor(Math.random() * 10000);
      console.log(`Trying with a random name: sparez-${randomSuffix}...`);
      execSync(`netlify sites:create --name sparez-${randomSuffix}`, { stdio: 'inherit' });
      console.log('✅ Netlify site created successfully!');
      return true;
    } catch (retryError) {
      console.error('❌ Failed to create Netlify site with random name.');
      console.error('Please create a site manually: netlify sites:create');
      return false;
    }
  }
}

// Main function
async function main() {
  console.log('Sparez - Netlify Deployment Helper');
  console.log('=================================\n');
  
  // Check Netlify CLI
  if (!checkNetlifyCLI()) {
    console.log('❌ Netlify CLI is not installed.');
    
    const installAnswer = await new Promise(resolve => {
      rl.question('Would you like to install Netlify CLI? (y/n) ', answer => {
        resolve(answer.toLowerCase() === 'y');
      });
    });
    
    if (installAnswer) {
      if (!installNetlifyCLI()) {
        rl.close();
        return;
      }
    } else {
      console.log('Deployment cancelled.');
      rl.close();
      return;
    }
  }
  
  // Check Netlify login
  if (!checkNetlifyLogin()) {
    console.log('❌ You are not logged in to Netlify.');
    
    const loginAnswer = await new Promise(resolve => {
      rl.question('Would you like to log in to Netlify? (y/n) ', answer => {
        resolve(answer.toLowerCase() === 'y');
      });
    });
    
    if (loginAnswer) {
      if (!loginToNetlify()) {
        rl.close();
        return;
      }
    } else {
      console.log('Deployment cancelled.');
      rl.close();
      return;
    }
  }
  
  // Check if a Netlify site exists for this project
  if (!checkNetlifySite()) {
    console.log('❌ No Netlify site is linked to this project.');
    
    const createSiteAnswer = await new Promise(resolve => {
      rl.question('Would you like to create a new Netlify site? (y/n) ', answer => {
        resolve(answer.toLowerCase() === 'y');
      });
    });
    
    if (createSiteAnswer) {
      if (!createNetlifySite()) {
        const continueAnswer = await new Promise(resolve => {
          rl.question('Would you like to continue anyway? (y/n) ', answer => {
            resolve(answer.toLowerCase() === 'y');
          });
        });
        
        if (!continueAnswer) {
          console.log('Deployment cancelled.');
          rl.close();
          return;
        }
      }
    } else {
      console.log('Deployment cancelled.');
      rl.close();
      return;
    }
  } else {
    console.log('✅ Netlify site is linked to this project.');
  }
  
  // Verify netlify.toml
  if (!verifyNetlifyConfig()) {
    const continueAnswer = await new Promise(resolve => {
      rl.question('Would you like to continue anyway? (y/n) ', answer => {
        resolve(answer.toLowerCase() === 'y');
      });
    });
    
    if (!continueAnswer) {
      console.log('Deployment cancelled.');
      rl.close();
      return;
    }
  }
  
  // Deploy to Netlify
  const deployAnswer = await new Promise(resolve => {
    rl.question('Would you like to deploy to Netlify production? (y/n) ', answer => {
      resolve(answer.toLowerCase() === 'y');
    });
  });
  
  if (deployAnswer) {
    deployToNetlify(true);
  } else {
    console.log('Deploying to Netlify draft (preview)...');
    deployToNetlify(false);
    
    const prodAnswer = await new Promise(resolve => {
      rl.question('Would you like to promote the draft to production? (y/n) ', answer => {
        resolve(answer.toLowerCase() === 'y');
      });
    });
    
    if (prodAnswer) {
      deployToNetlify(true);
    }
  }
  
  rl.close();
}

// Run the main function
main().catch(error => {
  console.error('An error occurred:', error);
  rl.close();
});
