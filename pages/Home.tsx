import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, ShieldCheck, Users, ArrowLeft } from 'lucide-react';
import { CATEGORIES } from '../mockData';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-20 lg:py-32 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-600/10 blur-3xl rounded-full transform translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-blue-600/10 blur-3xl rounded-full transform -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              أكبر تجمع <span className="text-primary-500">للموردين والمصانع</span> في مصر
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              ابحث عن أفضل الموردين، قارن الأسعار، وتواصل مباشرة مع المصانع. منصة شاملة لنمو تجارتك بأمان وموثوقية.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/directory" className="w-full sm:w-auto bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-500 transition-all shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2">
                <Search size={20} />
                ابحث عن مورد
              </Link>
              <Link to="/login" className="w-full sm:w-auto bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-700 transition-all border border-slate-700">
                سجل نشاطك التجاري
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 border-t border-slate-800 pt-8 max-w-3xl mx-auto">
              <div>
                <div className="text-3xl font-black text-white mb-1">+2000</div>
                <div className="text-slate-400 text-sm">مورد موثق</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">+50</div>
                <div className="text-slate-400 text-sm">تصنيف صناعي</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">100%</div>
                <div className="text-slate-400 text-sm">بيانات محدثة</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">تصفح حسب القطاع</h2>
              <p className="text-slate-500">أقسام متنوعة تغطي كافة احتياجات السوق المصري</p>
            </div>
            <Link to="/directory" className="text-primary-600 font-bold hover:text-primary-700 flex items-center gap-1 group">
              عرض الكل
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.slice(0, 4).map((cat, idx) => (
              <Link key={idx} to={`/directory?cat=${cat}`} className="group bg-slate-50 hover:bg-white border border-slate-100 hover:border-primary-200 rounded-2xl p-6 transition-all hover:shadow-lg text-center">
                <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp size={28} />
                </div>
                <h3 className="font-bold text-slate-800 group-hover:text-primary-700 transition-colors">{cat}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">موردين موثوقين</h3>
              <p className="text-slate-600 leading-relaxed">
                نقوم بالتحقق من هوية الموردين وأوراقهم الرسمية لضمان تجربة تجارية آمنة لك ولأعمالك.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-6">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">بحث متطور</h3>
              <p className="text-slate-600 leading-relaxed">
                استخدم فلاتر دقيقة للبحث عن الموردين حسب المدينة، التقييم، وحتى عدد المتابعين على السوشيال ميديا.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">تواصل مباشر</h3>
              <p className="text-slate-600 leading-relaxed">
                احصل على بيانات الاتصال المباشرة للمصانع والموردين بدون وسطاء وبدون عمولات خفية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">جاهز لتوسيع نشاطك التجاري؟</h2>
          <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
            انضم لآلاف التجار والموردين في مصر وابدأ رحلة نجاح جديدة اليوم.
          </p>
          <Link to="/login" className="bg-white text-primary-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-xl">
            انشئ حساب مجاني
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
