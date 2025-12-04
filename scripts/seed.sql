-- scripts/seed.sql
-- Run this in pgAdmin (Query Tool) against the `audit-software` database.
-- Inserts one UploadBatch and three AuditRecord rows.

BEGIN;

-- Insert an UploadBatch
INSERT INTO "UploadBatch" (id, name, filename, "createdAt")
VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Sample Batch (manual insert)',
  'sample-audit-data.csv',
  now()
);

-- Insert 3 AuditRecord rows referencing the batch above
INSERT INTO "AuditRecord" (id, "uploadBatchId", data, "createdAt")
VALUES
(
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  '{"Transaction ID":"TXN001","Date":"2024-01-15","Department":"HR","Amount":8500,"Status":"Approved","Auditor":"John Smith"}'::json,
  now()
),
(
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  '{"Transaction ID":"TXN002","Date":"2024-01-16","Department":"IT","Amount":22000,"Status":"Pending","Auditor":"Jane Doe"}'::json,
  now()
),
(
  '44444444-4444-4444-4444-444444444444',
  '11111111-1111-1111-1111-111111111111',
  '{"Transaction ID":"TXN003","Date":"2024-01-17","Department":"Finance","Amount":18700,"Status":"Approved","Auditor":"Mike Johnson"}'::json,
  now()
);

COMMIT;
