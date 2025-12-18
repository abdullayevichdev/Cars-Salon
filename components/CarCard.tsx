
import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';
import { useApp } from '../App';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const { addToWishlist, removeFromWishlist, state } = useApp();
  const isWishlisted = state.wishlist.includes(car.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) removeFromWishlist(car.id);
    else addToWishlist(car.id);
  };

  return (
    <Link to={`/car/${car.id}`} className="group bg-slate-900/40 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all duration-700 hover:shadow-2xl hover:shadow-indigo-500/15 flex flex-col h-full">
      <div className="relative aspect-[16/11] overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90"></div>
        
        <button 
          onClick={handleWishlist}
          className={`absolute top-6 right-6 p-4 rounded-full backdrop-blur-xl transition-all duration-300 shadow-2xl ${isWishlisted ? 'bg-indigo-600 text-white' : 'bg-slate-950/40 text-white/80 hover:text-white border border-white/10'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <div className="absolute bottom-6 left-8 right-8">
          <div className="inline-block bg-indigo-600/90 backdrop-blur-md px-3 py-1 rounded-lg text-[8px] font-extrabold text-white uppercase tracking-[0.2em] mb-3 shadow-lg">
            {car.category}
          </div>
          <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight leading-none">{car.brand} {car.model}</h3>
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-end mb-10">
           <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex flex-col gap-1">
              <span>{car.year} Premium</span>
              <span className="text-slate-700">{car.region} Spesifikatsiyasi</span>
           </div>
           <div className="text-right">
              <p className="text-[8px] text-indigo-400 uppercase tracking-widest font-extrabold mb-1">Narxi</p>
              <p className="text-2xl font-outfit font-extrabold text-white leading-none">${car.price.toLocaleString()}</p>
           </div>
        </div>

        <div className="grid grid-cols-3 gap-6 border-y border-white/5 py-8 mb-8">
          <div className="text-center">
            <p className="text-[8px] text-slate-600 uppercase font-bold tracking-[0.3em] mb-2">Quvvat</p>
            <p className="text-xs font-bold text-white">{car.specs.hp} HP</p>
          </div>
          <div className="text-center border-x border-white/5">
            <p className="text-[8px] text-slate-600 uppercase font-bold tracking-[0.3em] mb-2">Tezlanish</p>
            <p className="text-xs font-bold text-white">{car.specs.acceleration}</p>
          </div>
          <div className="text-center">
            <p className="text-[8px] text-slate-600 uppercase font-bold tracking-[0.3em] mb-2">Turi</p>
            <p className="text-xs font-bold text-white truncate px-1">{car.fuelType}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
           <button className="py-4 bg-white text-slate-950 hover:bg-indigo-50 transition-all rounded-2xl text-[9px] font-bold uppercase tracking-[0.2em] shadow-xl active:scale-95">
              Ko'rish
           </button>
           <button className="py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all rounded-2xl text-[9px] font-bold uppercase tracking-[0.2em] active:scale-95">
              Taqqoslash
           </button>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
