import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiCheck, FiUpload, FiUser, FiPhone, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { getImageUrl, formatPrice } from '../utils/helpers';

export default function Checkout() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { tractors, machinery, placeOrder, user } = useApp();
  const [step, setStep] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '', phone: '', address: '',
    paymentMethod: 'upi', idProofFile: null, idProofName: '',
    paymentPlan: 'full', downPayment: 0, emiDuration: 12
  });

  const products = type === 'tractor' ? tractors : machinery;
  const product = products.find(p => p._id === id);

  const totalPrice = product ? product.price : 0;
  const remainingAmount = totalPrice - (formData.paymentPlan === 'installment' ? Number(formData.downPayment || 0) : totalPrice);
  const monthlyEmi = formData.paymentPlan === 'installment' ? Math.round(remainingAmount / formData.emiDuration) : 0;

  if (!user) {
    return (
      <div className="pt-40 pb-20 min-h-screen text-center">
        <h2 className="text-2xl font-black text-gray-900 mb-4">Authentication Required</h2>
        <Link to="/auth" className="btn-primary">Sign In to Continue</Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-40 pb-20 min-h-screen text-center">
        <p className="text-gray-400 text-lg">Product not found</p>
        <Link to="/" className="btn-primary mt-4">Go Home</Link>
      </div>
    );
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, idProofFile: file, idProofName: file.name });
  };

  const handleStep1 = (e) => {
    e.preventDefault();
    if (formData.customerName && formData.phone && formData.address) setStep(2);
  };

  const handleFinal = async (e) => {
    e.preventDefault();
    try {
      await placeOrder({
        userId: user.id,
        customerName: formData.customerName, phone: formData.phone, address: formData.address,
        productName: product.name, productType: type, productId: product._id,
        price: product.price, paymentMethod: formData.paymentMethod,
        paymentPlan: formData.paymentPlan,
        downPayment: formData.downPayment,
        emiDuration: formData.emiDuration,
        idProofPath: formData.idProofName || 'Not uploaded'
      });
      setOrderSuccess(true);
    } catch (err) { console.error(err); }
  };

  if (orderSuccess) {
    return (
      <div className="pt-32 lg:pt-40 pb-20 min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-lg border border-gray-100">
          <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-8 shadow-inner">
            <FiCheckCircle className="text-green-500 text-5xl" />
          </div>
          <h2 className="font-display text-3xl font-black text-gray-900 uppercase tracking-tight mb-4">Success! Order Placed</h2>
          <p className="text-gray-500 font-medium mb-8">Thank you for choosing Krisha Krishi. Our executive will reach out to you within the next 2 hours for verification.</p>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-10 text-left border border-gray-100">
             <div className="flex justify-between mb-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Machine</span>
                <span className="text-sm font-bold text-gray-900">{product.name}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Grand Total</span>
                <span className="text-sm font-black text-[#b30000]">{formatPrice(product.price)}</span>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard" className="btn-primary flex-1 justify-center">Go to Dashboard</Link>
            <Link to="/" className="btn-secondary flex-1 justify-center">Return Home</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 lg:pt-40 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to={`/product/${type}/${id}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-[#b30000] mb-8 transition-colors font-black uppercase text-xs tracking-widest">
          <FiArrowLeft /> Back to Details
        </Link>

        {/* Mini Product Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-10 flex items-center gap-6">
          <img src={getImageUrl(product.imageKey)} alt={product.name} className="w-24 h-24 rounded-xl object-cover border border-gray-100" />
          <div className="flex-1">
             <p className="text-[10px] font-black text-[#b30000] uppercase tracking-[0.2em] mb-1">{product.category || product.type}</p>
            <h3 className="font-display font-black text-xl text-gray-900 uppercase tracking-tight">{product.name}</h3>
            <p className="text-lg font-black text-gray-400">{formatPrice(product.price)}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 mb-12 px-4">
          <div className={`flex items-center gap-3 ${step >= 1 ? 'text-[#b30000]' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black ${step >= 1 ? 'bg-[#b30000] text-white shadow-lg shadow-red-500/20' : 'bg-gray-200 text-gray-500'}`}>{step > 1 ? <FiCheck /> : '01'}</div>
            <span className="text-xs font-black uppercase tracking-widest hidden sm:block">Customer Info</span>
          </div>
          <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-[#b30000]' : 'bg-gray-200'}`} />
          <div className={`flex items-center gap-3 ${step >= 2 ? 'text-[#b30000]' : 'text-gray-400'}`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black ${step >= 2 ? 'bg-[#b30000] text-white shadow-lg shadow-red-500/20' : 'bg-gray-200 text-gray-500'}`}>02</div>
            <span className="text-xs font-black uppercase tracking-widest hidden sm:block">Payment Method</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} onSubmit={handleStep1} className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
              <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-10 pb-4 border-b border-gray-100">Contact & Delivery Information</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div>
                  <label className="block text-[10px] uppercase font-black text-gray-400 tracking-wider mb-2">Customer Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b30000]" />
                    <input type="text" name="customerName" required value={formData.customerName} onChange={handleChange} placeholder="As per Aadhaar card" className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none text-gray-900 font-bold focus:ring-2 focus:ring-[#b30000]/20 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-black text-gray-400 tracking-wider mb-2">Mobile Number</label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b30000]" />
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 XXXX XXXX" className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none text-gray-900 font-bold focus:ring-2 focus:ring-[#b30000]/20 transition-all" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] uppercase font-black text-gray-400 tracking-wider mb-2">Detailed Address</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-5 text-[#b30000]" />
                    <textarea name="address" required rows="3" value={formData.address} onChange={handleChange} placeholder="Full address for machine delivery" className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-none text-gray-900 font-bold focus:ring-2 focus:ring-[#b30000]/20 transition-all resize-none" />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full py-5 flex items-center justify-center gap-3 text-lg">Proceed to Payment <FiArrowRight /></button>
            </motion.form>
          ) : (
            <motion.form key="s2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} onSubmit={handleFinal} className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
              <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-10 pb-4 border-b border-gray-100">Payment & Identity Verification</h2>
              
              <div className="space-y-10">
                {/* ID Proof */}
                <div>
                  <label className="block text-[10px] uppercase font-black text-gray-400 tracking-wider mb-4 text-center">Identity Proof (Aadhaar Card Preferred)</label>
                  <label className="flex flex-col items-center justify-center p-8 rounded-2xl border-4 border-dashed border-gray-100 hover:border-[#b30000]/30 cursor-pointer transition-all bg-gray-50 group">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform text-[#b30000]"><FiUpload size={24} /></div>
                    <p className="text-sm font-black text-gray-900 uppercase tracking-tight mb-1">{formData.idProofName || 'Upload ID Document'}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Supports PDF, JPG, PNG up to 10MB</p>
                    <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>

                {/* Plan Toggle */}
                <div className="pt-8 border-t border-gray-100">
                  <label className="block text-[10px] uppercase font-black text-gray-400 tracking-wider mb-4 text-center">Purchase Plan</label>
                  <div className="grid grid-cols-2 gap-4">
                    <PlanButton active={formData.paymentPlan === 'full'} onClick={() => setFormData({...formData, paymentPlan: 'full'})} label="Full Payment" />
                    <PlanButton active={formData.paymentPlan === 'installment'} onClick={() => setFormData({...formData, paymentPlan: 'installment'})} label="Easy Installment" />
                  </div>
                </div>

                {formData.paymentPlan === 'installment' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6 bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] uppercase font-black text-gray-500 tracking-wider mb-2">Down Payment Amount (₹)</label>
                        <input type="number" name="downPayment" value={formData.downPayment} onChange={handleChange} className="w-full px-5 py-3 rounded-xl bg-white border-none text-gray-900 font-bold focus:ring-2 focus:ring-[#b30000]/20 transition-all shadow-sm" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-black text-gray-500 tracking-wider mb-2">EMI Duration</label>
                        <select name="emiDuration" value={formData.emiDuration} onChange={handleChange} className="w-full px-5 py-3 rounded-xl bg-white border-none text-gray-700 font-bold focus:ring-2 focus:ring-[#b30000]/20 transition-all shadow-sm">
                          <option value="12">12 Months (1 Year)</option>
                          <option value="24">24 Months (2 Years)</option>
                          <option value="36">36 Months (3 Years)</option>
                        </select>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-gray-200 mt-4 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Estimated Monthly EMI</p>
                        <p className="text-2xl font-black text-[#b30000]">{formatPrice(monthlyEmi)}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">Remaining Balance</p>
                        <p className="text-sm font-bold text-gray-700">{formatPrice(remainingAmount)}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Payment Method */}
                <div className="pt-8 border-t border-gray-100">
                   <label className="block text-[10px] uppercase font-black text-gray-400 tracking-wider mb-4 text-center">Payment Gateway</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['upi', 'cash'].map(m => (
                      <label key={m} className={`flex items-center gap-4 p-5 rounded-xl cursor-pointer transition-all border-2 ${formData.paymentMethod === m ? 'border-[#b30000] bg-red-50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'}`}>
                        <input type="radio" name="paymentMethod" value={m} checked={formData.paymentMethod === m} onChange={handleChange} className="hidden" />
                        <div className={`w-6 h-6 rounded-full border-4 flex items-center justify-center ${formData.paymentMethod === m ? 'border-[#b30000]' : 'border-gray-300'}`}>
                          {formData.paymentMethod === m && <div className="w-2 h-2 rounded-full bg-[#b30000]" />}
                        </div>
                        <p className="font-black uppercase text-[10px] tracking-widest text-gray-900">{m === 'upi' ? 'Online UPI' : 'Offline Cash'}</p>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.paymentMethod === 'upi' && (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center bg-white p-8 rounded-3xl border-2 border-[#b30000]/10 text-center shadow-xl">
                    <div className="relative p-2 bg-white rounded-2xl border-2 border-gray-50 mb-6">
                      <img src="/images/qr_code.png" alt="UPI QR" className="w-56 h-56 object-cover" onError={(e) => { e.target.src='https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=KrishaKrishiAgroPayment'; }} />
                    </div>
                    <p className="text-[#b30000] font-black uppercase tracking-widest text-sm mb-2">Scan & Pay Securely</p>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest max-w-xs mx-auto">Complete the transaction on your mobile and click the button below to confirm.</p>
                  </motion.div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-12">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary px-10">Go Back</button>
                <button type="submit" className="btn-primary flex-1 py-5 flex items-center justify-center gap-3">
                  {formData.paymentMethod === 'upi' ? (
                    <><FiCheck /> I Have Completed Payment</>
                  ) : (
                    <><FiCheckCircle /> Confirm & Place Order</>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PlanButton({ active, onClick, label }) {
  return (
    <button type="button" onClick={onClick} className={`p-5 rounded-xl border-2 transition-all font-black uppercase text-[10px] tracking-widest ${active ? 'border-[#b30000] bg-[#b30000] text-white shadow-lg shadow-red-500/20' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'}`}>
      {label}
    </button>
  );
}
