import React from 'react';
import { Link } from 'react-router-dom';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import { GiWheat } from 'react-icons/gi';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand & Mission */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-8 group">
              <div className="w-12 h-12 rounded-lg bg-[#b30000] flex items-center justify-center transition-transform group-hover:rotate-12">
                <GiWheat className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="font-display text-xl font-black uppercase tracking-tight">Krisha Krishi</h3>
                <p className="text-[10px] text-[#b30000] font-bold uppercase tracking-[0.2em] -mt-1">Agro Dealership</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
              Empowering farmers with high-performance Mahindra tractors and cutting-edge agricultural machinery since 2008. Your success is our mission.
            </p>
            <div className="flex gap-4">
              {[FiFacebook, FiInstagram, FiTwitter, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#b30000] hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Our Products */}
          <div>
            <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#b30000] mb-8">Our Lineup</h4>
            <div className="space-y-4">
              <Link to="/inventory" className="block text-sm text-gray-400 hover:text-white transition-colors">Tractors Range</Link>
              <Link to="/machinery" className="block text-sm text-gray-400 hover:text-white transition-colors">Farm Implements</Link>
              <Link to="/inventory" className="block text-sm text-gray-400 hover:text-white transition-colors">Compact Series</Link>
              <Link to="/machinery" className="block text-sm text-gray-400 hover:text-white transition-colors">Power Tillers</Link>
              <Link to="/inventory" className="block text-sm text-gray-400 hover:text-white transition-colors">Used Equipment</Link>
            </div>
          </div>

          {/* Quick Support */}
          <div>
            <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#b30000] mb-8">Quick Links</h4>
            <div className="space-y-4">
              <Link to="/dashboard" className="block text-sm text-gray-400 hover:text-white transition-colors">My Account</Link>
              <Link to="/contact" className="block text-sm text-gray-400 hover:text-white transition-colors">Book a Service</Link>
              <Link to="/contact" className="block text-sm text-gray-400 hover:text-white transition-colors">Spare Parts</Link>
              <Link to="/contact" className="block text-sm text-gray-400 hover:text-white transition-colors">Loan Assistance</Link>
              <Link to="/admin" className="block text-sm text-gray-400 hover:text-white transition-colors">Partner Portal</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-display text-xs font-black uppercase tracking-[0.2em] text-[#b30000] mb-8">Get In Touch</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-[#b30000]"><FiPhone size={20} /></div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-500 mb-1">Sales Inquiry</p>
                  <p className="text-sm font-bold text-white tracking-wide">+91 12345 67890</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-[#b30000]"><FiMail size={20} /></div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-500 mb-1">Send Email</p>
                  <p className="text-sm font-bold text-white tracking-wide">sales@krishakrishi.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-[#b30000]"><FiMapPin size={20} /></div>
                <div>
                  <p className="text-[10px] uppercase font-black text-gray-500 mb-1">Dealership Address</p>
                  <p className="text-sm font-bold text-white leading-relaxed">
                    Plot No. 23, Agricultural Market Yard, Pune - 411001, Maharashtra
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            © {new Date().getFullYear()} Krisha Krishi Agro Dealership.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] uppercase font-black text-gray-500 hover:text-[#b30000] transition-colors tracking-widest">Privacy Policy</a>
            <a href="#" className="text-[10px] uppercase font-black text-gray-500 hover:text-[#b30000] transition-colors tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
