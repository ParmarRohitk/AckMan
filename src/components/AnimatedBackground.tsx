"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
    const { scrollY } = useScroll();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Parallax transforms for different layers with more dramatic effects
    const y1 = useTransform(scrollY, [0, 2000], [0, 400]);
    const y2 = useTransform(scrollY, [0, 2000], [0, -300]);
    const y3 = useTransform(scrollY, [0, 2000], [0, 200]);
    const y4 = useTransform(scrollY, [0, 2000], [0, -150]);
    const rotate1 = useTransform(scrollY, [0, 2000], [0, 90]);
    const rotate2 = useTransform(scrollY, [0, 2000], [0, -60]);
    const opacity1 = useTransform(scrollY, [0, 500, 1000], [0.3, 0.5, 0.2]);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 -z-50 overflow-hidden">
            {/* Base gradient background with multiple layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/20 via-transparent to-cyan-950/20" />

            {/* Animated dot grid pattern */}
            <div className="absolute inset-0 bg-dot-pattern opacity-[0.15]" />

            {/* Animated line grid pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />

            {/* Large primary gradient orbs with parallax */}
            <motion.div
                className="absolute -top-1/3 -left-1/4 w-[800px] h-[800px] rounded-full opacity-40 blur-[100px]"
                style={{
                    y: y1,
                    rotate: rotate1,
                    opacity: opacity1,
                    background: "radial-gradient(circle, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.4), transparent 65%)",
                }}
                animate={{
                    scale: [1, 1.25, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute top-1/4 -right-1/3 w-[900px] h-[900px] rounded-full opacity-35 blur-[120px]"
                style={{
                    y: y2,
                    rotate: rotate2,
                    background: "radial-gradient(circle, rgba(168, 85, 247, 0.5), rgba(59, 130, 246, 0.35), transparent 65%)",
                }}
                animate={{
                    scale: [1, 1.35, 1],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                }}
            />

            <motion.div
                className="absolute bottom-0 left-1/4 w-[700px] h-[700px] rounded-full opacity-30 blur-[90px]"
                style={{
                    y: y3,
                    background: "radial-gradient(circle, rgba(6, 182, 212, 0.5), rgba(59, 130, 246, 0.3), transparent 65%)",
                }}
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2.5,
                }}
            />

            {/* Medium floating orbs */}
            <motion.div
                className="absolute top-1/3 left-1/2 w-[400px] h-[400px] rounded-full opacity-25 blur-[80px]"
                style={{
                    y: y4,
                    background: "radial-gradient(circle, rgba(236, 72, 153, 0.45), rgba(168, 85, 247, 0.3), transparent 70%)",
                }}
                animate={{
                    x: [0, 120, -80, 0],
                    y: [0, -100, 80, 0],
                    scale: [1, 1.25, 0.95, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full opacity-30 blur-[70px]"
                style={{
                    background: "radial-gradient(circle, rgba(34, 211, 238, 0.5), rgba(59, 130, 246, 0.3), transparent 70%)",
                }}
                animate={{
                    x: [0, -100, 120, 0],
                    y: [0, 120, -80, 0],
                    scale: [1, 0.9, 1.15, 1],
                }}
                transition={{
                    duration: 16,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4,
                }}
            />

            {/* Small accent orbs */}
            <motion.div
                className="absolute top-2/3 left-1/3 w-[200px] h-[200px] rounded-full opacity-20 blur-[60px]"
                style={{
                    background: "radial-gradient(circle, rgba(251, 191, 36, 0.4), transparent 70%)",
                }}
                animate={{
                    x: [0, 60, -40, 0],
                    y: [0, -50, 40, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 13,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />

            <motion.div
                className="absolute top-1/2 right-1/2 w-[180px] h-[180px] rounded-full opacity-25 blur-[50px]"
                style={{
                    background: "radial-gradient(circle, rgba(139, 92, 246, 0.45), transparent 70%)",
                }}
                animate={{
                    x: [0, -70, 50, 0],
                    y: [0, 70, -50, 0],
                    scale: [1, 0.85, 1.1, 1],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 6,
                }}
            />

            {/* Radial gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-950/40 to-slate-950/80" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-transparent to-slate-950/60" />

            {/* Noise texture overlay for grain effect */}
            <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light" />
        </div>
    );
}
