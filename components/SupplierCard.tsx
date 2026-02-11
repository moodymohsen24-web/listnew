import React from 'react';
import { Supplier } from '../types';
import { MapPin, Star, BadgeCheck, ArrowRight, Building2, Calendar, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SupplierCardProps {
  supplier: Supplier;
}

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  return (
    <Link to={`/supplier/${supplier.id}`} className="block h-full group">
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 h-full flex flex-col relative hover:border-primary-200">
            
            {/* Status Bar */}
            {supplier.isVerified && (
                <div className="absolute top-0 right-0 left-0 h-1 bg-accent-500 z-10"></div>
            )}

            <div className="p-5 flex gap-4">
                {/* Logo Box */}
                <div className="w-20 h-20 shrink-0 border border-slate-100 rounded-lg overflow-hidden bg-slate-50 p-1 self-start">
                    <img src={supplier.logoUrl} alt={supplier.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>

                {/* Main Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <div>
                           <h3 className="font-bold text-lg text-primary-900 truncate group-hover:text-accent-600 transition-colors flex items-center gap-1.5">
                               {supplier.name}
                               {supplier.isVerified && <ShieldCheck size={16} className="text-accent-500" title="موثق" />}
                           </h3>
                           <p className="text-xs text-slate-500 font-medium mb-2">{supplier.category}</p>
                        </div>
                        {supplier.rating >= 4.5 && (
                            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs font-bold border border-green-100">
                                {supplier.rating} <Star size={10} className="fill-current" />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {supplier.city}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> تأسس {supplier.foundedYear}</span>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 border-t border-slate-100 bg-slate-50/50">
                <div className="p-3 text-center border-l border-slate-100">
                    <p className="text-[10px] text-slate-400 mb-0.5">الحد الأدنى للطلب</p>
                    <p className="text-xs font-bold text-slate-700">
                        {supplier.minOrderValue ? `${supplier.minOrderValue.toLocaleString()} ج.م` : 'غير محدد'}
                    </p>
                </div>
                <div className="p-3 text-center">
                    <p className="text-[10px] text-slate-400 mb-0.5">المتابعين</p>
                    <p className="text-xs font-bold text-slate-700 flex items-center justify-center gap-1">
                        <Users size={10} />
                        {supplier.socialStats.reduce((a, b) => a + b.followers, 0) > 1000 
                          ? `${(supplier.socialStats.reduce((a, b) => a + b.followers, 0) / 1000).toFixed(1)}k`
                          : supplier.socialStats.reduce((a, b) => a + b.followers, 0)
                        }
                    </p>
                </div>
            </div>

            {/* Tags footer */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
                <div className="flex gap-1 overflow-hidden">
                    {supplier.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded whitespace-nowrap">
                            {tag}
                        </span>
                    ))}
                    {supplier.tags.length > 2 && <span className="text-[10px] text-slate-400 px-1">+{supplier.tags.length - 2}</span>}
                </div>
                <span className="text-accent-600 group-hover:translate-x-[-4px] transition-transform">
                    <ArrowRight size={16} />
                </span>
            </div>
        </div>
    </Link>
  );
};

export default SupplierCard;