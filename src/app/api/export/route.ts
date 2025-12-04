import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const batchId = searchParams.get('batchId');
        const format = searchParams.get('format') || 'csv'; // csv or xlsx

        if (!batchId) {
            return NextResponse.json({ error: 'Batch ID required' }, { status: 400 });
        }

        const records = await prisma.auditRecord.findMany({
            where: { uploadBatchId: batchId },
            orderBy: { createdAt: 'desc' },
        });

        const data = records.map((r: any) => r.data);

        if (format === 'csv') {
            const csv = Papa.unparse(data);
            return new NextResponse(csv, {
                headers: {
                    'Content-Type': 'text/csv',
                    'Content-Disposition': `attachment; filename="export.csv"`,
                },
            });
        } else if (format === 'xlsx') {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
            const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
            return new NextResponse(buf, {
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': `attachment; filename="export.xlsx"`,
                },
            });
        }

        return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
    } catch (error) {
        console.error('Export error:', error);
        return NextResponse.json({ error: 'Failed to export data' }, { status: 500 });
    }
}
