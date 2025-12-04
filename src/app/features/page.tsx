'use client';

import { motion } from 'framer-motion';
import { Upload, Lock, Zap, BarChart3, Users, FileText, Settings, Link as LinkIcon } from 'lucide-react';

export default function FeaturesPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
    viewport: { once: true, amount: 0.3 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    viewport: { once: true, amount: 0.3 }
  };

  const features = [
    {
      icon: Upload,
      title: 'Easy Data Upload',
      desc: 'Upload CSV and Excel files with smart column mapping and validation'
    },
    {
      icon: Lock,
      title: 'Role-Based Access',
      desc: 'Control who sees what with granular permission management'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      desc: 'Process thousands of records in seconds with optimized performance'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      desc: 'Deep dive into data with powerful filters and custom reports'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      desc: 'Real-time collaboration tools for seamless teamwork'
    },
    {
      icon: FileText,
      title: 'Export Reports',
      desc: 'Generate professional reports and export in multiple formats'
    },
    {
      icon: Settings,
      title: 'Customizable',
      desc: 'Tailor workflows and dashboards to your unique needs'
    },
    {
      icon: LinkIcon,
      title: 'Integration Ready',
      desc: 'Connect with your favorite tools and platforms'
    }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <motion.div className="max-w-4xl mx-auto text-center" {...fadeInUp}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h1>
          <p className="text-xl text-slate-300">
            Everything you need to manage audits efficiently and securely.
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            {...staggerContainer}
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                whileHover={{ y: -5 }}
                className="group bg-slate-800/50 backdrop-blur rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-slate-700/50"
              >
                <feature.icon className="w-10 h-10 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto space-y-20">
          {/* Feature 1 */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" {...fadeInUp}>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-white">Smart Data Processing</h2>
              <p className="text-lg text-slate-300 mb-4 leading-relaxed">
                Automatically detect and validate data formats. Map columns intelligently and catch errors before they become problems.
              </p>
              <ul className="space-y-2">
                {['Auto column detection', 'Data validation', 'Error reporting'].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-300">
                    <span className="text-blue-400 font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <motion.div
              className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-8 h-64 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
            >
              <Upload className="w-24 h-24 text-blue-400 opacity-50" />
            </motion.div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" {...fadeInUp}>
            <motion.div
              className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-8 h-64 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
            >
              <Lock className="w-24 h-24 text-purple-400 opacity-50" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-white">Enterprise Security</h2>
              <p className="text-lg text-slate-300 mb-4 leading-relaxed">
                Enterprise-grade encryption, compliance with major standards, and comprehensive audit logs for complete transparency.
              </p>
              <ul className="space-y-2">
                {['End-to-end encryption', 'GDPR compliant', 'Audit logs'].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-300">
                    <span className="text-blue-400 font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" {...fadeInUp}>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-white">Advanced Analytics</h2>
              <p className="text-lg text-slate-300 mb-4 leading-relaxed">
                Visualize your data with interactive charts, custom reports, and real-time dashboards. Find insights faster.
              </p>
              <ul className="space-y-2">
                {['Custom dashboards', 'Real-time reports', 'Data visualization'].map((item, i) => (
                  <li key={i} className="flex gap-3 text-slate-300">
                    <span className="text-blue-400 font-bold">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <motion.div
              className="bg-gradient-to-br from-green-100 to-blue-100 rounded-xl p-8 h-64 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
            >
              <BarChart3 className="w-24 h-24 text-green-400 opacity-50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <motion.div
          {...fadeInUp}
          className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">Experience the Difference</h2>
          <p className="text-lg mb-8 opacity-90">Start your free trial and see how AuditIT can transform your workflow.</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors">
            Try for Free
          </button>
        </motion.div>
      </section>
    </div>
  );
}
