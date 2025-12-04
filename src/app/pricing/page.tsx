'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
    viewport: { once: true, amount: 0.3 }
  };

  const plans = [
    {
      name: 'Starter',
      price: '29',
      desc: 'Perfect for small teams',
      features: [
        'Up to 5 users',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'CSV exports'
      ]
    },
    {
      name: 'Professional',
      price: '99',
      desc: 'For growing organizations',
      featured: true,
      features: [
        'Up to 50 users',
        '500GB storage',
        'Advanced analytics',
        'Priority support',
        'API access',
        'Custom reports',
        'Role-based access'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      desc: 'Large-scale operations',
      features: [
        'Unlimited users',
        'Unlimited storage',
        'White-label options',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <motion.div className="max-w-4xl mx-auto text-center" {...fadeInUp}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h1>
          <p className="text-xl text-slate-300">
            Choose the perfect plan for your audit needs. No hidden fees.
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -10 }}
                className={`rounded-2xl p-8 transition-all ${
                  plan.featured
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl scale-105'
                    : 'bg-slate-800/50 backdrop-blur shadow-lg hover:shadow-xl border border-slate-700/50'
                }`}
              >
                <h3 className={`text-2xl font-bold mb-2 ${!plan.featured && 'text-white'}`}>
                  {plan.name}
                </h3>
                <p className={`mb-6 ${plan.featured ? 'text-blue-100' : 'text-slate-300'}`}>
                  {plan.desc}
                </p>

                <div className="mb-8">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price !== 'Custom' && <span className={plan.featured ? 'text-blue-100' : 'text-slate-600'}>/month</span>}
                </div>

                <Link href="/signup">
                  <button
                    className={`w-full py-3 rounded-lg font-semibold mb-8 transition-colors ${
                      plan.featured
                        ? 'bg-white text-blue-600 hover:bg-slate-100'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Get Started
                  </button>
                </Link>

                <ul className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 ${plan.featured ? 'text-blue-200' : 'text-blue-600'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-transparent">
        <div className="max-w-4xl mx-auto">
          <motion.h2 className="text-4xl font-bold text-center mb-12 text-white" {...fadeInUp}>
            Frequently Asked Questions
          </motion.h2>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              {
                q: 'Can I change plans later?',
                a: 'Yes, upgrade or downgrade your plan anytime. Changes take effect on your next billing cycle.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, bank transfers, and annual prepayment options for discounts.'
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! Get 14 days free on any plan. No credit card required to start.'
              },
              {
                q: 'What about data security?',
                a: 'We use enterprise-grade encryption, regular security audits, and comply with GDPR, HIPAA, and SOC 2.'
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700/50"
              >
                <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-slate-300">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
