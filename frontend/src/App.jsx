import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MarketGrid from './components/MarketGrid';
import { marketapi } from './api';

function App() {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("market"); // 'market' or 'watchlist'
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = view === "market" 
        ? await marketapi.getMarket() 
        : await marketapi.getWatchlist();
      setCoins(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, [view]);

  const handleAction = async (coin) => {
  try {
    if (view === "market") {
      // FIX: We map 'id' from CoinGecko to 'coin_id' for your FastAPI
      const payload = { 
        coin_id: coin.id, 
        symbol: coin.symbol 
      };
      
      console.log("Sending to backend:", payload);
      await marketapi.addToWatchlist(payload);
      alert(`${coin.name} added to your watchlist!`);
    } else {
      // For delete, your backend takes the string ID in the URL
      await marketapi.removeFromWatchlist(coin.id);
      setCoins(prev => prev.filter(c => c.id !== coin.id));
    }
  } catch (err) {
    // This will now catch the "Coin already in watchlist" message
    alert(err); 
  }
};

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar onSearch={setSearchTerm} />

      <main className="max-w-7xl mx-auto py-10 px-6">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              {view === "market" ? "Market Pulse" : "My Watchlist"}
            </h1>
            <p className="text-slate-400 mt-2 text-lg italic">
              {loading && coins.length === 0 ? "Connecting to terminal..." : `Live data for ${filteredCoins.length} assets`}
            </p>
          </div>

          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button 
              onClick={() => setView("market")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'market' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Market
            </button>
            <button 
              onClick={() => setView("watchlist")}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'watchlist' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Watchlist
            </button>
          </div>
        </header>

        {loading && coins.length === 0 ? (
          <div className="flex justify-center py-40">
             <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <MarketGrid 
             coins={filteredCoins} 
             onAction={handleAction} // Ensure this matches the function name in App.jsx
             isWatchlist={view === "watchlist"}
          />
        )}

        {!loading && filteredCoins.length === 0 && (
          <div className="text-center py-32 border-2 border-dashed border-slate-900 rounded-[2rem]">
            <p className="text-slate-600 text-xl font-medium">
              {view === "market" ? "No assets found." : "Your watchlist is currently empty."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;