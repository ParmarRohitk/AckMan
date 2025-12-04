# Audit Software

Modern data audit and mapping tool built with Next.js, Prisma, and Tailwind CSS.

## Features

- 📤 **File Upload**: Support for Excel (.xlsx) and CSV files
- 🗺️ **Data Mapping**: Automatic column detection and mapping
- 💾 **Database Storage**: Secure storage in PostgreSQL with flexible JSONB
- 🔍 **Search & Filter**: Real-time search across all columns
- 📊 **Export**: Download filtered data as CSV or Excel
- 🎨 **Modern UI**: Beautiful interface with Framer Motion animations

## Quick Start

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (or use the provided connection string)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment variables:**
   
   The `.env` file is already configured with the database URL. If you need to change it:
   ```bash
   DATABASE_URL="your_postgres_connection_string"
   ```

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

4. **Run database migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```
   
   **Note:** If the database connection fails, you can still run the app in development mode. The app will show errors when trying to save data, but the UI will work.

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Uploading Data

1. Click **"Start Upload"** on the home page
2. Select or drag & drop an Excel (.xlsx) or CSV file
3. Review the preview of your data
4. Enter a name for your dataset
5. Click **"Save Dataset"**

### Viewing & Filtering Data

1. Navigate to **"View Data"** from the home page
2. Click on any dataset card to view its contents
3. Use the search bar to filter records
4. Results update in real-time

### Exporting Data

1. In the data view page, click **"Export CSV"** or **"Export Excel"**
2. The file will download with your current filtered results

## Project Structure

```
audiit-software/
├── src/
│   ├── app/
│   │   ├── api/          # API routes
│   │   │   ├── batches/  # Get all upload batches
│   │   │   ├── export/   # Export data
│   │   │   ├── records/  # Get records with filtering
│   │   │   ├── save/     # Save uploaded data
│   │   │   └── upload/   # Parse uploaded files
│   │   ├── data/         # Data viewing pages
│   │   ├── upload/       # Upload wizard
│   │   └── page.tsx      # Landing page
│   ├── components/ui/    # Reusable UI components
│   └── lib/
│       ├── prisma.ts     # Prisma client singleton
│       └── utils.ts      # Utility functions
├── prisma/
│   └── schema.prisma     # Database schema
└── package.json
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **File Parsing**: xlsx, papaparse
- **UI Components**: Custom components with Radix UI primitives

## Database Schema

### UploadBatch
- `id`: UUID
- `name`: User-defined dataset name
- `filename`: Original file name
- `createdAt`: Timestamp

### AuditRecord
- `id`: UUID
- `uploadBatchId`: Foreign key to UploadBatch
- `data`: JSONB (flexible storage for any column structure)
- `createdAt`: Timestamp

## Troubleshooting

### Database Connection Issues

If you see `P1001: Can't reach database server` error:

1. Verify your database is running and accessible
2. Check the `DATABASE_URL` in `.env` file
3. Ensure your network allows connections to the database
4. For development, you can use a local PostgreSQL instance

### Build Errors

The production build requires a valid database connection. For development:
- Use `npm run dev` instead of `npm run build`
- The app will work in development mode even if the database is temporarily unavailable

## Development

```bash
# Start development server
npm run dev

# Generate Prisma Client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name your_migration_name

# Open Prisma Studio (database GUI)
npx prisma studio
```

## License

MIT
