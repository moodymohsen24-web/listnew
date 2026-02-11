import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, ShieldCheck, Users, ArrowLeft, Rocket, Database, Globe, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../mockData';

const Home: React.FC = () => {
  
  useEffect(() => {
    document.title = "موردين مصر | بوابة التجارة والأعمال الأولى";
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* Hero Section - Dark & Professional */}
      <section className="relative bg-primary-900 pt-32 pb-24 overflow-hidden text-white">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
         
         <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-accent-500 mb-6">
                    <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
                    قاعدة بيانات محدثة لعام 2024
                </div>

                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                    المصدر الأول <span className="text-accent-500">للمصانع والموردين</span><br />
                    في جمهورية مصر العربية
                </h1>

                <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
                    نربطك بأكثر من 2,500 مصنع وتاجر جملة موثق. ابحث عن المنتجات، قارن الأسعار، وابدأ صفقاتك التجارية بأمان.
                </p>

                {/* Search Bar */}
                <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col md:flex-row gap-2">
                    <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-xl border border-slate-100 md:border-none">
                        <Search className="text-slate-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="عن ماذا تبحث؟ (مثال: ملابس، إلكترونيات، مواد بناء)" 
                            className="w-full p-3 bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 font-medium outline-none"
                        />
                    </div>
                    <Link 
                        to="/directory" 
                        className="bg-accent-600 hover:bg-accent-700 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        بحث الآن
                    </Link>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap justify-center gap-8 mt-12 text-slate-400 text-sm font-medium">
                    <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent-500" /> +2500 شركة موثقة</div>
                    <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent-500" /> تحديث يومي للأسعار</div>
                    <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-accent-500" /> تغطية لجميع المحافظات</div>
                </div>
            </div>
         </div>
      </section>

      {/* Categories Grid - Minimalist */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary-900 mb-2">قطاعات الأعمال</h2>
                    <p className="text-slate-500">استكشف الفرص في أهم القطاعات الصناعية والتجارية</p>
                </div>
                <Link to="/directory" className="text-accent-600 font-bold hover:text-accent-700 flex items-center gap-1 text-sm">
                    عرض الكل <ArrowLeft size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {CATEGORIES.slice(0, 12).map((cat, idx) => (
                    <Link key={idx} to={`/directory?cat=${cat}`} className="group p-4 rounded-xl border border-slate-100 hover:border-accent-500 bg-slate-50 hover:bg-white transition-all text-center flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-primary-600 group-hover:bg-accent-600 group-hover:text-white transition-colors">
                            <TrendingUp size={20} />
                        </div>
                        <span className="text-sm font-bold text-slate-700 group-hover:text-primary-900">{cat}</span>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* Value Prop - Split Screen */}
      <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                  <div>
                      <h2 className="text-3xl font-black text-primary-900 mb-6 leading-snug">
                          أدوات احترافية <br />
                          <span className="text-accent-600">لنمو أعمالك</span>
                      </h2>
                      <div className="space-y-6">
                          <div className="flex gap-4">
                              <div className="w-12 h-12 shrink-0 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center">
                                  <ShieldCheck size={24} />
                              </div>
                              <div>
                                  <h3 className="font-bold text-lg text-slate-800 mb-1">التحقق والمصداقية</h3>
                                  <p className="text-slate-600 text-sm leading-relaxed">نظام صارم للتحقق من هوية الشركات والأوراق الرسمية لضمان بيئة عمل آمنة.</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="w-12 h-12 shrink-0 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center">
                                  <Globe size={24} />
                              </div>
                              <div>
                                  <h3 className="font-bold text-lg text-slate-800 mb-1">وصول مباشر للسوق</h3>
                                  <p className="text-slate-600 text-sm leading-relaxed">تواصل مباشرة مع صناع القرار في المصانع والشركات بدون وسطاء أو عمولات خفية.</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="w-12 h-12 shrink-0 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center">
                                  <Database size={24} />
                              </div>
                              <div>
                                  <h3 className="font-bold text-lg text-slate-800 mb-1">بيانات دقيقة</h3>
                                  <p className="text-slate-600 text-sm leading-relaxed">تفاصيل كاملة عن المنتجات، القدرات الإنتاجية، والحد الأدنى للطلب تساعدك في اتخاذ القرار.</p>
                              </div>
                          </div>
                      </div>
                      <div className="mt-10">
                          <Link to="/about" className="bg-primary-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-800 transition-colors inline-flex items-center gap-2">
                              اعرف المزيد <ArrowLeft size={18} />
                          </Link>
                      </div>
                  </div>
                  <div className="relative">
                      <div className="absolute inset-0 bg-accent-500 rounded-2xl transform rotate-3 translate-x-2 translate-y-2 opacity-20"></div>
                      <img 
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
                        alt="Business Meeting" 
                        className="relative rounded-2xl shadow-xl border border-white"
                      />
                      <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-slate-100 max-w-xs">
                          <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                  <TrendingUp size={20} />
                              </div>
                              <div>
                                  <div className="font-bold text-slate-800">نشاط السوق</div>
                                  <div className="text-xs text-slate-500">آخر 24 ساعة</div>
                              </div>
                          </div>
                          <div className="text-2xl font-black text-primary-900 mb-1">+1,204</div>
                          <div className="text-xs text-slate-500">طلب عرض سعر تم إرساله</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-900 py-16 text-white text-center">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl font-black mb-4">هل تمتلك مصنعاً أو شركة توريد؟</h2>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">انضم لأسرع شبكة أعمال نمواً في مصر. اعرض منتجاتك أمام آلاف المشترين الجادين يومياً.</p>
              <div className="flex justify-center gap-4">
                  <Link to="/register" className="bg-accent-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-accent-700 transition-colors shadow-lg">
                      سجل شركتك مجاناً
                  </Link>
              </div>
          </div>
      </section>
    </div>
  );
};

export default Home;