import React from 'react';
import { FilterState } from '../types';
import { CITIES, CITIES_DATA, CATEGORIES, MOCK_SUPPLIERS } from '../mockData';
import { Filter, X, Tag } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  className?: string;
  onClose?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, setFilters, className = "", onClose }) => {
  
  const handleChange = (key: keyof FilterState, value: any) => {
    // If city changes, reset region
    if (key === 'city') {
      setFilters(prev => ({ ...prev, city: value, region: '' }));
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.selectedTags.includes(tag)
      ? filters.selectedTags.filter(t => t !== tag)
      : [...filters.selectedTags, tag];
    setFilters(prev => ({ ...prev, selectedTags: newTags }));
  };

  const availableRegions = filters.city ? CITIES_DATA[filters.city] || [] : [];

  // Extract unique tags from mock data for the filter list
  // In a real app, this should come from an API aggregation
  const availableTags = Array.from(new Set(MOCK_SUPPLIERS.flatMap(s => s.tags))).slice(0, 10);

  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Filter size={20} className="text-primary-600" />
          تصفية النتائج
        </h3>
        {onClose && (
          <button onClick={onClose} className="md:hidden text-slate-400">
            <X size={24} />
          </button>
        )}
      </div>

      {/* Verified Toggle */}
      <div className="mb-6 pb-6 border-b border-slate-100">
        <label className="flex items-center cursor-pointer gap-3">
          <div className="relative">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={filters.verifiedOnly}
              onChange={(e) => handleChange('verifiedOnly', e.target.checked)}
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </div>
          <span className="text-sm font-medium text-slate-700">موردين موثقين فقط</span>
        </label>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-700 mb-2">التصنيف</label>
        <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar p-1">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors">
                <input 
                    type="radio" 
                    name="category"
                    checked={filters.category === ""}
                    onChange={() => handleChange('category', "")}
                    className="accent-primary-600"
                />
                <span className="text-sm text-slate-600">الكل</span>
            </label>
            {CATEGORIES.map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1 rounded transition-colors">
                    <input 
                        type="radio" 
                        name="category"
                        value={cat}
                        checked={filters.category === cat}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="accent-primary-600"
                    />
                    <span className="text-sm text-slate-600">{cat}</span>
                </label>
            ))}
        </div>
      </div>

      {/* City */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-slate-700 mb-2">المحافظة</label>
        <select 
          value={filters.city} 
          onChange={(e) => handleChange('city', e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
        >
          <option value="">كل المحافظات</option>
          {CITIES.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Region (Conditional) */}
      {filters.city && availableRegions.length > 0 && (
        <div className="mb-6 animate-in fade-in slide-in-from-top-2">
          <label className="block text-sm font-bold text-slate-700 mb-2">المنطقة / الحي</label>
          <select 
            value={filters.region} 
            onChange={(e) => handleChange('region', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
          >
            <option value="">كل المناطق</option>
            {availableRegions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      )}

      {/* Min Order Value Filter */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-700 mb-2">الحد الأقصى لأقل طلب (EGP)</label>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
             <span>أظهر الموردين الذين يقبلون طلبات بـ:</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="50000" 
          step="500"
          value={filters.maxMinOrderValue}
          onChange={(e) => handleChange('maxMinOrderValue', parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
        />
        <div className="flex justify-between text-xs font-bold text-primary-700 mt-2 bg-primary-50 p-2 rounded-lg border border-primary-100">
          <span>{filters.maxMinOrderValue === 0 ? 'غير محدد' : `${filters.maxMinOrderValue} جنيه`}</span>
        </div>
        <p className="text-[10px] text-slate-400 mt-1">
            * اختر المبلغ الذي تريد بدء الشراء به، وسنعرض لك الموردين المناسبين.
        </p>
      </div>

      {/* Tags Filter */}
      {availableTags.length > 0 && (
        <div className="mb-6">
             <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Tag size={14} /> كلمات مفتاحية (Tags)
             </label>
             <div className="flex flex-wrap gap-2">
                 {availableTags.map(tag => (
                     <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                            filters.selectedTags.includes(tag)
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300'
                        }`}
                     >
                         {tag}
                     </button>
                 ))}
             </div>
        </div>
      )}

      {/* Min Followers */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-700 mb-2">عدد المتابعين (السوشيال ميديا)</label>
        <input 
          type="range" 
          min="0" 
          max="500000" 
          step="10000"
          value={filters.minFollowers}
          onChange={(e) => handleChange('minFollowers', parseInt(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>0</span>
          <span>{filters.minFollowers > 0 ? `+${(filters.minFollowers / 1000)}k` : 'الكل'}</span>
          <span>+500k</span>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-bold text-slate-700 mb-2">التقييم</label>
        <div className="flex gap-2">
            {[4, 3, 2].map(rating => (
                <button 
                    key={rating}
                    onClick={() => handleChange('minRating', filters.minRating === rating ? 0 : rating)}
                    className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        filters.minRating === rating 
                        ? 'bg-primary-50 border-primary-500 text-primary-700' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                >
                    {rating}+ ⭐️
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;