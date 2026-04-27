import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function Inventory() {
  const { tractors, loading } = useApp();
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const brands = useMemo(() => [...new Set(tractors.map(t => t.brand))], [tractors]);

  const filtered = useMemo(() => {
    return tractors.filter(t => {
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
      const matchBrand = !brandFilter || t.brand === brandFilter;
      let matchPrice = true;
      if (priceRange === 'under5') matchPrice = t.price < 500000;
      else if (priceRange === '5to8') matchPrice = t.price >= 500000 && t.price <= 800000;
      else if (priceRange === '8to10') matchPrice = t.price >= 800000 && t.price <= 1000000;
      else if (priceRange === 'above10') matchPrice = t.price > 1000000;
      return matchSearch && matchBrand && matchPrice;
    });
  }, [tractors, search, brandFilter, priceRange]);

  return (
    <div className="pt-28 lg:pt-36 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-[#b30000] font-black uppercase tracking-widest text-xs mb-3">Tractor Inventory</h2>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-gray-900 uppercase leading-none">
              Powerful <span className="text-gray-400">Machines</span>
            </h1>
          </motion.div>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em] mb-1">
            Showing {filtered.length} of {tractors.length} results
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tractors by name, power, or model..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-xl bg-gray-50 border-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#b30000]/20 transition-all font-medium"
            />
          </div>
          
          <div className="flex gap-4 w-full lg:w-auto">
            <select
              value={brandFilter}
              onChange={e => setBrandFilter(e.target.value)}
              className="flex-1 lg:w-48 px-5 py-4 rounded-xl bg-gray-50 border-none text-gray-700 font-bold uppercase text-[11px] tracking-widest focus:ring-2 focus:ring-[#b30000]/20"
            >
              <option value="">All Brands</option>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>

            <select
              value={priceRange}
              onChange={e => setPriceRange(e.target.value)}
              className="flex-1 lg:w-48 px-5 py-4 rounded-xl bg-gray-50 border-none text-gray-700 font-bold uppercase text-[11px] tracking-widest focus:ring-2 focus:ring-[#b30000]/20"
            >
              <option value="">Price Range</option>
              <option value="under5">Under ₹5 Lakh</option>
              <option value="5to8">₹5 - 8 Lakh</option>
              <option value="8to10">₹8 - 10 Lakh</option>
              <option value="above10">Above ₹10 Lakh</option>
            </select>

            {(search || brandFilter || priceRange) && (
              <button 
                onClick={() => { setSearch(''); setBrandFilter(''); setPriceRange(''); }}
                className="p-4 rounded-xl bg-red-50 text-[#b30000] hover:bg-[#b30000] hover:text-white transition-all"
              >
                <FiX />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map(n => <div key={n} className="h-[450px] bg-white animate-pulse rounded-2xl border border-gray-100" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="text-gray-300 text-3xl" />
            </div>
            <p className="text-gray-400 text-lg font-bold uppercase tracking-widest">No matching machines found</p>
            <button onClick={() => { setBrandFilter(''); setPriceRange(''); setSearch(''); }} className="btn-primary mt-6">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map(tractor => (
              <ProductCard key={tractor._id} product={tractor} type="tractor" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
