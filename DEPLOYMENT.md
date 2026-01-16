# Deployment Guide - Kigali Car Hire

This guide will help you deploy the Kigali Car Hire application to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. A PostgreSQL database (recommended: Vercel Postgres, Supabase, or Neon)
3. A Bunny CDN account for image storage (https://bunny.net)
4. Gmail account with App Password for email notifications

## Step 1: Prepare Your Database

### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel dashboard
2. Navigate to Storage → Create Database → Postgres
3. Copy the `DATABASE_URL` connection string

### Option B: Supabase or Neon
1. Create a new PostgreSQL database
2. Copy the connection string

## Step 2: Set Up Bunny CDN

1. Sign up for Bunny CDN account
2. Create a Storage Zone:
   - Go to Storage → Add Storage Zone
   - Name it (e.g., "kigalicarhire")
   - Choose a region close to your users
3. Note down these values:
   - Storage Zone Name
   - Storage Password (API Key)
   - Pull Zone URL (will be like `https://your-zone.b-cdn.net`)

## Step 3: Configure Gmail for Email Notifications

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Copy the generated password

## Step 4: Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your Git repository (GitHub, GitLab, or Bitbucket)
3. Configure your project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

## Step 5: Configure Environment Variables

In your Vercel project settings, add the following environment variables:

### Database
```
DATABASE_URL=postgresql://username:password@host:5432/database?schema=public
```

### Bunny CDN Configuration
```
BUNNY_CDN_PULL_ZONE_URL=https://your-zone.b-cdn.net
BUNNY_STORAGE_ZONE_NAME=your-storage-zone
BUNNY_STORAGE_HOSTNAME=storage.bunnycdn.com
BUNNY_STORAGE_PASSWORD=your-storage-password
BUNNY_STORAGE_READONLY_PASSWORD=your-readonly-password
BUNNY_STORAGE_PORT=21
BUNNY_API_KEY=your-api-key
BUNNY_STORAGE_ZONE=your-storage-zone
BUNNY_HOSTNAME=your-zone.b-cdn.net
```

### Email Configuration (Gmail)
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
```

### Application Settings
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=Kigali Car Hire
```

## Step 6: Run Database Migrations

After deployment, you need to run Prisma migrations:

### Option A: Via Vercel CLI
```bash
# Set your DATABASE_URL locally
export DATABASE_URL="your-production-database-url"

# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

### Option B: Add to Build Command
Update your Vercel build settings:
```
Build Command: npx prisma generate && npx prisma migrate deploy && npm run build
```

## Step 7: Create Manager Account

After deployment, create a manager account via Prisma Studio or directly in your database:

```sql
INSERT INTO "Manager" (id, email, password, "fullName", role, active, "createdAt", "updatedAt")
VALUES (
  'manager-id',
  'admin@kigalicarhire.com',
  -- Use bcrypt to hash your password (rounds: 10)
  '$2b$10$your-hashed-password-here',
  'Admin User',
  'admin',
  true,
  NOW(),
  NOW()
);
```

Or use Prisma Studio:
```bash
npx prisma studio
```

## Step 8: Verify Deployment

1. Visit your deployed URL
2. Test the following:
   - ✅ Homepage loads correctly
   - ✅ View fleet page shows cars
   - ✅ Booking request form works
   - ✅ Contact form works
   - ✅ Manager login (`/manager/login`)
   - ✅ Image uploads work in manager dashboard

## Post-Deployment Checklist

- [ ] Database is accessible and migrations are applied
- [ ] Environment variables are set correctly
- [ ] Email notifications are working
- [ ] Image uploads to Bunny CDN are working
- [ ] Manager login is working
- [ ] SSL certificate is active (automatically provided by Vercel)
- [ ] Custom domain configured (if applicable)

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify DATABASE_URL is correct

### Database Connection Issues
- Verify DATABASE_URL format
- Check if database allows connections from Vercel IPs
- Ensure SSL mode is configured if required

### Email Not Sending
- Verify Gmail App Password is correct
- Check if 2-Step Verification is enabled
- Ensure EMAIL_* variables are set correctly

### Image Upload Fails
- Verify Bunny CDN API key
- Check storage zone name matches
- Ensure CORS is configured in Bunny CDN

## Updating Your Application

To deploy updates:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel will automatically deploy changes when you push to your main branch.

## Custom Domain Setup

1. Go to your Vercel project settings
2. Navigate to Domains
3. Add your custom domain
4. Update DNS records as instructed by Vercel
5. Update `NEXT_PUBLIC_APP_URL` environment variable

## Support

For issues or questions:
- Check Vercel documentation: https://vercel.com/docs
- Prisma documentation: https://www.prisma.io/docs
- Next.js documentation: https://nextjs.org/docs

---

**Developed by [GoDigito Africa](https://godigitoafrica.com/)**
