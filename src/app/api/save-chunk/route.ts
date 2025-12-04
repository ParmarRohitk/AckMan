import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filename, name, rows, batchId } = body as any;

    if (!rows || !Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'No rows provided' }, { status: 400 });
    }

    let id = batchId;

    if (!id) {
      // first chunk: create batch
      const batch = await prisma.uploadBatch.create({
        data: {
          filename: filename ?? 'unknown',
          name: name ?? 'Untitled',
        },
      });
      id = batch.id;
    }

    // Normalize rows to plain JSON
    const normalized = rows.map((r: any) => {
      try {
        return JSON.parse(JSON.stringify(r ?? {}));
      } catch (e) {
        return {};
      }
    });

    // Bulk insert
    await prisma.auditRecord.createMany({
      data: normalized.map((r: any) => ({ uploadBatchId: id, data: r })),
    });

    return NextResponse.json({ success: true, batchId: id });
  } catch (err: any) {
    console.error('save-chunk error:', err);
    return NextResponse.json({ error: 'Failed to save chunk', details: String(err?.message ?? err) }, { status: 500 });
  }
}
