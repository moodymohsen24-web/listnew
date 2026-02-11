import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-primary-600 font-bold" : "text-slate-600 hover:text-primary-600";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-500/30">
              م
            </div>
            <span className="text-2xl font-bold text-slate-800">موردين<span className="text-primary-600">.مصر</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-reverse space-x-8">
            <Link to="/" className={isActive('/')}>الرئيسية</Link>
            <Link to="/directory" className={isActive('/directory')}>تصفح الموردين</Link>
            <Link to="/about" className={isActive('/about')}>عن المنصة</Link>
            <Link to="/pricing" className={isActive('/pricing')}>خطط الأسعار</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-600">مرحباً، {user.name}</span>
                {user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-900 transition-colors text-sm font-medium">
                    <LayoutDashboard size={16} />
                    لوحة التحكم
                  </Link>
                )}
                <button 
                  onClick={onLogout}
                  className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                  title="تسجيل خروج"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-slate-600 hover:text-primary-600 font-medium">دخول</Link>
                <Link to="/login" className="bg-primary-600 text-white px-5 py-2.5 rounded-full hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 font-medium flex items-center gap-2">
                  <UserIcon size={18} />
                  سجل كتاجر
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 flex flex-col gap-4 shadow-lg">
          <Link to="/" className="text-slate-700 font-medium py-2">الرئيسية</Link>
          <Link to="/directory" className="text-slate-700 font-medium py-2">تصفح الموردين</Link>
          {user ? (
             <>
               <div className="border-t border-slate-100 my-2"></div>
               <Link to="/admin" className="text-slate-700 font-medium py-2">لوحة التحكم</Link>
               <button onClick={onLogout} className="text-red-600 font-medium py-2 text-right">تسجيل خروج</button>
             </>
          ) : (
            <>
              <div className="border-t border-slate-100 my-2"></div>
              <Link to="/login" className="text-center w-full bg-slate-100 text-slate-800 py-3 rounded-lg font-bold">دخول</Link>
              <Link to="/login" className="text-center w-full bg-primary-600 text-white py-3 rounded-lg font-bold">سجل الآن</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
