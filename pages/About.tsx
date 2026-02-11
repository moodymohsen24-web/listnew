import React from 'react';
import { ShieldCheck, Users, Globe, Rocket, Award, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
           <h1 className="text-4xl md:text-6xl font-black mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
             نبني مستقبل <span className="text-primary-500">التجارة في مصر</span>
           </h1>
           <p className="text-xl text-slate-300 leading-relaxed mb-8">
             موردين مصر هي المنصة الرقمية الأولى التي تجمع صفوة المصنعين والموردين في مكان واحد، لتمكين التجار ورواد الأعمال من الوصول لأفضل المصادر بسهولة وموثوقية.
           </p>
        </div>
      </section>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
           {[
             { label: 'مورد ومصنع', val: '+2,500', icon: Building2 },
             { label: 'تاجر مسجل', val: '+15k', icon: Users },
             { label: 'منتج متاح', val: '+100k', icon: ShoppingBag },
             { label: 'سنوات خبرة', val: '5', icon: CalendarDays },
           ].map((stat, idx) => (
             <div key={idx} className="text-center p-4">
                <div className="text-3xl md:text-4xl font-black text-slate-800 mb-2">{stat.val}</div>
                <div className="text-slate-500 font-medium text-sm">{stat.label}</div>
             </div>
           ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
             <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center shrink-0">
                   <Rocket size={24} />
                </div>
                <div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-2">رؤيتنا</h3>
                   <p className="text-slate-600 leading-relaxed">
                     أن نكون المحرك الرئيسي للنمو التجاري في المنطقة، من خلال توفير بنية تحتية رقمية تربط الأسواق المحلية بالعالمية وتسهل عمليات التوريد والتصدير.
                   </p>
                </div>
             </div>
             <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                   <ShieldCheck size={24} />
                </div>
                <div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-2">مهمتنا</h3>
                   <p className="text-slate-600 leading-relaxed">
                     توفير بيئة تجارية آمنة وشفافة، والتحقق من جودة ومصداقية الموردين، وتوفير أدوات ذكية تساعد التجار على اتخاذ قرارات شراء صائبة.
                   </p>
                </div>
             </div>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
             <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80" alt="Team" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                   <h4 className="font-bold text-xl">فريق عمل متكامل</h4>
                   <p className="text-slate-200 text-sm">نعمل على مدار الساعة لخدمتكم</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Values Grid */}
      <div className="bg-white py-20 border-y border-slate-200">
         <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h2 className="text-3xl font-bold text-slate-900 mb-4">قيمنا الجوهرية</h2>
               <p className="text-slate-500">مبادئنا هي الأساس الذي نبني عليه كل علاقاتنا التجارية</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
               <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
                  <Globe size={40} className="text-primary-600 mb-4" />
                  <h3 className="font-bold text-xl mb-3">الشمولية</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">ندعم جميع أحجام الأعمال، من الورش الصغيرة وحتى المصانع العملاقة.</p>
               </div>
               <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
                  <Award size={40} className="text-primary-600 mb-4" />
                  <h3 className="font-bold text-xl mb-3">الجودة</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">نلتزم بأعلى معايير الجودة في التحقق من البيانات وعرض المنتجات.</p>
               </div>
               <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
                  <HeartHandshake size={40} className="text-primary-600 mb-4" />
                  <h3 className="font-bold text-xl mb-3">الشراكة</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">نجاح عملائنا هو نجاحنا، نسعى دائماً لبناء علاقات طويلة الأمد.</p>
               </div>
            </div>
         </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 mt-20 text-center">
         <div className="bg-primary-600 rounded-3xl p-10 md:p-16 text-white shadow-2xl shadow-primary-500/30">
            <h2 className="text-3xl md:text-4xl font-black mb-6">جاهز للانطلاق؟</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
               انضم لأكثر من 15,000 تاجر ومورد وابدأ في توسيع نطاق أعمالك اليوم.
            </p>
            <Link to="/register" className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-transform hover:scale-105 inline-block">
               سجل حساب مجاني
            </Link>
         </div>
      </div>

    </div>
  );
};

// Icons needed for this component specifically
import { Building2, ShoppingBag, CalendarDays } from 'lucide-react';

export default About;