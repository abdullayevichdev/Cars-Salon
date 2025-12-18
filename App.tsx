
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppState, SettingsState } from './types';
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
    return {
      wishlist: savedWishlist,
      compareList: [],
      settings: savedSettings
    };
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(state.settings));
    // Apply theme and font size classes to body
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(state.settings.theme);
    
    // Manage dynamic font size on body
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

  return (
    <AppContext.Provider value={{ state, addToWishlist, removeFromWishlist, toggleCompare, updateSettings }}>
      <HashRouter>
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

export default App;
