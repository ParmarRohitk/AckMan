// scripts/seed.js
// CommonJS Node script to insert one UploadBatch and three AuditRecords using Prisma.
// Usage:
// 1) Ensure your `DATABASE_URL` in .env points to the target DB (audit-software)
// 2) Run `npx prisma generate`
// 3) Run `node scripts/seed.js`

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a batch (if it already exists this will throw; change ids if needed)
  const batch = await prisma.uploadBatch.create({
    data: {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Sample Batch (manual insert)',
      filename: 'sample-audit-data.csv',
    },
  });

  await prisma.auditRecord.createMany({
    data: [
      {
        id: '22222222-2222-2222-2222-222222222222',
        uploadBatchId: batch.id,
        data: {
          'Transaction ID': 'TXN001',
          Date: '2024-01-15',
          Department: 'HR',
          Amount: 8500,
          Status: 'Approved',
          Auditor: 'John Smith',
        },
      },
      {
        id: '33333333-3333-3333-3333-333333333333',
        uploadBatchId: batch.id,
        data: {
          'Transaction ID': 'TXN002',
          Date: '2024-01-16',
          Department: 'IT',
          Amount: 22000,
          Status: 'Pending',
          Auditor: 'Jane Doe',
        },
      },
      {
        id: '44444444-4444-4444-4444-444444444444',
        uploadBatchId: batch.id,
        data: {
          'Transaction ID': 'TXN003',
          Date: '2024-01-17',
          Department: 'Finance',
          Amount: 18700,
          Status: 'Approved',
          Auditor: 'Mike Johnson',
        },
      },
    ],
  });

  console.log('Inserted batch and 3 records');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
