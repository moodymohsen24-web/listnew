import React from 'react';
import { Supplier } from '../types';
import { MapPin, Star, BadgeCheck, Facebook, Instagram, Send, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SupplierCardProps {
  supplier: Supplier;
}

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  return (
    <Link to={`/supplier/${supplier.id}`} className="block h-full">
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-primary-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full cursor-pointer">
        {/* Cover Image */}
        <div className="h-32 bg-slate-100 relative overflow-hidden">
            <img 
            src={supplier.coverUrl} 
            alt="cover" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
            <div className="absolute bottom-2 right-4 text-white text-xs font-medium bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/10">
            {supplier.category}
            </div>
        </div>

        <div className="p-5 flex-1 flex flex-col relative">
            {/* Avatar / Logo */}
            <div className="absolute -top-10 right-5">
                <div className="w-20 h-20 rounded-xl border-4 border-white shadow-md overflow-hidden bg-white group-hover:shadow-lg transition-shadow duration-300">
                    <img src={supplier.logoUrl} alt={supplier.name} className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="mt-10 mb-2 flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg text-slate-900 flex items-center gap-1 group-hover:text-primary-600 transition-colors duration-300">
                        {supplier.name}
                        {supplier.isVerified && <BadgeCheck size={18} className="text-blue-500 fill-blue-50" />}
                    </h3>
                    <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                        <MapPin size={14} />
                        {supplier.city}
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100 group-hover:border-yellow-200 transition-colors">
                        <Star size={14} className="text-yellow-500 fill-yellow-500 ml-1" />
                        <span className="font-bold text-slate-800 text-sm">{supplier.rating}</span>
                        <span className="text-xs text-slate-400 mr-1">({supplier.reviewCount})</span>
                    </div>
                </div>
            </div>

            <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                {supplier.description}
            </p>

            {/* Social Stats Preview */}
            <div className="flex gap-2 mb-4">
                {supplier.socialStats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-xs bg-slate-50 px-2 py-1 rounded text-slate-600 group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors duration-300">
                        {stat.platform === 'facebook' && <Facebook size={12} />}
                        {stat.platform === 'tiktok' && <span className="font-bold">Tk</span>}
                        {stat.platform === 'telegram' && <Send size={12} />}
                        <span dir="ltr">{(stat.followers / 1000).toFixed(1)}k</span>
                    </div>
                ))}
            </div>

            <div className="mt-auto border-t border-slate-100 pt-4 flex gap-2">
                <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium text-sm transition-all shadow-md shadow-primary-500/20 hover:shadow-primary-500/40 active:scale-95 flex items-center justify-center gap-2">
                    <Phone size={16} />
                    تواصل الآن
                </button>
                <div className="px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-primary-600 hover:border-primary-200 transition-all active:bg-primary-50 flex items-center justify-center">
                    <Send size={18} />
                </div>
            </div>
        </div>
        </div>
    </Link>
  );
};

export default SupplierCard;
