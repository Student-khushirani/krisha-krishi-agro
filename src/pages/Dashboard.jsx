import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiPackage, FiUser, FiTrash2, FiMapPin, FiPhone } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { getImageUrl, formatPrice } from '../utils/helpers';

const tabs = [
  { id: 'wishlist', label: 'Wishlist', icon: <FiHeart /> },
  { id: 'orders', label: 'My Orders', icon: <FiPackage /> },
  { id: 'profile', label: 'Account', icon: <FiUser /> },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('wishlist');
  const { wishlist, orders, removeFromWishlist, user } = useApp();

  return (
    <div className="pt-28 lg:pt-36 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 bg-[#1a1a1a] p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
           <div className="absolute right-0 top-0 w-1/3 h-full bg-[#b30000] opacity-10 -skew-x-12 translate-x-1/2" />
           <div className="relative z-10">
              <h2 className="text-[#b30000] font-black uppercase tracking-widest text-xs mb-3">Customer Dashboard</h2>
              <h1 className="font-display text-4xl sm:text-5xl font-black uppercase leading-none">
                Hello, <span className="text-gray-400">{user?.name?.split(' ')[0] || 'Farmer'}</span>
              </h1>
           </div>
           <div className="flex gap-4 relative z-10">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center min-w-[100px]">
                 <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Orders</p>
                 <p className="text-xl font-black text-[#b30000]">{orders.length}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center min-w-[100px]">
                 <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Wishlist</p>
                 <p className="text-xl font-black text-white">{wishlist.length}</p>
              </div>
           </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all border-2 ${
                activeTab === tab.id 
                  ? 'bg-[#b30000] border-[#b30000] text-white shadow-lg shadow-red-500/20' 
                  : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {/* Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.length === 0 ? (
                <EmptyState icon={<FiHeart />} message="No machines in your wishlist yet." />
              ) : (
                wishlist.map(item => (
                  <motion.div key={item._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                    <div className="relative h-48 rounded-xl overflow-hidden mb-5">
                      <img src={getImageUrl(item.imageKey)} alt={item.productName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-3 right-3">
                         <button onClick={() => removeFromWishlist(item._id)} className="p-2.5 rounded-lg bg-red-50 text-[#b30000] hover:bg-[#b30000] hover:text-white transition-all shadow-sm">
                            <FiTrash2 size={16} />
                         </button>
                      </div>
                    </div>
                    <p className="text-[10px] font-black text-[#b30000] uppercase tracking-widest mb-1">{item.productType}</p>
                    <h3 className="font-display font-black text-lg text-gray-900 uppercase tracking-tight mb-4 truncate">{item.productName}</h3>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                       <p className="font-black text-gray-900">{formatPrice(item.price)}</p>
                       <Link to={`/product/${item.productType}/${item.productId}`} className="btn-primary py-2 px-5 text-[10px]">Buy Now</Link>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <EmptyState icon={<FiPackage />} message="You haven't placed any orders yet." />
              ) : (
                orders.map(order => (
                  <motion.div key={order._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#b30000]" />
                    <div className="flex flex-wrap items-center justify-between gap-8">
                      <div className="flex gap-6 items-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center text-[#b30000] text-3xl">
                           <FiPackage />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Order Summary</p>
                           <h3 className="font-display font-black text-2xl text-gray-900 uppercase tracking-tight">{order.productName}</h3>
                           <p className="text-sm font-bold text-[#b30000] mt-1">{formatPrice(order.price)}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                         <OrderStat label="Status" value={order.status || 'Pending'} isStatus />
                         <OrderStat label="Payment" value={order.paymentMethod === 'upi' ? 'Online' : 'Cash'} />
                         <OrderStat label="Date" value={new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} />
                         <div className="flex items-center">
                            <Link to={`/contact`} className="px-5 py-2 rounded-lg bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#b30000] transition-all">Support</Link>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="grid lg:grid-cols-3 gap-8">
               <div className="lg:col-span-1 bg-white rounded-3xl p-10 shadow-sm border border-gray-100 text-center">
                  <div className="w-24 h-24 bg-gray-900 text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl">
                     <FiUser />
                  </div>
                  <h3 className="font-display font-black text-2xl text-gray-900 uppercase tracking-tight mb-2">{user?.name}</h3>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-8">{user?.email}</p>
                  <button className="btn-outline w-full py-4 text-[10px]">Edit Account Profile</button>
               </div>

               <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
                     <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-gray-100">Contact Information</h4>
                     <div className="grid sm:grid-cols-2 gap-8">
                        <div className="flex gap-4">
                           <FiPhone className="text-[#b30000] mt-1" />
                           <div>
                              <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Phone Number</p>
                              <p className="font-bold text-gray-800">+91 {user?.phone || 'Not Provided'}</p>
                           </div>
                        </div>
                        <div className="flex gap-4">
                           <FiMapPin className="text-[#b30000] mt-1" />
                           <div>
                              <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Default Address</p>
                              <p className="font-bold text-gray-800">{user?.address || 'Set your primary delivery address'}</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="bg-red-50 rounded-3xl p-10 border border-red-100">
                     <h4 className="text-xs font-black text-[#b30000] uppercase tracking-[0.2em] mb-4">Account Security</h4>
                     <p className="text-gray-600 font-medium text-sm mb-6">Want to update your password or secure your account? Head over to security settings.</p>
                     <button className="btn-primary py-3 px-8 text-[10px]">Manage Security</button>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OrderStat({ label, value, isStatus }) {
  return (
    <div>
      <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider mb-1">{label}</p>
      <p className={`text-sm font-black uppercase tracking-tight ${
        isStatus 
          ? (value === 'Delivered' ? 'text-green-600' : value === 'Cancelled' ? 'text-red-600' : 'text-orange-500')
          : 'text-gray-900'
      }`}>{value}</p>
    </div>
  );
}

function EmptyState({ icon, message }) {
  return (
    <div className="col-span-full py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100 text-center">
       <div className="text-4xl text-gray-200 mb-4 flex justify-center">{icon}</div>
       <p className="text-gray-400 font-black uppercase tracking-widest text-sm">{message}</p>
       <Link to="/inventory" className="btn-outline mt-8 py-3 px-10 text-[10px]">Start Exploring</Link>
    </div>
  );
}
