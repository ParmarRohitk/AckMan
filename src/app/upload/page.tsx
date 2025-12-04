"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Check, ArrowRight, Loader2, FileSpreadsheet } from "lucide-react";

export default function UploadPage() {
    const [step, setStep] = useState(1);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [previewData, setPreviewData] = useState<any[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const [datasetName, setDatasetName] = useState("");
    const [saving, setSaving] = useState(false);
    const [saveProgress, setSaveProgress] = useState<{done:number,total:number}>({done:0,total:0});
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            // Auto-set dataset name from filename
            setDatasetName(e.target.files[0].name.split('.')[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (res.ok) {
                setColumns(data.columns);
                setPreviewData(data.data); // Using full data for now as per API decision
                setStep(2);
            } else {
                alert(data.error || "Upload failed");
            }
        } catch (error) {
            console.error(error);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!datasetName) return;
        setSaving(true);
        setSaveProgress({done:0,total:0});

        try {
            // Send data in chunks to /api/save-chunk
            const CHUNK_SIZE = 500; // tune as needed
            const total = Math.ceil(previewData.length / CHUNK_SIZE);
            setSaveProgress({ done: 0, total });

            let batchId: string | undefined = undefined;

            for (let i = 0; i < previewData.length; i += CHUNK_SIZE) {
                const chunk = previewData.slice(i, i + CHUNK_SIZE);

                const res: Response = await fetch('/api/save-chunk', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ filename: file?.name, name: datasetName, rows: chunk, batchId }),
                });

                if (!res.ok) {
                    let msg = 'Failed to save chunk';
                    try {
                        const err = await res.json();
                        if (err?.details) msg += `: ${err.details}`;
                        else if (err?.error) msg += `: ${err.error}`;
                    } catch (e) {
                        // ignore
                    }
                    throw new Error(msg);
                }

                const data = await res.json();
                batchId = data.batchId ?? batchId;
                setSaveProgress((p) => ({ done: Math.min(p.done + 1, total), total }));
            }

            router.push('/data');
        } catch (error) {
            console.error(error);
            alert("Failed to save data");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container mx-auto py-10 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Upload Data</h1>
                <p className="text-muted-foreground">Follow the steps to import your dataset.</p>
            </div>

            <div className="grid gap-8">
                {/* Progress Steps */}
                <div className="flex items-center justify-between relative mb-8">
                    <div className="absolute left-0 top-1/2 w-full h-1 bg-muted -z-10" />
                    {[1, 2].map((s) => (
                        <div
                            key={s}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                }`}
                        >
                            {step > s ? <Check className="w-5 h-5" /> : s}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Select File</CardTitle>
                                    <CardDescription>Upload an Excel (.xlsx) or CSV file.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors">
                                        <FileSpreadsheet className="w-12 h-12 text-muted-foreground mb-4" />
                                        <Input
                                            type="file"
                                            accept=".csv, .xlsx, .xls"
                                            onChange={handleFileChange}
                                            className="max-w-xs mb-2"
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Drag and drop or click to browse
                                        </p>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button onClick={handleUpload} disabled={!file || uploading}>
                                            {uploading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Next Step
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Review & Save</CardTitle>
                                    <CardDescription>
                                        Found {previewData.length} rows and {columns.length} columns.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Dataset Name</label>
                                        <Input
                                            value={datasetName}
                                            onChange={(e) => setDatasetName(e.target.value)}
                                            placeholder="e.g. Q1 Financials"
                                        />
                                    </div>

                                    <div className="border rounded-md overflow-hidden">
                                        <div className="bg-muted px-4 py-2 border-b text-sm font-medium">
                                            Preview (First 5 rows)
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm text-left">
                                                <thead className="bg-muted/50">
                                                    <tr>
                                                        {columns.map((col) => (
                                                            <th key={col} className="px-4 py-2 font-medium">{col}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {previewData.slice(0, 5).map((row, i) => (
                                                        <tr key={i} className="border-b last:border-0 hover:bg-muted/20">
                                                            {columns.map((col) => (
                                                                <td key={col} className="px-4 py-2">{row[col]}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                                        <Button onClick={handleSave} disabled={!datasetName || saving}>
                                            {saving ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    Save Dataset
                                                    <Check className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
