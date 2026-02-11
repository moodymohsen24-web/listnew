import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">اختر الخطة المناسبة لنمو أعمالك</h1>
          <p className="text-xl text-slate-500">
            سواء كنت تاجراً مبتدئاً أو صاحب مصنع كبير، لدينا الحل الأمثل لاحتياجاتك.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          
          {/* Free Plan */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
             <div className="mb-6">
               <h3 className="text-xl font-bold text-slate-900 mb-2">الباقة المجانية</h3>
               <p className="text-slate-500 text-sm">للتجار المبتدئين والباحثين</p>
             </div>
             <div className="mb-8">
               <span className="text-4xl font-black text-slate-900">0</span>
               <span className="text-slate-500 font-medium"> جنيه / شهرياً</span>
             </div>
             <Link to="/register" className="block w-full py-3 px-4 bg-slate-100 text-slate-700 font-bold rounded-xl text-center hover:bg-slate-200 transition-colors mb-8">
               ابدأ مجاناً
             </Link>
             <ul className="space-y-4 text-sm">
               <li className="flex items-center gap-3">
                 <Check className="text-green-500 shrink-0" size={18} />
                 <span>تصفح دليل الموردين</span>
               </li>
               <li className="flex items-center gap-3">
                 <Check className="text-green-500 shrink-0" size={18} />
                 <span>التواصل مع 5 موردين / يومياً</span>
               </li>
               <li className="flex items-center gap-3">
                 <X className="text-slate-300 shrink-0" size={18} />
                 <span className="text-slate-400">بدون شارة توثيق</span>
               </li>
               <li className="flex items-center gap-3">
                 <X className="text-slate-300 shrink-0" size={18} />
                 <span className="text-slate-400">لا يوجد دعم فني</span>
               </li>
             </ul>
          </div>

          {/* Pro Plan */}
          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl relative transform md:-translate-y-4">
             <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-3xl">الأكثر مبيعاً</div>
             <div className="mb-6">
               <h3 className="text-xl font-bold text-white mb-2">الباقة الذهبية</h3>
               <p className="text-slate-400 text-sm">للمصانع والتجار المحترفين</p>
             </div>
             <div className="mb-8">
               <span className="text-4xl font-black text-white">499</span>
               <span className="text-slate-400 font-medium"> جنيه / شهرياً</span>
             </div>
             <Link to="/register" className="block w-full py-3 px-4 bg-primary-600 text-white font-bold rounded-xl text-center hover:bg-primary-700 transition-colors mb-8 shadow-lg shadow-primary-600/30">
               اشترك الآن
             </Link>
             <ul className="space-y-4 text-sm text-white">
               <li className="flex items-center gap-3">
                 <div className="bg-primary-500/20 p-0.5 rounded-full"><Check className="text-primary-400 shrink-0" size={14} /></div>
                 <span>جميع مميزات المجانية</span>
               </li>
               <li className="flex items-center gap-3">
                 <div className="bg-primary-500/20 p-0.5 rounded-full"><Check className="text-primary-400 shrink-0" size={14} /></div>
                 <span>تواصل غير محدود</span>
               </li>
               <li className="flex items-center gap-3">
                 <div className="bg-primary-500/20 p-0.5 rounded-full"><Check className="text-primary-400 shrink-0" size={14} /></div>
                 <span>شارة التوثيق (Verified Badge)</span>
               </li>
               <li className="flex items-center gap-3">
                 <div className="bg-primary-500/20 p-0.5 rounded-full"><Check className="text-primary-400 shrink-0" size={14} /></div>
                 <span>أولوية الظهور في البحث</span>
               </li>
               <li className="flex items-center gap-3">
                 <div className="bg-primary-500/20 p-0.5 rounded-full"><Check className="text-primary-400 shrink-0" size={14} /></div>
                 <span>إحصائيات الزوار</span>
               </li>
             </ul>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all">
             <div className="mb-6">
               <h3 className="text-xl font-bold text-slate-900 mb-2">الشركات الكبرى</h3>
               <p className="text-slate-500 text-sm">للشركات القابضة والعلامات التجارية</p>
             </div>
             <div className="mb-8">
               <span className="text-4xl font-black text-slate-900">1999</span>
               <span className="text-slate-500 font-medium"> جنيه / شهرياً</span>
             </div>
             <Link to="/register" className="block w-full py-3 px-4 bg-white border-2 border-slate-900 text-slate-900 font-bold rounded-xl text-center hover:bg-slate-50 transition-colors mb-8">
               تواصل معنا
             </Link>
             <ul className="space-y-4 text-sm">
               <li className="flex items-center gap-3">
                 <Check className="text-green-500 shrink-0" size={18} />
                 <span>مدير حساب خاص</span>
               </li>
               <li className="flex items-center gap-3">
                 <Check className="text-green-500 shrink-0" size={18} />
                 <span>إضافة فروع متعددة</span>
               </li>
               <li className="flex items-center gap-3">
                 <Check className="text-green-500 shrink-0" size={18} />
                 <span>API Access للربط مع أنظمتك</span>
               </li>
               <li className="flex items-center gap-3">
                 <Check className="text-green-500 shrink-0" size={18} />
                 <span>حملات تسويقية مدفوعة</span>
               </li>
             </ul>
          </div>

        </div>

        {/* FAQ Preview */}
        <div className="max-w-3xl mx-auto mt-20">
           <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">أسئلة شائعة</h3>
           <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                 <h4 className="font-bold text-slate-800 mb-2">هل يمكنني تغيير الباقة لاحقاً؟</h4>
                 <p className="text-slate-600 text-sm">نعم، يمكنك الترقية أو تقليل الباقة في أي وقت من خلال لوحة التحكم الخاصة بك.</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                 <h4 className="font-bold text-slate-800 mb-2">كيف يتم توثيق الحساب؟</h4>
                 <p className="text-slate-600 text-sm">يتم طلب السجل التجاري والبطاقة الضريبية ومراجعتها من قبل فريقنا خلال 24 ساعة عمل.</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Pricing;