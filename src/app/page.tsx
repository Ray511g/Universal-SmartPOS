"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Package, 
  CreditCard,
  ArrowUpRight,
  ChevronRight,
  Store,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBusinessStore } from '@/store/businessStore';

const stats = [
  { label: 'Today\'s Sales', value: 'KES 124,500', icon: CreditCard, color: 'text-blue-500', trend: '+12.5%' },
  { label: 'Active Customers', value: '1,284', icon: Users, color: 'text-purple-500', trend: '+3.2%' },
  { label: 'Inventory Items', value: '842', icon: Package, color: 'text-emerald-500', trend: '-2 units' },
  { label: 'Net Profit', value: 'KES 42,800', icon: TrendingUp, color: 'text-orange-500', trend: '+8.1%' },
];

export default function Dashboard() {
  const { businessType, businessName } = useBusinessStore();

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold mb-2">
            <Store size={16} />
            <span>{businessName.toUpperCase()}</span>
            <ChevronRight size={14} />
            <span className="text-brand-blue flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
              {businessType} ENGINE ACTIVE
            </span>
          </div>
          <h1 className="text-5xl font-black tracking-tight text-white font-outfit">
            System <span className="text-brand-blue">Overview</span>
          </h1>
        </div>
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-white font-bold backdrop-blur-md">
          <Calendar size={18} className="text-brand-blue" />
          <span>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl relative overflow-hidden group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-3 rounded-2xl bg-white/5", stat.color)}>
                <stat.icon size={24} />
              </div>
              <div className="text-xs font-bold text-emerald-400 flex items-center bg-emerald-400/10 px-2 py-1 rounded-lg">
                <ArrowUpRight size={12} className="mr-1" />
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <h3 className="text-2xl font-black text-white">{stat.value}</h3>
            </div>
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-brand-blue/5 rounded-tl-full blur-2xl group-hover:bg-brand-blue/10 transition-colors" />
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Chart Placeholder */}
          <div className="glass-card p-8 rounded-[2rem] border-white/5 h-[400px] flex flex-col justify-center items-center text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <TrendingUp size={32} className="text-brand-blue" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2 font-outfit">Revenue Visualization</h3>
            <p className="text-slate-400 max-w-sm">Generating real-time interactive analytics for your business units. Connect to database to populate.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 rounded-[2rem] border-white/5">
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'New Sale', icon: CreditCard, color: 'bg-blue-500' },
                { label: 'Add Stock', icon: Package, color: 'bg-emerald-500' },
                { label: 'Reports', icon: BarChart3, color: 'bg-purple-500' },
                { label: 'Settings', icon: Settings, color: 'bg-slate-500' },
              ].map(action => (
                <button key={action.label} className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-white/10 group">
                  <div className={cn("p-3 rounded-xl text-white shadow-lg", action.color)}>
                    <action.icon size={20} />
                  </div>
                  <span className="text-xs font-bold text-slate-300 group-hover:text-white">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card p-6 rounded-[2rem] border-white/5 bg-gradient-to-br from-brand-blue/20 to-transparent">
            <h3 className="text-lg font-bold text-white mb-2">Smart Inventory Alert</h3>
            <p className="text-sm text-slate-400 mb-4">3 items are below reorder level in Pharmacy module.</p>
            <button className="w-full py-3 rounded-xl bg-white text-navy-950 font-black text-sm hover:scale-[1.02] transition-transform">
              Resolve Alerts Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Re-importing icon locally for the button map
import { BarChart3, Settings as SettingsIcon } from 'lucide-react';
