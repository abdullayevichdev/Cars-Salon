
import React from 'react';
import { useApp } from '../App';
import { MOCK_CARS } from '../constants';
import CarCard from '../components/CarCard';
import { Link } from 'react-router-dom';

const WishlistPage: React.FC = () => {
  const { state } = useApp();
  const wishlistedCars = MOCK_CARS.filter(car => state.wishlist.includes(car.id));

  return (
    <div className="bg-slate-950 min-h-screen pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-outfit font-bold text-white mb-1">My Garage</h1>
          <p className="text-slate-500">Your curated selection of future masterpieces.</p>
        </div>

        {wishlistedCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistedCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-slate-900/50 rounded-3xl border border-dashed border-slate-800">
             <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-500">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Your garage is empty</h3>
            <p className="text-slate-400 max-w-sm mx-auto mb-8">Start exploring our inventory and save your favorite vehicles for later viewing.</p>
            <Link to="/listings" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
              Explore Inventory
            </Link>
          </div>
        )}

        <div className="mt-20 pt-12 border-t border-slate-900 text-center">
            <h4 className="text-white font-outfit font-bold text-xl mb-4">Ready to take the next step?</h4>
            <p className="text-slate-500 mb-8">Connect with an Abdulhay Motors specialist to discuss financing or logistics.</p>
            <button className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-700 transition-colors border border-slate-700">
              Inquire About Wishlist
            </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
