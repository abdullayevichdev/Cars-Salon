
import React, { useState } from 'react';
import { useApp } from '../App';

const UserEntryModal: React.FC = () => {
  const { submitUserInfo } = useApp();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', age: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName.trim() && formData.lastName.trim() && formData.age) {
      submitUserInfo(formData.firstName.trim(), formData.lastName.trim(), parseInt(formData.age));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center p-6 backdrop-blur-3xl animate-in fade-in duration-1000">
      <div className="w-full max-w-lg bg-slate-900 border border-white/5 rounded-[4rem] p-12 shadow-[0_0_100px_rgba(79,70,229,0.2)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600"></div>
        
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-600/40">
            <span className="text-4xl font-bold text-white font-outfit">AM</span>
          </div>
          <h2 className="text-4xl font-outfit font-bold text-white mb-3 uppercase tracking-tighter">Xush Kelibsiz!</h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.5em]">Abdulhay Motors Global Tizimi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest ml-4">Ism</label>
              <input 
                required
                autoFocus
                autoComplete="off"
                className="w-full bg-slate-950 border border-white/10 rounded-2xl px-8 py-5 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                placeholder="Ismingiz"
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest ml-4">Familya</label>
              <input 
                required
                autoComplete="off"
                className="w-full bg-slate-950 border border-white/10 rounded-2xl px-8 py-5 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                placeholder="Familyangiz"
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest ml-4">Yosh</label>
            <input 
              required
              type="number"
              min="10"
              max="100"
              className="w-full bg-slate-950 border border-white/10 rounded-2xl px-8 py-5 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              placeholder="Yoshingiz"
              value={formData.age}
              onChange={e => setFormData({ ...formData, age: e.target.value })}
            />
          </div>
          <button className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-bold uppercase tracking-[0.4em] text-[10px] shadow-2xl hover:bg-indigo-500 transition-all active:scale-95 mt-4">
            Platformaga Kirish
          </button>
        </form>
        
        <div className="mt-12 text-center">
           <p className="text-[8px] font-bold uppercase tracking-[0.6em] text-slate-700">
              Premium Car Marketplace © 2024
           </p>
        </div>
      </div>
    </div>
  );
};

export default UserEntryModal;
