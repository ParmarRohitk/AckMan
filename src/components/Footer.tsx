'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Facebook, Youtube } from 'lucide-react';
import HeroBrand from './HeroBrand';

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

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="relative w-full bg-slate-950 overflow-hidden">
      <HeroBrand />

      {/* Large animated blur effects - Enhanced */}
      <motion.div
        className="absolute -top-96 -right-96 w-96 h-96 rounded-full bg-red-600 blur-3xl opacity-25"
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

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-20">
        <motion.div
          className="grid grid-cols-4 gap-12 mb-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="col-span-1">

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
                  whileHover={{ scale: 1.2, rotate: 8 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                  title={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-6 text-xs uppercase tracking-widest">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Career', href: '#' },
                { name: 'Case Studies', href: '#' },
                { name: 'Contact Us', href: '/contact' },
              ].map((link, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-red-500 text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-6 text-xs uppercase tracking-widest">
              Support
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'FAQ', href: '#' },
                { name: 'Documentation', href: '#' },
                { name: 'Tutorial', href: '#' },
                { name: 'Support', href: '#' },
              ].map((link, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-red-500 text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Policies */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-6 text-xs uppercase tracking-widest">
              Legal Policies
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Terms & Conditions', href: '#' },
                { name: 'Privacy Policy', href: '#' },
                { name: 'Refund Policy', href: '#' },
                { name: 'GDPR Compliance', href: '#' },
                { name: 'Affiliate Policy', href: '#' },
              ].map((link, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-red-500 text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section with CTA */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={itemVariants} className="text-slate-400 text-sm">
            Copyright © {currentYear} <span className="text-white font-semibold">AckMan</span>. All rights reserved.
          </motion.p>

          {/* Quick Links */}
          <motion.div
            className="flex gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { name: 'Login', href: '/login' },
              { name: 'Dashboard', href: '/dashboard' },
              { name: 'Features', href: '/features' },
              { name: 'Pricing', href: '/pricing' },
            ].map((link, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Link
                  href={link.href}
                  className="text-slate-400 hover:text-red-500 text-xs uppercase tracking-widest transition-colors duration-300 font-medium"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
