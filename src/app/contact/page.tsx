'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
    viewport: { once: true, amount: 0.3 }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <motion.div className="max-w-4xl mx-auto text-center" {...fadeInUp}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
          <p className="text-xl text-slate-300">
            Have questions? We'd love to hear from you. Contact our team.
          </p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              { icon: Mail, title: 'Email', value: 'hello@audiit.com', link: 'mailto:hello@audiit.com' },
              { icon: Phone, title: 'Phone', value: '+1 (555) 123-4567', link: 'tel:+15551234567' },
              { icon: MapPin, title: 'Location', value: 'San Francisco, CA', link: '#' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <a href={item.link} className="bg-slate-800/50 backdrop-blur rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center border border-slate-700/50">
                  <item.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-300">{item.value}</p>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2, delayChildren: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Left Side */}
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl font-bold mb-6 text-slate-900">Send us a Message</h2>
              <p className="text-lg text-slate-300 mb-8">
                Fill out the form and we'll get back to you as soon as possible. We typically respond within 24 hours.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-white mb-2">Response Time</h3>
                  <p className="text-slate-300">Average: 24 hours</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Support Hours</h3>
                  <p className="text-slate-300">Monday - Friday, 9 AM - 6 PM PST</p>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">For Urgent Issues</h3>
                  <p className="text-slate-300">Call us at +1 (555) 123-4567</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              {...fadeInUp}
              className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 shadow-xl border border-slate-700/50"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-600 bg-slate-900/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-600 bg-slate-900/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-600 bg-slate-900/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-slate-600 bg-slate-900/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Social Section */}
      <section className="py-20 px-4 bg-transparent">
        <motion.div className="max-w-4xl mx-auto text-center" {...fadeInUp}>
          <h2 className="text-3xl font-bold mb-8 text-white">Connect With Us</h2>
          <div className="flex justify-center gap-6">
            {['Twitter', 'LinkedIn', 'Facebook', 'GitHub'].map((social, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold hover:shadow-lg transition-shadow"
              >
                {social[0]}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
