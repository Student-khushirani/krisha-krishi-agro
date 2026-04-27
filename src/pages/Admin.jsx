import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2, FiPackage, FiSettings, FiX, FiCheck } from 'react-icons/fi';
import { GiFarmTractor } from 'react-icons/gi';
import { useApp } from '../context/AppContext';
import { getImageUrl, formatPrice } from '../utils/helpers';

const adminTabs = [
  { id: 'tractors', label: 'Tractors', icon: <GiFarmTractor /> },
  { id: 'machinery', label: 'Machinery', icon: <FiSettings /> },
  { id: 'orders', label: 'Orders', icon: <FiPackage /> },
];

export default function Admin() {
  const { tractors, machinery, orders, addTractor, addMachinery, deleteTractor, deleteMachinery, updateOrderStatus } = useApp();
  const [activeTab, setActiveTab] = useState('tractors');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '', brand: 'Mahindra', price: '', hp: '', engine: '', description: '',
    imageKey: 'tractor1', category: 'Standard', type: 'Rotavator',
    features: '', compatibility: '', weight: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddTractor = (e) => {
    e.preventDefault();
    addTractor({
      ...formData,
      price: Number(formData.price),
      hp: Number(formData.hp),
      features: formData.features.split(',').map(f => f.trim()).filter(Boolean)
    });
    setShowAddForm(false);
    setFormData({ name: '', brand: 'Mahindra', price: '', hp: '', engine: '', description: '', imageKey: 'tractor1', category: 'Standard', type: 'Rotavator', features: '', compatibility: '', weight: '' });
  };

  const handleAddMachinery = (e) => {
    e.preventDefault();
    addMachinery({
      ...formData,
      price: Number(formData.price),
      features: formData.features.split(',').map(f => f.trim()).filter(Boolean)
    });
    setShowAddForm(false);
  };

  const inputClass = "w-full px-5 py-4 rounded-xl bg-gray-50 border-none text-gray-900 font-bold placeholder-gray-400 focus:ring-2 focus:ring-[#b30000]/20 transition-all text-sm";

  return (
    <div className="pt-28 lg:pt-36 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-[#b30000] font-black uppercase tracking-widest text-xs mb-3">Management Center</h2>
              <h1 className="font-display text-4xl sm:text-5xl font-black text-gray-900 uppercase leading-none">
                Admin <span className="text-gray-400">Portal</span>
              </h1>
           </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          {adminTabs.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setShowAddForm(false); }}
              className={`flex items-center gap-3 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all border-2 ${
                activeTab === tab.id 
                  ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white shadow-lg shadow-black/20' 
                  : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* TRACTORS TAB */}
        {activeTab === 'tractors' && (
          <div>
            <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{tractors.length} active units in inventory</p>
              <button onClick={() => setShowAddForm(!showAddForm)} className="btn-primary py-3 px-8 text-xs">
                {showAddForm ? <><FiX /> Cancel Action</> : <><FiPlus /> Register Tractor</>}
              </button>
            </div>
            
            {showAddForm && (
              <motion.form initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onSubmit={handleAddTractor} className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 mb-10">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-gray-100">Add New Inventory Unit</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <input name="name" placeholder="Unit Model Name *" required value={formData.name} onChange={handleChange} className={inputClass} />
                  <input name="brand" placeholder="Brand Name" value={formData.brand} onChange={handleChange} className={inputClass} />
                  <input name="price" type="number" placeholder="Unit Price (₹) *" required value={formData.price} onChange={handleChange} className={inputClass} />
                  <input name="hp" type="number" placeholder="Horsepower (HP)" value={formData.hp} onChange={handleChange} className={inputClass} />
                  <input name="engine" placeholder="Engine Specifications" value={formData.engine} onChange={handleChange} className={inputClass} />
                  <input name="category" placeholder="Unit Category" value={formData.category} onChange={handleChange} className={inputClass} />
                  <select name="imageKey" value={formData.imageKey} onChange={handleChange} className={inputClass}>
                    {[1,2,3,4,5].map(i => <option key={i} value={`tractor${i}`}>Stock Image {i}</option>)}
                  </select>
                  <input name="features" placeholder="Key Features (comma separated)" value={formData.features} onChange={handleChange} className={`${inputClass} lg:col-span-2`} />
                </div>
                <textarea name="description" placeholder="Technical Description" value={formData.description} onChange={handleChange} rows="3" className={`${inputClass} mt-6 resize-none`} />
                <button type="submit" className="btn-primary w-full mt-8 py-5 flex items-center justify-center gap-3">Register to Inventory <FiCheck /></button>
              </motion.form>
            )}

            <div className="grid gap-4">
              {tractors.map(t => (
                <div key={t._id} className="bg-white rounded-2xl p-4 flex items-center gap-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50">
                     <img src={getImageUrl(t.imageKey)} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black text-[#b30000] uppercase tracking-widest mb-0.5">{t.brand}</p>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight truncate">{t.name}</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{t.hp} HP Unit</p>
                  </div>
                  <div className="text-right px-6">
                     <p className="text-sm font-black text-gray-900">{formatPrice(t.price)}</p>
                  </div>
                  <button onClick={() => deleteTractor(t._id)} className="p-3 rounded-xl bg-red-50 text-[#b30000] hover:bg-[#b30000] hover:text-white transition-all"><FiTrash2 size={18} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MACHINERY TAB */}
        {activeTab === 'machinery' && (
          <div>
            <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{machinery.length} specialized implements registered</p>
              <button onClick={() => setShowAddForm(!showAddForm)} className="btn-primary py-3 px-8 text-xs">
                {showAddForm ? <><FiX /> Cancel Action</> : <><FiPlus /> Register Machinery</>}
              </button>
            </div>

            {showAddForm && (
              <motion.form initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} onSubmit={handleAddMachinery} className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 mb-10">
                <h3 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-8 pb-4 border-b border-gray-100">Register New Specialized Equipment</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <input name="name" placeholder="Equipment Model Name *" required value={formData.name} onChange={handleChange} className={inputClass} />
                  <select name="type" value={formData.type} onChange={handleChange} className={inputClass}>
                    {['Rotavator','Cultivator','Plough','Seed Drill','Trailer'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <input name="price" type="number" placeholder="Equipment Price (₹) *" required value={formData.price} onChange={handleChange} className={inputClass} />
                  <input name="compatibility" placeholder="Tractor Compatibility" value={formData.compatibility} onChange={handleChange} className={inputClass} />
                  <input name="weight" placeholder="Operational Weight" value={formData.weight} onChange={handleChange} className={inputClass} />
                  <select name="imageKey" value={formData.imageKey} onChange={handleChange} className={inputClass}>
                    {['rotavator','cultivator','plough','seed-drill','trailer'].map(k => <option key={k} value={k}>{k.replace('-',' ').toUpperCase()}</option>)}
                  </select>
                  <input name="features" placeholder="Core Features (comma separated)" value={formData.features} onChange={handleChange} className={`${inputClass} lg:col-span-3`} />
                </div>
                <textarea name="description" placeholder="Technical Specifications" value={formData.description} onChange={handleChange} rows="3" className={`${inputClass} mt-6 resize-none`} />
                <button type="submit" className="btn-primary w-full mt-8 py-5 flex items-center justify-center gap-3">Register Equipment <FiCheck /></button>
              </motion.form>
            )}

            <div className="grid gap-4">
              {machinery.map(m => (
                <div key={m._id} className="bg-white rounded-2xl p-4 flex items-center gap-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                   <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-50">
                     <img src={getImageUrl(m.imageKey)} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black text-[#b30000] uppercase tracking-widest mb-0.5">{m.type}</p>
                    <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight truncate">{m.name}</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{m.weight || 'Standard Weight'}</p>
                  </div>
                  <div className="text-right px-6">
                     <p className="text-sm font-black text-gray-900">{formatPrice(m.price)}</p>
                  </div>
                  <button onClick={() => deleteMachinery(m._id)} className="p-3 rounded-xl bg-red-50 text-[#b30000] hover:bg-[#b30000] hover:text-white transition-all"><FiTrash2 size={18} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
               <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{orders.length} processing order requests</p>
            </div>
            
            {orders.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-3xl border border-gray-100">
                 <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No incoming order requests</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {orders.map(order => (
                  <div key={order._id} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group">
                     <div className="absolute right-0 top-0 w-32 h-32 bg-[#b30000] opacity-5 -skew-x-12 translate-x-1/2 -translate-y-1/2" />
                     <div className="flex flex-wrap items-start justify-between gap-10">
                        <div className="flex-1 min-w-[300px]">
                           <div className="flex items-center gap-3 mb-4">
                              <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                              }`}>{order.status || 'Pending Verification'}</span>
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Order #{order._id.slice(-6).toUpperCase()}</span>
                           </div>
                           <h3 className="font-display font-black text-2xl text-gray-900 uppercase tracking-tight mb-6">{order.productName}</h3>
                           
                           <div className="grid sm:grid-cols-2 gap-y-6 gap-x-10">
                              <OrderField label="Customer" value={order.customerName} />
                              <OrderField label="Contact" value={order.phone} />
                              <OrderField label="Address" value={order.address} />
                              <OrderField label="Payment" value={order.paymentMethod.toUpperCase()} />
                           </div>
                        </div>

                        <div className="flex flex-col items-end justify-between self-stretch">
                           <div className="text-right">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Transaction Value</p>
                              <p className="text-2xl font-black text-[#b30000]">{formatPrice(order.price)}</p>
                           </div>
                           
                           <div className="mt-8">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 text-right">Update Order State</p>
                              <select
                                value={order.status || 'Pending'}
                                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                className="px-6 py-3 rounded-xl bg-gray-50 border-none text-gray-900 font-bold uppercase text-[10px] tracking-widest focus:ring-2 focus:ring-[#b30000]/20 transition-all cursor-pointer shadow-sm"
                              >
                                <option value="Pending">Pending Review</option>
                                <option value="Confirmed">Confirm Order</option>
                                <option value="Delivered">Mark Delivered</option>
                                <option value="Cancelled">Cancel Order</option>
                              </select>
                           </div>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function OrderField({ label, value }) {
  return (
    <div>
      <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider mb-1">{label}</p>
      <p className="text-sm font-bold text-gray-800 leading-relaxed">{value}</p>
    </div>
  );
}
