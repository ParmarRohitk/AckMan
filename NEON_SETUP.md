# Neon Database Setup Guide

This guide will help you set up Neon database integration with branch-based development.

## Branch Strategy

- **Local Development**: Uses `production` branch in Neon
- **Vercel Deployment**: Uses `main` branch in Neon

## Setup Steps

### 1. Pull Environment Variables from Vercel

Run the following command to pull your environment variables from Vercel:

```bash
vercel env pull .env.development.local
```

This will create a `.env.development.local` file with your Vercel environment variables.

### 2. Update DATABASE_URL for Local Development

After pulling the environment variables, you need to modify the `DATABASE_URL` in `.env.development.local` to point to the `production` branch instead of `main`.

Your Neon database URL should follow this format:

```
postgresql://[user]:[password]@[endpoint]/[database]?sslmode=require&options=project%3D[project-id]%2Fbranch%3Dproduction
```

**Important**: Change the branch parameter from `main` to `production` in your local `.env.development.local` file.

### 3. Create Database Tables

Navigate to the Neon SQL Editor in the Neon Console and run the following SQL to create all necessary tables:

```sql
-- This will be automatically handled by Prisma migrations
-- Run: npx prisma migrate dev
```

Or manually run the Prisma migration:

```bash
npx prisma migrate dev --name init
```

### 4. Generate Prisma Client

After setting up the database URL, generate the Prisma client:

```bash
npx prisma generate
```

### 5. Run the Application

Start the development server:

```bash
npm run dev
```

Navigate to http://localhost:3000 to see your application.

## Environment Variables

Your `.env.development.local` should contain:

```env
# Neon Database URL (production branch for local dev)
DATABASE_URL="postgresql://..."

# JWT Secret for authentication
JWT_SECRET="your-jwt-secret"
```

## Vercel Environment Variables

For Vercel deployment, ensure your environment variables are set to use the `main` branch:

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Set `DATABASE_URL` to point to the `main` branch in Neon

## Database Schema

The application uses the following main models:
- `UploadBatch`: Stores uploaded file batches
- `AuditRecord`: Stores individual audit records
- `Company`: Company/organization information
- `User`: User accounts with authentication
- `Role`: User roles (Admin, Manager, Employee, etc.)
- `Permission`: Granular permissions
- `UserRole`: User-to-role assignments
- `RolePermission`: Role-to-permission assignments
- `Session`: Authentication sessions

## Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Verify your `DATABASE_URL` is correct
2. Ensure the branch name is correct (`production` for local, `main` for Vercel)
3. Check that your Neon database is active
4. Run `npx prisma db push` to sync your schema

### Prisma Client Issues

If Prisma client is not found:

```bash
npx prisma generate
```

### Migration Issues

To reset your database (⚠️ this will delete all data):

```bash
npx prisma migrate reset
```
