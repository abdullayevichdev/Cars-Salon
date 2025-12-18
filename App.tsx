
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppState, SettingsState, Car, UserAccount } from './types';
import { MOCK_CARS, MOCK_USERS } from './constants';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ListingPage from './pages/ListingPage';
import CarDetailPage from './pages/CarDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import WishlistPage from './pages/WishlistPage';
import SettingsPage from './pages/SettingsPage';

interface AppContextType {
  state: AppState;
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  toggleCompare: (id: string) => void;
  updateSettings: (settings: Partial<SettingsState>) => void;
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  setUsers: React.Dispatch<React.SetStateAction<UserAccount[]>>;
  submitUserInfo: (firstName: string, lastName: string, age: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const savedSettings = JSON.parse(localStorage.getItem('settings') || '{"theme":"dark","language":"uz","fontSize":"base"}');
    const savedEntered = localStorage.getItem('hasEnteredInfo') === 'true';
    const savedCars = JSON.parse(localStorage.getItem('cars_data') || 'null');
    const savedUsers = JSON.parse(localStorage.getItem('users_data') || 'null');

    return {
      cars: savedCars || MOCK_CARS,
      users: savedUsers || MOCK_USERS,
      wishlist: savedWishlist,
      compareList: [],
      settings: savedSettings,
      hasEnteredInfo: savedEntered
    };
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    localStorage.setItem('cars_data', JSON.stringify(state.cars));
    localStorage.setItem('users_data', JSON.stringify(state.users));
    localStorage.setItem('hasEnteredInfo', state.hasEnteredInfo.toString());
  }, [state.wishlist, state.cars, state.users, state.hasEnteredInfo]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(state.settings));
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(state.settings.theme);
    document.body.style.fontSize = state.settings.fontSize === 'sm' ? '14px' : state.settings.fontSize === 'lg' ? '18px' : '16px';
  }, [state.settings]);

  const addToWishlist = (id: string) => {
    setState(prev => ({ ...prev, wishlist: [...new Set([...prev.wishlist, id])] }));
  };

  const removeFromWishlist = (id: string) => {
    setState(prev => ({ ...prev, wishlist: prev.wishlist.filter(item => item !== id) }));
  };

  const toggleCompare = (id: string) => {
    setState(prev => {
      const exists = prev.compareList.includes(id);
      if (exists) return { ...prev, compareList: prev.compareList.filter(item => item !== id) };
      if (prev.compareList.length >= 3) return prev;
      return { ...prev, compareList: [...prev.compareList, id] };
    });
  };

  const updateSettings = (newSettings: Partial<SettingsState>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const setCars = (action: React.SetStateAction<Car[]>) => {
    setState(prev => ({
      ...prev,
      cars: typeof action === 'function' ? action(prev.cars) : action
    }));
  };

  const setUsers = (action: React.SetStateAction<UserAccount[]>) => {
    setState(prev => ({
      ...prev,
      users: typeof action === 'function' ? action(prev.users) : action
    }));
  };

  const submitUserInfo = (firstName: string, lastName: string, age: number) => {
    const newUser: UserAccount = {
      id: Date.now().toString(),
      firstName,
      lastName,
      age,
      status: 'Faol',
      joinedDate: new Date().toISOString().split('T')[0],
      activity: 'Saytga kirdi'
    };
    setState(prev => ({
      ...prev,
      users: [newUser, ...prev.users],
      hasEnteredInfo: true
    }));
  };

  return (
    <AppContext.Provider value={{ state, addToWishlist, removeFromWishlist, toggleCompare, updateSettings, setCars, setUsers, submitUserInfo }}>
      <HashRouter>
        {!state.hasEnteredInfo && <UserEntryModal />}
        <div className={`flex flex-col min-h-screen transition-colors duration-300 ${state.settings.theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/listings" element={<ListingPage />} />
              <Route path="/car/:id" element={<CarDetailPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

const UserEntryModal: React.FC = () => {
  const { submitUserInfo } = useApp();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', age: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.age) {
      submitUserInfo(formData.firstName, formData.lastName, parseInt(formData.age));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center p-6 backdrop-blur-xl">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 rounded-[2.5rem] p-12 shadow-2xl animate-fade-in">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/30">
            <span className="text-3xl font-bold text-white">AM</span>
          </div>
          <h2 className="text-2xl font-outfit font-bold text-white mb-2 uppercase tracking-tight">Xush kelibsiz!</h2>
          <p className="text-slate-500 text-sm">Davom etish uchun ma'lumotlaringizni kiriting</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest ml-2">Ism</label>
            <input 
              required
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Ismingiz"
              value={formData.firstName}
              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest ml-2">Familiya</label>
            <input 
              required
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Familiyangiz"
              value={formData.lastName}
              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest ml-2">Yosh</label>
            <input 
              required
              type="number"
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              placeholder="Yoshingiz"
              value={formData.age}
              onChange={e => setFormData({ ...formData, age: e.target.value })}
            />
          </div>
          <button className="w-full bg-white text-slate-950 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-xl hover:bg-indigo-50 transition-all active:scale-95 mt-4">
            Saytga kirish
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
