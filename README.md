# Sparez - Luxury Hotel Spa Reservations App

Sparez is a mobile-first web application for booking luxury hotel spa services. The application allows users to browse spa services, view details, make reservations, and manage their bookings.

## Features

- User authentication (login/register)
- Browse spa services by category
- View spa service details
- Book spa appointments
- View and manage bookings in a calendar
- Multi-language support (English and Turkish)
- Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

#### Local Development

To run the application locally:

```bash
npm run dev
```

This will start the development server with hot reloading using nodemon.

#### Production Mode (Local)

To start the server in production mode locally:

```bash
npm run prod
```

### Accessing the Application

Once the server is running, you can access the application at:

- Local: http://localhost:3000
- Network: The server will display available network URLs when started

## Multi-language Support

The application supports both English and Turkish languages. You can toggle between languages by clicking the language button in the header.

## Project Structure

- `index.html` - Main entry point
- `css/styles.css` - Main stylesheet
- `js/app.js` - Main JavaScript file
- `js/translations.js` - Language translations
- `server.js` - Express server for hosting the application
- Various HTML files for different pages (home, booking, services, etc.)

## Deployment Options

### Quick Deployment with Helper Script

We've included a deployment helper script that simplifies the process of deploying to various platforms. To use it:

```bash
# Show all deployment options
npm run deploy

# Deploy to a specific platform
npm run deploy:vercel
npm run deploy:netlify
npm run deploy:heroku
```

The script will:
1. Check if the required CLI tools are installed
2. Offer to install missing tools
3. Guide you through the deployment process
4. Provide troubleshooting tips if deployment fails

### Option 1: Vercel (Recommended for Static Sites)

Vercel is a cloud platform for static sites and serverless functions that enables developers to host websites with zero configuration.

#### Method 1: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel (if not already logged in):
   ```bash
   vercel login
   ```

3. Deploy to Vercel:
   ```bash
   vercel
   ```

4. Follow the prompts to complete the deployment:
   - Set up and deploy "e:/SPAI/sparez"? Yes
   - Which scope do you want to deploy to? [Select your account]
   - Link to existing project? No
   - What's your project's name? sparez
   - In which directory is your code located? ./
   - Want to override the settings? No

5. Your site will be available at a URL like: `https://sparez.vercel.app`

#### Method 2: Deploy via GitHub Integration (Recommended)

1. Push your code to a GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project settings:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: npm install
   - Output Directory: ./
6. Click "Deploy"

#### Troubleshooting Vercel 404 Errors

If you encounter a 404 NOT_FOUND error:

1. Make sure your project structure is correct:
   - All HTML files should be in the root directory
   - CSS files should be in the css/ directory
   - JavaScript files should be in the js/ directory

2. Check the vercel.json configuration:
   - Make sure the routes are correctly defined
   - Ensure the static files are properly referenced

3. Try deploying with the GitHub integration method instead of CLI

4. If problems persist, try the following:
   ```bash
   vercel --prod
   ```
   This forces a production deployment which can sometimes resolve issues.

### Option 2: Netlify

Netlify is a web developer platform that multiplies productivity with a focus on static sites.

#### Method 1: Deploy via Netlify Helper Script (Recommended)

We've created a specialized Netlify deployment script that helps avoid common issues like 404 errors:

```bash
npm run deploy:netlify
```

This script will:
1. Check if Netlify CLI is installed and offer to install it if needed
2. Verify you're logged in to Netlify
3. Validate your netlify.toml configuration
4. Guide you through the deployment process
5. Provide troubleshooting tips if you encounter issues

#### Method 2: Manual Deployment

1. Install Netlify CLI (if not already installed):
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Deploy to Netlify:
   ```bash
   netlify deploy
   ```

4. Follow the prompts to complete the deployment.

5. Your site will be available at a URL like: `https://sparez.netlify.app`

#### Troubleshooting Netlify 404 Errors and Deployment Issues

Our specialized Netlify deployment script has been enhanced to address common issues:

1. **"Page not found" errors** are fixed by:
   - Using both netlify.toml and _redirects files for redundant routing configuration
   - Adding specific redirects for HTML, CSS, JS, and image files
   - Verifying configuration files before deployment

