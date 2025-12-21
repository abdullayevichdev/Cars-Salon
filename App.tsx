import React, { useState, createContext, useContext, useEffect, useMemo, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import UserEntryModal from './components/UserEntryModal';
import AuthModal from './components/AuthModal';
import AIChatWidget from './components/AIChatWidget';
import { notifyNewUser, notifyWishlistAdd, notifyAdminWelcome } from './telegramService';

interface AppContextType {
  state: AppState;
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  toggleCompare: (id: string) => void;
  updateSettings: (settings: Partial<SettingsState>) => void;
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  setUsers: React.Dispatch<React.SetStateAction<UserAccount[]>>;
  submitUserInfo: (firstName: string, lastName: string, age: number) => void;
  login: (provider: 'google' | 'apple') => void;
  logout: () => void;
  showAuthModal: () => void;
}

// Kontekstni shu yerda yaratamiz
export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const App: React.FC = () => {
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const [state, setState] = useState<AppState>(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const savedSettings = JSON.parse(localStorage.getItem('settings') || '{"theme":"dark","language":"uz","fontSize":"base"}');
    const savedCars = JSON.parse(localStorage.getItem('cars_data') || 'null');
    const savedUsers = JSON.parse(localStorage.getItem('users_data') || 'null');
    const savedAuth = JSON.parse(localStorage.getItem('auth_data') || '{"isLoggedIn":false,"user":null}');

    return {
      cars: savedCars || MOCK_CARS,
      users: savedUsers || MOCK_USERS,
      wishlist: savedWishlist,
      compareList: [],
      settings: savedSettings,
      hasEnteredInfo: false,
      auth: savedAuth
    };
  });

  useEffect(() => {
    const hasGreeted = sessionStorage.getItem('admin_greeted');
    if (!hasGreeted) {
      notifyAdminWelcome();
      sessionStorage.setItem('admin_greeted', 'true');
    }

    const timer = setTimeout(() => {
      setShowEntryModal(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    localStorage.setItem('cars_data', JSON.stringify(state.cars));
    localStorage.setItem('users_data', JSON.stringify(state.users));
    localStorage.setItem('auth_data', JSON.stringify(state.auth));
  }, [state.wishlist, state.cars, state.users, state.auth]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(state.settings.theme);
  }, [state.settings.theme]);

  const addToWishlist = useCallback((id: string) => {
    const car = state.cars.find(c => c.id === id);
    const currentUser = state.users[0]; 
    if (car && currentUser && !state.wishlist.includes(id)) {
      notifyWishlistAdd(`${currentUser.firstName} ${currentUser.lastName}`, car);
    }
    setState(prev => ({ ...prev, wishlist: [...new Set([...prev.wishlist, id])] }));
  }, [state.cars, state.users, state.wishlist]);

  const removeFromWishlist = useCallback((id: string) => {
    setState(prev => ({ ...prev, wishlist: prev.wishlist.filter(item => item !== id) }));
  }, []);
  
  const toggleCompare = useCallback((id: string) => {
    setState(prev => {
      const exists = prev.compareList.includes(id);
      if (exists) return { ...prev, compareList: prev.compareList.filter(item => item !== id) };
      if (prev.compareList.length >= 3) return prev;
      return { ...prev, compareList: [...prev.compareList, id] };
    });
  }, []);

  const updateSettings = useCallback((newSettings: Partial<SettingsState>) => {
    setState(prev => ({ ...prev, settings: { ...prev.settings, ...newSettings } }));
  }, []);
  
  const setCars: React.Dispatch<React.SetStateAction<Car[]>> = useCallback((value) => {
    setState(prev => ({
      ...prev,
      cars: typeof value === 'function' ? (value as (prev: Car[]) => Car[])(prev.cars) : value
    }));
  }, []);

  const setUsers: React.Dispatch<React.SetStateAction<UserAccount[]>> = useCallback((value) => {
    setState(prev => ({
      ...prev,
      users: typeof value === 'function' ? (value as (prev: UserAccount[]) => UserAccount[])(prev.users) : value
    }));
  }, []);

  const submitUserInfo = useCallback((firstName: string, lastName: string, age: number) => {
    const newUser: UserAccount = {
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      firstName,
      lastName,
      age,
      status: 'Faol',
      visitTimestamp: new Date().toLocaleString(),
      joinedDate: new Date().toISOString().split('T')[0],
      activity: 'Platformaga kirdi',
      provider: 'none'
    };
    notifyNewUser(newUser);
    setState(prev => ({ ...prev, users: [newUser, ...prev.users], hasEnteredInfo: true }));
    setShowEntryModal(false);
  }, []);

  const showAuthModal = useCallback(() => setIsAuthModalOpen(true), []);

  const login = useCallback((provider: 'google' | 'apple') => {
    setState(prev => ({
      ...prev,
      auth: {
        isLoggedIn: true,
        user: { email: `${provider}_user_${Math.floor(Math.random()*1000)}@abdulhay.uz`, provider }
      }
    }));
    setIsAuthModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    setState(prev => ({ ...prev, auth: { isLoggedIn: false, user: null } }));
  }, []);

  const contextValue = useMemo(() => ({
    state,
    addToWishlist,
    removeFromWishlist,
    toggleCompare,
    updateSettings,
    setCars,
    setUsers,
    submitUserInfo,
    login,
    logout,
    showAuthModal
  }), [state, addToWishlist, removeFromWishlist, toggleCompare, updateSettings, setCars, setUsers, submitUserInfo, login, logout, showAuthModal]);

  return (
    <AppContext.Provider value={contextValue}>
      <HashRouter>
        {showEntryModal && !state.hasEnteredInfo && <UserEntryModal />}
        {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
        <AIChatWidget />
        <div className={`flex flex-col min-h-screen transition-colors duration-500 ${state.settings.theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/listings" element={<ListingPage />} />
              <Route path="/car/:id" element={<CarDetailPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;