
import React, { useState, useMemo } from 'react';
import { CATEGORIES, REGIONS, BRANDS } from '../constants';
import CarCard from '../components/CarCard';
import { useApp } from '../App';

const ListingPage: React.FC = () => {
  const { state } = useApp();
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    brand: '',
    category: '',
    region: '',
    search: '',
    priceRange: 500000,
  });

  const filteredCars = useMemo(() => {
    return state.cars.filter(car => {
      return (
        (filter.brand === '' || car.brand === filter.brand) &&
        (filter.category === '' || car.category === filter.category) &&
        (filter.region === '' || car.region === filter.region) &&
        (car.price <= filter.priceRange) &&
        (car.brand.toLowerCase().includes(filter.search.toLowerCase()) || 
         car.model.toLowerCase().includes(filter.search.toLowerCase()))
      );
    });
  }, [state.cars, filter]);

  const displayedCars = filteredCars.slice(0, visibleCount);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 12);
      setLoading(false);
    }, 800);
  };

  const isDark = state.settings.theme === 'dark';
  const isUz = state.settings.language === 'uz';

  return (
    <div className={`min-h-screen pb-32 transition-colors duration-500 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className={`pt-32 pb-24 border-b transition-all duration-500 ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-white/5' : 'bg-gradient-to-b from-slate-100 to-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block bg-indigo-600/10 px-4 py-1.5 rounded-full mb-6">
             <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.5em]">{isUz ? 'Global Katalog' : 'Global Catalog'}</span>
          </div>
          <h1 className={`text-6xl font-outfit font-extrabold mb-8 uppercase tracking-tighter leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isUz ? 'Barcha Avtomobillar' : 'All Vehicles'}
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light tracking-wide italic">
             {isUz ? 'Minglab premium tanlovlar, global yetkazib berish xizmati bilan.' : 'Thousands of premium choices, with global delivery service.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10">
        <div className={`backdrop-blur-2xl p-10 rounded-[3rem] border shadow-2xl mb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 transition-colors duration-500 ${isDark ? 'bg-slate-900/80 border-white/5' : 'bg-white/90 border-slate-200'}`}>
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] ml-2">{isUz ? 'Qidiruv' : 'Search'}</label>
            <input 
              type="text" 
              placeholder={isUz ? "Brend yoki model..." : "Brand or model..."}
              className={`w-full border rounded-[1.5rem] px-8 py-5 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none ${isDark ? 'bg-slate-950 border-white/5 text-white' : 'bg-slate-100 border-slate-200'}`}
              value={filter.search}
              onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] ml-2">{isUz ? 'Brend' : 'Brand'}</label>
            <select 
              className={`w-full border rounded-[1.5rem] px-8 py-5 text-sm outline-none appearance-none transition-all ${isDark ? 'bg-slate-950 border-white/5 text-white' : 'bg-slate-100 border-slate-200'}`}
              value={filter.brand}
              onChange={(e) => setFilter(prev => ({ ...prev, brand: e.target.value }))}
            >
              <option value="">{isUz ? 'Barcha brendlar' : 'All brands'}</option>
              {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] ml-2">{isUz ? 'Toifa' : 'Category'}</label>
            <select 
              className={`w-full border rounded-[1.5rem] px-8 py-5 text-sm outline-none appearance-none transition-all ${isDark ? 'bg-slate-950 border-white/5 text-white' : 'bg-slate-100 border-slate-200'}`}
              value={filter.category}
              onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="">{isUz ? 'Barcha toifalar' : 'All categories'}</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] ml-2">{isUz ? 'Narx' : 'Price'}</label>
             <div className="pt-2">
                <input 
                  type="range" min="20000" max="1000000" step="10000"
                  className="w-full h-1.5 bg-indigo-500/20 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={filter.priceRange}
                  onChange={(e) => setFilter(prev => ({ ...prev, priceRange: parseInt(e.target.value) }))}
                />
                <div className="flex justify-between mt-3 text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest">
                   <span>$20K</span>
                   <span>${(filter.priceRange / 1000).toFixed(0)}K</span>
                </div>
             </div>
          </div>
          <div className="flex items-end">
             <button 
               onClick={() => setFilter({ brand: '', category: '', region: '', search: '', priceRange: 1000000 })}
               className="w-full bg-slate-950/10 hover:bg-slate-950/20 py-5 rounded-[1.5rem] text-[9px] font-bold uppercase tracking-[0.3em] transition-all border border-slate-700/20"
             >
                {isUz ? 'Filtrlarni tozalash' : 'Clear filters'}
             </button>
          </div>
        </div>

        {displayedCars.length > 0 ? (
          <div className="flex flex-col gap-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {displayedCars.map(car => <CarCard key={car.id} car={car} />)}
            </div>
            {visibleCount < filteredCars.length && (
              <div className="flex flex-col items-center gap-8 py-10">
                <button 
                  onClick={loadMore} disabled={loading}
                  className={`px-16 py-7 rounded-[2.5rem] font-bold uppercase tracking-[0.4em] text-[10px] transition-all shadow-2xl active:scale-95 group flex items-center gap-6 ${isDark ? 'bg-white text-slate-950 hover:bg-indigo-600 hover:text-white' : 'bg-slate-900 text-white hover:bg-indigo-600'}`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      {isUz ? 'Ko\'proq ko\'rish' : 'Load More'}
                      <svg className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7"/></svg>
                    </>
                  )}
                </button>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.5em]">{filteredCars.length} {isUz ? 'ta avtomobildan' : 'total vehicles'}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-48 bg-slate-900/10 rounded-[4rem] border border-dashed border-slate-700/30">
            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-700">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <h3 className="text-3xl font-bold mb-4 uppercase tracking-tighter">Hech narsa topilmadi</h3>
            <p className="text-slate-500">Qidiruv parametrlarini o'zgartirib ko'ring.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingPage;
