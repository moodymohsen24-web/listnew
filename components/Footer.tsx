import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 bg-primary-600 rounded flex items-center justify-center text-white font-bold">م</div>
               <span className="text-xl font-bold text-white">موردين<span className="text-primary-500">.مصر</span></span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              المنصة الأولى في مصر لربط أصحاب المصانع والموردين بالتجار ورواد الأعمال. قاعدة بيانات موثقة ومحدثة يومياً.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors"><Facebook size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors"><Instagram size={16} /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors"><Twitter size={16} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary-500 transition-colors">عن المنصة</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">تصفح الموردين</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">خطط الأسعار</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">سجل كمورد</a></li>
            </ul>
          </div>

           {/* Categories */}
           <div>
            <h4 className="text-white font-bold mb-6">أهم التصنيفات</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary-500 transition-colors">ملابس ومنسوجات</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">إلكترونيات</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">مواد بناء</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">أغذية ومشروبات</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-500 mt-0.5" />
                <span>مبنى 4، المنطقة التكنولوجية، المعادي، القاهرة</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500" />
                <span dir="ltr">+20 100 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500" />
                <span>support@suppliers.eg</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>© 2024 موردين مصر. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
