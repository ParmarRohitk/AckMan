import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const batchId = searchParams.get('batchId');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '50');
        const search = searchParams.get('search') || '';

        const skip = (page - 1) * limit;

        const where: any = {};
        if (batchId) {
            where.uploadBatchId = batchId;
        }

        // Basic search implementation on JSON data
        // Note: Deep search on JSONB can be complex. 
        // For this MVP, we might just fetch and filter if dataset is small, 
        // or rely on specific keys if we knew them.
        // Here we'll just return all for the batch and let frontend filter if no specific search logic is defined.
        // Or we can try to search if the user passes a key.

        // If search is provided, we can try to find it in the stringified JSON
        if (search) {
            // This is a naive text search on the JSON column. 
            // Performance warning for large datasets.
            where.data = {
                path: [],
                string_contains: search
            }
        }

        const [records, total] = await Promise.all([
            prisma.auditRecord.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.auditRecord.count({ where }),
        ]);

        return NextResponse.json({
            data: records.map((r: any) => ({ ...r, data: r.data })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch records' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, data } = body;
        if (!id || !data) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        const updated = await prisma.auditRecord.update({
            where: { id },
            data: { data },
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

        await prisma.auditRecord.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
    }
}
