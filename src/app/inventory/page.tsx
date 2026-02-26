"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  ArrowUpRight, 
  ArrowDownRight,
  Edit2,
  Trash2,
  Eye,
  AlertTriangle,
  History,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBusinessStore } from '@/store/businessStore';

export default function InventoryPage() {
  const { businessType, currency } = useBusinessStore();
  const [activeTab, setActiveTab] = useState<'all' | 'low' | 'categories'>('all');

  const getBusinessSpecificFields = () => {
    switch (businessType) {
      case 'PHARMACY': return ['Batch #', 'Expiry Date', 'Drug Class'];
      case 'RESTAURANT': return ['Kitchen Unit', 'Recipe Link', 'Waste %'];
      case 'HARDWARE': return ['Weight (kg)', 'Dimensions', 'Rack #'];
      default: return ['SKU', 'Brand', 'Supplier'];
    }
  };

  const fields = getBusinessSpecificFields();

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white font-outfit mb-2">Central <span className="text-brand-blue">Inventory</span></h1>
          <p className="text-slate-400">Managing assets for <span className="text-white font-bold">{businessType}</span> model.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-white font-bold hover:bg-white/10 transition-all">
            <History size={18} className="text-brand-blue" />
            Audit Trail
          </button>
          <button className="flex items-center gap-3 premium-gradient px-8 py-4 rounded-2xl text-white font-black shadow-xl shadow-brand-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Plus size={20} />
            NEW PRODUCT
          </button>
        </div>
      </div>

      {/* Control Strip */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-2xl w-full md:w-auto">
          {[
            { id: 'all', label: 'All Items', icon: Package },
            { id: 'low', label: 'Low Stock', icon: AlertTriangle },
            { id: 'categories', label: 'By Category', icon: Filter },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-3 px-6 py-2 rounded-xl text-sm font-bold transition-all flex-1 md:flex-none",
                activeTab === tab.id ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search inventory..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white font-semibold outline-none focus:ring-2 focus:ring-brand-blue/50"
          />
        </div>
      </div>

      {/* Modern Table */}
      <div className="glass-card rounded-[2.5rem] overflow-hidden border-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5">
              <th className="px-8 py-6 text-slate-400 text-[10px] font-black uppercase tracking-[2px]">Product Name</th>
              <th className="px-8 py-6 text-slate-400 text-[10px] font-black uppercase tracking-[2px]">Core Details</th>
              {fields.map(f => (
                <th key={f} className="px-8 py-6 text-slate-400 text-[10px] font-black uppercase tracking-[2px]">{f}</th>
              ))}
              <th className="px-8 py-6 text-slate-400 text-[10px] font-black uppercase tracking-[2px]">Inventory</th>
              <th className="px-8 py-6 text-slate-400 text-[10px] font-black uppercase tracking-[2px]">Status</th>
              <th className="px-8 py-6 text-center text-slate-400 text-[10px] font-black uppercase tracking-[2px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all">
                      <Package size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">Premium Item {i}</h4>
                      <p className="text-slate-500 text-xs">SKU: PROD-00{i}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-white font-black">{currency} {(1200 * i).toLocaleString()}</span>
                  <p className="text-slate-500 text-xs">Category: General</p>
                </td>
                {fields.map(f => (
                  <td key={f} className="px-8 py-6 text-slate-400 text-sm font-semibold italic">
                    --
                  </td>
                ))}
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="text-white font-bold">{40 * i} Units</span>
                    <span className="text-slate-500 text-[10px]">Reorder: 10</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold text-xs bg-emerald-400/10 px-3 py-1 rounded-full w-fit">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Healthy
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center justify-center gap-2">
                    <button className="p-2 rounded-xl text-slate-600 hover:bg-brand-blue/20 hover:text-brand-blue transition-all">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 rounded-xl text-slate-600 hover:bg-white/10 hover:text-white transition-all">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 rounded-xl text-slate-600 hover:bg-red-500/20 hover:text-red-500 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-[2rem] border-white/5 relative overflow-hidden">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h3 className="text-2xl font-black text-white font-outfit mb-2">Automated Procurement</h3>
              <p className="text-slate-400 text-sm">Smart AI detects 3 items failing soon. Generate orders?</p>
            </div>
            <FileText size={32} className="text-brand-blue opacity-50" />
          </div>
          <button className="mt-6 w-full py-4 rounded-2xl bg-brand-blue text-white font-black text-sm hover:translate-y-[-2px] transition-transform">
            OPEN REORDER QUEUE
          </button>
        </div>

        <div className="glass-card p-8 rounded-[2rem] border-white/5 flex items-center justify-between">
          <div className="flex gap-6 items-center">
            <div className="w-20 h-20 rounded-full border-4 border-brand-blue border-t-white/10 flex items-center justify-center text-white font-black">
              72%
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Stock health</h4>
              <p className="text-slate-400 text-xs mt-1">Overall inventory cycle stability.</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
               <ArrowUpRight size={14} /> 12% vs LY
             </div>
             <div className="flex items-center gap-2 text-slate-500 text-xs">
               Updated 2m ago
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
