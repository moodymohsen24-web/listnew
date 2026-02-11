import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchSupplierById } from '../services/supabaseService';
import { Supplier, User, Review } from '../types';
import { 
  MapPin, Star, BadgeCheck, Phone, Mail, Globe, 
  Facebook, Twitter, Instagram, Send, Building2, 
  Clock, ArrowRight, UserCircle2, Loader2, Share2, LogIn, CheckCircle2
} from 'lucide-react';

interface SupplierDetailsProps {
  user: User | null;
}

const SupplierDetails: React.FC<SupplierDetailsProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const [showCopied, setShowCopied] = useState(false);
  
  // Review Form State
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadSupplier = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await fetchSupplierById(id);
        if (data) {
          setSupplier(data);
          setActiveImage(data.gallery?.[0] || data.coverUrl);
        }
      } catch (error) {
        console.error("Error loading supplier", error);
      } finally {
        setLoading(false);
      }
    };
    loadSupplier();
  }, [id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !supplier || newRating === 0) return;

    setIsSubmitting(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newReview: Review = {
      id: Math.random().toString(),
      user: user.name,
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    // Update local state
    setSupplier(prev => {
        if (!prev) return null;
        return {
            ...prev,
            reviews: [newReview, ...prev.reviews],
            reviewCount: prev.reviewCount + 1,
            // Simple new average calculation
            rating: Number(((prev.rating * prev.reviewCount + newRating) / (prev.reviewCount + 1)).toFixed(1))
        };
    });

    setNewRating(0);
    setNewComment('');
    setIsSubmitting(false);
  };

  const handleCall = () => {
    if (supplier?.contactPhone) {
      window.location.href = `tel:${supplier.contactPhone}`;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: supplier?.name,
          text: `تعرف على ${supplier?.name} على منصة موردين مصر`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 size={40} className="animate-spin text-primary-600 mb-4" />
        <p className="text-slate-500">جاري تحميل بيانات المورد...</p>
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <Building2 size={60} className="text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">المورد غير موجود</h2>
        <p className="text-slate-500 mb-6">عذراً، لم نتمكن من العثور على الصفحة المطلوبة.</p>
        <Link to="/directory" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700">
          العودة للدليل
        </Link>
      </div>
    );
  }

  // Helper for social icons
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <Facebook size={18} />;
      case 'instagram': return <Instagram size={18} />;
      case 'telegram': return <Send size={18} />;
      case 'tiktok': return <span className="font-bold text-xs">Tk</span>;
      default: return <Globe size={18} />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Hero Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="relative h-64 md:h-80 bg-slate-900">
          <img 
            src={supplier.coverUrl} 
            alt={supplier.name} 
            className="w-full h-full object-cover opacity-60" 
          />
          <div className="absolute top-6 right-4 sm:right-6 lg:right-10 z-10">
             <Link to="/directory" className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold transition-colors">
                <ArrowRight size={18} /> العودة للدليل
             </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row items-start gap-6 -mt-16 mb-8 relative z-10">
            {/* Logo */}
            <div className="w-32 h-32 bg-white rounded-2xl shadow-lg p-1 border border-slate-100">
               <img src={supplier.logoUrl} alt={supplier.name} className="w-full h-full object-cover rounded-xl" />
            </div>

            {/* Info */}
            <div className="flex-1 pt-4 md:pt-16">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2 mb-2">
                    {supplier.name}
                    {supplier.isVerified && <BadgeCheck size={24} className="text-blue-500 fill-blue-50" />}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                      <Building2 size={14} /> {supplier.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={16} className="text-slate-400" /> {supplier.city} {supplier.region && ` - ${supplier.region}`}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-600 font-bold">
                       <Star size={16} className="text-yellow-500 fill-yellow-500" /> {supplier.rating}
                       <span className="text-slate-400 font-normal">({supplier.reviewCount} تقييم)</span>
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                   <button 
                    onClick={handleCall}
                    className="flex-1 md:flex-none bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
                   >
                      <Phone size={18} /> إتصل الآن
                   </button>
                   <button 
                    onClick={handleShare}
                    className="bg-white border border-slate-200 text-slate-700 p-3 rounded-xl hover:bg-slate-50 transition-colors relative"
                    title="مشاركة"
                   >
                      {showCopied ? <CheckCircle2 size={20} className="text-green-600" /> : <Share2 size={20} />}
                      {showCopied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">تم النسخ</span>}
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Right Column) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description */}
            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">عن {supplier.name}</h2>
              <p className="text-slate-600 leading-8 text-lg">
                {supplier.description}
              </p>
              
              <div className="mt-6">
                <h4 className="font-bold text-sm text-slate-800 mb-3">المنتجات والخدمات:</h4>
                <div className="flex flex-wrap gap-2">
                  {supplier.tags.map(tag => (
                    <span key={tag} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-lg text-sm font-medium border border-primary-100">
                      # {tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Gallery */}
            {supplier.gallery && supplier.gallery.length > 0 && (
              <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">معرض الصور</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="md:col-span-3 h-80 rounded-xl overflow-hidden cursor-pointer shadow-md bg-slate-100">
                      <img src={activeImage} alt="Main" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                   </div>
                   {supplier.gallery.map((img, idx) => (
                     <div 
                      key={idx} 
                      onClick={() => setActiveImage(img)}
                      className={`h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${activeImage === img ? 'border-primary-500 ring-2 ring-primary-100' : 'border-transparent opacity-70 hover:opacity-100'}`}
                     >
                       <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                     </div>
                   ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                 <h2 className="text-xl font-bold text-slate-900">التقييمات والآراء</h2>
                 <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-lg">
                    <Star size={16} className="fill-yellow-500 text-yellow-500" />
                    <span className="font-bold text-lg">{supplier.rating}</span>
                    <span className="text-sm text-slate-500">من 5</span>
                 </div>
              </div>

              {/* Review Form */}
              <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                 {user ? (
                   <form onSubmit={handleSubmitReview}>
                     <h4 className="font-bold text-slate-800 mb-4">أضف تقييمك</h4>
                     
                     <div className="mb-4">
                       <label className="block text-sm font-medium text-slate-600 mb-2">التقييم العام</label>
                       <div className="flex gap-1">
                         {[1, 2, 3, 4, 5].map((star) => (
                           <button
                             key={star}
                             type="button"
                             onClick={() => setNewRating(star)}
                             className={`transition-colors p-1 ${newRating >= star ? 'text-yellow-500' : 'text-slate-300 hover:text-yellow-400'}`}
                           >
                             <Star size={28} className={newRating >= star ? "fill-current" : ""} />
                           </button>
                         ))}
                       </div>
                     </div>

                     <div className="mb-4">
                       <label className="block text-sm font-medium text-slate-600 mb-2">تعليقك</label>
                       <textarea 
                          rows={3}
                          className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                          placeholder="شاركنا تجربتك مع هذا المورد..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          required
                       ></textarea>
                     </div>

                     <button 
                       type="submit" 
                       disabled={isSubmitting || newRating === 0}
                       className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                     >
                       {isSubmitting ? 'جاري النشر...' : 'نشر التقييم'}
                     </button>
                   </form>
                 ) : (
                   <div className="text-center py-4">
                     <p className="text-slate-600 mb-4">يجب عليك تسجيل الدخول لتتمكن من إضافة تقييم</p>
                     <Link to="/login" className="inline-flex items-center gap-2 bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-900 transition-colors">
                       <LogIn size={18} /> تسجيل الدخول
                     </Link>
                   </div>
                 )}
              </div>

              {/* Reviews List */}
              {supplier.reviews && supplier.reviews.length > 0 ? (
                <div className="space-y-6">
                  {supplier.reviews.map(review => (
                    <div key={review.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 shrink-0">
                         <UserCircle2 size={32} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-900">{review.user}</h4>
                          <span className="text-xs text-slate-400">{review.date}</span>
                        </div>
                        <div className="flex text-yellow-500 my-1">
                          {[...Array(5)].map((_, i) => (
                             <Star key={i} size={14} className={i < review.rating ? "fill-current" : "text-slate-200 fill-slate-200"} />
                          ))}
                        </div>
                        <p className="text-slate-600 text-sm mt-2 bg-white border border-slate-100 p-3 rounded-lg rounded-tr-none shadow-sm">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Star size={40} className="mx-auto text-slate-200 mb-2" />
                  <p>كن أول من يقيم هذا المورد!</p>
                </div>
              )}
            </section>

          </div>

          {/* Sidebar (Left Column) */}
          <div className="space-y-6">
            
            {/* Contact Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
               <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <Phone size={18} className="text-primary-600" /> معلومات التواصل
               </h3>
               
               <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                       <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold">رقم الهاتف الأساسي</p>
                      <p dir="ltr" className="text-slate-800 font-bold text-lg">{supplier.contactPhone}</p>
                    </div>
                  </div>

                  {supplier.email && (
                    <div className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                      <Mail size={20} className="text-slate-400" />
                      <a href={`mailto:${supplier.email}`} className="text-slate-600 hover:text-primary-600 text-sm">{supplier.email}</a>
                    </div>
                  )}

                  {supplier.website && (
                    <div className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                      <Globe size={20} className="text-slate-400" />
                      <a href={`http://${supplier.website}`} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-primary-600 text-sm">{supplier.website}</a>
                    </div>
                  )}
               </div>

               {/* Sales Team */}
               {supplier.salesContacts && supplier.salesContacts.length > 0 && (
                 <div className="mt-8 pt-6 border-t border-slate-100">
                   <h4 className="font-bold text-sm text-slate-700 mb-4">مسئولي المبيعات</h4>
                   <div className="space-y-3">
                      {supplier.salesContacts.map((contact, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <div>
                            <p className="font-bold text-slate-800">{contact.name}</p>
                            <p className="text-xs text-slate-500">{contact.role}</p>
                          </div>
                          <a href={`tel:${contact.phone}`} className="bg-primary-50 text-primary-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary-100">
                            اتصال
                          </a>
                        </div>
                      ))}
                   </div>
                 </div>
               )}

               {/* Social Media */}
               <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="font-bold text-sm text-slate-700 mb-4">تابعنا على</h4>
                  <div className="flex gap-2 flex-wrap">
                    {supplier.socialStats.map((stat, i) => (
                      <a 
                        key={i} 
                        href={stat.url} 
                        className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 px-4 py-2 rounded-lg text-slate-600 transition-colors text-sm"
                      >
                         {getSocialIcon(stat.platform)}
                         <span className="font-bold" dir="ltr">{(stat.followers / 1000).toFixed(1)}k</span>
                      </a>
                    ))}
                  </div>
               </div>
            </div>

            {/* Work Hours (Static for now) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <Clock size={18} className="text-primary-600" /> ساعات العمل
               </h3>
               <ul className="space-y-2 text-sm text-slate-600">
                 <li className="flex justify-between">
                   <span>السبت - الخميس</span>
                   <span className="font-bold text-green-600">9:00 ص - 6:00 م</span>
                 </li>
                 <li className="flex justify-between">
                   <span>الجمعة</span>
                   <span className="font-bold text-red-500">مغلق</span>
                 </li>
               </ul>
            </div>

          </div>
        </div>

        {/* New Full Width Map Section */}
        <div className="mt-8 mb-8">
            <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-sm">
               <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-xl">
                 <MapPin size={24} className="text-primary-600" /> الموقع على الخريطة
               </h3>
               <div className="w-full h-96 bg-slate-100 rounded-xl overflow-hidden relative shadow-inner">
                 <iframe 
                   title="map"
                   width="100%" 
                   height="100%" 
                   frameBorder="0" 
                   scrolling="no" 
                   marginHeight={0} 
                   marginWidth={0} 
                   loading="lazy"
                   src={`https://maps.google.com/maps?q=${supplier.location.lat},${supplier.location.lng}&hl=ar&z=15&output=embed`}
                   className="grayscale hover:grayscale-0 transition-all duration-500"
                 ></iframe>
                 <a 
                   href={`https://www.google.com/maps/search/?api=1&query=${supplier.location.lat},${supplier.location.lng}`} 
                   target="_blank" 
                   rel="noreferrer"
                   className="absolute bottom-4 right-4 bg-white text-slate-800 text-sm font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-primary-50 transition-colors flex items-center gap-2"
                 >
                   <MapPin size={16} /> فتح في Google Maps
                 </a>
               </div>
               <div className="mt-4 flex items-start gap-2 text-slate-600 bg-slate-50 p-4 rounded-lg">
                 <MapPin size={20} className="mt-0.5 shrink-0 text-slate-500" />
                 <p className="text-lg">{supplier.address}</p>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;