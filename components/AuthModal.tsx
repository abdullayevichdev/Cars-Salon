
import React, { useState } from 'react';
import { useApp } from '../App';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { login } = useApp();
  const [loading, setLoading] = useState<'none' | 'google' | 'apple'>('none');
  const [step, setStep] = useState<'initial' | 'email'>('initial');
  const [email, setEmail] = useState('');

  const handleLogin = (provider: 'google' | 'apple') => {
    setLoading(provider);
    // Haqiqiy tizim bilan bog'lanish simulyatsiyasi
    setTimeout(() => {
      login(provider);
      setLoading('none');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-500">
      <div className="w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-[3rem] p-10 shadow-[0_0_100px_rgba(0,0,0,0.5)] relative">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-500 hover:text-white transition-all"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {loading !== 'none' ? (
          <div className="py-20 text-center animate-pulse">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
            <p className="text-white text-xs font-bold uppercase tracking-[0.4em]">
              {loading === 'google' ? 'Google hisobingizga ulanmoqda...' : 'Connecting to Apple ID...'}
            </p>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom duration-300">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-slate-900 font-outfit">AM</span>
              </div>
              <h3 className="text-2xl font-outfit font-bold text-white mb-2 uppercase tracking-tighter">Haqiqiy Hisob</h3>
              <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Global Identifikatsiya Tizimi</p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => handleLogin('google')}
                className="w-full flex items-center justify-center gap-4 bg-white text-slate-900 py-5 rounded-2xl font-bold transition-all hover:bg-slate-100 active:scale-95 shadow-xl"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-5 h-5" alt="Google" />
                <span className="text-[10px] uppercase tracking-[0.2em]">Google Orqali Kirish</span>
              </button>
              
              <button 
                onClick={() => handleLogin('apple')}
                className="w-full flex items-center justify-center gap-4 bg-black text-white py-5 rounded-2xl font-bold transition-all hover:bg-slate-900 active:scale-95 shadow-xl border border-white/10"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="w-5 h-5 invert" alt="Apple" />
                <span className="text-[10px] uppercase tracking-[0.2em]">Apple ID Orqali Kirish</span>
              </button>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5">
              <p className="text-[9px] text-center text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
                 Ushbu bosqichda sizning haqiqiy Google/Apple hisobingiz platformaga xavfsiz bog'lanadi.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
