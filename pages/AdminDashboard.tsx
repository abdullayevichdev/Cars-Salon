
import React, { useState, useMemo } from 'react';
import { MOCK_CARS, MOCK_USERS, MOCK_FINANCE, CATEGORIES, BRANDS } from '../constants';
import { Car, UserAccount } from '../types';
import { useApp } from '../App';

const ACCESS_CODE = '933223580';

type AdminView = 'Dashboard' | 'Avtomobillar' | 'Foydalanuvchilar' | 'Moliya' | 'Sozlamalar';

const AdminDashboard: React.FC = () => {
  const { state, updateSettings } = useApp();
  const { theme, language, fontSize } = state.settings;

  // Auth State
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState(false);

  // Panel State
  const [currentView, setCurrentView] = useState<AdminView>('Dashboard');

  // CRUD States
  const [cars, setCars] = useState<Car[]>(MOCK_CARS.slice(0, 100));
  const [users, setUsers] = useState<UserAccount[]>(MOCK_USERS);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Translations
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
      activeUsers: "Faol foydalanuvchilar",
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
      activeUsers: "Active Users",
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
    if (window.confirm("Haqiqatdan ham o'chirmoqchimisiz?")) {
      setCars(prev => prev.filter(c => c.id !== id));
    }
  };

  const updateCar = (car: Car) => {
    setCars(prev => prev.map(c => c.id === car.id ? car : c));
    setEditingCar(null);
  };

  const toggleUserStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Faol' ? 'Bloklangan' : 'Faol' } : u));
  };

  const filteredCars = useMemo(() => {
    return cars.filter(c => 
      c.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.model.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cars, searchQuery]);

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
            <div className="relative">
              <input 
                type="password"
                placeholder="Kod"
                className={`w-full border rounded-2xl px-6 py-5 text-center tracking-[0.5em] focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold ${isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'}`}
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                autoFocus
              />
              {error && <p className="text-red-500 text-[10px] text-center mt-3 font-bold uppercase tracking-widest">{curT.wrongCode}</p>}
            </div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-indigo-600/20 active:scale-95">
              {curT.loginBtn}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard' as AdminView, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Avtomobillar' as AdminView, icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { name: 'Foydalanuvchilar' as AdminView, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { name: 'Moliya' as AdminView, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Sozlamalar' as AdminView, icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
  ];

  return (
    <div className={`flex min-h-screen transition-all duration-300 ${isDark ? 'bg-slate-950 text-slate-300' : 'bg-slate-50 text-slate-800'}`}>
      {/* Sidebar */}
      <aside className={`w-80 border-r flex flex-col fixed inset-y-0 left-0 pt-20 shadow-2xl z-40 transition-colors duration-300 ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
        <div className="px-8 py-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-500 mb-10">{curT.sidebarMain}</p>
          <nav className="space-y-4">
            {navItems.map((item, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentView(item.name)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${currentView === item.name ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'hover:bg-indigo-500/10 opacity-70 hover:opacity-100'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
                <span className="text-sm font-bold uppercase tracking-widest">{language === 'uz' ? item.name : item.name.replace('Avtomobillar', 'Cars').replace('Foydalanuvchilar', 'Users').replace('Moliya', 'Finance').replace('Sozlamalar', 'Settings')}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-10 border-t border-white/5">
          <div className="flex items-center gap-5 mb-8">
             <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg">AM</div>
             <div>
                <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-white' : 'text-slate-900'}`}>Admin</p>
                <p className="text-[10px] opacity-50 font-bold uppercase">avazxanov_701</p>
             </div>
          </div>
          <button 
            onClick={() => setIsAuthorized(false)}
            className="w-full py-4 bg-red-500/10 text-red-400 rounded-2xl text-[10px] font-bold hover:bg-red-500 hover:text-white transition-all uppercase tracking-[0.3em] border border-red-500/20"
          >
            {curT.logout}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-80 p-12 pt-32">
        <header className="flex flex-col lg:flex-row justify-between lg:items-center mb-16 border-b border-slate-700/30 pb-10 gap-8">
          <div>
            <h1 className={`text-4xl font-outfit font-bold mb-2 uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>{curT.dashTitle}</h1>
            <p className="opacity-50 font-medium">{curT.dashSubtitle}</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => window.open('https://instagram.com/avazxanov_701', '_blank')}
              className={`px-8 py-4 border rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white' : 'bg-slate-200 hover:bg-slate-300 border-slate-300 text-slate-800'}`}
            >
              @avazxanov_701
            </button>
            <button 
              onClick={() => setIsAddingCar(true)}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              {curT.addCar}
            </button>
          </div>
        </header>

        {currentView === 'Dashboard' && (
          <div className="space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: curT.totalCars, value: cars.length + '+', trend: '+124 kutilmoqda' },
                { label: curT.activeUsers, value: users.length, trend: '+15.2% o\'sish' },
                { label: curT.views, value: '45,291', trend: 'Rekord ko\'rsatkich' },
                { label: curT.revenue, value: '$8.4M', trend: 'Joriy chorak' },
              ].map((stat, i) => (
                <div key={i} className={`p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group border transition-all ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                  <p className="text-[10px] font-bold opacity-50 uppercase tracking-[0.2em] mb-4">{stat.label}</p>
                  <h3 className={`text-3xl font-outfit font-bold mb-2 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}</h3>
                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{stat.trend}</p>
                </div>
              ))}
            </div>

            <div className={`p-10 rounded-[3rem] border shadow-2xl ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
              <h2 className={`text-2xl font-bold font-outfit uppercase tracking-tight mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>Faollik Grafigi</h2>
              <div className="h-64 flex items-end gap-2 border-b border-slate-700/30">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 bg-indigo-500/20 hover:bg-indigo-500 transition-all rounded-t-lg"
                    style={{ height: `${Math.random() * 100}%` }}
                    title={`Kun ${i+1}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'Avtomobillar' && (
          <div className={`rounded-[3rem] border shadow-2xl overflow-hidden ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
            <div className="px-10 py-10 border-b border-slate-700/30 flex flex-col md:flex-row justify-between items-center gap-6">
              <h2 className={`text-2xl font-bold font-outfit uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{curT.carsTitle}</h2>
              <input 
                type="text" 
                placeholder="Qidiruv..." 
                className={`border rounded-xl px-6 py-3 text-[11px] w-full md:w-80 outline-none transition-colors ${isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className={`text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold border-b border-slate-700/30 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <tr>
                    <th className="px-10 py-8">Model</th>
                    <th className="px-10 py-8">Toifa</th>
                    <th className="px-10 py-8">Narxi</th>
                    <th className="px-10 py-8 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {filteredCars.map(car => (
                    <tr key={car.id} className="hover:bg-indigo-500/5 transition-colors group">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-6">
                          <img src={car.imageUrl} className="w-20 h-14 object-cover rounded-xl shadow-2xl" alt="" />
                          <div>
                            <p className={`font-bold group-hover:text-indigo-400 transition-colors text-sm uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{car.brand} {car.model}</p>
                            <p className="text-[9px] opacity-50 uppercase tracking-[0.2em] font-bold">{car.year} Premium</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${isDark ? 'bg-slate-950 border-white/5 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>{car.category}</span>
                      </td>
                      <td className={`px-10 py-6 font-bold font-outfit text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>${car.price.toLocaleString()}</td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex justify-end gap-3">
                          <button onClick={() => setEditingCar(car)} className="px-4 py-2 hover:bg-indigo-600 hover:text-white border border-indigo-500/20 rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest">{curT.edit}</button>
                          <button onClick={() => deleteCar(car.id)} className="px-4 py-2 hover:bg-red-600 hover:text-white border border-red-500/20 rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest">{curT.delete}</button>
                        </div>
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
              <h2 className={`text-2xl font-bold font-outfit uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{curT.usersTitle}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className={`text-[10px] uppercase tracking-[0.3em] opacity-50 font-bold border-b border-slate-700/30 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <tr>
                    <th className="px-10 py-8">Foydalanuvchi</th>
                    <th className="px-10 py-8">Sana</th>
                    <th className="px-10 py-8">Status</th>
                    <th className="px-10 py-8 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-indigo-500/5 transition-colors">
                      <td className="px-10 py-6">
                        <div>
                          <p className={`font-bold text-sm uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{user.name}</p>
                          <p className="text-[9px] opacity-50 uppercase tracking-[0.2em] font-bold">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-xs">{user.joinedDate}</td>
                      <td className="px-10 py-6">
                        <span className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest border ${user.status === 'Faol' ? 'text-green-500 border-green-500/20' : 'text-red-500 border-red-500/20'}`}>{user.status}</span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <button onClick={() => toggleUserStatus(user.id)} className={`px-4 py-2 border rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest ${user.status === 'Faol' ? 'hover:bg-red-600 hover:text-white border-red-500/20' : 'hover:bg-green-600 hover:text-white border-green-500/20'}`}>
                          {user.status === 'Faol' ? curT.block : curT.unblock}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {currentView === 'Moliya' && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`p-10 rounded-[3rem] border shadow-2xl ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                <h3 className={`text-xl font-bold font-outfit uppercase mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>Daromad manbalari</h3>
                <div className="space-y-6">
                  {[
                    { name: 'Avto sotuvi', val: 75 },
                    { name: 'Komissiya', val: 15 },
                    { name: 'Reklama', val: 10 }
                  ].map((it, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span>{it.name}</span>
                        <span>{it.val}%</span>
                      </div>
                      <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                        <div className="h-full bg-indigo-600" style={{ width: `${it.val}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`p-10 rounded-[3rem] border shadow-2xl ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                <h3 className={`text-xl font-bold font-outfit uppercase mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>So'nggi Tranzaksiyalar</h3>
                <div className="space-y-4">
                  {MOCK_FINANCE.slice(0, 5).map(f => (
                    <div key={f.id} className={`flex justify-between items-center p-4 rounded-xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{f.description}</p>
                        <p className="text-[9px] opacity-50">{f.date}</p>
                      </div>
                      <p className={`font-bold font-outfit ${f.type === 'Daromad' ? 'text-green-500' : 'text-red-500'}`}>
                        {f.type === 'Daromad' ? '+' : '-'}${f.amount.toFixed(0)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'Sozlamalar' && (
          <div className={`p-10 rounded-[3rem] border shadow-2xl max-w-2xl ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
            <h2 className={`text-2xl font-bold font-outfit uppercase tracking-tight mb-12 ${isDark ? 'text-white' : 'text-slate-900'}`}>{curT.settingsTitle}</h2>
            
            <div className="space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm">{curT.lang}</h4>
                  <p className="text-[10px] opacity-50 uppercase mt-1">Tizim tilini tanlang</p>
                </div>
                <div className={`flex p-1 rounded-xl border ${isDark ? 'bg-slate-950/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                  <button onClick={() => updateSettings({ language: 'uz' })} className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${language === 'uz' ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-500/10'}`}>O'zbekcha</button>
                  <button onClick={() => updateSettings({ language: 'en' })} className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${language === 'en' ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-500/10'}`}>English</button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm">{curT.theme}</h4>
                  <p className="text-[10px] opacity-50 uppercase mt-1">Interfeys ko'rinishi</p>
                </div>
                <div className={`flex p-1 rounded-xl border ${isDark ? 'bg-slate-950/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                  <button onClick={() => updateSettings({ theme: 'dark' })} className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-500/10'}`}>{curT.dark}</button>
                  <button onClick={() => updateSettings({ theme: 'light' })} className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${theme === 'light' ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-500/10'}`}>{curT.light}</button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm">{curT.txtSize}</h4>
                  <p className="text-[10px] opacity-50 uppercase mt-1">Harflar kattaligi</p>
                </div>
                <div className={`flex p-1 rounded-xl border ${isDark ? 'bg-slate-950/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                  <button onClick={() => updateSettings({ fontSize: 'sm' })} className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${fontSize === 'sm' ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-500/10'}`}>{curT.small}</button>
                  <button onClick={() => updateSettings({ fontSize: 'base' })} className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${fontSize === 'base' ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-500/10'}`}>{curT.med}</button>
                  <button onClick={() => updateSettings({ fontSize: 'lg' })} className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${fontSize === 'lg' ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-500/10'}`}>{curT.large}</button>
                </div>
              </div>

              <div className="pt-10 border-t border-slate-700/30">
                <button 
                  onClick={() => window.open('https://instagram.com/avazxanov_701', '_blank')}
                  className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl hover:shadow-indigo-600/30 active:scale-95 transition-all flex items-center justify-center gap-4"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  {curT.insta}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CRUD Modals */}
        {(editingCar || isAddingCar) && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm">
            <div className={`w-full max-w-2xl rounded-[3rem] p-12 border shadow-2xl ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
              <h2 className={`text-3xl font-bold font-outfit uppercase tracking-tighter mb-10 ${isDark ? 'text-white' : 'text-slate-900'}`}>{editingCar ? curT.edit : curT.addCar}</h2>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const newCarData: any = {
                    id: editingCar?.id || (cars.length + 1).toString(),
                    brand: formData.get('brand'),
                    model: formData.get('model'),
                    year: Number(formData.get('year')),
                    price: Number(formData.get('price')),
                    imageUrl: editingCar?.imageUrl || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
                    category: formData.get('category'),
                    fuelType: formData.get('fuelType'),
                    transmission: formData.get('transmission'),
                    specs: { hp: 500, acceleration: '3.0s', topSpeed: '300 km/soat' },
                    description: 'Yangi tavsif'
                  };
                  if (editingCar) updateCar(newCarData);
                  else setCars([newCarData, ...cars]);
                  setIsAddingCar(false);
                }}
                className="grid grid-cols-2 gap-8"
              >
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Brend</label>
                  <select name="brand" className={`w-full border p-4 rounded-2xl outline-none ${isDark ? 'bg-slate-950 border-white/10' : 'bg-slate-100 border-slate-300'}`} defaultValue={editingCar?.brand}>
                    {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Model</label>
                  <input name="model" className={`w-full border p-4 rounded-2xl outline-none ${isDark ? 'bg-slate-950 border-white/10' : 'bg-slate-100 border-slate-300'}`} defaultValue={editingCar?.model} />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Yil</label>
                  <input name="year" type="number" className={`w-full border p-4 rounded-2xl outline-none ${isDark ? 'bg-slate-950 border-white/10' : 'bg-slate-100 border-slate-300'}`} defaultValue={editingCar?.year} />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Narx (USD)</label>
                  <input name="price" type="number" className={`w-full border p-4 rounded-2xl outline-none ${isDark ? 'bg-slate-950 border-white/10' : 'bg-slate-100 border-slate-300'}`} defaultValue={editingCar?.price} />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Toifa</label>
                  <select name="category" className={`w-full border p-4 rounded-2xl outline-none ${isDark ? 'bg-slate-950 border-white/10' : 'bg-slate-100 border-slate-300'}`} defaultValue={editingCar?.category}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="col-span-2 pt-10 flex gap-4">
                  <button type="submit" className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl active:scale-95">{curT.save}</button>
                  <button type="button" onClick={() => { setEditingCar(null); setIsAddingCar(false); }} className={`flex-1 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs ${isDark ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-800'}`}>{curT.cancel}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-32 pt-20 border-t border-slate-700/30 flex flex-col items-center gap-6 opacity-30">
           <div className="flex gap-16 text-[11px] font-bold uppercase tracking-[0.6em]">
              <span>Avazxanov_701</span>
              <span>Abdullayevich</span>
           </div>
           <p className="text-[10px] uppercase tracking-[0.4em] font-light">Abdulhay Motors © Maxfiy Boshqaruv Platformasi v4.2.0</p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
