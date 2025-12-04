'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative w-full bg-slate-950 overflow-hidden">
      {/* Large animated blur effects like reference */}
      <motion.div
        className="absolute -top-96 -right-96 w-96 h-96 rounded-full bg-blue-600 blur-3xl opacity-20"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-96 -left-96 w-96 h-96 rounded-full bg-cyan-500 blur-3xl opacity-20"
        animate={{
          y: [0, -30, 0],
          x: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <motion.div
          className="grid grid-cols-5 gap-16 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="col-span-1">
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h2 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                  AckMan
                </span>
              </h2>
            </motion.div>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed max-w-xs">
              Enterprise audit and compliance software built for modern teams. Smart solutions for complex audits.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Youtube, href: '#', label: 'YouTube' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Mail, href: '#', label: 'Email' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-4">
              {['About Us', 'Career', 'Case Studies', 'Contact Us'].map((link, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-4">
              {['FAQ', 'Documentation', 'Tutorial', 'Support'].map((link, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Policies */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
              Legal Policies
            </h3>
            <ul className="space-y-4">
              {['Terms & Conditions', 'Privacy Policy', 'Refund Policy', 'GDPR Compliance', 'Affiliate Policy'].map((link, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    href="#"
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-16"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Large Brand Name */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-7xl md:text-8xl font-black text-red-500 leading-none tracking-tighter">
            AckMan
          </h1>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={itemVariants} className="text-slate-400 text-sm">
            Copyright © {currentYear} <span className="text-white font-semibold">AckMan</span> – Smart audit and compliance software for modern business
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
