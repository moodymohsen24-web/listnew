import React, { useEffect, useState } from 'react';
import { Supplier, FilterState } from '../types';
import { fetchSuppliers } from '../services/supabaseService';
import SupplierCard from '../components/SupplierCard';
import FilterSidebar from '../components/FilterSidebar';
import { Search, SlidersHorizontal, Loader2, ArrowUpDown, LayoutGrid, List } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Directory: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchParams] = useSearchParams();
  
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    city: '',
    region: '',
    category: '',
    minRating: 0,
    minFollowers: 0,
    verifiedOnly: false,
    maxMinOrderValue: 0,
    selectedTags: [],
    sortBy: 'rating'
  });

  useEffect(() => {
    document.title = "السوق التجاري | موردين مصر";
    const catParam = searchParams.get('cat');
    if (catParam) {
        setFilters(prev => ({...prev, category: catParam}));
    }
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error("Failed to fetch suppliers", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [searchParams]);

  // Filter & Sort Logic (Same as before but cleaner code structure recommended)
  let filteredSuppliers = suppliers.filter(supplier => {
    if (filters.searchQuery && !supplier.name.includes(filters.searchQuery) && !supplier.description.includes(filters.searchQuery)) return false;
    if (filters.city && supplier.city !== filters.city) return false;
    if (filters.region && supplier.region !== filters.region) return false;
    if (filters.category && supplier.category !== filters.category) return false;
    if (filters.verifiedOnly && !supplier.isVerified) return false;
    if (filters.minRating > 0 && supplier.rating < filters.minRating) return false;
    if (filters.maxMinOrderValue > 0) {
        if (!supplier.minOrderValue || supplier.minOrderValue > filters.maxMinOrderValue) return false;
    }
    if (filters.selectedTags.length > 0) {
        const hasTag = filters.selectedTags.some(tag => supplier.tags.includes(tag));
        if (!hasTag) return false;
    }
    const totalFollowers = supplier.socialStats.reduce((acc, curr) => acc + curr.followers, 0);
    if (filters.minFollowers > 0 && totalFollowers < filters.minFollowers) return false;
    return true;
  });

  filteredSuppliers = filteredSuppliers.sort((a, b) => {
      switch (filters.sortBy) {
          case 'rating': return b.rating - a.rating;
          case 'reviews': return b.reviewCount - a.reviewCount;
          case 'founded': return a.foundedYear - b.foundedYear;
          case 'minOrder': return (a.minOrderValue || 0) - (b.minOrderValue || 0);
          default: return 0;
      }
  });

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Header Breadcrumb & Title */}
        <div className="mb-8">
            <div className="text-sm text-slate-500 mb-2">الرئيسية / السوق التجاري</div>
            <h1 className="text-3xl font-black text-primary-900">دليل الموردين والمصانع</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <div className="hidden lg:block col-span-1">
             <FilterSidebar filters={filters} setFilters={setFilters} className="sticky top-24" />
          </div>

          {/* Mobile Sidebar Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto">
                 <FilterSidebar 
                    filters={filters} 
                    setFilters={setFilters} 
                    className="h-full border-none shadow-none rounded-none"
                    onClose={() => setShowMobileFilters(false)}
                 />
              </div>
            </div>
          )}

          {/* Listings */}
          <div className="col-span-1 lg:col-span-3">
            
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                
                <div className="relative w-full md:w-96">
                   <Search className="absolute right-3 top-3 text-slate-400" size={18} />
                   <input 
                     type="text" 
                     placeholder="بحث باسم الشركة..." 
                     className="w-full pr-10 pl-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-primary-500 focus:outline-none"
                     value={filters.searchQuery}
                     onChange={(e) => setFilters(prev => ({...prev, searchQuery: e.target.value}))}
                   />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="lg:hidden p-2 border rounded-lg hover:bg-slate-50" onClick={() => setShowMobileFilters(true)}>
                        <SlidersHorizontal size={18} />
                    </button>
                    
                    <div className="flex items-center gap-2 border-r pr-3 mr-auto md:mr-0">
                         <span className="text-xs text-slate-500 font-bold hidden md:inline">ترتيب:</span>
                         <select 
                            value={filters.sortBy}
                            onChange={(e) => setFilters(prev => ({...prev, sortBy: e.target.value as any}))}
                            className="bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
                         >
                            <option value="rating">الأعلى تقييماً</option>
                            <option value="reviews">الأكثر مراجعة</option>
                            <option value="founded">الخبرة (الأقدم)</option>
                            <option value="minOrder">أقل حد للطلب</option>
                         </select>
                    </div>
                </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 size={40} className="animate-spin text-primary-600 mb-4" />
                <p className="text-slate-500">جاري تحميل البيانات...</p>
              </div>
            ) : filteredSuppliers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredSuppliers.map(supplier => (
                  <SupplierCard key={supplier.id} supplier={supplier} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center border border-slate-200 border-dashed">
                 <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                   <Search size={30} className="text-slate-400" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-800 mb-2">لا توجد نتائج</h3>
                 <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
                   لم نتمكن من العثور على موردين يطابقون خيارات البحث.
                 </p>
                 <button 
                  onClick={() => setFilters({ 
                      searchQuery: '', city: '', region: '', category: '', 
                      minRating: 0, minFollowers: 0, verifiedOnly: false, 
                      maxMinOrderValue: 0, selectedTags: [], sortBy: 'rating' 
                    })}
                  className="text-accent-600 font-bold hover:underline text-sm"
                 >
                   إلغاء جميع الفلاتر
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;