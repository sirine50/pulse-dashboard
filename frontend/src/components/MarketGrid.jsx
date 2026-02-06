import React from 'react';
import CoinCard from './CoinCard';

const MarketGrid = ({ coins, onAction, isWatchlist }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {coins.map((coin) => (
        <CoinCard 
          key={coin.id} 
          coin={coin} 
          onAction={onAction} 
          isWatchlist={isWatchlist} 
        />
      ))}
    </div>
  );
};

export default MarketGrid;