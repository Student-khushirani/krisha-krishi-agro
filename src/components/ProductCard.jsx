import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiArrowRight } from 'react-icons/fi';
import { getImageUrl, formatPrice } from '../utils/helpers';
import { useApp } from '../context/AppContext';

export default function ProductCard({ product, type = 'tractor' }) {
  const { addToWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.some(w => w.productId === product._id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="premium-card group"
    >
      <Link to={`/product/${type}/${product._id}`} className="block">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden bg-gray-100 image-zoom-container">
          <img
            src={getImageUrl(product.imageKey)}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToWishlist(product); }}
            className={`absolute top-4 right-4 p-2.5 rounded-full shadow-lg transition-all z-10 ${
              isWishlisted ? 'bg-[#b30000] text-white' : 'bg-white/90 text-gray-400 hover:text-[#b30000]'
            }`}
          >
            <FiHeart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>

          {/* Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#1a1a1a] text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b30000] animate-pulse"></span>
              {product.category || product.type || 'Premium'}
            </span>
          </div>

          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-display font-black text-xl text-gray-900 uppercase tracking-tight line-clamp-1 flex-1">{product.name}</h3>
          </div>
          
          {/* Specs */}
          <div className="flex flex-wrap gap-4 mb-6">
            {product.hp && (
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Horsepower</span>
                <span className="text-sm font-bold text-gray-700">{product.hp} HP</span>
              </div>
            )}
            {product.fuelType && (
              <div className="flex flex-col border-l border-gray-200 pl-4">
                <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Fuel Type</span>
                <span className="text-sm font-bold text-gray-700">{product.fuelType}</span>
              </div>
            )}
            {product.compatibility && (
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Compatibility</span>
                <span className="text-sm font-bold text-gray-700">{product.compatibility}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider mb-0.5">Ex-Showroom Price</span>
              <span className="text-[#b30000] font-black text-xl">{formatPrice(product.price)}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-[#b30000] group-hover:text-white transition-colors">
              <FiArrowRight size={20} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
