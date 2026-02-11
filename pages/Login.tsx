import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/supabaseService';
import { User } from '../types';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

interface LoginProps {
  setUser: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulation of auth
      const user = await loginUser(email);
      setUser(user);
      navigate(user.role === 'admin' ? '/admin' : '/');
    } catch (error) {
      alert('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-10">
             <h2 className="text-3xl font-black text-slate-900 mb-2">
               {isLogin ? 'مرحباً بعودتك' : 'انشئ حساب جديد'}
             </h2>
             <p className="text-slate-500">
               {isLogin ? 'سجل دخولك لمتابعة أعمالك والتواصل مع الموردين' : 'انضم اليوم لأكبر شبكة تجارية في مصر'}
             </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">الاسم بالكامل</label>
                <div className="relative">
                  <UserIcon className="absolute right-3 top-3 text-slate-400" size={20} />
                  <input type="text" className="w-full pr-10 pl-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="محمد أحمد" />
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 text-slate-400" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" 
                  placeholder="name@company.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 text-slate-400" size={20} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'جاري المعالجة...' : (isLogin ? 'تسجيل الدخول' : 'إنشاء حساب')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-600">
              {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'} {' '}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-primary-600 font-bold hover:underline"
              >
                {isLogin ? 'سجل الآن' : 'سجل دخول'}
              </button>
            </p>
          </div>
          
          {/* Admin Hint */}
          <div className="mt-8 p-4 bg-slate-50 rounded-lg text-xs text-slate-400 text-center border border-slate-100">
            للدخول كمسؤول، استخدم أي بريد يحتوي على كلمة "admin"
          </div>
        </div>

        {/* Left Side (Decoration) */}
        <div className="hidden md:block w-1/2 bg-primary-900 relative p-12 text-white flex-col justify-between">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover opacity-20 mix-blend-overlay"></div>
           <div className="relative z-10 h-full flex flex-col justify-between">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 backdrop-blur rounded flex items-center justify-center font-bold">م</div>
                <span className="font-bold text-lg">موردين مصر</span>
             </div>
             <div>
               <h3 className="text-3xl font-bold mb-4">طور تجارتك معنا</h3>
               <p className="text-primary-100 leading-relaxed mb-6">
                 اكتشف آلاف الفرص التجارية الجديدة وتواصل مع نخبة المصنعين في مصر في مكان واحد.
               </p>
               <div className="flex items-center gap-2 text-sm font-bold bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
                 تعرف على المزيد <ArrowRight size={16} />
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
