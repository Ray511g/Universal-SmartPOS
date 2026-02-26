"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  Settings, 
  BarChart3, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  AppWindow,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: ShoppingCart, label: 'Register', path: '/pos' },
  { icon: Package, label: 'Inventory', path: '/inventory' },
  { icon: Users, label: 'Staff', path: '/staff' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: AppWindow, label: 'Business Engine', path: '/admin' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? '80px' : '280px' }}
      className="h-screen bg-navy-950 border-r border-white/10 flex flex-col relative transition-all duration-300 ease-in-out"
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center shrink-0">
          <Zap className="text-white fill-white" size={24} />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-black text-xl tracking-tight text-white whitespace-nowrap"
          >
            SMART<span className="text-brand-blue">POS</span>
          </motion.div>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const active = pathname === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <div
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all group",
                  active 
                    ? "bg-brand-blue/10 text-brand-blue border border-brand-blue/20" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon size={22} className={cn(active ? "text-brand-blue" : "group-hover:text-white")} />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-semibold text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
                {active && !collapsed && (
                  <motion.div layoutId="active-nav" className="absolute left-0 w-1 h-8 bg-brand-blue rounded-r-full" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button className="flex items-center gap-4 px-4 py-3 w-full text-slate-400 hover:text-red-400 transition-colors">
          <LogOut size={22} />
          {!collapsed && <span className="font-semibold text-sm">Logout System</span>}
        </button>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center text-white border-2 border-navy-950 hover:scale-110 transition-transform"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
}
