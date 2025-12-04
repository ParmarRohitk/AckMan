import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { filename, name, data } = body;

        if (!filename || !name || !data || !Array.isArray(data)) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        // Normalize rows to plain JSON-compatible objects to avoid issues
        // from prototype properties or special types (Dates, Maps, etc.)
        const normalized = data.map((row: any) => {
            try {
                return JSON.parse(JSON.stringify(row ?? {}));
            } catch (e) {
                return {};
            }
        });

        // Create UploadBatch
        const batch = await prisma.uploadBatch.create({
            data: {
                filename,
                name,
            },
        });

        // Create AuditRecords in a transaction. Use createMany for efficiency,
        // but ensure the JSON saved is a plain object.
        await prisma.auditRecord.createMany({
            data: normalized.map((row: any) => ({
                uploadBatchId: batch.id,
                data: row,
            })),
        });

        return NextResponse.json({ success: true, batchId: batch.id });
    } catch (error: any) {
        console.error('Save error:', error);

        // Provide error details in development for easier debugging.
        const payload: any = { error: 'Failed to save data' };
        if (process.env.NODE_ENV !== 'production') payload.details = String(error?.message ?? error);

        return NextResponse.json(payload, { status: 500 });
    }
}
