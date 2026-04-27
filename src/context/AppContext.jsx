import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

// Fallback data when backend is not available
const fallbackTractors = [
  { _id: 't1', name: 'Mahindra Novo 755 DI', brand: 'Mahindra', price: 850000, hp: 75, engine: '4 Cylinder, 2730 CC', fuelType: 'Diesel', transmission: '8 Forward + 2 Reverse', liftCapacity: '2500 kg', warranty: '2 Years / 2000 Hours', description: 'The Mahindra Novo 755 DI is a powerful 75 HP tractor built for heavy-duty farming.', features: ['Power Steering', 'Oil Immersed Brakes', 'Dual Clutch', 'Adjustable Seat', 'Mobile Charging Port'], imageKey: 'tractor1', category: 'Heavy Duty', inStock: true },
  { _id: 't2', name: 'Mahindra OJA 3140', brand: 'Mahindra', price: 1025000, hp: 40, engine: '3 Cylinder, 2048 CC', fuelType: 'Diesel', transmission: '12 Forward + 3 Reverse', liftCapacity: '1800 kg', warranty: '2 Years / 2500 Hours', description: 'Next-gen compact tractor with advanced technology for modern farming.', features: ['Digital Dashboard', 'Cruise Control', 'Power Steering', 'Ergonomic Seat', 'LED Headlamps'], imageKey: 'tractor2', category: 'Premium', inStock: true },
  { _id: 't3', name: 'Mahindra JIVO 245 DI', brand: 'Mahindra', price: 575000, hp: 24, engine: '2 Cylinder, 1366 CC', fuelType: 'Diesel', transmission: '6 Forward + 2 Reverse', liftCapacity: '750 kg', warranty: '2 Years / 2000 Hours', description: 'Compact mini tractor ideal for small farms and orchards.', features: ['Compact Size', 'Low Maintenance', 'Easy Steering', 'High Ground Clearance', 'Multi-speed PTO'], imageKey: 'tractor3', category: 'Mini', inStock: true },
  { _id: 't4', name: 'Mahindra OJA 2121', brand: 'Mahindra', price: 915000, hp: 21, engine: '2 Cylinder, 1365 CC', fuelType: 'Diesel', transmission: '6 Forward + 2 Reverse', liftCapacity: '850 kg', warranty: '2 Years / 2000 Hours', description: 'Next-generation compact tractor with 4WD capability.', features: ['4WD', 'Digital Cluster', 'Synchromesh Transmission', 'Power Steering', 'Flat Platform'], imageKey: 'tractor4', category: 'Compact 4WD', inStock: true },
  { _id: 't5', name: 'Mahindra Arjun Novo 605 DI-i', brand: 'Mahindra', price: 785000, hp: 57, engine: '4 Cylinder, 3532 CC', fuelType: 'Diesel', transmission: '8 Forward + 2 Reverse', liftCapacity: '2200 kg', warranty: '2 Years / 2000 Hours', description: 'Versatile workhorse tractor for all farming operations.', features: ['Power Steering', 'Oil Immersed Brakes', 'Dual Clutch', 'High Backup Torque', 'Adjustable Seat'], imageKey: 'tractor5', category: 'All-Rounder', inStock: true },
  { _id: 't6', name: 'John Deere 5310', brand: 'John Deere', price: 880000, hp: 55, engine: '3 Cylinder, 2900 CC', fuelType: 'Diesel', transmission: '9 Forward + 3 Reverse', liftCapacity: '2000 kg', warranty: '5 Years', description: 'The John Deere 5310 is a premium and powerful tractor known for its unmatched performance, heavy-duty applications, and advanced technology.', features: ['Power Steering', 'Multi-plate Wet Disc Brakes', 'Collar Shift Transmission', 'High Torque Backup', 'Adjustable Front Axle'], imageKey: 'john_deere_5310', category: 'Heavy Duty', inStock: true },
  { _id: 't7', name: 'Mahindra 575 DI', brand: 'Mahindra', price: 680000, hp: 45, engine: '4 Cylinder, 2730 CC', fuelType: 'Diesel', transmission: '8 Forward + 2 Reverse', liftCapacity: '1600 kg', warranty: '2 Years / 2000 Hours', description: 'The Mahindra 575 DI is a robust and reliable tractor that provides high performance in both agricultural and haulage tasks.', features: ['Mechanical/Power Steering', 'Oil Immersed Brakes', 'Partial Constant Mesh', 'High Ground Clearance', 'Ergonomic Design'], imageKey: 'mahindra_575_di', category: 'Utility', inStock: true },
  { _id: 't8', name: 'Swaraj 744 FE', brand: 'Swaraj', price: 690000, hp: 48, engine: '3 Cylinder, 3136 CC', fuelType: 'Diesel', transmission: '8 Forward + 2 Reverse', liftCapacity: '1700 kg', warranty: '2 Years / 2000 Hours', description: 'Swaraj 744 FE is a fuel-efficient and multi-purpose tractor perfect for cultivating, harvesting, and haulage applications.', features: ['Power Steering', 'Multi-speed PTO', 'Oil Immersed Brakes', 'Heavy Front Axle', 'Water Cooled Engine'], imageKey: 'swaraj_744_fe', category: 'Utility', inStock: true }
];

