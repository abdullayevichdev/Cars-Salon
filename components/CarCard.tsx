
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';
import { useApp } from '../App';
import ImageWithFallback from './ImageWithFallback';
import { notifyPurchaseRequest } from '../telegramService';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { addToWishlist, removeFromWishlist, state } = useApp();
  const [loading, setLoading] = useState(false);
  const isWishlisted = state.wishlist.includes(car.id);
  const isDark = state.settings.theme === 'dark';

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) removeFromWishlist(car.id);
    else addToWishlist(car.id);
  };

  const handlePurchase = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const currentUser = state.users[0];
    if (!currentUser) return;
    
    setLoading(true);
    await notifyPurchaseRequest(currentUser, car);
    alert("Sotib olish so'rovi yuborildi!");
    setLoading(false);
  };

  return (
    <Link to={`/car/${car.id}`} className={`group rounded-[2.5rem] overflow-hidden border transition-all duration-700 hover:shadow-[0_0_50px_rgba(79,70,229,0.1)] flex flex-col h-full ${isDark ? 'bg-slate-900/40 border-white/5 hover:border-indigo-500/30' : 'bg-white border-slate-200 hover:border-indigo-500/40 shadow-lg'}`}>
      <div className="relative aspect-[16/11] overflow-hidden">
        <ImageWithFallback 
          src={car.imageUrl} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t opacity-80 ${isDark ? 'from-slate-950 via-slate-950/20' : 'from-slate-100/40 via-transparent'}`}></div>
        
        <button 
          onClick={handleWishlist}
          className={`absolute top-6 right-6 p-4 rounded-full backdrop-blur-xl transition-all duration-300 shadow-2xl ${isWishlisted ? 'bg-indigo-600 text-white' : 'bg-slate-950/40 text-white/80 hover:text-white border border-white/10'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <div className="absolute bottom-6 left-8 right-8">
          <div className="inline-block bg-indigo-600/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[8px] font-extrabold text-white uppercase tracking-[0.2em] mb-3 shadow-lg">
            {car.category}
          </div>
          <h3 className={`text-2xl font-bold uppercase tracking-tight leading-none group-hover:text-indigo-500 transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{car.brand} {car.model}</h3>
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-end mb-10">
           <div className="text-slate-500 text-[9px] font-bold uppercase tracking-widest flex flex-col gap-1 opacity-60">
              <span>{car.year} Premium</span>
              <span className="text-indigo-400">{car.region}</span>
           </div>
           <div className="text-right">
              <p className="text-[8px] text-indigo-500 uppercase tracking-widest font-extrabold mb-1">Narxi</p>
              <p className={`text-2xl font-outfit font-extrabold leading-none ${isDark ? 'text-white' : 'text-slate-950'}`}>${car.price.toLocaleString()}</p>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button 
             onClick={handlePurchase}
             disabled={loading}
             className="py-4 bg-indigo-600 text-white hover:bg-indigo-500 transition-all rounded-2xl text-[9px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/10 active:scale-95 flex items-center justify-center"
           >
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Sotib Olish'}
           </button>
           <button className={`py-4 transition-all rounded-2xl text-[9px] font-bold uppercase tracking-[0.2em] active:scale-95 border ${isDark ? 'bg-white/5 hover:bg-white/10 text-white border-white/10' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'}`}>
              Taqqoslash
           </button>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
