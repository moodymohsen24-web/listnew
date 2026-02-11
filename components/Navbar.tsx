import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, User as UserIcon, LogOut, LayoutDashboard, X, Briefcase, Globe } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path 
    ? "text-primary-900 font-bold border-b-2 border-primary-900" 
    : "text-slate-600 hover:text-primary-900 font-medium transition-colors";

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar - Very Corporate */}
      <div className="bg-primary-900 text-white py-1.5 text-xs hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex gap-4">
                <span className="opacity-80">أكبر منصة B2B في مصر</span>
                <span className="opacity-80 border-r border-white/20 pr-4">دعم فني 24/7</span>
            </div>
            <div className="flex gap-4">
                <Link to="/about" className="hover:text-accent-500 transition-colors">عن المنصة</Link>
                <Link to="/pricing" className="hover:text-accent-500 transition-colors">حلول الشركات</Link>
            </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="glass-nav h-20 flex items-center shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-primary-900 rounded flex items-center justify-center text-white">
                <Briefcase size={22} className="text-accent-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-primary-900 leading-none tracking-tight">موردين<span className="text-accent-600">.مصر</span></span>
                <span className="text-[10px] text-slate-500 font-bold tracking-wide uppercase">Business Directory</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-reverse space-x-8">
              <Link to="/" className={isActive('/')}>الرئيسية</Link>
              <Link to="/directory" className={isActive('/directory')}>السوق التجاري</Link>
              <Link to="/pricing" className={isActive('/pricing')}>الباقات</Link>
              <Link to="/about" className={isActive('/about')}>من نحن</Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3 bg-slate-50 p-1 pr-3 rounded-full border border-slate-200">
                  <span className="text-sm font-bold text-primary-900">{user.name}</span>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="w-8 h-8 flex items-center justify-center bg-primary-900 text-white rounded-full hover:bg-primary-800" title="لوحة التحكم">
                      <LayoutDashboard size={14} />
                    </Link>
                  )}
                  <button onClick={onLogout} className="w-8 h-8 flex items-center justify-center bg-white text-red-500 border border-slate-200 rounded-full hover:bg-red-50">
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-slate-600 hover:text-primary-900 font-bold text-sm px-4">دخول</Link>
                  <Link to="/register" className="bg-primary-900 hover:bg-primary-800 text-white px-6 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg font-bold text-sm flex items-center gap-2">
                    إنشاء حساب
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-primary-900 p-2">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 py-4 px-4 shadow-xl flex flex-col gap-2">
            <Link to="/" className="p-3 font-bold text-slate-700 hover:bg-slate-50 rounded-lg">الرئيسية</Link>
            <Link to="/directory" className="p-3 font-bold text-slate-700 hover:bg-slate-50 rounded-lg">السوق التجاري</Link>
            <Link to="/pricing" className="p-3 font-bold text-slate-700 hover:bg-slate-50 rounded-lg">الباقات</Link>
            <div className="h-px bg-slate-100 my-2"></div>
            {user ? (
               <button onClick={onLogout} className="p-3 font-bold text-red-600 hover:bg-red-50 rounded-lg text-right">تسجيل خروج</button>
            ) : (
               <div className="flex gap-2">
                 <Link to="/login" className="flex-1 text-center py-3 bg-slate-100 text-slate-800 font-bold rounded-lg">دخول</Link>
                 <Link to="/register" className="flex-1 text-center py-3 bg-primary-900 text-white font-bold rounded-lg">سجل الآن</Link>
               </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;