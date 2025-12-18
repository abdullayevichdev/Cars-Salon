
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../App';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { state } = useApp();
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
      favs: 'Sevimlilar',
      admin: 'Admin',
      settings: 'Sozlamalar',
      login: 'Kirish'
    },
    en: {
      home: 'Home',
      catalog: 'Catalog',
      favs: 'Wishlist',
      admin: 'Admin',
      settings: 'Settings',
      login: 'Login'
    }
  };

  const curT = t[language];

  const navLinks = [
    { name: curT.home, path: '/' },
    { name: curT.catalog, path: '/listings' },
    { name: curT.favs, path: '/wishlist' },
    { name: curT.settings, path: '/settings' },
    { name: curT.admin, path: '/admin' },
  ];

  const isDark = theme === 'dark';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? (isDark ? 'bg-slate-950/95 border-b border-white/5 shadow-xl' : 'bg-white/95 border-b border-slate-200 shadow-lg') : 'bg-transparent'} backdrop-blur-md py-4`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-700 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
            <span className="text-xl font-bold text-white">AM</span>
          </div>
          <div className="flex flex-col">
            <span className={`text-xl font-bold tracking-tighter font-outfit uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>Abdulhay Motors</span>
            <span className="text-[9px] tracking-[0.3em] text-indigo-400 font-bold uppercase">Global Eksklyuziv</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-indigo-400 ${location.pathname === link.path ? 'text-indigo-500' : (isDark ? 'text-slate-300' : 'text-slate-600')}`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center space-x-6 border-l border-white/10 pl-10">
            <a href="https://instagram.com/avazxanov_701" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-indigo-500 transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <Link to="/wishlist" className="relative p-1 text-slate-400 hover:text-indigo-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {state.wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {state.wishlist.length}
                </span>
              )}
            </Link>
            <button className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all active:scale-95 shadow-lg ${isDark ? 'bg-white text-slate-950 hover:bg-indigo-50' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
              {curT.login}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
