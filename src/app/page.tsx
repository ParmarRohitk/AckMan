"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Database, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import React, { useEffect } from "react";

export default function Home() {
  return (
    <>
      <div className="relative w-full min-h-screen overflow-hidden cursor-none">
        <main className="relative w-full min-h-screen flex items-center justify-center px-4 pt-24">
          {/* Animated Background Blobs */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -left-40 w-80 h-80 rounded-full filter blur-3xl opacity-40"
            style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.5), transparent 70%)' }}
            animate={{ x: [0, 30, -20, 0], y: [0, -40, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full filter blur-3xl opacity-30"
            style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.4), transparent 70%)' }}
            animate={{ x: [0, -40, 20, 0], y: [0, 30, -40, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Calculator Cursor */}
          <FloatingIcons />

          {/* Content */}
          <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-bold">
                  <span className="bg-linear-to-r from-purple-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">Smart Audit</span>
                  <br />
                  <span className="bg-linear-to-r from-purple-300 to-blue-400 bg-clip-text text-transparent">Compliance Made Easy</span>
                </h1>
                <p className="text-xl text-slate-300">fast, secure, and reliable</p>
              </div>

              <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                Upload CSV or Excel files, map columns, and analyze records with powerful filters and exports. Built for auditors who need speed and clarity.
              </p>

              {/* CTA Buttons */}
              <motion.div
                className="flex gap-4 flex-wrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/upload">
                    <Button
                      size="lg"
                      className="gap-2 bg-slate-900 hover:bg-slate-800 shadow-lg text-base px-6 py-3"
                    >
                      <Upload className="w-5 h-5" /> Upload Data
                    </Button>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/data">
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 text-base px-6 py-3 border-slate-300 hover:bg-slate-100"
                    >
                      <Database className="w-5 h-5" /> View Datasets
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="grid grid-cols-3 gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
              >
                <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="rounded-lg border border-slate-200 bg-white/80 p-4 text-center">
                    <div className="text-2xl font-bold text-slate-900">5+</div>
                    <div className="text-sm text-slate-500">Datasets</div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="rounded-lg border border-slate-200 bg-white/80 p-4 text-center">
                    <div className="text-2xl font-bold text-slate-900">2.3k</div>
                    <div className="text-sm text-slate-500">Records</div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="rounded-lg border border-slate-200 bg-white/80 p-4 text-center">
                    <div className="text-2xl font-bold text-slate-900">120</div>
                    <div className="text-sm text-slate-500">Exports</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Section - Preview Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-200/30 to-purple-200/30 rounded-2xl blur-2xl" />

              <motion.div
                whileHover={{ y: -10 }}
                className="relative w-full max-w-md"
              >
                <Card className="shadow-2xl border-slate-200/50 bg-white/95 backdrop-blur-sm">
                  <CardHeader className="bg-linear-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                    <CardTitle className="text-slate-900">Preview — sample-audit-data.csv</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-2 px-2 font-semibold text-slate-600">Txn ID</th>
                            <th className="text-left py-2 px-2 font-semibold text-slate-600">Date</th>
                            <th className="text-left py-2 px-2 font-semibold text-slate-600">Dept</th>
                            <th className="text-left py-2 px-2 font-semibold text-slate-600">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 px-2 text-slate-900">TXN001</td>
                            <td className="py-3 px-2 text-slate-600">2024-01-15</td>
                            <td className="py-3 px-2 text-slate-600">HR</td>
                            <td className="py-3 px-2 text-slate-900 font-semibold">8,500</td>
                          </tr>
                          <tr className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="py-3 px-2 text-slate-900">TXN002</td>
                            <td className="py-3 px-2 text-slate-600">2024-01-16</td>
                            <td className="py-3 px-2 text-slate-600">IT</td>
                            <td className="py-3 px-2 text-slate-900 font-semibold">22,000</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="py-3 px-2 text-slate-900">TXN003</td>
                            <td className="py-3 px-2 text-slate-600">2024-01-17</td>
                            <td className="py-3 px-2 text-slate-600">Finance</td>
                            <td className="py-3 px-2 text-slate-900 font-semibold">18,700</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Floating Icon */}
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-blue-400 rounded-full flex items-center justify-center shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Calculator className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}

function FloatingIcons() {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = React.useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setShowCursor(true);
    };

    const handleMouseLeave = () => {
      setShowCursor(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50">
      {showCursor && (
        <motion.div
          className="absolute"
          animate={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
          transition={{ duration: 0.05, ease: "easeOut" }}
          style={{ x: "-50%", y: "-50%" }}
        >
          <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <Calculator className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
