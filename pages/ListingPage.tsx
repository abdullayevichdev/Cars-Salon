
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_CARS, CATEGORIES, REGIONS, BRANDS } from '../constants';
import CarCard from '../components/CarCard';

const ListingPage: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(16);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    brand: '',
    category: '',
    region: '',
    search: '',
    priceRange: 500000,
  });

  const filteredCars = useMemo(() => {
    return MOCK_CARS.filter(car => {
      return (
        (filter.brand === '' || car.brand === filter.brand) &&
        (filter.category === '' || car.category === filter.category) &&
        (filter.region === '' || car.region === filter.region) &&
        (car.price <= filter.priceRange) &&
        (car.brand.toLowerCase().includes(filter.search.toLowerCase()) || 
         car.model.toLowerCase().includes(filter.search.toLowerCase()))
      );
    });
  }, [filter]);

  const displayedCars = filteredCars.slice(0, visibleCount);

  const loadMore = () => {
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setVisibleCount(prev => prev + 16);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="bg-slate-950 min-h-screen pb-32">
      <div className="pt-32 pb-16 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-outfit font-bold text-white mb-6 uppercase tracking-tighter">Avtomobillar Katalogi</h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">Global bozordagi minglab premium avtomobillarni o'rganing.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8">
        {/* Filters */}
        <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 shadow-2xl mb-16 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">Qidiruv</label>
            <input 
              type="text" 
              placeholder="Model yoki Brend..." 
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              value={filter.search}
              onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">Brend</label>
            <select 
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none"
              value={filter.brand}
              onChange={(e) => setFilter(prev => ({ ...prev, brand: e.target.value }))}
            >
              <option value="">Barcha brendlar</option>
              {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">Toifa</label>
            <select 
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none"
              value={filter.category}
              onChange={(e) => setFilter(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="">Barcha toifalar</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">Mintaqa</label>
            <select 
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none"
              value={filter.region}
              onChange={(e) => setFilter(prev => ({ ...prev, region: e.target.value }))}
            >
              <option value="">Dunyo bo'ylab</option>
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] flex justify-between">
              Maksimal Narx <span>${filter.priceRange.toLocaleString()}</span>
            </label>
            <input 
              type="range" 
              min="20000" 
              max="500000" 
              step="5000"
              className="w-full accent-indigo-500 mt-5 cursor-pointer"
              value={filter.priceRange}
              onChange={(e) => setFilter(prev => ({ ...prev, priceRange: parseInt(e.target.value) }))}
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-10 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <p>Hozirda <span className="text-white">{displayedCars.length}</span> / <span className="text-white">{filteredCars.length}</span> avtomobil ko'rsatilmoqda</p>
        </div>

        {displayedCars.length > 0 ? (
          <div className="flex flex-col gap-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayedCars.map(car => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
            
            {visibleCount < filteredCars.length && (
              <div className="flex flex-col items-center gap-6">
                <button 
                  onClick={loadMore}
                  disabled={loading}
                  className="px-16 py-6 bg-white text-slate-950 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center gap-4"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                      Yuklanmoqda...
                    </>
                  ) : (
                    <>
                      Ko'proq ko'rish
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
                <p className="text-[9px] text-slate-600 uppercase tracking-widest font-bold">Abdulhay Motors - Global Katalog</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-40 bg-slate-900/30 rounded-[3rem] border border-dashed border-white/10">
            <div className="w-20 h-20 bg-slate-950 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Avtomobil topilmadi</h3>
            <p className="text-slate-500 font-medium">Qidiruv parametrlarini o'zgartirib ko'ring.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingPage;
