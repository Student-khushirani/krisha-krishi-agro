import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { getImageUrl, formatPrice } from '../utils/helpers';

export default function ProductDetails() {
  const { type, id } = useParams();
  const { tractors, machinery, addToWishlist, wishlist } = useApp();

  const products = type === 'tractor' ? tractors : machinery;
  const product = products.find(p => p._id === id);

  if (!product) {
    return (
      <div className="pt-36 pb-20 min-h-screen text-center">
        <p className="text-gray-400 text-lg">Product not found</p>
        <Link to="/" className="btn-primary mt-4 inline-block">Go Home</Link>
      </div>
    );
  }

  const isWishlisted = wishlist.some(w => w.productId === product._id);

  return (
    <div className="pt-32 lg:pt-40 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to={type === 'tractor' ? '/inventory' : '/machinery'}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#b30000] mb-8 transition-colors font-bold uppercase text-xs tracking-widest"
        >
          <FiArrowLeft /> Back to {type === 'tractor' ? 'Tractors' : 'Machinery'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-40"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
              <img
                src={getImageUrl(product.imageKey)}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-1 bg-[#b30000]"></span>
              <span className="text-[#b30000] font-black uppercase tracking-widest text-xs">{product.category || product.type || 'Premium Range'}</span>
            </div>

            <h1 className="font-display text-4xl lg:text-6xl font-black text-gray-900 mb-4 uppercase tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-[#b30000] text-3xl font-black">{formatPrice(product.price)}</span>
              <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">* Ex-Showroom Price</span>
            </div>

            <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">{product.description}</p>

            {/* Specifications Grid */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100">
              <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-6 pb-4 border-b border-gray-200 flex items-center gap-3">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                {product.hp && (
                  <>
                    <SpecItem label="Horsepower" value={`${product.hp} HP`} />
                    <SpecItem label="Engine Type" value={product.engine} />
                    <SpecItem label="Fuel Type" value={product.fuelType} />
                    <SpecItem label="Transmission" value={product.transmission} />
                    <SpecItem label="Lift Capacity" value={product.liftCapacity} />
                    <SpecItem label="Warranty" value={product.warranty} />
                  </>
                )}
                {product.compatibility && (
                  <>
                    <SpecItem label="Compatibility" value={product.compatibility} />
                    <SpecItem label="Weight" value={product.weight} />
                    <SpecItem label="Mount Type" value="Three-Point Hitch" />
                  </>
                )}
              </div>
            </div>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-6">Key Performance Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-600 font-bold text-sm bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <FiCheckCircle className="text-[#b30000]" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Actions */}
            <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
              <Link
                to={`/checkout/${type}/${product._id}`}
                className="btn-primary flex-1 min-w-[200px] justify-center text-lg"
              >
                <FiShoppingBag /> Proceed to Purchase
              </Link>
              <button
                onClick={() => addToWishlist(product)}
                className={`flex items-center gap-3 px-8 py-4 rounded-lg font-black uppercase tracking-widest text-xs transition-all border-2 ${
                  isWishlisted
                    ? 'bg-[#b30000] border-[#b30000] text-white shadow-lg shadow-red-500/20'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-[#b30000] hover:text-[#b30000]'
                }`}
              >
                <FiHeart fill={isWishlisted ? 'currentColor' : 'none'} size={16} />
                {isWishlisted ? 'Saved' : 'Save for Later'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SpecItem({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] uppercase font-black text-gray-400 tracking-wider mb-1">{label}</span>
      <span className="text-sm font-bold text-gray-800">{value || 'N/A'}</span>
    </div>
  );
}
