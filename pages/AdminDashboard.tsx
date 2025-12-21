
import React, { useState, useMemo } from 'react';
import { CATEGORIES, BRANDS } from '../constants';
import { Car, UserAccount, FuelType, Transmission, Region } from '../types';
import { useApp } from '../App';
import ImageWithFallback from '../components/ImageWithFallback';

const SIMULATED_BACKEND_CODE = '933223580';

type AdminView = 'Dashboard' | 'Avtomobillar' | 'Foydalanuvchilar' | 'Moliya' | 'Sozlamalar';

const AdminDashboard: React.FC = () => {
  const { state, setCars, setUsers } = useApp();
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
      save: "Saqlash",
      cancel: "Bekor Qilish",
      edit: "Tahrirlash",
      delete: "O'chirish"
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
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete"
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
    if (window.confirm("O'chirilsinmi?")) {
      setCars(prev => prev.filter(c => c.id !== id));
    }
  };

  const deleteUser = (id: string) => {
    if (window.confirm("O'chirilsinmi?")) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const filteredCars = useMemo(() => {
    return state.cars.filter(c => 
      c.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.model.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 50);
  }, [state.cars, searchQuery]);

  if (!isAuthorized) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-50'} flex items-center justify-center p-6`}>
        <div className={`w-full max-w-md border rounded-[3rem] p-12 shadow-2xl ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
          <h1 className={`text-2xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>{curT.loginTitle}</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password"
              className={`w-full border rounded-2xl px-6 py-5 text-center tracking-[1em] outline-none ${isDark ? 'bg-slate-950 border-white/10 text-white' : 'bg-slate-50 border-slate-300'}`}
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs text-center">{curT.wrongCode}</p>}
            <button className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px]">
              {curT.loginBtn}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <aside className={`w-64 fixed inset-y-0 left-0 pt-24 border-r ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
        <nav className="px-6 space-y-2">
          {['Dashboard', 'Avtomobillar', 'Foydalanuvchilar', 'Sozlamalar'].map(view => (
            <button 
              key={view}
              onClick={() => setCurrentView(view as AdminView)}
              className={`w-full text-left px-6 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${currentView === view ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-500/10'}`}
            >
              {view}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-12 pt-32">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold uppercase tracking-tighter">{currentView}</h1>
          {currentView === 'Avtomobillar' && (
            <button onClick={() => setIsAddingCar(true)} className="px-8 py-4 bg-indigo-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest">{curT.addCar}</button>
          )}
        </div>

        {currentView === 'Dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: curT.totalCars, value: state.cars.length },
              { label: curT.activeUsers, value: state.users.length },
              { label: curT.views, value: '45.2K' },
              { label: curT.revenue, value: '$12.8M' },
            ].map((s, i) => (
              <div key={i} className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest mb-2">{s.label}</p>
                <h3 className="text-3xl font-bold">{s.value}</h3>
              </div>
            ))}
          </div>
        )}

        {currentView === 'Avtomobillar' && (
          <div className={`rounded-3xl border overflow-hidden ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
            <table className="w-full text-left">
              <thead className="text-[10px] uppercase tracking-widest opacity-50 border-b border-slate-700/20">
                <tr><th className="p-6">Model</th><th className="p-6">Narx</th><th className="p-6 text-right">Amallar</th></tr>
              </thead>
              <tbody>
                {filteredCars.map(c => (
                  <tr key={c.id} className="border-b border-slate-700/10">
                    <td className="p-6 text-sm font-bold uppercase">{c.brand} {c.model}</td>
                    <td className="p-6 font-bold text-indigo-500">${c.price.toLocaleString()}</td>
                    <td className="p-6 text-right space-x-4">
                      <button onClick={() => setEditingCar(c)} className="text-xs font-bold uppercase text-indigo-400">{curT.edit}</button>
                      <button onClick={() => deleteCar(c.id)} className="text-xs font-bold uppercase text-red-400">{curT.delete}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(editingCar || isAddingCar) && (
          <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm">
             <div className={`w-full max-w-2xl p-12 rounded-[3rem] border ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
                <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest">{editingCar ? curT.edit : curT.addCar}</h2>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const newCar: Car = {
                    id: editingCar?.id || Date.now().toString(),
                    brand: fd.get('brand') as string,
                    model: fd.get('model') as string,
                    year: Number(fd.get('year')),
                    price: Number(fd.get('price')),
                    currency: 'USD',
                    imageUrl: editingCar?.imageUrl || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
                    category: fd.get('category') as any,
                    fuelType: FuelType.Petrol,
                    transmission: Transmission.Automatic,
                    region: Region.USA,
                    specs: { hp: 500, acceleration: '3.0s', topSpeed: '300 km/h' },
                    description: 'Premium car',
                    createdAt: new Date().toISOString()
                  };
                  if (editingCar) setCars(prev => prev.map(c => c.id === editingCar.id ? newCar : c));
                  else setCars(prev => [newCar, ...prev]);
                  setEditingCar(null); setIsAddingCar(false);
                }} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <input name="brand" placeholder="Brend" required className="bg-transparent border border-white/10 p-4 rounded-xl" defaultValue={editingCar?.brand} />
                    <input name="model" placeholder="Model" required className="bg-transparent border border-white/10 p-4 rounded-xl" defaultValue={editingCar?.model} />
                    <input name="year" type="number" placeholder="Yil" required className="bg-transparent border border-white/10 p-4 rounded-xl" defaultValue={editingCar?.year} />
                    <input name="price" type="number" placeholder="Narx" required className="bg-transparent border border-white/10 p-4 rounded-xl" defaultValue={editingCar?.price} />
                  </div>
                  <div className="flex gap-4 pt-6">
                    <button type="submit" className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold uppercase text-xs">{curT.save}</button>
                    <button type="button" onClick={() => { setEditingCar(null); setIsAddingCar(false); }} className="flex-1 bg-slate-800 text-white py-4 rounded-xl font-bold uppercase text-xs">{curT.cancel}</button>
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
