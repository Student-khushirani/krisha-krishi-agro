import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';
import { useApp } from '../context/AppContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useApp();

  const returnUrl = location.state?.from || '/';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/signup';
      const payload = isLogin ? { email: formData.email, password: formData.password } : formData;
      
      const response = await axios.post(endpoint, payload);
      
      if (response.data.token) {
        loginUser(response.data.user, response.data.token);
        navigate(returnUrl, { replace: true });
      }
    } catch (err) {
      console.error('Auth Error:', err.response?.data);
      setError(err.response?.data?.error || 'Authentication failed. Please try again.');
      
      // Fallback for demo
      if (!err.response) {
        const demoUser = { id: 'u1', name: formData.name || 'Demo User', email: formData.email };
        loginUser(demoUser, 'demo-token');
        navigate(returnUrl, { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 lg:pt-40 pb-20 min-h-screen flex items-center justify-center px-4 bg-gray-50 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#b30000] opacity-5 -skew-x-12 translate-x-1/2" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-[#1a1a1a] p-10 text-center">
            <h2 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <div className="flex justify-center gap-2">
              <span className="w-8 h-1 bg-[#b30000]"></span>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Krisha Krishi Agro</span>
            </div>
          </div>

          <div className="p-10">
            {error && (
              <div className="bg-red-50 text-[#b30000] p-4 rounded-xl text-xs font-bold uppercase tracking-wider mb-8 border-l-4 border-[#b30000]">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-[10px] uppercase font-black text-gray-400 tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b30000]" />
                    <input 
                      type="text" 
                      name="name" 
                      required={!isLogin}
                      value={formData.name} 
                      onChange={handleChange}
                      placeholder="Enter your name" 
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none text-gray-900 placeholder-gray-400 font-bold focus:ring-2 focus:ring-[#b30000]/20 transition-all"
                    />
                  </div>
                </div>
              )}

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
                    placeholder="you@example.com" 
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none text-gray-900 placeholder-gray-400 font-bold focus:ring-2 focus:ring-[#b30000]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-black text-gray-400 tracking-wider mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b30000]" />
                  <input 
                    type="password" 
                    name="password" 
                    required 
                    value={formData.password} 
                    onChange={handleChange}
                    placeholder="••••••••" 
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none text-gray-900 placeholder-gray-400 font-bold focus:ring-2 focus:ring-[#b30000]/20 transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full py-5 flex items-center justify-center gap-3 disabled:opacity-70 mt-4"
              >
                {loading ? 'Processing...' : (
                  <>
                    {isLogin ? 'Sign In Now' : 'Join the Club'} <FiArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                {isLogin ? "New to Krisha Krishi?" : "Already a partner?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#b30000] ml-2 hover:underline"
                >
                  {isLogin ? 'Register Here' : 'Login Here'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
