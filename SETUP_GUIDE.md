# Project Setup and Deployment Guide

## Prerequisites

Before starting, ensure you have the following installed:
- **Node.js** (v18.17 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **MongoDB Atlas** account (free tier available)
- **Vercel** account (free tier available)

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Environment Configuration](#environment-configuration)
3. [Database Setup](#database-setup)
4. [Running the Project](#running-the-project)
5. [Building for Production](#building-for-production)
6. [Deploying to Vercel](#deploying-to-vercel)
7. [Post-Deployment Steps](#post-deployment-steps)
8. [Troubleshooting](#troubleshooting)

## Local Development Setup

### 1. Clone the Repository

```bash
# Clone from GitHub
git clone https://github.com/your-username/nextjs-portfolio-template.git

# Navigate to project directory
cd nextjs-portfolio-template
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# Or using yarn
yarn install
```

### 3. Install Additional Tools (Optional)

```bash
# For automated screenshots
npm install --save-dev playwright
npx playwright install
```

## Environment Configuration

### 1. Create Environment File

Create a `.env.local` file in the root directory:

```bash
# Copy example environment file
cp .env.example .env.local
```

### 2. Configure Environment Variables

Edit `.env.local` with your values:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=admin@yourdomain.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Authentication (Optional)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

## Database Setup

### 1. Create MongoDB Atlas Account

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier)

### 2. Configure Database Access

1. **Create Database User:**
   - Go to Database Access
   - Add New Database User
   - Set username and password
   - Grant "Read and write to any database" permission

2. **Configure Network Access:**
   - Go to Network Access
   - Add IP Address
   - Allow access from anywhere (0.0.0.0/0) for development
   - For production, restrict to Vercel IP ranges

3. **Get Connection String:**
   - Go to Database → Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Add to `.env.local` as `MONGODB_URI`

### 3. Seed Initial Data

```bash
# Seed all collections
node seed-all.mjs

# Or seed individually
node seed-projects.mjs
node seed-services.mjs
node seed-testimonials.mjs
node seed-messages.mjs
```

## Running the Project

### Development Mode

```bash
# Start development server
npm run dev

# Or with yarn
yarn dev
```

The application will be available at `http://localhost:3000`

**Features in Development Mode:**
- Hot Module Replacement (HMR)
- Error overlay
- Fast Refresh
- Source maps

### Production Mode (Local)

```bash
# Build the project
npm run build

# Start production server
npm run start
```

## Building for Production

### 1. Pre-Build Checklist

- [ ] All environment variables are set
- [ ] Database connection is working
- [ ] Remove all console.log statements
- [ ] Update meta tags and SEO information
- [ ] Test all features locally

### 2. Build Command

```bash
# Create production build
npm run build

# Check for TypeScript errors
npm run type-check

# Run linting
npm run lint
```

### 3. Build Output

The build process will:
- Compile TypeScript to JavaScript
- Optimize and bundle code
- Generate static pages where possible
- Create API route handlers
- Optimize images

Expected output:
```
Route (app)                              Size     First Load JS
┌ ○ /                                    15.2 kB        95.8 kB
├ ○ /admin                              28.4 kB        108 kB
├ ○ /login                              12.1 kB        92.7 kB
├ λ /api/projects                       0 B            0 B
├ λ /api/services                       0 B            0 B
└ λ /api/testimonials                   0 B            0 B

○  (Static)  prerendered as static content
λ  (Dynamic) server-rendered on demand
```

## Deploying to Vercel

### Method 1: Vercel CLI (Recommended)

#### 1. Install Vercel CLI

```bash
npm i -g vercel
```

#### 2. Login to Vercel

```bash
# Login with browser
vercel login

# Or login with token
vercel login --token YOUR_TOKEN
```

#### 3. Deploy to Vercel

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Deploy with specific configuration
vercel --prod --env MONGODB_URI=your-connection-string
```

### Method 2: Git Integration

#### 1. Push to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial deployment"

# Push to GitHub
git push origin main
```

#### 2. Connect to Vercel

1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `.next`

#### 3. Add Environment Variables

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add each variable from `.env.local`
3. Select environments (Production, Preview, Development)
4. Save changes

### Method 3: Direct Deployment

```bash
# Deploy with environment variables
VERCEL_TOKEN=your-token vercel --prod --yes \
  --env MONGODB_URI="your-mongodb-uri" \
  --env SMTP_HOST="smtp.gmail.com" \
  --env SMTP_PORT="587"
```

## Post-Deployment Steps

### 1. Verify Deployment

- [ ] Visit your production URL
- [ ] Check all pages load correctly
- [ ] Test admin panel login
- [ ] Verify database connections
- [ ] Test contact form
- [ ] Check responsive design

### 2. Configure Domain (Optional)

1. In Vercel Dashboard → Domains
2. Add your custom domain
3. Configure DNS settings:
   ```
   Type    Name    Value
   A       @       76.76.21.21
   CNAME   www     cname.vercel-dns.com
   ```

### 3. Enable Analytics (Optional)

```bash
# Install Vercel Analytics
npm i @vercel/analytics

# Add to your layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 4. Set Up Monitoring

1. **Vercel Monitoring:**
   - Functions tab → View logs
   - Analytics tab → Performance metrics
   - Speed Insights → Core Web Vitals

2. **Error Tracking (Optional):**
   ```bash
   npm install @sentry/nextjs
   npx @sentry/wizard -i nextjs
   ```

## Troubleshooting

### Common Issues and Solutions

#### 1. Build Failures

**Error: "Module not found"**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error: "Type error"**
```bash
# Check TypeScript errors
npm run type-check
```

#### 2. Database Connection Issues

**Error: "MongoServerError: bad auth"**
- Verify username and password
- Check IP whitelist in MongoDB Atlas
- Ensure database name is correct

**Error: "ECONNREFUSED"**
- Check MONGODB_URI format
- Verify network access settings
- Test connection with MongoDB Compass

#### 3. Deployment Issues

**Error: "Environment variable not found"**
- Add all variables in Vercel Dashboard
- Redeploy after adding variables
- Check variable names match exactly

**Error: "Build exceeded memory limit"**
```json
// vercel.json
{
  "functions": {
    "app/api/*/route.ts": {
      "maxDuration": 10,
      "memory": 1024
    }
  }
}
```

#### 4. Performance Issues

**Slow Initial Load:**
- Enable static generation where possible
- Implement proper caching strategies
- Optimize images and assets

**Database Queries Slow:**
- Add proper indexes
- Use connection pooling
- Implement query caching

### Deployment Checklist

Before deploying to production:

- [ ] **Environment Variables**
  - [ ] All variables set in Vercel
  - [ ] Production values (not development)
  - [ ] Secrets are secure

- [ ] **Database**
  - [ ] Production database configured
  - [ ] Data seeded if needed
  - [ ] Backup strategy in place

- [ ] **Code Quality**
  - [ ] No TypeScript errors
  - [ ] Linting passed
  - [ ] Console.logs removed
  - [ ] Error handling implemented

- [ ] **SEO & Meta**
  - [ ] Title and descriptions updated
  - [ ] OG images configured
  - [ ] Robots.txt appropriate
  - [ ] Sitemap generated

- [ ] **Security**
  - [ ] Authentication working
  - [ ] API routes protected
  - [ ] Input validation active
  - [ ] CORS configured

- [ ] **Testing**
  - [ ] All features tested
  - [ ] Mobile responsive verified
  - [ ] Cross-browser compatibility
  - [ ] Form submissions working

## Useful Commands Reference

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run type-check      # Check TypeScript

# Database
node seed-all.mjs       # Seed all data
node test-db.mjs        # Test database connection

# Deployment
vercel                  # Deploy preview
vercel --prod          # Deploy production
vercel env pull        # Pull environment variables

# Maintenance
npm update             # Update dependencies
npm audit fix          # Fix vulnerabilities
npm run analyze        # Analyze bundle size
```

## Support Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Documentation**: https://vercel.com/docs
- **MongoDB Documentation**: https://docs.mongodb.com
- **Project Issues**: https://github.com/your-repo/issues

---

**Setup Guide Version**: 1.0.0  
**Last Updated**: January 2025