2. **JSON parsing errors** during deployment are now handled gracefully

3. **Site creation issues** are addressed with:
   - Automatic detection if no site is linked to the project
   - Interactive site creation with fallback to random name if needed
   - Clear error messages and troubleshooting tips

#### Checking for Missing Files in Netlify Deployments

We've added a specialized tool to check for missing files in your Netlify deployments that might be causing 404 errors:

```bash
npm run check:netlify
```

This tool will:
1. Connect to your Netlify account
2. Find your latest deployment
3. Check for critical files (index.html, _redirects, netlify.toml, etc.)
4. Verify SPA redirect rules are properly configured
5. Check your publish directory setting
6. Provide detailed troubleshooting tips based on the findings

If you still encounter issues:

1. Make sure both configuration files are correct:
   - netlify.toml should have the SPA redirect rule
   - _redirects file should be present as a fallback

2. Try running the deployment script with the --prod flag and explicit directory:
   ```bash
   cd sparez
   netlify deploy --prod --dir=.
   ```

3. Check the Netlify dashboard for any build errors or site settings issues

4. Verify your publish directory is set correctly in the Netlify dashboard (should be ".")

5. If all else fails, try deploying directly from the Netlify dashboard by connecting your GitHub repository

### Option 3: Heroku

Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.

1. Install Heroku CLI (if not already installed):
   ```bash
   # For Windows
   # Download from: https://devcenter.heroku.com/articles/heroku-cli
   
   # For macOS
   brew tap heroku/brew && brew install heroku
   
   # For Ubuntu/Debian
   sudo snap install --classic heroku
   ```

2. Login to Heroku:
   ```bash
   heroku login
   ```

3. Create a new Heroku app and deploy:
   ```bash
   npm run deploy:heroku
   ```
   
   Or manually:
   ```bash
   heroku create
   git push heroku main
   ```

4. Your site will be available at a URL like: `https://sparez.herokuapp.com`

### Option 4: DigitalOcean App Platform

DigitalOcean App Platform is a Platform as a Service (PaaS) offering that allows developers to publish code directly to DigitalOcean servers without worrying about the underlying infrastructure.

1. Create a DigitalOcean account if you don't have one
2. Go to the [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
3. Click "Create App" and select "GitHub" as the source
4. Connect your GitHub account and select the repository
5. Configure your app settings and click "Launch App"

### Option 5: Traditional VPS (DigitalOcean, AWS, etc.)

For more control, you can deploy to a Virtual Private Server:

1. Create a server (e.g., DigitalOcean Droplet, AWS EC2)
2. Connect to your server via SSH
3. Clone your repository
4. Install dependencies:
   ```bash
   npm install --production
   ```
5. Start the server:
   ```bash
   NODE_ENV=production npm start
   ```
6. (Optional) Set up a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name sparez
   ```
7. Set up Nginx as a reverse proxy (recommended)

## GitHub Integration

We've added a helper script to easily push your project to GitHub:

```bash
npm run github
```

This script will:
1. Initialize a Git repository if needed
2. Create a .gitignore file with appropriate settings
3. Guide you through configuring Git user information
4. Prompt for your GitHub repository URL
5. Commit and push all files to GitHub
6. Provide next steps for deployment

This makes it easy to:
- Version control your project
- Collaborate with others
- Deploy to platforms that integrate with GitHub
- Set up continuous integration/deployment

## Custom Domain Setup

After deploying to any of the platforms above, you can connect a custom domain:

1. Purchase a domain from a domain registrar (e.g., Namecheap, GoDaddy)
2. Add the domain in your hosting platform's dashboard
3. Update your domain's DNS settings to point to your hosting platform
4. (Optional) Set up SSL certificate for HTTPS (most platforms offer this automatically)

## Content Security Policy

The application is configured with a Content Security Policy that allows:
- Google Fonts (fonts.googleapis.com, fonts.gstatic.com)
- Unsplash images (images.unsplash.com)
- Local resources (scripts, styles, images)
- Inline styles and scripts (for convenience)

If you need to add additional external resources, you'll need to update:
1. The CSP in netlify.toml for Netlify deployments
2. The CSP in server.js for local production mode
3. The proxy rules in _redirects for additional fallback

## License

This project is licensed under the MIT License.
