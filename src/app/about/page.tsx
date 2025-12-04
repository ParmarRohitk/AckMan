'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Users, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
    viewport: { once: true, amount: 0.3 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    viewport: { once: true, amount: 0.3 }
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                About AckMan
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Transforming audit workflows with intelligent data management and seamless collaboration tools built for modern auditors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
            <p className="text-lg text-slate-300 mb-4 leading-relaxed">
              We believe audit professionals deserve tools that work as hard as they do. AuditIT simplifies complex data workflows, enabling auditors to focus on insights rather than manual data handling.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              Our platform combines powerful analytics, role-based access control, and collaborative features into one elegant solution.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-50" />
            <div className="relative bg-slate-900/70 backdrop-blur rounded-2xl p-8 shadow-xl border border-slate-700/50">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Fast & Efficient</h3>
                    <p className="text-slate-400 text-sm">Process audits 10x faster</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Secure & Reliable</h3>
                    <p className="text-slate-400 text-sm">Enterprise-grade security</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Collaborative</h3>
                    <p className="text-slate-400 text-sm">Work seamlessly with your team</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-4xl font-bold text-center mb-12 text-white" {...fadeInUp}>
            Our Core Values
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            {...staggerContainer}
          >
            {[
              { icon: Zap, title: 'Innovation', desc: 'Constantly evolving to meet modern audit needs' },
              { icon: Shield, title: 'Security', desc: 'Protection is paramount for sensitive data' },
              { icon: Users, title: 'Collaboration', desc: 'Better together—team-first design' },
              { icon: CheckCircle, title: 'Excellence', desc: 'Quality in every feature and detail' }
            ].map((value, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 hover:shadow-lg transition-shadow border border-slate-700/50"
              >
                <value.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-slate-300">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="text-4xl font-bold text-white mb-4">Built by Auditors, For Auditors</h2>
            <p className="text-lg text-slate-300">Our team brings decades of combined experience in audit, accounting, and enterprise software.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            {...staggerContainer}
          >
            {[
              { name: 'Sarah Chen', role: 'Founder & CEO', exp: '15+ years in audit' },
              { name: 'Michael Torres', role: 'CTO', exp: '12+ years in software' },
              { name: 'Emma Roberts', role: 'Head of Product', exp: '10+ years in UX' }
            ].map((member, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                className="bg-slate-800/50 backdrop-blur rounded-xl p-6 text-center hover:shadow-xl transition-shadow border border-slate-700/50"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4" />
                <h3 className="font-semibold text-white text-lg">{member.name}</h3>
                <p className="text-blue-400 font-medium mb-2">{member.role}</p>
                <p className="text-slate-400 text-sm">{member.exp}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          {...fadeInUp}
          className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Audit Workflow?</h2>
          <p className="text-lg mb-8 opacity-90">Join hundreds of audit teams using AuditIT to work smarter.</p>
          <Link href="/signup">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
              Get Started Free
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
