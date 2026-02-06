import React from 'react';
import { Activity, Bell, Search } from 'lucide-react';

const Navbar = ({ onSearch }) => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-slate-900 border-b border-slate-800">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-blue-600 rounded-lg">
          <Activity size={20} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight italic">PULSE</span>
      </div>

      <div className="flex-1 max-w-md mx-10 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input 
          type="text" 
          placeholder="Search markets..." 
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-slate-800 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white"
        />
      </div>

      <div className="flex items-center gap-5 text-slate-400">
        <button className="hover:text-white"><Bell size={20} /></button>
        <div className="h-6 w-[1px] bg-slate-800"></div>
        <button className="px-4 py-1.5 bg-slate-800 rounded-lg text-sm font-semibold hover:bg-slate-700 text-white">
          Connect
        </button>
      </div>
    </nav>
  );
};

export default Navbar;