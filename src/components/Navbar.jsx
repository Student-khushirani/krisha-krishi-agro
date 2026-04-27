import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser, FiSettings, FiLogOut, FiPhone } from 'react-icons/fi';
import { GiFarmTractor } from 'react-icons/gi';
import { useApp } from '../context/AppContext';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/inventory', label: 'Tractors' },
  { path: '/machinery', label: 'Machinery' },
  { path: '/contact', label: 'Support' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logoutUser, wishlist } = useApp();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Banner */}
      <div className="bg-[#b30000] text-white py-2 px-4 text-center overflow-hidden">
        <motion.p 
          animate={{ x: [20, -20, 20] }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          className="text-[10px] font-black uppercase tracking-[0.3em]"
        >
          Limited Time: Get 10% Down Payment on All Mahindra Tractors 🚜
        </motion.p>
      </div>

      <nav className={`transition-all duration-500 ${
        scrolled ? 'bg-white shadow-2xl py-4' : 'bg-white/80 backdrop-blur-md py-6'
      } border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-[#1a1a1a] flex items-center justify-center group-hover:bg-[#b30000] transition-all duration-300 shadow-lg shadow-black/10">
                <GiFarmTractor className="text-white text-2xl" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-display text-xl font-black text-gray-900 leading-none uppercase tracking-tighter">Krisha Krishi</h1>
                <p className="text-[9px] text-[#b30000] font-black tracking-[0.2em] uppercase mt-1">Industrial Agro</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${
                    location.pathname === link.path ? 'text-[#b30000]' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-6 mr-6 border-r border-gray-100 pr-6">
                <div className="flex items-center gap-2">
                  <FiPhone className="text-[#b30000]" />
                  <span className="text-[10px] font-black text-gray-900 tracking-wider">+91 12345 67890</span>
                </div>
              </div>

              {user ? (
                <div className="flex items-center gap-2">
                  <Link to="/dashboard" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#b30000] hover:text-white transition-all relative">
                    <FiUser size={18} />
                    {wishlist && wishlist.length > 0 && (
                       <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#b30000] text-white text-[8px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                         {wishlist.length}
                       </span>
                    )}
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#1a1a1a] hover:text-white transition-all">
                      <FiSettings size={18} />
                    </Link>
                  )}
                  <button onClick={handleLogout} className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#b30000] hover:bg-[#b30000] hover:text-white transition-all">
                    <FiLogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link to="/auth" className="btn-primary text-[10px] px-6 py-3">
                  Partner Login
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600"
              >
                {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-4 rounded-xl text-xs font-black uppercase tracking-widest ${
                    location.pathname === link.path ? 'bg-red-50 text-[#b30000]' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <Link
                  to="/auth"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-4 rounded-xl text-[#b30000] font-black uppercase tracking-widest bg-red-50"
                >
                  Join as Partner
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
