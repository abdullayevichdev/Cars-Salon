
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <span className="text-xl font-bold text-white">AM</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white font-outfit uppercase">Abdulhay Motors</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-light">
              Texnologiya, hashamat va ishonch orqali global avtomobil sotib olish tajribasini qayta belgilaymiz. 
              <span className="block mt-4 text-white font-bold tracking-widest uppercase text-[10px]">Asoschilar: Avazxanov_701 va Abdullayevich</span>
            </p>
            <div className="flex space-x-6">
              {['FB', 'TW', 'IG', 'LI'].map(social => (
                <a key={social} href="#" className="text-xs font-bold text-slate-500 hover:text-indigo-400 transition-colors tracking-widest">{social}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Menyu</h4>
            <ul className="space-y-4 text-xs text-slate-400 font-bold uppercase tracking-widest">
              <li><Link to="/listings" className="hover:text-indigo-400 transition-all">Katalog</Link></li>
              <li><Link to="/wishlist" className="hover:text-indigo-400 transition-all">Sevimlilar</Link></li>
              <li><Link to="/compare" className="hover:text-indigo-400 transition-all">Taqqoslash</Link></li>
              <li><Link to="/sell" className="hover:text-indigo-400 transition-all">Mashinani sotish</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Yordam</h4>
            <ul className="space-y-4 text-xs text-slate-400 font-bold uppercase tracking-widest">
              <li><a href="#" className="hover:text-indigo-400 transition-all">Logistika</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-all">Moliyalashtirish</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-all">Xavfsizlik</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-all">Aloqa</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Obuna</h4>
            <p className="text-slate-400 text-xs mb-6 font-bold uppercase tracking-widest">Eksklyuziv yangiliklardan xabardor bo'ling.</p>
            <div className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Email manzilingiz" 
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-xs text-white focus:ring-1 focus:ring-indigo-500 transition-all outline-none"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.3em] transition-all text-white">
                Qo'shilish
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] gap-8">
          <p>© 2024 Abdulhay Motors. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-12">
            <span className="hover:text-white transition-colors cursor-default">Powered by Avazxanov_701</span>
            <span className="hover:text-white transition-colors cursor-default">Concept by Abdullayevich</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
