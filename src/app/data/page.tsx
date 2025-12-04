"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Calendar, FileText, Trash, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Batch {
    id: string;
    name: string;
    filename: string;
    createdAt: string;
    _count: {
        records: number;
    };
}

export default function DataIndexPage() {
    const [batches, setBatches] = useState<Batch[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

    useEffect(() => {
        fetch("/api/batches")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setBatches(data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="container mx-auto py-10 max-w-5xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">My Datasets</h1>
                    <p className="text-muted-foreground">Select a dataset to view and filter.</p>
                </div>
                <Link href="/upload">
                    <Button>New Upload</Button>
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-20">Loading...</div>
            ) : batches.length === 0 ? (
                <Card className="text-center py-20">
                    <CardContent>
                        <Database className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No datasets found</h3>
                        <p className="text-muted-foreground mb-6">Upload your first file to get started.</p>
                        <Link href="/upload">
                            <Button>Upload File</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div>
                    <div className="flex items-center justify-end mb-4 gap-2">
                        <Button variant={viewMode === 'cards' ? 'default' : 'outline'} onClick={() => setViewMode('cards')}>Cards</Button>
                        <Button variant={viewMode === 'table' ? 'default' : 'outline'} onClick={() => setViewMode('table')}>Table</Button>
                    </div>

                    {viewMode === 'cards' ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {batches.map((batch) => (
                                <Link key={batch.id} href={`/data/${batch.id}`}>
                                    <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="flex justify-between items-start">
                                                <span className="truncate" title={batch.name}>{batch.name}</span>
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-1">
                                                <FileText className="w-3 h-3" />
                                                {batch.filename}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between items-center text-sm text-muted-foreground mt-4">
                                                <div className="flex items-center gap-1">
                                                    <Database className="w-3 h-3" />
                                                    {batch._count.records} records
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {format(new Date(batch.createdAt), 'MMM d, yyyy')}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-md border overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">SR. No</th>
                                        <th className="px-4 py-3 font-medium">Name</th>
                                        <th className="px-4 py-3 font-medium">Filename</th>
                                        <th className="px-4 py-3 font-medium">Records</th>
                                        <th className="px-4 py-3 font-medium">Created</th>
                                        <th className="px-4 py-3 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {batches.map((batch, i) => (
                                            <motion.tr key={batch.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="border-b last:border-0 hover:bg-muted/20">
                                                <td className="px-4 py-3">{i + 1}</td>
                                                <td className="px-4 py-3">{batch.name}</td>
                                                <td className="px-4 py-3 text-muted-foreground">{batch.filename}</td>
                                                <td className="px-4 py-3">{batch._count.records}</td>
                                                <td className="px-4 py-3">{format(new Date(batch.createdAt), 'MMM d, yyyy')}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex gap-2">
                                                        <Link href={`/data/${batch.id}`} className="inline-flex items-center gap-2 px-2 py-1 rounded hover:bg-muted/20">
                                                            <Eye className="w-4 h-4" /> View
                                                        </Link>
                                                        <button className="inline-flex items-center gap-2 px-2 py-1 rounded text-red-600 hover:bg-red-50" onClick={async ()=>{
                                                            if (!confirm('Delete this dataset and all its records?')) return;
                                                            try {
                                                                const res = await fetch(`/api/batches?id=${encodeURIComponent(batch.id)}`, { method: 'DELETE' });
                                                                if (res.ok) {
                                                                    setBatches((b) => b.filter((x) => x.id !== batch.id));
                                                                } else {
                                                                    alert('Delete failed');
                                                                }
                                                            } catch (err) { console.error(err); alert('Delete failed'); }
                                                        }}>
                                                            <Trash className="w-4 h-4" /> Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
