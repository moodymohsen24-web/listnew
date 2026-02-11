import React, { useEffect, useState } from 'react';
import { Supplier, FilterState } from '../types';
import { fetchSuppliers } from '../services/supabaseService';
import SupplierCard from '../components/SupplierCard';
import FilterSidebar from '../components/FilterSidebar';
import { Search, SlidersHorizontal, Loader2, ArrowUpLeft, ArrowUpDown } from 'lucide-react';
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

  // Search Suggestions State
  const [suggestions, setSuggestions] = useState<Supplier[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    // Check URL params for initial category
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

  // Filter Logic
  let filteredSuppliers = suppliers.filter(supplier => {
    if (filters.searchQuery && !supplier.name.includes(filters.searchQuery) && !supplier.description.includes(filters.searchQuery)) return false;
    if (filters.city && supplier.city !== filters.city) return false;
    if (filters.region && supplier.region !== filters.region) return false;
    if (filters.category && supplier.category !== filters.category) return false;
    if (filters.verifiedOnly && !supplier.isVerified) return false;
    if (filters.minRating > 0 && supplier.rating < filters.minRating) return false;
    
    // Min Order Filter (e.g. if I want to buy for 2000, I need suppliers with minOrder <= 2000)
    if (filters.maxMinOrderValue > 0) {
        if (!supplier.minOrderValue || supplier.minOrderValue > filters.maxMinOrderValue) return false;
    }

    // Tags Filter (OR logic - if matches any selected tag)
    if (filters.selectedTags.length > 0) {
        const hasTag = filters.selectedTags.some(tag => supplier.tags.includes(tag));
        if (!hasTag) return false;
    }

    // Check total social followers
    const totalFollowers = supplier.socialStats.reduce((acc, curr) => acc + curr.followers, 0);
    if (filters.minFollowers > 0 && totalFollowers < filters.minFollowers) return false;

    return true;
  });

  // Sort Logic
  filteredSuppliers = filteredSuppliers.sort((a, b) => {
      switch (filters.sortBy) {
          case 'rating':
              return b.rating - a.rating;
          case 'reviews':
              return b.reviewCount - a.reviewCount;
          case 'founded':
              return a.foundedYear - b.foundedYear; // Oldest first
          case 'minOrder':
              return (a.minOrderValue || 0) - (b.minOrderValue || 0); // Lowest min order first
          default:
              return 0;
      }
  });

  // Handle Search Input Change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setFilters(prev => ({...prev, searchQuery: query}));
    
    if (query.trim().length > 0) {
      // Find matches in name or tags for suggestions
      const matches = suppliers.filter(s => 
        s.name.includes(query) || 
        s.tags.some(tag => tag.includes(query))
      ).slice(0, 5);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (name: string) => {
    setFilters(prev => ({...prev, searchQuery: name}));
    setIsSearchFocused(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-8 mb-8 relative z-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">دليل الموردين</h1>
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-2xl">
              <input 
                type="text" 
                placeholder="ابحث عن اسم المصنع، المنتج، أو المجال..." 
                className="w-full pl-4 pr-12 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm"
                value={filters.searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              />
              <Search className="absolute right-4 top-3.5 text-slate-400" size={20} />

              {/* Suggestions Dropdown */}
              {isSearchFocused && filters.searchQuery && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSelectSuggestion(suggestion.name)}
                      className="w-full text-right px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-none flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                         <img src={suggestion.logoUrl} alt="" className="w-8 h-8 rounded bg-slate-100 object-cover" />
                         <div>
                            <span className="block font-bold text-slate-700 group-hover:text-primary-600 transition-colors text-sm">{suggestion.name}</span>
                            <span className="block text-xs text-slate-400">{suggestion.category}</span>
                         </div>
                      </div>
                      <ArrowUpLeft size={16} className="text-slate-300 group-hover:text-primary-500 opacity-0 group-hover:opacity-100 transition-all" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button 
              className="md:hidden bg-slate-100 p-3 rounded-xl border border-slate-200 text-slate-700"
              onClick={() => setShowMobileFilters(true)}
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Desktop Sidebar */}
          <div className="hidden md:block col-span-1">
             <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Mobile Sidebar Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
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
          <div className="col-span-1 md:col-span-3">
            
            {/* Results Count & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-slate-700 font-bold">
                نتائج البحث: <span className="text-primary-600">{filteredSuppliers.length}</span> مورد
              </h2>
              
              <div className="flex items-center gap-2">
                 <ArrowUpDown size={16} className="text-slate-400" />
                 <span className="text-sm text-slate-500">ترتيب حسب:</span>
                 <select 
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({...prev, sortBy: e.target.value as any}))}
                    className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 text-slate-700 font-bold focus:outline-none focus:border-primary-500"
                 >
                    <option value="rating">الأعلى تقييماً</option>
                    <option value="reviews">الأكثر مراجعة</option>
                    <option value="founded">الأقدم تأسيساً (خبرة)</option>
                    <option value="minOrder">أقل حد أدنى للطلب</option>
                 </select>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 size={40} className="animate-spin text-primary-600 mb-4" />
                <p className="text-slate-500">جاري تحميل البيانات...</p>
              </div>
            ) : filteredSuppliers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSuppliers.map(supplier => (
                  <SupplierCard key={supplier.id} supplier={supplier} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                 <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                   <Search size={30} className="text-slate-400" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-800 mb-2">لا توجد نتائج</h3>
                 <p className="text-slate-500 max-w-sm mx-auto">
                   لم نتمكن من العثور على موردين يطابقون خيارات البحث الحالية. حاول تغيير الفلاتر أو كلمة البحث.
                 </p>
                 <button 
                  onClick={() => setFilters({ 
                      searchQuery: '', city: '', region: '', category: '', 
                      minRating: 0, minFollowers: 0, verifiedOnly: false, 
                      maxMinOrderValue: 0, selectedTags: [], sortBy: 'rating' 
                    })}
                  className="mt-6 text-primary-600 font-bold hover:underline"
                 >
                   إعادة تعيين الفلاتر
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