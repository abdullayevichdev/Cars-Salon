
import React, { useState, useMemo } from 'react';
// Fix: Removed MOCK_FINANCE as it is not exported from constants
import { CATEGORIES, BRANDS } from '../constants';
import { Car, UserAccount, FuelType, Transmission, Region } from '../types';
import { useApp } from '../App';
import ImageWithFallback from '../components/ImageWithFallback';

const SIMULATED_BACKEND_CODE = '933223580';

type AdminView = 'Dashboard' | 'Avtomobillar' | 'Foydalanuvchilar' | 'Moliya' | 'Sozlamalar';

const AdminDashboard: React.FC = () => {
  const { state, updateSettings, setCars, setUsers } = useApp();
  const { theme, language } = state.settings;

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState(false);
  const [currentView, setCurrentView] = useState<AdminView>('Dashboard');
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const t = {
    uz: {
      loginTitle: "Abdulhay Motors Boshqaruv",
      loginSubtitle: "Abdulhay kirish kodingizni kiriting",
      loginBtn: "Kirish",
      wrongCode: "Noto'g'ri kod kiritildi",
      logout: "Chiqish",
      dashTitle: "Boshqaruv Markazi",
      dashSubtitle: "Platformaning real vaqt rejimida statistikasi",
      addCar: "Yangi E'lon Qo'shish",
      totalCars: "Jami Avtomobillar",
      activeUsers: "Tizim Foydalanuvchilari",
      views: "Global Ko'rishlar",
      revenue: "Taxminiy Daromad",
      carsTitle: "Avtomobillar Bazasi",
      usersTitle: "Foydalanuvchilar Ma'lumotlari (Tashriflar)",
      financeTitle: "Moliyaviy Hisobot",
      settingsTitle: "Tizim Sozlamalari",
      edit: "Tahrirlash",
      delete: "O'chirish",
      save: "Saqlash",
      cancel: "Bekor Qilish",
      block: "Bloklash",
      unblock: "Faollashtirish",
      imgPlaceholder: "URL-larni vergul bilan ajrating",
    },
    en: {
      loginTitle: "Abdulhay Motors Admin",
      loginSubtitle: "Enter Abdulhay access code",
      loginBtn: "Login",
      wrongCode: "Incorrect access code",
      logout: "Logout",
      dashTitle: "Command Center",
      dashSubtitle: "Real-time platform metrics and monitoring",
      addCar: "Add New Listing",
      totalCars: "Total Inventory",
      activeUsers: "Platform Users",
      views: "Global Pageviews",
      revenue: "Estimated Revenue",
      carsTitle: "Inventory Management",
      usersTitle: "User Analytics (Visits)",
      financeTitle: "Financial Reports",
      settingsTitle: "System Controls",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      block: "Block",
      unblock: "Activate",
      imgPlaceholder: "URLs separated by commas",
    }
  };

  const curT = t[language];
  const isDark = theme === 'dark';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode === SIMULATED_BACKEND_CODE) {
      setIsAuthorized(true);
      setError(false);
    } else {
      setError(true);
      setInputCode('');
    }
  };

  const deleteCar = (id: string) => {
    if (window.confirm("Ushbu e'lonni o'chirmoqchimisiz?")) {
      setCars(prev => prev.filter(c => c.id !== id));
    }
  };

  const deleteUser = (id: string) => {
    if (window.confirm("Foydalanuvchi ma'lumotini o'chirmoqchimisiz?")) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Faol' ? 'Bloklangan' : 'Faol' } : u));
  };

  const filteredCars = useMemo(() => {
    return state.cars.filter(c => 
      c.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.model.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 100);
  }, [state.cars, searchQuery]);

  if (!isAuthorized) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-50'} flex items-center justify-center p-6`}>
        <div className={`w-full max-w-md border rounded-[3rem] p-12 shadow-2xl transition-all duration-500 ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h1 className={`text-2xl font-outfit font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{curT.loginTitle}</h1>
            <p className="text-slate-500 text-sm">{curT.loginSubtitle}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password"
              placeholder="•••••••••"
              className={`w-full border rounded-2xl px-6 py-5 text-center tracking-[1em] focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold ${isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              autoFocus
            />
            {error && <p className="text-red-500 text-[10px] text-center mt-3 font-bold uppercase tracking-widest">{curT.wrongCode}</p>}
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl active:scale-95 transition-all">
              {curT.loginBtn}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen transition-all duration-300 ${isDark ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-800'}`}>
      <aside className={`w-80 border-r flex flex-col fixed inset-y-0 left-0 pt-20 shadow-2xl z-40 transition-colors duration-300 ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
        <div className="px-8 py-10">
          <nav className="space-y-4">
            {[
              { id: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { id: 'Avtomobillar', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
              { id: 'Foydalanuvchilar', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
              { id: 'Moliya', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { id: 'Sozlamalar', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => setCurrentView(item.id as AdminView)}
                className={`w-full flex items-center gap-5 px-6 py-5 rounded-2xl transition-all ${currentView === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'hover:bg-indigo-500/10 opacity-70 hover:opacity-100'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.id}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-10 border-t border-white/5">
          <button onClick={() => setIsAuthorized(false)} className="w-full py-4 bg-red-500/10 text-red-500 rounded-2xl text-[9px] font-bold hover:bg-red-500 hover:text-white transition-all uppercase tracking-[0.3em] border border-red-500/20">{curT.logout}</button>
        </div>
      </aside>

      <main className="flex-1 ml-80 p-12 pt-32">
        <header className="flex flex-col lg:flex-row justify-between lg:items-center mb-16 border-b border-slate-700/20 pb-10 gap-8">
          <div>
            <h1 className={`text-4xl font-outfit font-bold mb-2 uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>{curT.dashTitle}</h1>
            <p className="opacity-50 font-medium text-xs">{curT.dashSubtitle}</p>
          </div>
          {currentView === 'Avtomobillar' && (
            <button onClick={() => setIsAddingCar(true)} className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95">{curT.addCar}</button>
          )}
        </header>

        {currentView === 'Dashboard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: curT.totalCars, value: state.cars.length, trend: '+5 yangi' },
              { label: curT.activeUsers, value: state.users.length, trend: 'Oxirgi tashriflar' },
              { label: curT.views, value: '45,291', trend: 'Global' },
              { label: curT.revenue, value: '$12.8M', trend: '2024 YTD' },
            ].map((stat, i) => (
              <div key={i} className={`p-10 rounded-[3rem] shadow-xl border ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                <p className="text-[9px] font-bold opacity-50 uppercase tracking-[0.3em] mb-4">{stat.label}</p>
                <h3 className={`text-4xl font-outfit font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}</h3>
                <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">{stat.trend}</p>
              </div>
            ))}
          </div>
        )}

        {currentView === 'Avtomobillar' && (
          <div className={`rounded-[3rem] border shadow-2xl overflow-hidden ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
            <div className="px-10 py-8 border-b border-slate-700/20">
              <input placeholder="Qidiruv..." className={`w-full md:w-96 border rounded-2xl px-6 py-4 text-xs outline-none ${isDark ? 'bg-slate-950 border-white/5 text-white' : 'bg-slate-50 border-slate-200'}`} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold border-b border-slate-700/20">
                  <tr><th className="px-10 py-8">Model</th><th className="px-10 py-8">Yil</th><th className="px-10 py-8">Narxi</th><th className="px-10 py-8 text-right">Amallar</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-700/10">
                  {filteredCars.map(car => (
                    <tr key={car.id} className="hover:bg-indigo-500/5 transition-colors group">
                      <td className="px-10 py-6 flex items-center gap-5">
                         <ImageWithFallback src={car.imageUrl} className="w-16 h-12 object-cover rounded-xl" />
                         <span className="font-bold text-sm uppercase tracking-tight">{car.brand} {car.model}</span>
                      </td>
                      <td className="px-10 py-6 text-xs font-bold">{car.year}</td>
                      <td className="px-10 py-6 font-bold font-outfit text-base text-indigo-500">${car.price.toLocaleString()}</td>
                      <td className="px-10 py-6 text-right space-x-6">
                        <button onClick={() => setEditingCar(car)} className="text-indigo-400 font-bold uppercase text-[9px] tracking-widest hover:text-indigo-500">{curT.edit}</button>
                        <button onClick={() => deleteCar(car.id)} className="text-red-400 font-bold uppercase text-[9px] tracking-widest hover:text-red-500">{curT.delete}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {currentView === 'Foydalanuvchilar' && (
          <div className={`rounded-[3rem] border shadow-2xl overflow-hidden ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-bold border-b border-slate-700/20">
                  <tr><th className="px-10 py-8">Foydalanuvchi</th><th className="px-10 py-8">Tashrif Vaqti</th><th className="px-10 py-8 text-center">Yosh</th><th className="px-10 py-8 text-right">Amallar</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-700/10">
                  {state.users.map(user => (
                    <tr key={user.id} className="hover:bg-indigo-500/5 transition-colors">
                      <td className="px-10 py-6">
                        <p className="font-bold text-sm uppercase tracking-tight">{user.firstName} {user.lastName}</p>
                        <p className="text-[9px] text-indigo-400/70 font-bold uppercase">{user.provider || 'none'}</p>
                      </td>
                      <td className="px-10 py-6 text-[10px] font-medium opacity-60 uppercase">{user.visitTimestamp}</td>
                      <td className="px-10 py-6 text-center text-xs font-bold">{user.age}</td>
                      <td className="px-10 py-6 text-right">
                        <button onClick={() => deleteUser(user.id)} className="text-red-400 font-bold uppercase text-[9px] tracking-widest hover:text-red-500">O'chirish</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit/Add Modals */}
        {(editingCar || isAddingCar) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
            <div className={`w-full max-w-4xl rounded-[4rem] p-16 border shadow-2xl overflow-y-auto max-h-[90vh] transition-all ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
              <h2 className="text-4xl font-bold font-outfit uppercase tracking-tighter mb-12">{editingCar ? curT.edit : curT.addCar}</h2>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const imgString = formData.get('imageUrls') as string;
                  const imgs = imgString.split(',').map(s => s.trim()).filter(s => !!s);
                  const newCarData: Car = {
                    id: editingCar?.id || Date.now().toString(),
                    brand: formData.get('brand') as string,
                    model: formData.get('model') as string,
                    year: Number(formData.get('year')),
                    price: Number(formData.get('price')),
                    currency: 'USD',
                    imageUrl: imgs[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
                    imageUrls: imgs.length > 0 ? imgs : [imgs[0]],
                    category: formData.get('category') as any,
                    fuelType: FuelType.Petrol,
                    transmission: Transmission.Automatic,
                    region: Region.USA,
                    specs: { hp: 500, acceleration: '3.0s', topSpeed: '300 km/h' },
                    description: formData.get('description') as string || 'Premium global avtomobil',
                    createdAt: new Date().toISOString()
                  };
                  if (editingCar) setCars(prev => prev.map(c => c.id === editingCar.id ? newCarData : c));
                  else setCars(prev => [newCarData, ...prev]);
                  setEditingCar(null); setIsAddingCar(false);
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-10"
              >
                <div className="md:col-span-2 space-y-4">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Rasmlar Galereyasi (URL-lar vergul bilan)</label>
                   <textarea name="imageUrls" rows={3} className={`w-full border p-6 rounded-[2rem] outline-none text-xs ${isDark ? 'bg-slate-950 border-white/5 text-white' : 'bg-slate-50 border-slate-300'}`} defaultValue={editingCar?.imageUrls?.join(', ') || editingCar?.imageUrl} />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Brend</label>
                  <select name="brand" className={`w-full border p-5 rounded-[1.5rem] outline-none ${isDark ? 'bg-slate-950 border-white/5 text-white' : 'bg-slate-100'}`} defaultValue={editingCar?.brand}>
                    {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Model</label>
                  <input name="model" required className={`w-full border p-5 rounded-[1.5rem] outline-none ${isDark ? 'bg-slate-950 border-white/5 text-white' : 'bg-slate-50'}`} defaultValue={editingCar?.model} />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Yil</label>
                  <input name="year" type="number" required className={`w-full border p-5 rounded-[1.5rem] outline-none ${isDark ? 'bg-slate-950 border-white/5 text-white' : 'bg-slate-50'}`} defaultValue={editingCar?.year} />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Narx (USD)</label>
                  <input name="price" type="number" required className={`w-full border p-5 rounded-[1.5rem] outline-none ${isDark ? 'bg-slate-950 border-white/5 text-white' : 'bg-slate-50'}`} defaultValue={editingCar?.price} />
                </div>
                <div className="md:col-span-2 pt-12 flex gap-6">
                  <button type="submit" className="flex-1 py-6 bg-indigo-600 text-white rounded-[2rem] font-bold uppercase tracking-widest text-[10px] shadow-2xl active:scale-95">{curT.save}</button>
                  <button type="button" onClick={() => { setEditingCar(null); setIsAddingCar(false); }} className={`flex-1 py-6 rounded-[2rem] font-bold uppercase tracking-widest text-[10px] ${isDark ? 'bg-slate-800 text-white' : 'bg-slate-200'}`}>{curT.cancel}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
