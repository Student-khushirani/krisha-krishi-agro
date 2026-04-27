import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiAward, FiCheckCircle } from 'react-icons/fi';
import { GiFarmTractor, GiFarmer } from 'react-icons/gi';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { getImageUrl } from '../utils/helpers';

const stats = [
  { icon: <GiFarmTractor />, value: '500+', label: 'Tractors Sold' },
  { icon: <GiFarmer />, value: '1200+', label: 'Happy Farmers' },
  { icon: <FiShield />, value: '2 Years', label: 'Warranty' },
  { icon: <FiAward />, value: '15+', label: 'Years Experience' },
];

export default function Home() {
  const { tractors, machinery, loading } = useApp();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0">
          <img
            src={getImageUrl('tractor1')}
            alt="Premium Tractor"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-12 h-1 bg-[#b30000]"></span>
              <span className="text-[#b30000] font-black uppercase tracking-widest text-sm">Official Mahindra Partner</span>
            </div>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] uppercase mb-8">
              Power Meets<br />
              <span className="text-[#b30000]">Performance</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-xl font-medium">
              Tackle the toughest terrains with advanced engineering. Explore our range of high-performance tractors designed for the modern farmer.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/inventory" className="btn-primary text-lg">
                Explore Tractors <FiArrowRight />
              </Link>
              <Link to="/machinery" className="btn-secondary text-lg border border-white/20">
                View Machinery
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Stat - Desktop */}
        <div className="absolute bottom-12 right-12 hidden xl:block">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex items-center gap-6 border-l-8 border-[#b30000]">
            <div className="text-4xl text-[#b30000]"><GiFarmer /></div>
            <div>
              <p className="text-3xl font-black text-gray-900">1200+</p>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Trusted Farmers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-100 py-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center justify-center gap-4 text-gray-600 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="text-3xl text-[#b30000]">{stat.icon}</div>
                <div>
                  <p className="text-xl font-black text-gray-900 leading-none">{stat.value}</p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tractors */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[#b30000] font-black uppercase tracking-widest text-sm mb-4">Our Premium Lineup</h2>
              <h3 className="font-display text-4xl sm:text-5xl font-black text-gray-900 uppercase leading-none">
                Featured <span className="text-gray-400">Tractors</span>
              </h3>
            </div>
            <Link to="/inventory" className="btn-outline flex items-center gap-2 group">
              View All Inventory <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(n => <div key={n} className="h-96 bg-gray-100 animate-pulse rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {tractors.slice(0, 3).map(tractor => (
                <ProductCard key={tractor._id} product={tractor} type="tractor" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#1a1a1a] text-white section-padding overflow-hidden relative">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#b30000] opacity-5 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[#b30000] font-black uppercase tracking-widest text-sm mb-4">Why Krisha Krishi?</h2>
              <h3 className="font-display text-4xl sm:text-6xl font-black mb-8 uppercase leading-tight">
                More Than Just<br />A Dealership
              </h3>
              <div className="space-y-6">
                {[
                  { title: 'Best Price Guarantee', desc: 'We offer the most competitive prices in the region with transparent pricing.' },
                  { title: 'Certified Service', desc: 'Expert technicians trained directly by Mahindra for your tractor maintenance.' },
                  { title: 'Easy Financing', desc: 'Hassle-free loan processing with minimal documentation and quick approval.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 text-[#b30000] text-xl"><FiCheckCircle /></div>
                    <div>
                      <h4 className="text-lg font-bold uppercase tracking-wide mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary mt-10">Get Expert Advice</Link>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-[#b30000] rounded-3xl rotate-3" />
               <img 
                src={getImageUrl('tractor2')} 
                alt="Support" 
                className="relative rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover h-[500px] w-full"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Farm Machinery */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[#b30000] font-black uppercase tracking-widest text-sm mb-4">Advanced Equipment</h2>
              <h3 className="font-display text-4xl sm:text-5xl font-black text-gray-900 uppercase leading-none">
                Farm <span className="text-gray-400">Machinery</span>
              </h3>
            </div>
            <Link to="/machinery" className="btn-outline flex items-center gap-2 group">
              View All Machinery <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(n => <div key={n} className="h-96 bg-gray-100 animate-pulse rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {machinery.slice(0, 3).map(item => (
                <ProductCard key={item._id} product={item} type="machinery" />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
