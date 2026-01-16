# Vercel Environment Variables Setup

## Database Migration Complete ✅

Your local database has been successfully migrated to Prisma Postgres:
- ✅ Schema deployed (4 migrations applied)
- ✅ Data imported successfully
- ✅ Manager account migrated

## Environment Variables to Add in Vercel Dashboard

Go to your Vercel project settings → Environment Variables and add the following:

### Database (REQUIRED)
```
DATABASE_URL=postgres://3e55fa536634cf8574cc27596a1054b0b50468c24e303db9d77c6b2b9db92624:sk_2LsIDJDjNpoGty1BF_R6r@db.prisma.io:5432/postgres?sslmode=require
```

### Bunny CDN Configuration (REQUIRED)
```
BUNNY_CDN_PULL_ZONE_URL=https://kigalicarhire.b-cdn.net
BUNNY_STORAGE_ZONE_NAME=kigalicarhire
BUNNY_STORAGE_HOSTNAME=storage.bunnycdn.com
BUNNY_STORAGE_PASSWORD=b27d623e-76e7-4883-b433aeddb470-fe13-4cc3
BUNNY_STORAGE_READONLY_PASSWORD=e84457ac-ff40-45d4-854f812b6fbe-e002-482e
BUNNY_STORAGE_PORT=21
BUNNY_API_KEY=b27d623e-76e7-4883-b433aeddb470-fe13-4cc3
BUNNY_STORAGE_ZONE=kigalicarhire
BUNNY_HOSTNAME=kigalicarhire.b-cdn.net
```

### Email Configuration (Gmail SMTP) - REQUIRED
**Important:** You need to generate a Gmail App Password
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=kigalicarhire1990@gmail.com
EMAIL_PASSWORD=your-app-password-here
EMAIL_FROM=kigalicarhire1990@gmail.com
```

### Application Settings (REQUIRED)
```
NEXT_PUBLIC_APP_URL=https://your-vercel-url.vercel.app
NEXT_PUBLIC_SITE_NAME=Kigali Car Hire
```

## Steps to Deploy

1. **Add Environment Variables**
   - Go to https://vercel.com/goskills-projects/kigalicarhire/settings/environment-variables
   - Add all the variables above
   - Select "Production", "Preview", and "Development" for each

2. **Generate Gmail App Password** (if not done already)
   - Go to Google Account → Security → 2-Step Verification
   - Scroll to "App passwords"
   - Generate password for "Mail"
   - Use this password for EMAIL_PASSWORD

3. **Update NEXT_PUBLIC_APP_URL**
   - After deployment, get your Vercel URL
   - Update this environment variable with your actual URL

4. **Trigger Deployment**
   - The next push to GitHub will automatically deploy
   - Or manually trigger deployment from Vercel dashboard

## Database Connection Details

Your Prisma Postgres database is now live at:
- Host: db.prisma.io
- Database: postgres
- Schema: public

**Important:** Keep your database credentials secure. The connection string contains sensitive information.

## What Was Migrated

✅ All database tables and schemas
✅ Manager account (1 account)
✅ Any existing cars, bookings, messages, etc.

## Testing After Deployment

1. Visit your Vercel URL
2. Test manager login at `/manager/login`
3. Verify cars are visible in the fleet
4. Test booking form submission
5. Check email notifications are working

## Troubleshooting

If deployment fails:
- Check all environment variables are set correctly
- Ensure no trailing spaces in variable values
- Verify DATABASE_URL has `?sslmode=require` at the end
- Check Vercel deployment logs for specific errors

## Local Development

To use the production database locally, your `.env.local` file is already configured with:
```
DATABASE_URL=postgres://3e55fa536634cf8574cc27596a1054b0b50468c24e303db9d77c6b2b9db92624:sk_2LsIDJDjNpoGty1BF_R6r@db.prisma.io:5432/postgres?sslmode=require
```

To switch back to local database, change to:
```
DATABASE_URL=postgresql://gataremmanuel@localhost:5432/kigalicarhire?schema=public
```

---

**Next Steps:**
1. Add environment variables to Vercel dashboard
2. Generate Gmail App Password
3. Commit and push to trigger deployment
4. Update NEXT_PUBLIC_APP_URL after deployment
