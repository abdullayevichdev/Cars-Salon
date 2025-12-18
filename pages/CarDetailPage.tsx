
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_CARS } from '../constants';
import { getCarAIReview } from '../geminiService';
import { useApp } from '../App';

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToWishlist, state } = useApp();
  const [aiReview, setAiReview] = useState<string>('Avtomobil tahlil qilinmoqda...');
  const [loadingAI, setLoadingAI] = useState(false);

  const car = MOCK_CARS.find(c => c.id === id);

  useEffect(() => {
    if (!car) {
      navigate('/listings');
      return;
    }

    const fetchReview = async () => {
      setLoadingAI(true);
      const review = await getCarAIReview(car.brand, car.model);
      setAiReview(review);
      setLoadingAI(false);
    };

    fetchReview();
  }, [car, navigate]);

  if (!car) return null;

  return (
    <div className="bg-slate-950 pb-32">
      {/* Immersive Gallery */}
      <section className="relative h-[85vh] overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={car.model} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        <div className="absolute bottom-20 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4">
             <span className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-[0.3em] mb-6 inline-block shadow-xl shadow-indigo-600/30">{car.category}</span>
             <h1 className="text-6xl md:text-8xl font-outfit font-extrabold text-white mb-4 tracking-tighter uppercase leading-none">{car.brand} {car.model}</h1>
             <div className="flex items-center gap-6 text-indigo-400 font-bold uppercase tracking-widest text-sm">
                <span>{car.year} Premium Nashr</span>
                <div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
                <span>{car.region} Spesifikatsiyasi</span>
             </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-16 mt-20">
        {/* Left: Main Details */}
        <div className="lg:col-span-2 space-y-20">
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 font-outfit uppercase tracking-tight">Avtomobil Tavsifi</h2>
            <p className="text-slate-400 text-xl leading-relaxed font-light">{car.description}</p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-white mb-8 font-outfit uppercase tracking-tight">Texnik Xususiyatlari</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Ot kuchi', value: `${car.specs.hp} HP` },
                { label: '0-100 km/soat', value: car.specs.acceleration },
                { label: 'Maks. Tezlik', value: car.specs.topSpeed },
                { label: 'Masofa (WLTP)', value: car.specs.range || 'Peak unumdorlik' },
                { label: 'Yoqilg\'i Tizimi', value: car.fuelType },
                { label: 'Mintaqa', value: car.region },
                { label: 'Ishlab chiqarilgan yili', value: car.year },
                { label: 'Transmissiya', value: car.transmission },
              ].map((spec, i) => (
                <div key={i} className="bg-slate-900 border border-white/5 p-6 rounded-2xl group hover:border-indigo-500/30 transition-all">
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-2">{spec.label}</p>
                  <p className="text-white font-bold text-lg uppercase tracking-tight">{spec.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* AI Insights Section */}
          <section className="bg-gradient-to-br from-indigo-900/20 to-slate-900 p-12 rounded-[3rem] border border-indigo-500/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-10 opacity-5">
                <svg className="w-40 h-40 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
             </div>
             <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-indigo-600/30">
                   <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <h2 className="text-2xl font-bold text-white font-outfit uppercase tracking-widest">AI Ekspert Xulosasi</h2>
             </div>
             {loadingAI ? (
               <div className="space-y-4">
                 <div className="h-5 bg-white/5 rounded-full w-3/4 animate-pulse"></div>
                 <div className="h-5 bg-white/5 rounded-full w-1/2 animate-pulse"></div>
               </div>
             ) : (
               <p className="text-white text-2xl font-light italic leading-relaxed">"{aiReview}"</p>
             )}
             <div className="mt-10 flex items-center gap-4 text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase">
                <span>Tasdiqlagan: Abdullayevich</span>
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                <span>Nazorat: Avazxanov_701</span>
             </div>
          </section>
        </div>

        {/* Right: Sidebar Actions */}
        <div className="space-y-10">
          <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-white/5 shadow-2xl sticky top-32">
            <div className="mb-10">
              <p className="text-indigo-400 text-[10px] uppercase tracking-[0.4em] font-bold mb-2">Sotuvdagi narxi</p>
              <h3 className="text-5xl font-outfit font-extrabold text-white tracking-tighter">${car.price.toLocaleString()}</h3>
            </div>
            
            <div className="space-y-4">
              <button className="w-full bg-white text-slate-950 py-5 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl active:scale-95 uppercase tracking-[0.2em] text-xs">
                Sotuvchi bilan bog'lanish
              </button>
              <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 active:scale-95 uppercase tracking-[0.2em] text-xs">
                Sotib olish
              </button>
              <button 
                onClick={() => addToWishlist(car.id)}
                className="w-full bg-slate-950 text-white py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all border border-white/10 uppercase tracking-[0.2em] text-xs"
              >
                {state.wishlist.includes(car.id) ? 'Sevimlilarga qo\'shildi' : 'Sevimlilarga saqlash'}
              </button>
            </div>

            <div className="mt-10 pt-10 border-t border-white/5 space-y-6">
              <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <span>Tekshirilgan avtomobil</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 012.5 2.5V17m-3-1l3 3m-3-3l-3-1m-2 4l-2 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>Global yetkazib berish</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