const fallbackMachinery = [
  { _id: 'm1', name: 'Heavy Duty Rotavator', type: 'Rotavator', price: 85000, description: 'High-performance rotavator for efficient soil preparation.', features: ['48 Blades', 'Multi-Speed Gearbox', 'Heavy Duty Frame', 'Adjustable Depth', 'Low Maintenance'], imageKey: 'rotavator', compatibility: '35 HP and above', weight: '380 kg', inStock: true },
  { _id: 'm2', name: 'Spring Loaded Cultivator', type: 'Cultivator', price: 45000, description: 'Spring-loaded cultivator for secondary tillage and weed control.', features: ['9 Tines', 'Spring Loaded', 'Adjustable Width', 'Hardened Steel Tips', 'Easy Mounting'], imageKey: 'cultivator', compatibility: '30 HP and above', weight: '210 kg', inStock: true },
  { _id: 'm3', name: 'Hydraulic Reversible Plough', type: 'Plough', price: 35000, description: 'Hydraulic reversible plough for primary tillage operations.', features: ['3 Bottom', 'Hydraulic Reversible', 'Hardened Steel Blades', 'Adjustable Depth', 'Corrosion Resistant'], imageKey: 'plough', compatibility: '40 HP and above', weight: '290 kg', inStock: true },
  { _id: 'm4', name: 'Automatic Seed Drill', type: 'Seed Drill', price: 65000, description: 'Precision seed drill for accurate seed placement.', features: ['9 Row', 'Adjustable Row Spacing', 'Fertilizer Attachment', 'Seed Rate Control', 'Calibration Cups'], imageKey: 'seed-drill', compatibility: '35 HP and above', weight: '320 kg', inStock: true },
  { _id: 'm5', name: 'Hydraulic Tipping Trailer', type: 'Trailer', price: 120000, description: 'Heavy-duty hydraulic tipping trailer for farm transport.', features: ['5 Ton Capacity', 'Hydraulic Tipping', 'Reinforced Floor', 'Air Brakes', 'Removable Sides'], imageKey: 'trailer', compatibility: '45 HP and above', weight: '850 kg', inStock: true },
  { _id: 'm6', name: 'Laser Land Leveler', type: 'Leveler', price: 320000, description: 'Precision laser land leveler for perfectly flat fields. Saves water, increases yield, and ensures uniform crop maturity.', features: ['Laser Guided Precision', 'Hydraulic Control', 'Durable Bucket', 'Adjustable Mast', 'Water Saving'], imageKey: 'laser_leveler', compatibility: '50 HP and above', weight: '600 kg', inStock: true },
  { _id: 'm7', name: 'Tractor Mounted Boom Sprayer', type: 'Sprayer', price: 55000, description: 'Efficient boom sprayer for applying pesticides, herbicides, and fertilizers uniformly across large fields.', features: ['400L Tank Capacity', '12m Boom Length', 'High Pressure Pump', 'Anti-Drip Nozzles', 'Corrosion Resistant Tank'], imageKey: 'boom_sprayer', compatibility: '35 HP and above', weight: '150 kg', inStock: true }
];

const API = 'http://localhost:5000/api';

