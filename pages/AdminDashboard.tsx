
import React, { useState, useMemo } from 'react';
import { MOCK_FINANCE, CATEGORIES, BRANDS } from '../constants';
import { Car, UserAccount, FuelType, Transmission, Region } from '../types';
import { useApp } from '../App';

const ACCESS_CODE = '933223580';

type AdminView = 'Dashboard' | 'Avtomobillar' | 'Foydalanuvchilar' | 'Moliya' | 'Sozlamalar';

const AdminDashboard: React.FC = () => {
  const { state, updateSettings, setCars, setUsers } = useApp();
  const { theme, language, fontSize } = state.settings;

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState(false);
  const [currentView, setCurrentView] = useState<AdminView>('Dashboard');
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const t = {
    uz: {
      loginTitle: "Boshqaruv Paneli",
      loginSubtitle: "Abdulhay kirish kodingizni kiriting",
      loginBtn: "Kirish",
      wrongCode: "Noto'g'ri kod kiritildi",
      sidebarMain: "Admin Navigatsiyasi",
      logout: "Chiqish",
      dashTitle: "Boshqaruv Markazi",
      dashSubtitle: "Abdulhay Motors tizimining to'liq nazorati.",
      addCar: "Yangi e'lon qo'shish",
      totalCars: "Jami avtomobillar",
      activeUsers: "Tizimdagi foydalanuvchilar",
      views: "Kunlik ko'rishlar",
      revenue: "Global daromad",
      carsTitle: "Katalog Boshqaruvi",
      usersTitle: "Foydalanuvchilar Ro'yxati",
      financeTitle: "Moliyaviy Hisobotlar",
      settingsTitle: "Tizim Sozlamalari",
      edit: "Tahrirlash",
      delete: "O'chirish",
      save: "Saqlash",
      cancel: "Bekor qilish",
      block: "Bloklash",
      unblock: "Faollashtirish",
      theme: "Mavzu",
      lang: "Til",
      txtSize: "Matn o'lchami",
      insta: "Instagram bilan bog'lanish",
      dark: "Tungi",
      light: "Kunduzgi",
      small: "Kichik",
      med: "O'rtacha",
      large: "Katta",
      imgPlaceholder: "Rasm URL manzilini kiriting (bir nechta bo'lsa vergul bilan ajrating)",
    },
    en: {
      loginTitle: "Admin Panel",
      loginSubtitle: "Enter Abdulhay access code",
      loginBtn: "Login",
      wrongCode: "Incorrect code entered",
      sidebarMain: "Admin Navigation",
      logout: "Logout",
      dashTitle: "Command Center",
      dashSubtitle: "Complete control of Abdulhay Motors system.",
      addCar: "Add New Listing",
      totalCars: "Total Cars",
      activeUsers: "System Users",
      views: "Daily Views",
      revenue: "Global Revenue",
      carsTitle: "Catalog Management",
      usersTitle: "User List",
      financeTitle: "Financial Reports",
      settingsTitle: "System Settings",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      block: "Block",
      unblock: "Activate",
      theme: "Theme",
      lang: "Language",
      txtSize: "Text Size",
      insta: "Contact Instagram",
      dark: "Dark",
      light: "Light",
      small: "Small",
      med: "Medium",
      large: "Large",
      imgPlaceholder: "Enter image URL (comma separated for multiple)",
    }
  };

  const curT = t[language];
  const isDark = theme === 'dark';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode === ACCESS_CODE) {
      setIsAuthorized(true);
      setError(false);
    } else {
      setError(true);
      setInputCode('');
    }
  };

  const deleteCar = (id: string) => {
    if (window.confirm("Haqiqatdan ham ushbu avtomobilni o'chirmoqchimisiz?")) {
      setCars(prev => prev.filter(c => c.id !== id));
    }
  };

  const deleteUser = (id: string) => {
    if (window.confirm("Foydalanuvchini o'chirmoqchimisiz?")) {
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
      <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-100'} flex flex-col items-center justify-center p-4`}>
        <div className={`w-full max-w-md border rounded-[2.5rem] p-12 shadow-2xl ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-600/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className={`text-2xl font-outfit font-bold text-center mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{curT.loginTitle}</h1>
            <p className="text-slate-500 text-sm text-center">{curT.loginSubtitle}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password"
              placeholder="Kod"
              className={`w-full border rounded-2xl px-6 py-5 text-center tracking-[0.5em] focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold ${isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              autoFocus
            />
            {error && <p className="text-red-500 text-[10px] text-center mt-3 font-bold uppercase tracking-widest">{curT.wrongCode}</p>}
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95 transition-all">
              {curT.loginBtn}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen transition-all duration-300 ${isDark ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-800'}`}>
      {/* Sidebar */}
      <aside className={`w-80 border-r flex flex-col fixed inset-y-0 left-0 pt-20 shadow-2xl z-40 transition-colors duration-300 ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
        <div className="px-8 py-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-500 mb-10">{curT.sidebarMain}</p>
          <nav className="space-y-4">
            {[
              { name: 'Dashboard' as AdminView, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
              { name: 'Avtomobillar' as AdminView, icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
              { name: 'Foydalanuvchilar' as AdminView, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
              { name: 'Moliya' as AdminView, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { name: 'Sozlamalar' as AdminView, icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
            ].map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentView(item.name)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${currentView === item.name ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'hover:bg-indigo-500/10 opacity-70 hover:opacity-100'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                <span className="text-sm font-bold uppercase tracking-widest">{language === 'uz' ? item.name : item.name}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-10 border-t border-white/5">
          <button 
            onClick={() => setIsAuthorized(false)}
            className="w-full py-4 bg-red-500/10 text-red-400 rounded-2xl text-[10px] font-bold hover:bg-red-500 hover:text-white transition-all uppercase tracking-[0.3em] border border-red-500/20"
          >
            {curT.logout}
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-80 p-12 pt-32">
        <header className="flex flex-col lg:flex-row justify-between lg:items-center mb-16 border-b border-slate-700/30 pb-10 gap-8">
          <div>
            <h1 className={`text-4xl font-outfit font-bold mb-2 uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>{curT.dashTitle}</h1>
            <p className="opacity-50 font-medium">{curT.dashSubtitle}</p>
          </div>
          <button onClick={() => setIsAddingCar(true)} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all">
            {curT.addCar}
          </button>
        </header>

        {currentView === 'Dashboard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: curT.totalCars, value: state.cars.length, trend: '+5 yangi' },
              { label: curT.activeUsers, value: state.users.length, trend: '+15.2% o\'sish' },
              { label: curT.views, value: '45,291', trend: 'Rekord ko\'rsatkich' },
              { label: curT.revenue, value: '$8.4M', trend: 'Joriy chorak' },
            ].map((stat, i) => (
              <div key={i} className={`p-8 rounded-[2.5rem] shadow-xl border ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                <p className="text-[10px] font-bold opacity-50 uppercase tracking-[0.2em] mb-4">{stat.label}</p>
                <h3 className={`text-3xl font-outfit font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}</h3>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{stat.trend}</p>
              </div>
            ))}
          </div>
        )}

        {currentView === 'Avtomobillar' && (
          <div className={`rounded-[3rem] border shadow-2xl overflow-hidden ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
            <div className="px-10 py-10 border-b border-slate-700/30">
              <input 
                placeholder="Qidiruv..." 
                className={`border rounded-xl px-6 py-3 text-[11px] w-full md:w-80 outline-none ${isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-300'}`}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold border-b border-slate-700/30">
                  <tr><th className="px-10 py-8">Model</th><th className="px-10 py-8">Narxi</th><th className="px-10 py-8 text-right">Amallar</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {filteredCars.map(car => (
                    <tr key={car.id} className="hover:bg-indigo-500/5 transition-colors">
                      <td className="px-10 py-6 font-bold text-sm uppercase tracking-tight">{car.brand} {car.model}</td>
                      <td className="px-10 py-6 font-bold font-outfit text-base">${car.price.toLocaleString()}</td>
                      <td className="px-10 py-6 text-right space-x-3">
                        <button onClick={() => setEditingCar(car)} className="text-indigo-400 font-bold uppercase text-[10px] tracking-widest">{curT.edit}</button>
                        <button onClick={() => deleteCar(car.id)} className="text-red-400 font-bold uppercase text-[10px] tracking-widest">{curT.delete}</button>
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
            <div className="px-10 py-10 border-b border-slate-700/30">
              <h2 className="text-2xl font-bold font-outfit uppercase tracking-tight">{curT.usersTitle}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold border-b border-slate-700/30">
                  <tr><th className="px-10 py-8">Foydalanuvchi</th><th className="px-10 py-8">Yosh</th><th className="px-10 py-8">Status</th><th className="px-10 py-8 text-right">Amallar</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {state.users.map(user => (
                    <tr key={user.id} className="hover:bg-indigo-500/5 transition-colors">
                      <td className="px-10 py-6">
                        <p className="font-bold text-sm uppercase tracking-tight">{user.firstName} {user.lastName}</p>
                      </td>
                      <td className="px-10 py-6 text-xs">{user.age}</td>
                      <td className="px-10 py-6">
                        <span className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${user.status === 'Faol' ? 'text-green-500 border-green-500/20' : 'text-red-500 border-red-500/20'}`}>{user.status}</span>
                      </td>
                      <td className="px-10 py-6 text-right space-x-3">
                        <button onClick={() => toggleUserStatus(user.id)} className="text-indigo-400 font-bold uppercase text-[10px] tracking-widest">{user.status === 'Faol' ? curT.block : curT.unblock}</button>
                        <button onClick={() => deleteUser(user.id)} className="text-red-400 font-bold uppercase text-[10px] tracking-widest">{curT.delete}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {currentView === 'Sozlamalar' && (
          <div className={`p-10 rounded-[3rem] border shadow-2xl max-w-2xl ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
            <h2 className="text-2xl font-bold font-outfit uppercase tracking-tight mb-12">{curT.settingsTitle}</h2>
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h4 className="font-bold uppercase tracking-widest text-sm">{curT.lang}</h4>
                <div className="flex bg-indigo-500/10 p-1 rounded-xl">
                  <button onClick={() => updateSettings({ language: 'uz' })} className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest ${language === 'uz' ? 'bg-indigo-600 text-white shadow-lg' : ''}`}>Uz</button>
                  <button onClick={() => updateSettings({ language: 'en' })} className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest ${language === 'en' ? 'bg-indigo-600 text-white shadow-lg' : ''}`}>En</button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h4 className="font-bold uppercase tracking-widest text-sm">{curT.theme}</h4>
                <div className="flex bg-indigo-500/10 p-1 rounded-xl">
                  <button onClick={() => updateSettings({ theme: 'dark' })} className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest ${theme === 'dark' ? 'bg-indigo-600 text-white' : ''}`}>{curT.dark}</button>
                  <button onClick={() => updateSettings({ theme: 'light' })} className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest ${theme === 'light' ? 'bg-indigo-600 text-white' : ''}`}>{curT.light}</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {(editingCar || isAddingCar) && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
            <div className={`w-full max-w-3xl rounded-[3rem] p-12 border shadow-2xl ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
              <h2 className="text-3xl font-bold font-outfit uppercase tracking-tighter mb-10">{editingCar ? curT.edit : curT.addCar}</h2>
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
                    imageUrl: imgs[0] || editingCar?.imageUrl || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
                    imageUrls: imgs.length > 0 ? imgs : editingCar?.imageUrls,
                    category: formData.get('category') as any,
                    fuelType: FuelType.Petrol,
                    transmission: Transmission.Automatic,
                    region: Region.USA,
                    specs: { hp: 500, acceleration: '3.0s', topSpeed: '300 km/soat' },
                    description: formData.get('description') as string || 'Premium avtomobil'
                  };
                  if (editingCar) setCars(prev => prev.map(c => c.id === editingCar.id ? newCarData : c));
                  else setCars(prev => [newCarData, ...prev]);
                  setEditingCar(null); setIsAddingCar(false);
                }}
                className="grid grid-cols-2 gap-8"
              >
                <div className="col-span-2 space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">{curT.imgPlaceholder}</label>
                  <input name="imageUrls" className={`w-full border p-4 rounded-2xl outline-none ${isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-300'}`} defaultValue={editingCar?.imageUrls?.join(', ') || editingCar?.imageUrl} />
                  {editingCar?.imageUrl && <img src={editingCar.imageUrl} className="h-20 rounded-xl" />}
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Brend</label>
                  <select name="brand" className={`w-full border p-4 rounded-2xl outline-none ${isDark ? 'bg-slate-950 border-white/10' : 'bg-slate-50'}`} defaultValue={editingCar?.brand}>
                    {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Model</label>
                  <input name="model" required className={`w-full border p-4 rounded-2xl outline-none ${isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-300'}`} defaultValue={editingCar?.model} />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Yil</label>
                  <input name="year" type="number" required className={`w-full border p-4 rounded-2xl outline-none ${isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-300'}`} defaultValue={editingCar?.year} />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Narx (USD)</label>
                  <input name="price" type="number" required className={`w-full border p-4 rounded-2xl outline-none ${isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-300'}`} defaultValue={editingCar?.price} />
                </div>
                <div className="col-span-2 flex gap-4 mt-6">
                  <button type="submit" className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl active:scale-95">{curT.save}</button>
                  <button type="button" onClick={() => { setEditingCar(null); setIsAddingCar(false); }} className={`flex-1 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs ${isDark ? 'bg-slate-800 text-white' : 'bg-slate-200'}`}>{curT.cancel}</button>
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
