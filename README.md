# Kigali Car rental

A modern, SEO-optimized car rental website built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **SEO:** next-seo
- **Forms:** React Hook Form + Zod

## Features

- SEO optimized for search engines
- Responsive and mobile-friendly design
- Car catalog with filtering
- Booking system
- Contact forms
- Newsletter subscription
- Admin-ready database schema

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up your environment variables:

```bash
cp .env.example .env
```

3. Update the `DATABASE_URL` in `.env` with your PostgreSQL connection string:

```
DATABASE_URL="postgresql://username:password@localhost:5432/kigalicarhire?schema=public"
```

4. Run Prisma migrations to create your database tables:

```bash
npx prisma migrate dev --name init
```

5. (Optional) Generate Prisma client:

```bash
npx prisma generate
```

6. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
kigalicarhire/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   └── images/                # Static images
├── src/
│   ├── app/                   # Next.js app directory
│   ├── components/
│   │   ├── sections/          # Page sections (Hero, Features, etc.)
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client
│   │   └── seo.ts             # SEO configuration
│   └── types/                 # TypeScript types
├── .env                       # Environment variables (not in git)
├── .env.example               # Environment variables template
└── next.config.ts             # Next.js configuration
```

## Database Schema

The application includes the following models:

- **Car** - Vehicle listings with specifications
- **Booking** - Customer reservations
- **ContactMessage** - Contact form submissions
- **NewsletterSubscriber** - Email newsletter subscribers

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Create and apply migrations

## SEO Features

- Optimized meta tags
- Open Graph support
- Twitter Card support
- Sitemap generation ready
- Semantic HTML structure
- Image optimization with Next.js Image

## Environment Variables

See `.env.example` for all required environment variables.

## License

This project is private and proprietary.

## Support

For support, email support@kigalicarhire.com
 