export function AppProvider({ children }) {
  const [tractors, setTractors] = useState([]);
  const [machinery, setMachinery] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendAvailable, setBackendAvailable] = useState(true);
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  // Fetch data on mount
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    fetchData();
  }, [token]);

  async function fetchData() {
    setLoading(true);
    try {
      const [tRes, mRes, wRes, oRes] = await Promise.all([
        axios.get(`${API}/tractors`),
        axios.get(`${API}/machinery`),
        axios.get(`${API}/wishlist`),
        axios.get(`${API}/orders`)
      ]);
      setTractors(tRes.data);
      setMachinery(mRes.data);
      setWishlist(wRes.data);
      setOrders(oRes.data);
      setBackendAvailable(true);
    } catch (err) {
      console.log('⚠️ Backend not available, using fallback data');
      setTractors(fallbackTractors);
      setMachinery(fallbackMachinery);
      setWishlist(JSON.parse(localStorage.getItem('wishlist') || '[]'));
      setOrders(JSON.parse(localStorage.getItem('orders') || '[]'));
      setBackendAvailable(false);
    }
    setLoading(false);
  }

  // Add to wishlist
  async function addToWishlist(item) {
    const exists = wishlist.find(w => w.productId === (item._id || item.productId));
    if (exists) return;
    const wishItem = {
      productId: item._id,
      productType: item.hp ? 'tractor' : 'machinery',
      productName: item.name,
      price: item.price,
      imageKey: item.imageKey
    };
    try {
      if (backendAvailable) {
        const res = await axios.post(`${API}/wishlist`, wishItem);
        setWishlist(prev => [...prev, res.data]);
      } else {
        const newItem = { ...wishItem, _id: 'w' + Date.now() };
        const updated = [...wishlist, newItem];
        setWishlist(updated);
        localStorage.setItem('wishlist', JSON.stringify(updated));
      }
    } catch (err) {
      console.error('Error adding to wishlist:', err);
    }
  }

  // Remove from wishlist
  async function removeFromWishlist(id) {
    try {
      if (backendAvailable) {
        await axios.delete(`${API}/wishlist/${id}`);
      }
      const updated = wishlist.filter(w => w._id !== id);
      setWishlist(updated);
      if (!backendAvailable) localStorage.setItem('wishlist', JSON.stringify(updated));
    } catch (err) {
      console.error('Error removing from wishlist:', err);
    }
  }

  // Place order
  async function placeOrder(orderData) {
    try {
      if (backendAvailable) {
        const res = await axios.post(`${API}/orders`, orderData);
        setOrders(prev => [res.data.order, ...prev]);
        return res.data;
      } else {
        const newOrder = { ...orderData, _id: 'o' + Date.now(), status: 'Pending', createdAt: new Date().toISOString() };
        const updated = [newOrder, ...orders];
        setOrders(updated);
        localStorage.setItem('orders', JSON.stringify(updated));
        return { success: true, order: newOrder };
      }
    } catch (err) {
      console.error('Error placing order:', err);
      throw err;
    }
  }

  // Admin: add tractor
  async function addTractor(data) {
    try {
      if (backendAvailable) {
        const res = await axios.post(`${API}/tractors`, data);
        setTractors(prev => [res.data, ...prev]);
      }
    } catch (err) { console.error(err); }
  }

  // Admin: add machinery
  async function addMachinery(data) {
    try {
      if (backendAvailable) {
        const res = await axios.post(`${API}/machinery`, data);
        setMachinery(prev => [res.data, ...prev]);
      }
    } catch (err) { console.error(err); }
  }

  // Admin: delete tractor
  async function deleteTractor(id) {
    try {
      if (backendAvailable) await axios.delete(`${API}/tractors/${id}`);
      setTractors(prev => prev.filter(t => t._id !== id));
    } catch (err) { console.error(err); }
  }

  // Admin: delete machinery
  async function deleteMachinery(id) {
    try {
      if (backendAvailable) await axios.delete(`${API}/machinery/${id}`);
      setMachinery(prev => prev.filter(m => m._id !== id));
    } catch (err) { console.error(err); }
  }

  // Admin: update order status
  async function updateOrderStatus(id, status) {
    try {
      if (backendAvailable) {
        await axios.put(`${API}/orders/${id}`, { status });
      }
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
    } catch (err) { console.error(err); }
  }

  const loginUser = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    tractors, machinery, wishlist, orders, loading, backendAvailable,
    user, token, loginUser, logoutUser,
    addToWishlist, removeFromWishlist, placeOrder,
    addTractor, addMachinery, deleteTractor, deleteMachinery,
    updateOrderStatus, fetchData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
