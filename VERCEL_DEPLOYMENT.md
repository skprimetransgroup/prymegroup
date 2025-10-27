# Vercel Deployment Guide for Pryme Group Website

This guide will help you deploy the Pryme Group job board application to Vercel with full database support and serverless functions.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Neon Database**: Your PostgreSQL database from Replit or create a new one at [neon.tech](https://neon.tech)
3. **GitHub Repository**: (Optional but recommended) Push your code to GitHub for easier deployments

## Architecture Overview

The deployed application uses:
- **Frontend**: Static React build served via Vercel's CDN
- **Backend**: Single serverless function handling all API routes
- **Database**: PostgreSQL (Neon) for data persistence
- **Sessions**: Database-backed sessions using PostgreSQL

## Deployment Steps

### Step 1: Prepare Your Database

1. **Get your Neon DATABASE_URL**:
   - From Replit: Copy the `DATABASE_URL` from your secrets
   - From Neon.tech: Create a new project and copy the connection string

2. **Run Database Migrations** (if not already done):
   ```bash
   npm run db:push
   ```

3. **Seed Initial Data** (if not already done):
   ```bash
   npm run db:seed
   ```

### Step 2: Configure Environment Variables in Vercel

In your Vercel project settings, add these environment variables:

#### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string from Neon | `postgresql://user:password@host/db` |
| `NODE_ENV` | Set to 'production' | `production` |
| `SESSION_SECRET` | Strong random string for session encryption | Generate with: `openssl rand -base64 32` |

#### Optional Variables (from your Neon setup)

| Variable | Description |
|----------|-------------|
| `PGHOST` | PostgreSQL host |
| `PGUSER` | PostgreSQL user |
| `PGPASSWORD` | PostgreSQL password |
| `PGDATABASE` | PostgreSQL database name |
| `PGPORT` | PostgreSQL port (default: 5432) |

### Step 3: Deploy to Vercel

#### Option A: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import project in Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select "Import Git Repository"
   - Choose your repository
   - Configure project settings:
     - **Framework Preset**: Other
     - **Build Command**: `npm run build` (or leave default)
     - **Output Directory**: `dist/client`
     - **Install Command**: `npm install`

3. **Add Environment Variables**:
   - In the project configuration, add all environment variables from Step 2
   - Make sure to add them for **Production**, **Preview**, and **Development** environments

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)

#### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
4. **Follow the prompts**:
   - Setup and build: Yes
   - Which scope: Choose your account
   - Link to existing project: No (first time)
   - Project name: pryme-group (or your choice)
   - In which directory is your code located: ./
   - Want to modify settings: Yes
   - Build Command: `npm run build`
   - Output Directory: `dist/client`
   - Development Command: `npm run dev`

5. **Set Environment Variables**:
   ```bash
   vercel env add DATABASE_URL production
   vercel env add SESSION_SECRET production
   vercel env add NODE_ENV production
   ```

6. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Step 4: Verify Deployment

1. **Check the deployment URL**: Vercel will provide a URL like `https://your-project.vercel.app`

2. **Test the following**:
   - ✅ Homepage loads
   - ✅ Job listings appear
   - ✅ Blog posts display
   - ✅ Admin login works at `/admin/login`
     - Username: `primeadmin`
     - Password: `PrimeAdmin2024!@#`
   - ✅ Admin dashboard accessible
   - ✅ Creating/editing content works

### Step 5: Custom Domain (Optional)

1. **Add Custom Domain in Vercel**:
   - Go to Project Settings → Domains
   - Add your domain (e.g., `pryme group.com`)

2. **Update DNS Records**:
   - Add the DNS records provided by Vercel to your domain registrar
   - Wait for DNS propagation (can take up to 48 hours)

## Important Notes

### Database Connections

- **Connection Pooling**: Neon automatically handles connection pooling
- **Serverless Limitations**: Each serverless function invocation creates a new database connection
- **Neon Free Tier**: Includes 1GB storage and 100 hours of compute per month
- **Upgrade if needed**: Monitor usage and upgrade Neon plan if you exceed limits

### Session Management

- Sessions are stored in PostgreSQL (table: `session`)
- Sessions persist across serverless function invocations
- Session lifetime: 24 hours
- Clean up old sessions periodically via Neon dashboard or cron job

### Static Assets

- Images and videos should be uploaded to the Replit Object Storage or use a CDN
- Update image paths to use absolute URLs if hosting externally
- Consider using Vercel Blob Storage for user-uploaded content

### Deployment Workflow

1. **Development**: Work in Replit with `npm run dev`
2. **Testing**: Test locally with `USE_DB=true npm run dev` to test database connections
3. **Deploy**: Push to GitHub → Auto-deploy to Vercel
4. **Monitor**: Check Vercel logs and Neon dashboard for errors

## Troubleshooting

### Build Failures

**Error**: "Cannot find module..."
- **Solution**: Make sure all dependencies are in `package.json`

**Error**: "Build exceeded maximum duration"
- **Solution**: Check Vercel plan limits, optimize build process

### Runtime Errors

**Error**: "Database connection failed"
- **Solution**: Verify `DATABASE_URL` is correctly set in Vercel environment variables
- **Solution**: Check Neon database is active and not sleeping

**Error**: "Session store error"
- **Solution**: Ensure `session` table exists in database
- **Solution**: Run migrations: `npm run db:push`

**Error**: "Admin login fails"
- **Solution**: Verify database was seeded: `npm run db:seed`
- **Solution**: Check admin credentials in database

### Performance Issues

**Slow API responses**
- **Solution**: Upgrade Neon plan for better performance
- **Solution**: Enable Neon's connection pooling
- **Solution**: Optimize database queries

**Cold starts**
- **Solution**: This is normal for serverless - first request may be slow
- **Solution**: Consider upgrading Vercel plan for reduced cold starts

## Maintenance

### Database Backups

- Neon automatically backs up your database
- Access backups via Neon dashboard
- Consider setting up manual backups for critical data

### Monitoring

- **Vercel Analytics**: Monitor performance and usage
- **Neon Monitoring**: Track database queries and performance
- **Error Tracking**: Consider adding Sentry or similar tool

### Updates

1. Make changes in Replit
2. Test locally
3. Push to GitHub
4. Vercel auto-deploys from GitHub
5. Verify deployment works

## Cost Estimates

### Vercel

- **Hobby Plan**: Free for personal projects
  - 100GB bandwidth
  - Serverless function executions
  - Automatic HTTPS
  
- **Pro Plan**: $20/month
  - Unlimited bandwidth
  - Higher function limits
  - Priority support

### Neon Database

- **Free Tier**: $0
  - 1GB storage
  - 100 compute hours/month
  
- **Pro Plan**: Starting at $19/month
  - 10GB storage
  - More compute hours
  - Better performance

### Total Estimated Cost

- **Minimum**: $0 (using free tiers)
- **Recommended**: ~$40/month (Vercel Pro + Neon Pro)

## Support

For issues or questions:
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Neon Docs**: [neon.tech/docs](https://neon.tech/docs)
- **Drizzle ORM**: [orm.drizzle.team](https://orm.drizzle.team)

---

**Deployment Date**: October 2025
**Application Version**: 1.0.0
