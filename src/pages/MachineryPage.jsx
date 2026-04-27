import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const types = ['All', 'Rotavator', 'Cultivator', 'Plough', 'Seed Drill', 'Trailer'];

export default function MachineryPage() {
  const { machinery, loading } = useApp();
  const [activeType, setActiveType] = useState('All');

  const filtered = useMemo(() => {
    if (activeType === 'All') return machinery;
    return machinery.filter(m => m.type === activeType);
  }, [machinery, activeType]);

  return (
    <div className="pt-28 lg:pt-36 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-[#b30000] font-black uppercase tracking-widest text-xs mb-3">Farm Implements</h2>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-gray-900 uppercase leading-none">
              High-Tech <span className="text-gray-400">Machinery</span>
            </h1>
          </motion.div>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mb-1">
            Showing {filtered.length} equipment types
          </p>
        </div>

        {/* Type Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-6 py-3 rounded-lg text-xs font-black uppercase tracking-[0.1em] transition-all border-2 ${
                activeType === type
                  ? 'bg-[#b30000] border-[#b30000] text-white shadow-lg shadow-red-500/20'
                  : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200 hover:text-gray-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3].map(n => <div key={n} className="h-96 bg-white animate-pulse rounded-2xl border border-gray-100" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-gray-100">
             <p className="text-gray-400 font-bold uppercase tracking-widest">No machinery found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map(item => (
              <ProductCard key={item._id} product={item} type="machinery" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
