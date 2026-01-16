# 🚨 QUICK FIX - Add DATABASE_URL to Vercel

## The Issue
Your production site is showing a 500 error on `/api/cars` because the `DATABASE_URL` environment variable is missing.

## IMMEDIATE FIX (2 minutes)

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/goskills-projects/kigalicarhire/settings/environment-variables
2. Or navigate: Your Project → Settings → Environment Variables

### Step 2: Add DATABASE_URL
1. Click **"Add New"** or **"Create"**
2. Enter:
   - **Key**: `DATABASE_URL`
   - **Value**: `postgres://3e55fa536634cf8574cc27596a1054b0b50468c24e303db9d77c6b2b9db92624:sk_2LsIDJDjNpoGty1BF_R6r@db.prisma.io:5432/postgres?sslmode=require`
3. Select environments: ✅ Production, ✅ Preview, ✅ Development
4. Click **"Save"**

### Step 3: Redeploy
1. Go to Deployments tab
2. Click the three dots ⋯ on the latest deployment
3. Click "Redeploy"
4. Wait ~2-3 minutes for deployment to complete

## That's it! ✅

Your site should work immediately after redeployment.

## Add Other Environment Variables Later

After the site is working, add the remaining environment variables from [VERCEL_ENV_SETUP.md](VERCEL_ENV_SETUP.md):

**Required for full functionality:**
- Bunny CDN variables (9 variables) - for image uploads
- Email variables (5 variables) - for notifications
- App settings (2 variables) - for URLs

But for now, adding just `DATABASE_URL` will fix the 500 error and make your site functional.

---

**Quick Access Links:**
- Environment Variables: https://vercel.com/goskills-projects/kigalicarhire/settings/environment-variables
- Deployments: https://vercel.com/goskills-projects/kigalicarhire/deployments
