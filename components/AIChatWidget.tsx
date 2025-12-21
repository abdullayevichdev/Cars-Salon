
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../App';
import { chatWithAI } from '../geminiService';
import { notifyAIChatMessage, checkAdminReplies } from '../telegramService';

const AIChatWidget: React.FC = () => {
  const { state } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai' | 'admin', text: string }[]>([
    { role: 'ai', text: "Assalomu alaykum! Men Abdulhay Motors AI yordamchisiman. Sizga qanday yordam bera olaman?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Endi matnni emas, xabar ID sini saqlaymiz
  const lastProcessedUpdateId = useRef<number>(0);

  const currentUser = state.users[0];

  useEffect(() => {
    if (!currentUser) return;

    const interval = setInterval(async () => {
      const adminReplies = await checkAdminReplies(currentUser.id);
      
      adminReplies.forEach(reply => {
        // Agar xabar ID si biz oxirgi marta ko'rgandan katta bo'lsa
        if (reply.update_id > lastProcessedUpdateId.current) {
          setMessages(prev => [...prev, { role: 'admin', text: reply.text }]);
          lastProcessedUpdateId.current = reply.update_id;
          
          setIsOpen(true);
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3');
          audio.play().catch(() => {});
        }
      });
    }, 3000); // Tezroq tekshirish: 3 soniya

    return () => clearInterval(interval);
  }, [currentUser]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    if (currentUser) {
      notifyAIChatMessage(currentUser, userMessage);
    }

    const aiResponse = await chatWithAI([], userMessage);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setLoading(false);
  };

  const isDark = state.settings.theme === 'dark';

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className={`w-[400px] h-[600px] rounded-[2.5rem] border shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-500 ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}>
          <div className="bg-indigo-600 p-8 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-widest">Abdulhay Chat</h4>
                <p className="text-white/60 text-[8px] font-bold uppercase tracking-[0.2em]">Live Support Active</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-all">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-[1.5rem] text-xs font-medium leading-relaxed shadow-sm relative ${
                  m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 
                  m.role === 'admin' ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-tl-none border-2 border-white/20' :
                  (isDark ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5' : 'bg-slate-100 text-slate-800 rounded-tl-none')
                }`}>
                  {m.role === 'admin' && (
                    <div className="text-[7px] font-black uppercase tracking-[0.2em] mb-2 text-white/70">ADMINISTRATOR: ABDULHAY</div>
                  )}
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className={`p-5 rounded-[1.5rem] bg-slate-800/50 animate-pulse flex gap-2`}>
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-6 border-t border-white/5 bg-slate-950/20 backdrop-blur-md">
            <div className="relative">
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Savolingizni yozing..."
                className={`w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white focus:ring-2 focus:ring-indigo-600 outline-none transition-all pr-14`}
              />
              <button type="submit" className="absolute right-3 top-2 p-2 text-indigo-500 hover:text-indigo-400">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-600/40 hover:scale-110 active:scale-95 transition-all group relative"
        >
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-4 border-slate-950 animate-bounce"></div>
          <svg className="w-8 h-8 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      )}
    </div>
  );
};

export default AIChatWidget;
