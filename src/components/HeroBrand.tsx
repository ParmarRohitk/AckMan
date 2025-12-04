'use client';

import { motion } from 'framer-motion';

export default function HeroBrand() {
  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-950">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute -top-96 -right-96 h-96 rounded-full bg-red-600 blur-3xl opacity-25"
        animate={{
          y: [0, 40, 0],
          x: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-96 -left-96 w-96 h-96 rounded-full bg-blue-600 blur-3xl opacity-25"
        animate={{
          y: [0, -40, 0],
          x: [0, -30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500 blur-3xl opacity-15"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          {/* Animated gradient background behind text */}
          <motion.div
            className="absolute inset-0 -z-10 left-1/2 -translate-x-1/2"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage: "linear-gradient(-45deg, #ff0000, #ff6b6b, #ff0000, #ff6b6b)",
              backgroundSize: "200% 200%",
              filter: "blur(40px)",
              opacity: 0.2,
              width: "800px",
              height: "400px",
            }}
          />

          <div className="relative">
            <h1 className="text-8xl md:text-9xl lg:text-[10rem] font-black leading-none tracking-tighter mb-6">
              <motion.span
                className="inline-block bg-linear-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                AckMan
              </motion.span>
            </h1>
          </div>

          {/* Tagline with animation */}
          <motion.p
            className="text-xl md:text-2xl text-slate-300 font-light tracking-wide max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Smart audit and compliance software for modern enterprise teams
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
