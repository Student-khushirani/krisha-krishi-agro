import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiUser, FiMessageSquare, FiSend, FiCheckCircle, FiPhone, FiMapPin } from 'react-icons/fi';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setSubmitted(true); 
    }
  };

  return (
    <div className="pt-28 lg:pt-36 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Info Side */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
             <h2 className="text-[#b30000] font-black uppercase tracking-widest text-xs mb-3">Get In Touch</h2>
             <h1 className="font-display text-4xl lg:text-6xl font-black text-gray-900 uppercase leading-none mb-8">
               How Can We <br /><span className="text-gray-400">Help You?</span>
             </h1>
             <p className="text-gray-500 font-medium text-lg leading-relaxed mb-12 max-w-md">
               Have a question about our tractors, financing, or need technical support? Our team of experts is ready to assist you.
             </p>

             <div className="space-y-8">
               <ContactItem icon={<FiPhone />} title="Call for Support" detail="+91 12345 67890" />
               <ContactItem icon={<FiMail />} title="Email Inquiry" detail="support@krishakrishi.com" />
               <ContactItem icon={<FiMapPin />} title="Visit Showroom" detail="Plot No. 23, Market Yard, Pune, MH" />
             </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50 rounded-3xl p-8 lg:p-12 border border-gray-100"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle className="text-4xl text-green-500" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">Message Sent!</h2>
                <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">We will contact you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-10 btn-outline w-full"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase font-black text-gray-400 tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b30000]" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border-none text-gray-900 font-bold placeholder-gray-400 focus:ring-2 focus:ring-[#b30000]/20 transition-all shadow-sm"
                      placeholder="Your Full Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-black text-gray-400 tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b30000]" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border-none text-gray-900 font-bold placeholder-gray-400 focus:ring-2 focus:ring-[#b30000]/20 transition-all shadow-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-black text-gray-400 tracking-wider mb-2">Message / Problem</label>
                  <div className="relative">
                    <FiMessageSquare className="absolute top-5 left-4 text-[#b30000]" />
                    <textarea
                      name="message"
                      required
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-white border-none text-gray-900 font-bold placeholder-gray-400 focus:ring-2 focus:ring-[#b30000]/20 transition-all shadow-sm resize-none"
                      placeholder="Describe your query..."
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-5 flex items-center justify-center gap-3 mt-4"
                >
                  Send Inquiry <FiSend />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, title, detail }) {
  return (
    <div className="flex gap-5 items-center">
      <div className="w-14 h-14 bg-[#1a1a1a] text-[#b30000] flex items-center justify-center rounded-2xl text-xl shadow-lg">
        {icon}
      </div>
      <div>
        <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider mb-0.5">{title}</p>
        <p className="text-lg font-black text-gray-900">{detail}</p>
      </div>
    </div>
  );
}
