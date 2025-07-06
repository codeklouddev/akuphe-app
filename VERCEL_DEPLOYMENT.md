# Vercel Deployment Guide

## Prerequisites
- Node.js installed
- Vercel CLI (installed automatically with npx)

## Vercel CLI Commands

### 1. Authentication
```bash
# Login to Vercel
npx vercel login
```

### 2. Project Management
```bash
# List all projects
npx vercel project ls

# Remove existing project (if needed)
npx vercel project rm nextjs-portfolio-template

# Clean local Vercel configuration
rm -rf .vercel

# Get project details
npx vercel project nextjs-portfolio-template --yes

# Inspect current project
npx vercel inspect
```

### 3. Deployment Commands
```bash
# Deploy to production (new project)
npx vercel --prod

# Deploy to preview
npx vercel

# List all deployments
npx vercel ls

# Check domains
npx vercel domains ls
```

### 4. Environment Variables Setup

Set the following environment variables for production:

```bash
# MongoDB Connection String
npx vercel env add MONGODB_URI production
# Value: mongodb+srv://aKu:UgSfBSJpG0PGiQTg@cluster0.x1hzq.mongodb.net/portfolio?retryWrites=true&w=majority

# Gmail User (for contact form notifications)
npx vercel env add GMAIL_USER production
# Value: akupheaws@gmail.com

# Gmail App Password
npx vercel env add GMAIL_APP_PASSWORD production
# Value: ogyf uunj onqo vmox

# NextAuth Secret (generate with: openssl rand -base64 32)
npx vercel env add NEXTAUTH_SECRET production
# Value: [Generate your own secret]

# NextAuth URL (update with your actual production URL)
npx vercel env add NEXTAUTH_URL production
# Value: https://nextjs-portfolio-template.vercel.app
```

### 5. View Environment Variables
```bash
# List all environment variables
npx vercel env ls

# Pull environment variables to local .env file
npx vercel env pull
```

### 6. Redeployment
```bash
# Redeploy after setting environment variables
npx vercel --prod

# Force a new deployment
npx vercel --prod --force
```

## Deployment Process Summary

1. **First Time Deployment:**
   ```bash
   # Login
   npx vercel login
   
   # Deploy
   npx vercel --prod
   ```
   
   When prompted:
   - Set up and deploy? **Y**
   - Which scope? **Select your account**
   - Link to existing project? **N**
   - Project name? **nextjs-portfolio-template** (or your choice)
   - Directory? **./** (current directory)
   - Override settings? **N**

2. **Set Environment Variables:**
   ```bash
   # Add all environment variables (see section 4)
   npx vercel env add MONGODB_URI production
   npx vercel env add GMAIL_USER production
   npx vercel env add GMAIL_APP_PASSWORD production
   npx vercel env add NEXTAUTH_SECRET production
   npx vercel env add NEXTAUTH_URL production
   ```

3. **Redeploy with Environment Variables:**
   ```bash
   npx vercel --prod
   ```

## Production URLs

Your production URL will be one of:
- `https://nextjs-portfolio-template.vercel.app` (main domain)
- `https://[project-name].vercel.app` (if you chose a different name)

Preview/deployment URLs have the format:
- `https://nextjs-portfolio-template-[hash]-[username]-[team].vercel.app`

## Troubleshooting

### Check Current Status
```bash
# View all deployments
npx vercel ls

# Check project details
npx vercel project nextjs-portfolio-template

# View logs
npx vercel logs
```

### Remove and Redeploy
```bash
# Remove project
npx vercel project rm nextjs-portfolio-template

# Clean local config
rm -rf .vercel

# Deploy fresh
npx vercel --prod
```

## Notes
- Always use `--prod` flag for production deployments
- Environment variables must be set for each environment (production, preview, development)
- The main production URL doesn't include hash strings
- Preview deployments get unique URLs with hash strings