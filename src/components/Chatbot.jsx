import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { GiFarmTractor } from 'react-icons/gi';
import axios from 'axios';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to Krisha Krishi Agro! I'm your virtual assistant. How can I help you find the perfect Mahindra tractor today?", isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage.trim();
    setMessages(prev => [...prev, { id: Date.now(), text: userMsg, isBot: false }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { message: userMsg });
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response.data.response, isBot: true }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "I'm sorry, I'm experiencing a temporary network delay. Please call us at +91 12345 67890 for immediate assistance!", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            style={{ height: '550px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-[#1a1a1a] text-white p-6 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-24 h-full bg-[#b30000] opacity-10 -skew-x-12 translate-x-1/2" />
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#b30000] flex items-center justify-center shadow-lg shadow-red-500/20">
                    <GiFarmTractor className="text-white text-xl" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm uppercase tracking-widest leading-none">Krisha AI</h3>
                    <p className="text-[9px] text-green-400 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Online Now
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-[#b30000] transition-all"
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 flex flex-col gap-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl p-4 text-sm font-medium shadow-sm leading-relaxed ${
                      msg.isBot 
                        ? 'bg-white text-gray-800 border border-gray-100 rounded-tl-none' 
                        : 'bg-[#b30000] text-white rounded-tr-none shadow-red-500/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-none p-4 shadow-sm flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 bg-[#b30000] rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-[#b30000] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 bg-[#b30000] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSendMessage} className="relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about Mahindra Yuvo, Jivo..."
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-5 pr-14 text-sm font-bold text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#b30000]/20 transition-all shadow-inner"
                />
                <button 
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
                    inputMessage.trim() && !isLoading 
                      ? 'bg-[#b30000] text-white shadow-lg shadow-red-500/30' 
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <FiSend size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#1a1a1a] text-white rounded-2xl shadow-2xl flex items-center justify-center hover:bg-[#b30000] transition-all border-b-4 border-black group"
      >
        {isOpen ? (
          <FiX size={28} />
        ) : (
          <div className="relative">
            <FiMessageSquare size={28} />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#b30000] text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce shadow-lg">1</span>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
