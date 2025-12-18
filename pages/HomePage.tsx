
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CARS } from '../constants';
import CarCard from '../components/CarCard';
import { getCarRecommendation } from '../geminiService';

const HomePage: React.FC = () => {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const featuredCars = MOCK_CARS.slice(0, 4);

  useEffect(() => {
    const fetchAIRecommendation = async () => {
      setLoadingAI(true);
      const rec = await getCarRecommendation("eng zamonaviy hashamatli avtomobillar");
      setRecommendation(rec);
      setLoadingAI(false);
    };
    fetchAIRecommendation();
  }, []);

  return (
    <div className="overflow-hidden bg-slate-950">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-[0.3] scale-105"
            alt="Hero Car"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
          <div className="inline-block bg-indigo-600/10 border border-indigo-600/20 px-6 py-2 rounded-full mb-10 animate-fade-in">
             <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.5em]">Global Avto Bozor</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-outfit font-extrabold text-white mb-10 tracking-tighter leading-[0.9] uppercase">
            Abdulhay <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-400 to-indigo-600">Motors</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 mb-14 max-w-4xl mx-auto font-light leading-relaxed">
            Dunyodagi eng sara avtomobillar endi bitta platformada. <br/>
            Hashamat, tezlik va texnologiya — hammasi siz uchun.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link to="/listings" className="w-full sm:w-auto px-14 py-6 bg-white text-slate-950 font-bold rounded-2xl hover:bg-indigo-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl uppercase tracking-[0.3em] text-[10px]">
              Katalogga o'tish
            </Link>
            <Link to="/admin" className="w-full sm:w-auto px-14 py-6 bg-slate-900/50 backdrop-blur-xl text-white border border-white/10 font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-[0.3em] text-[10px]">
              Mashinani sotish
            </Link>
          </div>
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-slate-500 opacity-50">
          <span className="text-[9px] uppercase tracking-[0.6em] font-bold">Pastga tushish</span>
          <div className="w-px h-16 bg-gradient-to-b from-indigo-500 to-transparent"></div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-40 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="border-l-4 border-indigo-600 pl-10">
              <h2 className="text-5xl md:text-6xl font-outfit font-bold text-white mb-6 uppercase tracking-tighter">Saralangan Durdonalar</h2>
              <p className="text-slate-500 text-lg font-medium uppercase tracking-widest">Global katalogimizning eng yaxshi namunalari</p>
            </div>
            <Link to="/listings" className="text-indigo-400 font-bold hover:text-white transition-all flex items-center gap-4 group text-xs uppercase tracking-[0.3em] bg-white/5 px-8 py-4 rounded-xl border border-white/5">
              Barcha 2,000+ avtomobilni ko'rish <span className="group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* AI & Branding */}
      <section className="py-40 bg-slate-900/30 border-y border-white/5 relative">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block px-6 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-12">
            AI Intelligent Assistant
          </div>
          <h2 className="text-5xl md:text-7xl font-outfit font-bold text-white mb-14 tracking-tight uppercase">Sizning unikal tanlovingiz</h2>
          
          <div className="bg-slate-950 border border-white/5 p-16 rounded-[4rem] shadow-2xl relative group overflow-hidden">
            <div className="absolute -right-10 -top-10 p-12 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
              <svg className="w-64 h-64 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
            </div>
            {loadingAI ? (
              <div className="flex flex-col items-center py-20">
                <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-8 shadow-2xl"></div>
                <p className="text-slate-500 italic tracking-[0.4em] uppercase text-[10px] font-bold">Global tahlil qilinmoqda...</p>
              </div>
            ) : (
              <div className="relative z-10">
                <p className="text-3xl md:text-4xl text-slate-100 leading-tight mb-16 font-light italic">
                  "{recommendation}"
                </p>
                <div className="flex flex-wrap items-center justify-center gap-10 text-[11px] font-bold text-slate-500 uppercase tracking-[0.5em]">
                  <span className="text-indigo-400 border-r border-white/10 pr-10">Asoschilar:</span>
                  <span className="hover:text-white transition-colors">Abdullayevich</span>
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <span className="hover:text-white transition-colors">Avazxanov_701</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-32">
             <a href="https://instagram.com/avazxanov_701" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-6 bg-white/5 hover:bg-white/10 border border-white/10 px-10 py-5 rounded-2xl transition-all group">
                <svg className="w-10 h-10 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                <div className="text-left">
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Instagramda bizni kuzating</p>
                   <p className="text-white font-bold uppercase tracking-[0.2em] text-sm">@avazxanov_701</p>
                </div>
             </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
