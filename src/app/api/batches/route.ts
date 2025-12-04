import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const batches = await prisma.uploadBatch.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { records: true },
                },
            },
        });

        return NextResponse.json(batches);
    } catch (error) {
        console.error('Fetch batches error:', error);
        return NextResponse.json({ error: 'Failed to fetch batches' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

        // Delete related records first, then the batch
        await prisma.auditRecord.deleteMany({ where: { uploadBatchId: id } });
        await prisma.uploadBatch.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Delete batch error:', error);
        return NextResponse.json({ error: 'Failed to delete batch' }, { status: 500 });
    }
}
