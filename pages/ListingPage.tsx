
import React, { useState, useMemo } from 'react';
import { CATEGORIES, REGIONS, BRANDS } from '../constants';
import CarCard from '../components/CarCard';
import { useApp } from '../App';

const ListingPage: React.FC = () => {
  const { state } = useApp();
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
      setVisibleCount(prev => prev + 16);
      setLoading(false);
    }, 600);
  };

  const isDark = state.settings.theme === 'dark';

  return (
    <div className={`min-h-screen pb-32 transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <div className={`pt-32 pb-16 border-b transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-white/5' : 'bg-gradient-to-b from-slate-200 to-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className={`text-5xl font-outfit font-bold mb-6 uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {state.settings.language === 'uz' ? 'Avtomobillar Katalogi' : 'Car Catalog'}
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">Global bozordagi minglab premium avtomobillarni o'rganing.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8">
        {/* Filters */}
        <div className={`backdrop-blur-xl p-8 rounded-[2.5rem] border shadow-2xl mb-16 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 transition-colors duration-300 ${isDark ? 'bg-slate-900/80 border-white/5' : 'bg-white/90 border-slate-200'}`}>
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">Qidiruv</label>
            <input 
              type="text" 
              placeholder="Model yoki Brend..." 
              className={`w-full border rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none ${isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
              value={filter.search}
              onChange={(e) => setFilter(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em]">Brend</label>
            <select 
              className={`w-full border rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none ${isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
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
              className={`w-full border rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none ${isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
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
              className={`w-full border rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none ${isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
              value={filter.region}
              onChange={(e) => setFilter(prev => ({ ...prev, region: e.target.value }))}
            >
              <option value="">Dunyo bo'ylab</option>
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] flex justify-between">
              Narx <span>${filter.priceRange.toLocaleString()}</span>
            </label>
            <input 
              type="range" min="20000" max="500000" step="5000"
              className="w-full accent-indigo-500 mt-5 cursor-pointer"
              value={filter.priceRange}
              onChange={(e) => setFilter(prev => ({ ...prev, priceRange: parseInt(e.target.value) }))}
            />
          </div>
        </div>

        {displayedCars.length > 0 ? (
          <div className="flex flex-col gap-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayedCars.map(car => <CarCard key={car.id} car={car} />)}
            </div>
            {visibleCount < filteredCars.length && (
              <div className="flex flex-col items-center gap-6">
                <button 
                  onClick={loadMore} disabled={loading}
                  className={`px-16 py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] transition-all shadow-2xl active:scale-95 group flex items-center gap-4 ${isDark ? 'bg-white text-slate-950 hover:bg-indigo-600 hover:text-white' : 'bg-slate-900 text-white hover:bg-indigo-600'}`}
                >
                  {loading ? 'Yuklanmoqda...' : 'Ko\'proq ko\'rish'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-40">
            <h3 className="text-2xl font-bold mb-2">Avtomobil topilmadi</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingPage;
