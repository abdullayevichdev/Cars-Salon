
import React from 'react';
import { useApp } from '../App';

const SettingsPage: React.FC = () => {
  const { state, updateSettings } = useApp();
  const { theme, language, fontSize } = state.settings;

  const t = {
    uz: {
      title: "Sozlamalar",
      subtitle: "Platformani o'zingizga qulay tarzda sozlang",
      lang: "Til",
      theme: "Mavzu",
      txtSize: "Matn o'lchami",
      insta: "Instagram orqali bog'lanish",
      dark: "Tungi",
      light: "Kunduzgi",
      small: "Kichik",
      med: "O'rtacha",
      large: "Katta",
      contactDesc: "Savollar bo'lsa @avazxanov_701 ga murojaat qiling"
    },
    en: {
      title: "Settings",
      subtitle: "Customize the platform to your preference",
      lang: "Language",
      theme: "Theme",
      txtSize: "Text Size",
      insta: "Contact via Instagram",
      dark: "Dark",
      light: "Light",
      small: "Small",
      med: "Medium",
      large: "Large",
      contactDesc: "Contact @avazxanov_701 for any inquiries"
    }
  };

  const curT = t[language];
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen pt-32 pb-20 transition-colors duration-300`}>
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-12">
          <h1 className={`text-4xl font-outfit font-bold mb-2 uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {curT.title}
          </h1>
          <p className="text-slate-500 font-medium">{curT.subtitle}</p>
        </div>

        <div className={`rounded-[2.5rem] border p-12 space-y-12 shadow-2xl ${isDark ? 'bg-slate-900 border-white/5' : 'bg-white border-slate-200'}`}>
          {/* Language Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm">{curT.lang}</h4>
              <p className="text-[10px] opacity-50 uppercase mt-1">Tizim tilini tanlang / Select language</p>
            </div>
            <div className={`flex p-1 rounded-xl border ${isDark ? 'bg-slate-950/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
              <button 
                onClick={() => updateSettings({ language: 'uz' })} 
                className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${language === 'uz' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-indigo-500/10'}`}
              >
                O'zbekcha
              </button>
              <button 
                onClick={() => updateSettings({ language: 'en' })} 
                className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${language === 'en' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-indigo-500/10'}`}
              >
                English
              </button>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm">{curT.theme}</h4>
              <p className="text-[10px] opacity-50 uppercase mt-1">Interfeys ko'rinishi / Appearance</p>
            </div>
            <div className={`flex p-1 rounded-xl border ${isDark ? 'bg-slate-950/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
              <button 
                onClick={() => updateSettings({ theme: 'dark' })} 
                className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${theme === 'dark' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-indigo-500/10'}`}
              >
                {curT.dark}
              </button>
              <button 
                onClick={() => updateSettings({ theme: 'light' })} 
                className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${theme === 'light' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-indigo-500/10'}`}
              >
                {curT.light}
              </button>
            </div>
          </div>

          {/* Font Size Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm">{curT.txtSize}</h4>
              <p className="text-[10px] opacity-50 uppercase mt-1">Harflar kattaligi / Font size</p>
            </div>
            <div className={`flex p-1 rounded-xl border ${isDark ? 'bg-slate-950/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
              <button 
                onClick={() => updateSettings({ fontSize: 'sm' })} 
                className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${fontSize === 'sm' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-indigo-500/10'}`}
              >
                {curT.small}
              </button>
              <button 
                onClick={() => updateSettings({ fontSize: 'base' })} 
                className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${fontSize === 'base' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-indigo-500/10'}`}
              >
                {curT.med}
              </button>
              <button 
                onClick={() => updateSettings({ fontSize: 'lg' })} 
                className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${fontSize === 'lg' ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-indigo-500/10'}`}
              >
                {curT.large}
              </button>
            </div>
          </div>

          {/* Instagram Contact */}
          <div className="pt-12 border-t border-slate-700/30">
            <h4 className="font-bold uppercase tracking-widest text-sm mb-4">{curT.insta}</h4>
            <p className="text-xs text-slate-500 mb-8">{curT.contactDesc}</p>
            <button 
              onClick={() => window.open('https://instagram.com/avazxanov_701', '_blank')}
              className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl hover:shadow-indigo-600/30 active:scale-95 transition-all flex items-center justify-center gap-4"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              avazxanov_701
            </button>
          </div>
        </div>

        <div className="mt-20 text-center opacity-30 text-[10px] font-bold uppercase tracking-[0.5em]">
          Abdulhay Motors | Powered by Avazxanov_701 & Abdullayevich
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
