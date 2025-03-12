#!/usr/bin/env node

/**
 * Netlify Deployment File Checker for Sparez
 * 
 * This script checks for missing files in the last Netlify deployment
 * that might be causing 404 errors.
 * 
 * Usage:
 *   node check-netlify-files.js
 */

const { execSync } = require('child_process');
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
      console.log(`\nSite: ${siteData.name} (${siteData.ssl_url || siteData.url})`);
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
    let deployUrl;
    
    try {
      const deploysData = JSON.parse(deploysInfo);
      if (deploysData && deploysData.length > 0) {
        deployId = deploysData[0].id;
        deployUrl = deploysData[0].deploy_ssl_url || deploysData[0].url;
        const deployTime = new Date(deploysData[0].created_at).toLocaleString();
        console.log(`Latest deployment: ${deployId} (${deployTime})`);
        console.log(`Deployment URL: ${deployUrl}`);
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
      'netlify.toml',
      'css/styles.css',
      'js/app.js',
      'js/translations.js'
    ];
    
    let missingFiles = [];
    let existingFiles = [];
    
    for (const file of criticalFiles) {
      try {
        execSync(`netlify api getDeployFile --data '{"deploy_id":"${deployId}","path":"/${file}"}'`, { stdio: 'ignore' });
        console.log(`✅ ${file} exists in the deployment`);
        existingFiles.push(file);
      } catch (error) {
        console.error(`❌ ${file} is missing from the deployment`);
        missingFiles.push(file);
      }
    }
    
    // Check for redirects
    console.log('\nChecking for redirects in the deployment...');
    try {
      const redirectsInfo = execSync(`netlify api getSiteRedirects --data '{"site_id":"${siteId}"}'`, { encoding: 'utf8' });
      try {
        const redirectsData = JSON.parse(redirectsInfo);
        if (redirectsData && redirectsData.length > 0) {
          console.log(`✅ Found ${redirectsData.length} redirects configured for this site:`);
          redirectsData.forEach((redirect, index) => {
            console.log(`  ${index + 1}. ${redirect.from} → ${redirect.to} (${redirect.status})`);
          });
          
          // Check for SPA redirect
          const spaRedirect = redirectsData.find(r => 
            r.from === '/*' && 
            r.to === '/index.html' && 
            r.status === 200
          );
          
          if (spaRedirect) {
            console.log('✅ SPA redirect rule is properly configured');
          } else {
            console.error('❌ SPA redirect rule (/* → /index.html 200) is missing');
            console.error('This is likely causing your 404 errors for SPA routes');
          }
        } else {
          console.error('❌ No redirects found for this site');
          console.error('This is likely causing your 404 errors');
        }
      } catch (jsonError) {
        console.error('❌ Could not parse redirects information.');
      }
    } catch (error) {
      console.error('❌ Failed to check redirects.');
      console.error('Error:', error.message);
    }
    
    // Check publish directory
    console.log('\nChecking site settings...');
    try {
      const siteSettings = execSync(`netlify api getSite --data '{"site_id":"${siteId}"}'`, { encoding: 'utf8' });
      try {
        const settingsData = JSON.parse(siteSettings);
        if (settingsData && settingsData.build_settings) {
          const publishDir = settingsData.build_settings.dir || settingsData.build_settings.publish;
          console.log(`Publish directory: ${publishDir || '(not set)'}`);
          
          if (!publishDir || publishDir === '/' || publishDir === '.') {
            console.log('✅ Publish directory is correctly set');
          } else {
            console.error('❌ Publish directory might be incorrectly set');
            console.error(`Current value: ${publishDir}`);
            console.error('Recommended value: "." (current directory)');
            console.error('This could be causing your 404 errors if your files are in the root directory');
          }
        } else {
          console.log('⚠️ Could not determine publish directory from site settings');
        }
      } catch (jsonError) {
        console.error('❌ Could not parse site settings.');
      }
    } catch (error) {
      console.error('❌ Failed to check site settings.');
      console.error('Error:', error.message);
    }
    
    if (missingFiles.length > 0) {
      console.error('\n⚠️ Some critical files are missing from your deployment:');
      missingFiles.forEach(file => console.error(`  - ${file}`));
      console.error('\nThis could be causing your 404 errors. Make sure these files are in your publish directory.');
      
      console.log('\nTroubleshooting tips:');
      console.log('1. Check your publish directory setting in Netlify');
      console.log('2. Make sure the files exist in your local project');
      console.log('3. Try deploying with the explicit directory flag:');
      console.log('   netlify deploy --prod --dir=.');
      
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

// Main function
async function main() {
  console.log('Sparez - Netlify Deployment File Checker');
  console.log('=======================================\n');
  
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
      console.log('Check cancelled.');
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
      console.log('Check cancelled.');
      rl.close();
      return;
    }
  }
  
  // Check if a Netlify site exists for this project
  try {
    execSync('netlify sites:current', { stdio: 'ignore' });
    console.log('✅ Netlify site is linked to this project.');
  } catch (error) {
    console.error('❌ No Netlify site is linked to this project.');
    console.error('Please link a site first: netlify link');
    rl.close();
    return;
  }
  
  // Check deployment files
  checkDeploymentFiles();
  
  console.log('\nCheck complete. If you\'re still experiencing 404 errors, please refer to the Netlify troubleshooting guide:');
  console.log('https://docs.netlify.com/routing/troubleshooting-404s/');
  
  rl.close();
}

// Run the main function
main().catch(error => {
  console.error('An error occurred:', error);
  rl.close();
});
