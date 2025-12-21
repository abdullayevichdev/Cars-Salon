
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarAIReview } from '../geminiService';
import { useApp } from '../App';
import { notifyPurchaseRequest, notifyLiveView, notifyTestDrive } from '../telegramService';

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToWishlist, state } = useApp();
  const [aiReview, setAiReview] = useState<string>('Avtomobil tahlil qilinmoqda...');
  const [loadingAI, setLoadingAI] = useState(false);
  const [activeImage, setActiveImage] = useState<string>('');
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const car = state.cars.find(c => c.id === id);
  const isDark = state.settings.theme === 'dark';

  useEffect(() => {
    if (!car) {
      navigate('/listings');
      return;
    }
    setActiveImage(car.imageUrl);

    // Live View: Adminni xabardor qilish
    const currentUser = state.users[0];
    if (currentUser) {
      notifyLiveView(
        `${currentUser.firstName} ${currentUser.lastName} (${currentUser.age} yosh)`, 
        `${car.brand} ${car.model}`,
        `$${car.price.toLocaleString()}`
      );
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

  const handlePurchase = async () => {
    const currentUser = state.users[0];
    if (!currentUser) return;
    setIsPurchasing(true);
    await notifyPurchaseRequest(currentUser, car);
    alert("Sotib olish so'rovi yuborildi!");
    setIsPurchasing(false);
  };

  const handleTestDrive = async () => {
    const currentUser = state.users[0];
    if (!currentUser) return;
    const date = prompt("Test-drayv uchun qulay vaqtni yozing (Masalan: Ertaga soat 14:00):");
    if (!date) return;
    
    setIsBooking(true);
    await notifyTestDrive(`${currentUser.firstName} ${currentUser.lastName}`, car, date);
    alert("Test-drayvga buyurtmangiz qabul qilindi! Adminlarimiz siz bilan bog'lanishadi.");
    setIsBooking(false);
  };

  const images = car.imageUrls?.length ? car.imageUrls : [car.imageUrl];

  return (
    <div className={`min-h-screen transition-colors duration-500 pb-32 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <section className="relative h-[85vh] overflow-hidden">
        <img 
          src={activeImage} 
          alt={car.model} 
          className="w-full h-full object-cover transition-all duration-1000 scale-105"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-slate-950 via-slate-950/20' : 'from-slate-50 via-slate-50/10'} to-transparent`}></div>
        <div className="absolute bottom-24 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6">
             <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-4">
                   <span className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.4em] shadow-2xl shadow-indigo-600/30">{car.category}</span>
                   <span className="bg-white/10 backdrop-blur-xl text-white px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.4em] border border-white/5">{car.year} Premium</span>
                </div>
                <h1 className="text-7xl md:text-9xl font-outfit font-extrabold text-white tracking-tighter uppercase leading-[0.8]">
                   {car.brand} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-400">{car.model}</span>
                </h1>
             </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 flex gap-4 backdrop-blur-2xl p-4 rounded-[2.5rem] bg-black/30 border border-white/5">
           {images.map((img, i) => (
             <button key={i} onClick={() => setActiveImage(img)} className={`w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-indigo-500 scale-110 shadow-lg shadow-indigo-500/50' : 'border-transparent opacity-50 hover:opacity-100'}`}>
                <img src={img} className="w-full h-full object-cover" />
             </button>
           ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-24 mt-24">
        <div className="lg:col-span-2 space-y-24">
          <section>
            <div className="flex items-center gap-6 mb-12">
               <h2 className={`text-4xl font-bold font-outfit uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Tavsif va Ma'lumot</h2>
               <div className="flex-1 h-px bg-slate-700/30"></div>
            </div>
            <p className="text-slate-500 text-2xl leading-relaxed font-light italic">
               {car.description}
            </p>
          </section>

          <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Dvigatel Quvvati', value: `${car.specs.hp} HP` },
                { label: 'Tezlanish (0-100)', value: car.specs.acceleration },
                { label: 'Maksimal Tezlik', value: car.specs.topSpeed },
                { label: 'Energiya Turi', value: car.fuelType },
                { label: 'Transmissiya', value: car.transmission },
                { label: 'Region', value: car.region },
                { label: 'Kuzov Turi', value: car.category },
                { label: 'Status', value: 'Mavjud' },
              ].map((spec, i) => (
                <div key={i} className={`p-8 rounded-[2rem] border transition-all hover:scale-105 duration-500 ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200 hover:border-indigo-500/30'} shadow-xl`}>
                  <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.3em] mb-3">{spec.label}</p>
                  <p className={`font-bold text-xl uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{spec.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-indigo-950/30 to-slate-900/50 p-16 rounded-[4rem] border border-indigo-500/10 relative overflow-hidden shadow-[0_0_80px_rgba(79,70,229,0.05)]">
             <div className="flex items-center gap-6 mb-12">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center animate-pulse shadow-xl shadow-indigo-600/30">
                   <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <h2 className="text-3xl font-bold text-white font-outfit uppercase tracking-widest">AI Ekspert Xulosasi</h2>
             </div>
             {loadingAI ? (
               <div className="space-y-6">
                 <div className="h-6 bg-white/5 rounded-full w-4/5 animate-pulse"></div>
                 <div className="h-6 bg-white/5 rounded-full w-2/3 animate-pulse"></div>
               </div>
             ) : (
               <p className="text-white text-3xl font-light italic leading-relaxed tracking-tight">"{aiReview}"</p>
             )}
          </section>
        </div>

        <div className="space-y-12">
          <div className={`p-12 rounded-[3rem] border shadow-[0_0_100px_rgba(0,0,0,0.1)] sticky top-32 transition-all duration-500 ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
            <div className="mb-12">
              <p className="text-indigo-500 text-[10px] uppercase tracking-[0.5em] font-extrabold mb-4">Eksport Narxi (USD)</p>
              <h3 className={`text-6xl font-outfit font-extrabold tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>${car.price.toLocaleString()}</h3>
            </div>
            
            <div className="space-y-6">
              <button 
                onClick={handlePurchase}
                disabled={isPurchasing}
                className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-bold hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4"
              >
                {isPurchasing ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Hozir Sotib Olish'}
              </button>
              
              <button 
                onClick={handleTestDrive}
                disabled={isBooking}
                className={`w-full py-6 rounded-2xl font-bold transition-all border uppercase tracking-[0.3em] text-[10px] active:scale-95 flex items-center justify-center gap-4 ${isDark ? 'bg-white text-slate-950 hover:bg-indigo-50' : 'bg-slate-950 text-white hover:bg-slate-800'}`}
              >
                {isBooking ? <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div> : 'Test-Drayv Buyurtma'}
              </button>

              <button 
                onClick={() => addToWishlist(car.id)}
                className={`w-full py-6 rounded-2xl font-bold transition-all uppercase tracking-[0.3em] text-[10px] active:scale-95 ${state.wishlist.includes(car.id) ? 'bg-indigo-500 text-white' : (isDark ? 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}`}
              >
                {state.wishlist.includes(car.id) ? 'Sevimlilarda Saqlandi' : 'Garajga Saqlash'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
