
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../App';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { state, logout, showAuthModal } = useApp();
  const location = useLocation();
  const { theme, language } = state.settings;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = {
    uz: {
      home: 'Bosh sahifa',
      catalog: 'Katalog',
      favs: 'Garaj',
      admin: 'Admin',
      settings: 'Sozlamalar',
      login: 'Kirish',
      logout: 'Chiqish'
    },
    en: {
      home: 'Home',
      catalog: 'Catalog',
      favs: 'Garage',
      admin: 'Admin',
      settings: 'Settings',
      login: 'Login',
      logout: 'Logout'
    }
  };

  const curT = t[language];
  const isDark = theme === 'dark';

  const navLinks = [
    { name: curT.home, path: '/' },
    { name: curT.catalog, path: '/listings' },
    { name: curT.favs, path: '/wishlist' },
    { name: curT.settings, path: '/settings' },
    { name: curT.admin, path: '/admin' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? (isDark ? 'bg-slate-950/90 border-b border-white/5 shadow-2xl' : 'bg-white/90 border-b border-slate-200 shadow-xl') : 'bg-transparent'} backdrop-blur-xl py-4`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-600/20">
            <span className="text-xl font-bold text-white font-outfit">AM</span>
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-bold tracking-tighter font-outfit uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>Abdulhay Motors</span>
            <span className="text-[9px] tracking-[0.3em] text-indigo-400 font-extrabold uppercase">Premium Global</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:text-indigo-500 ${location.pathname === link.path ? 'text-indigo-500' : (isDark ? 'text-slate-400' : 'text-slate-600')}`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center space-x-6 border-l border-white/10 pl-8">
            {state.auth.isLoggedIn ? (
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                   <span className={`text-[9px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {state.auth.user?.email.split('@')[0]}
                  </span>
                  <span className="text-[7px] text-indigo-500 font-bold uppercase tracking-widest">{state.auth.user?.provider} verified</span>
                </div>
                <button 
                  onClick={logout}
                  className={`px-5 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all active:scale-95 border ${isDark ? 'border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white' : 'border-red-500/30 text-red-600 hover:bg-red-600 hover:text-white'}`}
                >
                  {curT.logout}
                </button>
              </div>
            ) : (
              <button 
                onClick={showAuthModal}
                className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 shadow-xl ${isDark ? 'bg-white text-slate-950 hover:bg-indigo-50' : 'bg-slate-950 text-white hover:bg-slate-800'}`}
              >
                {curT.login}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
