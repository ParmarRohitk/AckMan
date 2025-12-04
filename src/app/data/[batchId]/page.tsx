"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Search, ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function DataViewPage() {
    const params = useParams();
    const batchId = params.batchId as string;

    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (!batchId) return;

        fetch(`/api/records?batchId=${batchId}&limit=1000`) // Fetching up to 1000 for MVP
            .then((res) => res.json())
            .then((resData) => {
                if (resData.data && Array.isArray(resData.data)) {
                    const rawData = resData.data.map((r: any) => ({ id: r.id, data: r.data }));
                    setData(rawData);
                    setFilteredData(rawData);

                    if (rawData.length > 0) {
                        setColumns(Object.keys(rawData[0].data || {}));
                    }
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [batchId]);

    // Edit / Delete state
    const [editingRow, setEditingRow] = useState<any | null>(null);
    const [savingEdit, setSavingEdit] = useState(false);

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this record? This cannot be undone.')) return;
        try {
            const res = await fetch(`/api/records?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
            if (res.ok) {
                setData((d) => d.filter((r) => r.id !== id));
                setFilteredData((d) => d.filter((r) => r.id !== id));
            } else {
                alert('Failed to delete');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to delete');
        }
    };

    const handleSaveEdit = async (updated: any) => {
        setSavingEdit(true);
        try {
            const res = await fetch('/api/records', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: updated.id, data: updated.data }) });
            if (res.ok) {
                // update local
                setData((d) => d.map((r) => r.id === updated.id ? updated : r));
                setFilteredData((d) => d.map((r) => r.id === updated.id ? updated : r));
                setEditingRow(null);
            } else {
                alert('Failed to save');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to save');
        } finally {
            setSavingEdit(false);
        }
    };

    useEffect(() => {
        if (!search) {
            setFilteredData(data);
            return;
        }

        const lowerSearch = search.toLowerCase();
        const filtered = data.filter((row) => {
            return Object.values(row.data || {}).some((val) =>
                String(val).toLowerCase().includes(lowerSearch)
            );
        });
        setFilteredData(filtered);
    }, [search, data]);

    const handleDownload = (format: 'csv' | 'xlsx') => {
        window.location.href = `/api/export?batchId=${batchId}&format=${format}`;
    };

    return (
        <div className="container mx-auto py-10 max-w-7xl">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/data">
                    <Button variant="ghost" size="icon">
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Dataset View</h1>
                    <p className="text-muted-foreground">
                        {loading ? "Loading..." : `${filteredData.length} records found`}
                    </p>
                </div>
                <div className="ml-auto flex gap-2">
                    <Button variant="outline" onClick={() => handleDownload('csv')}>
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Button>
                    <Button variant="outline" onClick={() => handleDownload('xlsx')}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Excel
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search all columns..."
                                className="pl-8"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : (
                        <div className="rounded-md border overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">SR. No</th>
                                        {columns.map((col) => (
                                            <th key={col} className="px-4 py-3 font-medium whitespace-nowrap">
                                                {col}
                                            </th>
                                        ))}
                                        <th className="px-4 py-3 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                    {filteredData.slice(0, 100).map((row, i) => (
                                        <motion.tr key={row.id || i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} className="border-b last:border-0 hover:bg-muted/20">
                                            <td className="px-4 py-2 whitespace-nowrap">{i + 1}</td>
                                            {columns.map((col) => (
                                                <td key={col} className="px-4 py-2 whitespace-nowrap max-w-[200px] truncate" title={String(row.data[col])}>
                                                    {String(row.data[col])}
                                                </td>
                                            ))}
                                            <td className="px-4 py-2 whitespace-nowrap">
                                                <div className="flex gap-2 items-center">
                                                    <Button size="sm" variant="ghost" onClick={() => setEditingRow(row)}>Edit</Button>
                                                    <Button size="sm" variant="destructive" onClick={() => handleDelete(row.id)}>Delete</Button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                    </AnimatePresence>
                                    {filteredData.length > 100 && (
                                        <tr>
                                            <td colSpan={columns.length + 2} className="px-4 py-4 text-center text-muted-foreground">
                                                Showing first 100 of {filteredData.length} records. Export to see all.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>

                {/* Edit Modal */}
                <AnimatePresence>
                    {editingRow && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/40" onClick={() => setEditingRow(null)} />
                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 z-10">
                                <h3 className="text-lg font-bold mb-4">Edit Record</h3>
                                <div className="grid grid-cols-2 gap-4 mb-4 max-h-[60vh] overflow-y-auto">
                                    {columns.map((col) => (
                                        <div key={col}>
                                            <label className="text-sm font-medium">{col}</label>
                                            <Input value={String(editingRow.data[col] ?? '')} onChange={(e) => setEditingRow((r:any)=> ({ ...r, data: { ...r.data, [col]: e.target.value } }))} />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setEditingRow(null)}>Cancel</Button>
                                    <Button onClick={() => handleSaveEdit(editingRow)} disabled={savingEdit}>
                                        {savingEdit ? 'Saving...' : 'Save'}
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
        </div>
    );
}
