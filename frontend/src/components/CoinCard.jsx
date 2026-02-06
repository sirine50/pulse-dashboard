import React from 'react';
import { TrendingUp, TrendingDown, Star, X } from 'lucide-react';

const CoinCard = ({ coin, onAction, isWatchlist }) => {
  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-blue-500/50 transition-all duration-300 group relative overflow-hidden">
      <div className={`absolute -right-4 -top-4 w-20 h-20 blur-3xl opacity-10 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}></div>

      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img src={coin.image} alt="" className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="font-bold text-lg leading-tight">{coin.name}</h3>
            <span className="text-slate-500 uppercase text-xs font-semibold">{coin.symbol}</span>
          </div>
        </div>
        
        {/* ACTION BUTTON */}
        <button 
          onClick={() => {
            console.log("Button Clicked for:", coin.id); // DEBUG LOG
            onAction(coin);
          }}
          className={`z-10 transition-colors p-2 rounded-lg ${isWatchlist ? 'hover:bg-red-500/20 text-red-500' : 'hover:bg-yellow-500/20 text-slate-500 hover:text-yellow-400'}`}
        >
          {isWatchlist ? <X size={20} /> : <Star size={20} />}
        </button>
      </div>

      <div className="mt-6">
        <p className="text-2xl font-mono font-bold">
          ${coin.current_price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </p>
        <div className={`flex items-center gap-1 mt-2 font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          <span>{coin.price_change_percentage_24h?.toFixed(2)}%</span>
        </div>
      </div>

      <button 
        onClick={() => alert(`Stats for ${coin.name} coming soon!`)}
        className="w-full mt-6 py-2 bg-slate-800 hover:bg-blue-600 text-white rounded-lg transition-all text-sm font-semibold relative z-10"
      >
        View Analytics
      </button>
    </div>
  );
};

export default CoinCard;