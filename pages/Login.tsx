import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/supabaseService';
import { User } from '../types';
import { Mail, Lock, User as UserIcon, ArrowRight, Building2, Phone } from 'lucide-react';

interface LoginProps {
  setUser: (user: User) => void;
  initialMode?: 'login' | 'register';
}

const Login: React.FC<LoginProps> = ({ setUser, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Reset state if prop changes
  useEffect(() => {
    setIsLogin(initialMode === 'login');
  }, [initialMode]);

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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-20">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Right Side (Form) */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-10">
             <h2 className="text-3xl font-black text-slate-900 mb-2">
               {isLogin ? 'مرحباً بعودتك' : 'انشئ حساب تجاري'}
             </h2>
             <p className="text-slate-500">
               {isLogin ? 'سجل دخولك لمتابعة أعمالك والتواصل مع الموردين' : 'انضم اليوم لأكبر شبكة تجارية في مصر في دقائق معدودة'}
             </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">الاسم بالكامل</label>
                  <div className="relative">
                    <UserIcon className="absolute right-3 top-3 text-slate-400" size={20} />
                    <input type="text" className="w-full pr-10 pl-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="محمد أحمد" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">اسم الشركة / المصنع</label>
                  <div className="relative">
                    <Building2 className="absolute right-3 top-3 text-slate-400" size={20} />
                    <input type="text" className="w-full pr-10 pl-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="شركة الأمل للتجارة" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف</label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 text-slate-400" size={20} />
                    <input type="tel" className="w-full pr-10 pl-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="010xxxxxxx" />
                  </div>
                </div>
              </>
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
              className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'جاري المعالجة...' : (isLogin ? 'تسجيل الدخول' : 'إنشاء حساب مجاني')}
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
        <div className="hidden md:block w-1/2 bg-slate-900 relative p-12 text-white flex-col justify-between overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
           <div className="relative z-10 h-full flex flex-col justify-between">
             <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-primary-600/30">م</div>
                <span className="font-bold text-xl">موردين مصر</span>
             </div>
             <div>
               <h3 className="text-4xl font-black mb-6 leading-tight">
                 {isLogin ? 'أهلاً بك مجدداً في مجتمع الأعمال' : 'ابدأ رحلة نجاحك التجاري اليوم'}
               </h3>
               <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                 {isLogin 
                   ? 'تابع آخر العروض، تواصل مع الموردين، وقم بإدارة صفقاتك بكل سهولة من لوحة تحكم واحدة.'
                   : 'انضم لآلاف الشركات التي تثق بنا. نوفر لك أدوات تسويقية، توثيق قانوني، وفرص لا حصر لها للنمو.'
                 }
               </p>
               <div className="flex items-center gap-2 text-sm font-bold bg-white/10 w-fit px-5 py-3 rounded-full backdrop-blur-md border border-white/10">
                 اكتشف المزيد <ArrowRight size={16} />
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Login;