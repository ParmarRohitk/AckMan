import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(buffer);

        let data: any[] = [];
        let columns: string[] = [];

        if (file.name.endsWith('.csv')) {
            const text = fileBuffer.toString('utf-8');
            const result = Papa.parse(text, { header: true, skipEmptyLines: true });
            data = result.data;
            columns = result.meta.fields || [];
        } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
            const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            data = XLSX.utils.sheet_to_json(sheet);
            if (data.length > 0) {
                columns = Object.keys(data[0]);
            }
        } else {
            return NextResponse.json({ error: 'Unsupported file format' }, { status: 400 });
        }

        // Return preview (first 5 rows) and columns
        return NextResponse.json({
            columns,
            preview: data.slice(0, 5),
            totalRows: data.length,
            // We might want to cache the full data or return it all depending on size.
            // For now, let's return it all to the client for mapping, but warn if too big.
            // Optimization: In a real app, we'd save to temp storage (Redis/S3) and return an ID.
            // For this task, we'll send it back to client to keep state there for the mapping step.
            data: data
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
    }
}
