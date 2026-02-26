"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShoppingCart, 
  Trash2, 
  Minus, 
  Plus, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  Scan,
  Printer,
  ChevronRight,
  User,
  X,
  CheckCircle,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useBusinessStore } from '@/store/businessStore';
import ReceiptPreview from '@/components/ReceiptPreview';

// Mock Products
const MOCK_PRODUCTS = [
  { id: '1', name: 'Premium Espresso Beans', price: 1200, tax: 0.16, category: 'Coffee', stock: 45 },
  { id: '2', name: 'Organic Honey (500ml)', price: 850, tax: 0, category: 'Essentials', stock: 12 },
  { id: '3', name: 'Stainless Steel Flask', price: 2500, tax: 0.16, category: 'Hardware', stock: 8 },
  { id: '4', name: 'Paracetamol 500mg', price: 150, tax: 0.16, category: 'Pharmacy', stock: 156 },
  { id: '5', name: 'Wireless Mouse Pro', price: 3200, tax: 0.16, category: 'Retail', stock: 24 },
  { id: '6', name: 'Whole Grain Bread', price: 105, tax: 0, category: 'Bakery', stock: 50 },
  { id: '7', name: 'Latte Mug - Obsidian', price: 450, tax: 0.16, category: 'Coffee', stock: 30 },
  { id: '8', name: 'Hand Sanitizer 1L', price: 600, tax: 0.16, category: 'Pharmacy', stock: 88 },
];

const CATEGORIES = ['All', 'Coffee', 'Essentials', 'Pharmacy', 'Retail', 'Bakery'];

export default function POSPage() {
  const { items, addItem, removeItem, updateQuantity, subtotal, taxTotal, total, clearCart } = useCartStore();
  const { businessType, currency } = useBusinessStore();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'MPESA' | 'CARD' | null>(null);
  const [processing, setProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setOrderComplete(true);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden flex flex-col -m-8">
      {/* Top Controls */}
      <div className="bg-navy-900 border-b border-white/10 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            <input
              ref={searchRef}
              type="text"
              placeholder="Scan barcode or search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 transition-all font-semibold"
            />
          </div>
          <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  activeCategory === cat ? "bg-brand-blue text-white shadow-lg" : "text-slate-400 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-white">
          <div className="flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 px-4 py-2 rounded-xl text-brand-blue font-bold">
            <Clock size={18} />
            <span>EXPRESS TERMINAL #1</span>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="font-bold text-sm">Cashier: Admin</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Product Catalog */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  onClick={() => addItem(product)}
                  className="glass-card group cursor-pointer relative overflow-hidden flex flex-col"
                >
                  <div className="p-4 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-2 py-1 rounded-md">
                        {product.category}
                      </span>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded-md",
                        product.stock < 20 ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"
                      )}>
                        QTY: {product.stock}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-brand-blue transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <div className="p-4 border-t border-white/5 bg-white/5 flex items-center justify-between">
                    <span className="text-xl font-black text-white">{currency} {product.price.toLocaleString()}</span>
                    <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Cart / Checkout Sidebar */}
        <div className="w-[420px] bg-navy-950 border-l border-white/10 flex flex-col">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-blue/10 text-brand-blue">
                <ShoppingCart size={20} />
              </div>
              <h2 className="text-xl font-black text-white font-outfit">Active Cart</h2>
            </div>
            <button 
              onClick={clearCart}
              className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-500 transition-all rounded-lg"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-8 border-2 border-dashed border-white/5 rounded-[2rem]">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 text-slate-700">
                  <Scan size={32} />
                </div>
                <h4 className="text-lg font-bold text-slate-400 mb-2">Checkout Empty</h4>
                <p className="text-xs text-slate-600">Scan items or click products on the left to start a new transaction.</p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-4 rounded-2xl flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-brand-blue font-black shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-sm truncate">{item.name}</h4>
                      <p className="text-slate-500 text-xs">{currency} {item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm font-black text-white">{item.quantity}</span>
                      <button 
                         onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-slate-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          <div className="p-8 border-t border-white/5 bg-white/5 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-slate-400 text-sm font-semibold">
                <span>Subtotal</span>
                <span>{currency} {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-sm font-semibold">
                <span>Tax (VAT)</span>
                <span>{currency} {taxTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white text-2xl font-black font-outfit pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="text-brand-blue">{currency} {total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={items.length === 0}
              className={cn(
                "w-full py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 transition-all",
                items.length > 0 
                  ? "premium-gradient text-white shadow-xl hover:scale-[1.02] active:scale-[0.98]" 
                  : "bg-slate-800 text-slate-600 grayscale cursor-not-allowed"
              )}
            >
              <CreditCard size={24} />
              COMPLETE PAYMENT
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && !orderComplete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !processing && setShowPaymentModal(false)}
              className="absolute inset-0 bg-navy-950/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg glass-card rounded-[3rem] p-10 overflow-hidden"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-white font-outfit mb-2 uppercase tracking-tight">Finalize Order</h2>
                <p className="text-slate-400 font-semibold">{items.length} units arriving at total of <span className="text-brand-blue">{currency} {total.toLocaleString()}</span></p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { id: 'CASH', label: 'Cash', icon: Banknote, color: 'text-emerald-500' },
                  { id: 'MPESA', label: 'M-Pesa', icon: Smartphone, color: 'text-brand-blue' },
                  { id: 'CARD', label: 'Card', icon: CreditCard, color: 'text-purple-500' },
                ].map((method) => (
                  <button
                    key={method.id}
                    disabled={processing}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={cn(
                      "flex flex-col items-center gap-4 p-6 rounded-3xl transition-all border-2",
                      paymentMethod === method.id 
                        ? "bg-brand-blue/10 border-brand-blue text-white" 
                        : "bg-white/5 border-transparent text-slate-500 hover:bg-white/10"
                    )}
                  >
                    <div className={cn("p-3 rounded-2xl bg-white/5", paymentMethod === method.id ? "text-brand-blue" : method.color)}>
                      <method.icon size={28} />
                    </div>
                    <span className="font-black text-xs uppercase tracking-widest">{method.label}</span>
                  </button>
                ))}
              </div>

              <button
                disabled={!paymentMethod || processing}
                onClick={processPayment}
                className={cn(
                  "w-full py-5 rounded-3xl font-black text-lg transition-all flex items-center justify-center gap-4",
                  paymentMethod && !processing
                    ? "bg-white text-navy-950 hover:scale-[1.02]" 
                    : "bg-slate-800 text-slate-600 grayscale cursor-not-allowed"
                )}
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                    UPLOADING TRANSACTION...
                  </>
                ) : (
                  <>
                    CONFIRM & PRINT
                    <Printer size={20} />
                  </>
                )}
              </button>
            </motion.div>
          </div>
        )}

        {orderComplete && (
          <ReceiptPreview 
            items={[...items]} 
            total={total} 
            subtotal={subtotal} 
            tax={taxTotal} 
            onClose={() => {
              setOrderComplete(false);
              setShowPaymentModal(false);
              setPaymentMethod(null);
              clearCart();
            }}
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
