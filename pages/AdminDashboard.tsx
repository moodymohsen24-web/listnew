import React, { useState, useEffect } from 'react';
import { Supplier, SocialStats, SalesContact } from '../types';
import { MOCK_SUPPLIERS, CITIES, CITIES_DATA, CATEGORIES } from '../mockData';
import { 
  Plus, Search, Edit, Trash2, Save, X, Image as ImageIcon, 
  MapPin, Phone, Building2, Link as LinkIcon, Check, 
  MoreHorizontal, Filter, AlertCircle, Loader2, ChevronDown, 
  LayoutDashboard, Users, BadgeCheck, FileText
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'contact' | 'media' | 'location'>('basic');
  const [formData, setFormData] = useState<Partial<Supplier>>({});

  // Dynamic Cities & Regions State
  const [dynamicCities, setDynamicCities] = useState<string[]>(CITIES);
  const [dynamicCityData, setDynamicCityData] = useState<{[key: string]: string[]}>(CITIES_DATA);
  
  // UI States for adding new City/Region
  const [isAddingCity, setIsAddingCity] = useState(false);
  const [newCityName, setNewCityName] = useState("");
  const [isAddingRegion, setIsAddingRegion] = useState(false);
  const [newRegionName, setNewRegionName] = useState("");

  // Map URL State
  const [mapUrl, setMapUrl] = useState("");

  // Simulate Fetch
  useEffect(() => {
    const loadData = async () => {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setSuppliers(MOCK_SUPPLIERS);
        setIsLoading(false);
    };
    loadData();
  }, []);

  const handleAddNew = () => {
    setFormData({
      id: Math.random().toString(),
      name: '',
      category: CATEGORIES[0],
      city: dynamicCities[0],
      region: '',
      description: '',
      isVerified: false,
      socialStats: [],
      salesContacts: [],
      gallery: [],
      tags: [],
      location: { lat: 30.0444, lng: 31.2357 },
      rating: 5,
      reviewCount: 0,
      reviews: []
    });
    setMapUrl("");
    setIsEditing(true);
    setActiveTab('basic');
  };

  const handleEdit = (supplier: Supplier) => {
    setFormData({ ...supplier });
    if (supplier.location) {
        setMapUrl(`https://www.google.com/maps/@${supplier.location.lat},${supplier.location.lng},15z`);
    } else {
        setMapUrl("");
    }
    setIsEditing(true);
    setActiveTab('basic');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المورد؟ لا يمكن التراجع عن هذا الإجراء.')) {
      setSuppliers(suppliers.filter(s => s.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name) return alert('يجب ادخال اسم المورد');
    
    // Simulate API Call
    setIsLoading(true);
    setTimeout(() => {
        if (suppliers.some(s => s.id === formData.id)) {
            setSuppliers(suppliers.map(s => s.id === formData.id ? formData as Supplier : s));
        } else {
            setSuppliers([...suppliers, formData as Supplier]);
        }
        setIsLoading(false);
        setIsEditing(false);
    }, 500);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- Dynamic City Logic ---
  const handleAddCity = () => {
    if (!newCityName.trim()) return;
    if (!dynamicCities.includes(newCityName)) {
        setDynamicCities([...dynamicCities, newCityName]);
        setDynamicCityData({...dynamicCityData, [newCityName]: []});
        updateFormData('city', newCityName);
        updateFormData('region', '');
    }
    setNewCityName("");
    setIsAddingCity(false);
  };

  // --- Dynamic Region Logic ---
  const handleAddRegion = () => {
    if (!newRegionName.trim() || !formData.city) return;
    const currentRegions = dynamicCityData[formData.city] || [];
    if (!currentRegions.includes(newRegionName)) {
        const updatedRegions = [...currentRegions, newRegionName];
        setDynamicCityData({...dynamicCityData, [formData.city]: updatedRegions});
        updateFormData('region', newRegionName);
    }
    setNewRegionName("");
    setIsAddingRegion(false);
  };

  // --- Google Maps Parser ---
  const parseMapUrl = (url: string) => {
    setMapUrl(url);
    const regexAt = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const regexQ = /q=(-?\d+\.\d+),(-?\d+\.\d+)/;
    const regexEmbed = /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/;

    let match = url.match(regexAt) || url.match(regexQ);
    let lat, lng;

    if (match) {
        lat = parseFloat(match[1]);
        lng = parseFloat(match[2]);
    } else {
        match = url.match(regexEmbed);
        if (match) {
            lat = parseFloat(match[1]);
            lng = parseFloat(match[2]);
        }
    }

    if (lat && lng) {
        updateFormData('location', { lat, lng });
    }
  };

  // Nested Data Helpers
  const addSocialStat = () => {
    const newStats = [...(formData.socialStats || []), { platform: 'facebook', followers: 0, url: '' } as SocialStats];
    updateFormData('socialStats', newStats);
  };

  const updateSocialStat = (index: number, field: keyof SocialStats, value: any) => {
    const newStats = [...(formData.socialStats || [])];
    newStats[index] = { ...newStats[index], [field]: value };
    updateFormData('socialStats', newStats);
  };

  const removeSocialStat = (index: number) => {
    const newStats = [...(formData.socialStats || [])];
    newStats.splice(index, 1);
    updateFormData('socialStats', newStats);
  };

  const addSalesContact = () => {
     const newContacts = [...(formData.salesContacts || []), { name: '', role: '', phone: '' } as SalesContact];
     updateFormData('salesContacts', newContacts);
  };

  const updateSalesContact = (index: number, field: keyof SalesContact, value: any) => {
    const newContacts = [...(formData.salesContacts || [])];
    newContacts[index] = { ...newContacts[index], [field]: value };
    updateFormData('salesContacts', newContacts);
  };

  const removeSalesContact = (index: number) => {
    const newContacts = [...(formData.salesContacts || [])];
    newContacts.splice(index, 1);
    updateFormData('salesContacts', newContacts);
  };

  // Filter Logic
  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.includes(searchQuery) ||
    s.city.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 pb-20 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">لوحة التحكم</h1>
            <p className="text-slate-500 mt-1">نظرة عامة وإدارة شاملة لبيانات الموردين.</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="inline-flex items-center justify-center gap-2 bg-primary-900 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-primary-800 transition-all shadow-sm active:scale-95"
          >
            <Plus size={18} />
            إضافة مورد جديد
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard 
            title="إجمالي الموردين" 
            value={suppliers.length.toString()} 
            icon={<LayoutDashboard size={20} />} 
            trend="+12% من الشهر الماضي"
          />
          <StatCard 
            title="طلبات الانضمام" 
            value="12" 
            icon={<Users size={20} />} 
            trend="+5 جديدة اليوم"
            alert
          />
          <StatCard 
            title="حسابات موثقة" 
            value={suppliers.filter(s => s.isVerified).length.toString()} 
            icon={<BadgeCheck size={20} />} 
            trend="85% من الإجمالي"
          />
          <StatCard 
            title="تقارير ومشاكل" 
            value="3" 
            icon={<FileText size={20} />} 
            trend="تم حل 2"
          />
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Toolbar */}
          <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-white">
            <div className="relative w-full max-w-md">
               <Search className="absolute right-3 top-2.5 text-slate-400" size={18} />
               <input 
                 type="text" 
                 placeholder="بحث عن مورد..." 
                 className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
            <div className="flex items-center gap-2">
               <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg border border-slate-200">
                  <Filter size={18} />
               </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-4 w-[300px]">المورد</th>
                  <th className="p-4">التصنيف</th>
                  <th className="p-4">الموقع</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4">تاريخ التأسيس</th>
                  <th className="p-4 w-[100px]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  // Skeleton Loading State
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td className="p-4"><div className="h-10 w-48 bg-slate-100 rounded animate-pulse"></div></td>
                      <td className="p-4"><div className="h-6 w-24 bg-slate-100 rounded animate-pulse"></div></td>
                      <td className="p-4"><div className="h-6 w-32 bg-slate-100 rounded animate-pulse"></div></td>
                      <td className="p-4"><div className="h-6 w-16 bg-slate-100 rounded animate-pulse"></div></td>
                      <td className="p-4"><div className="h-6 w-12 bg-slate-100 rounded animate-pulse"></div></td>
                      <td className="p-4"></td>
                    </tr>
                  ))
                ) : filteredSuppliers.length > 0 ? (
                  filteredSuppliers.map(supplier => (
                    <tr key={supplier.id} className="group hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg border border-slate-100 bg-white p-1 shrink-0 overflow-hidden">
                                <img src={supplier.logoUrl} className="w-full h-full object-contain" alt="" onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/40'} />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">{supplier.name}</div>
                                <div className="text-xs text-slate-500">{supplier.email || 'لا يوجد بريد'}</div>
                            </div>
                         </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                          {supplier.category}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600">
                          <div className="flex items-center gap-1">
                             <MapPin size={14} className="text-slate-400" />
                             {supplier.city}
                          </div>
                      </td>
                      <td className="p-4">
                        {supplier.isVerified ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                            <Check size={12} /> موثق
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                            غير موثق
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-slate-600 font-mono">
                        {supplier.foundedYear}
                      </td>
                      <td className="p-4 text-left">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => handleEdit(supplier)}
                                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="تعديل"
                            >
                                <Edit size={16} />
                            </button>
                            <button 
                                onClick={() => handleDelete(supplier.id)}
                                className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="حذف"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  // Empty State
                  <tr>
                    <td colSpan={6} className="p-12 text-center">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <Search size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">لا توجد نتائج</h3>
                            <p className="text-sm">لم نتمكن من العثور على موردين يطابقون بحثك.</p>
                            <button 
                                onClick={() => setSearchQuery('')}
                                className="mt-4 text-primary-600 font-bold hover:underline text-sm"
                            >
                                مسح البحث
                            </button>
                        </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination (Mock) */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center text-xs text-slate-500">
             <span>عرض {Math.min(filteredSuppliers.length, 10)} من {filteredSuppliers.length} مورد</span>
             <div className="flex gap-1">
                 <button disabled className="px-3 py-1 border rounded bg-white disabled:opacity-50">السابق</button>
                 <button className="px-3 py-1 border rounded bg-white hover:bg-slate-50">التالي</button>
             </div>
          </div>
        </div>

        {/* Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        {formData.id && suppliers.find(s => s.id === formData.id) ? 'تعديل بيانات المورد' : 'إضافة مورد جديد'}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">قم بتحديث البيانات والتفاصيل الخاصة بالشركة.</p>
                </div>
                <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Sidebar Tabs & Content Layout */}
              <div className="flex flex-1 overflow-hidden">
                
                {/* Sidebar Navigation */}
                <div className="w-64 bg-slate-50 border-l border-slate-100 p-4 hidden md:block overflow-y-auto">
                    <div className="space-y-1">
                        {[
                          { id: 'basic', label: 'البيانات الأساسية', icon: Building2 },
                          { id: 'location', label: 'العنوان والموقع', icon: MapPin },
                          { id: 'contact', label: 'التواصل والمبيعات', icon: Phone },
                          { id: 'media', label: 'الصور والوسائط', icon: ImageIcon },
                        ].map((tab) => (
                           <button
                             key={tab.id}
                             onClick={() => setActiveTab(tab.id as any)}
                             className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                               activeTab === tab.id 
                               ? 'bg-white text-primary-700 shadow-sm ring-1 ring-slate-200' 
                               : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                             }`}
                           >
                             <tab.icon size={18} className={activeTab === tab.id ? 'text-primary-600' : 'text-slate-400'} />
                             {tab.label}
                           </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Tabs */}
                <div className="md:hidden flex border-b overflow-x-auto">
                     {/* Simplified Mobile Tabs Logic if needed, keeping simple for now */}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                    
                    {activeTab === 'basic' && (
                        <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 gap-6">
                                <FormGroup label="اسم المورد / المصنع" required>
                                    <input 
                                        className="form-input" 
                                        value={formData.name || ''} 
                                        onChange={e => updateFormData('name', e.target.value)}
                                        placeholder="مثال: مصنع الأمل للمنسوجات"
                                    />
                                </FormGroup>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <FormGroup label="التصنيف">
                                        <select 
                                            className="form-select"
                                            value={formData.category}
                                            onChange={e => updateFormData('category', e.target.value)}
                                        >
                                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </FormGroup>
                                    <FormGroup label="سنة التأسيس">
                                        <input 
                                            type="number"
                                            className="form-input" 
                                            value={formData.foundedYear || ''} 
                                            onChange={e => updateFormData('foundedYear', parseInt(e.target.value))}
                                        />
                                    </FormGroup>
                                </div>

                                <FormGroup label="نبذة تعريفية">
                                    <textarea 
                                        className="form-textarea h-32" 
                                        value={formData.description || ''} 
                                        onChange={e => updateFormData('description', e.target.value)}
                                        placeholder="اكتب وصفاً مختصراً عن نشاط المورد..."
                                    />
                                </FormGroup>

                                <FormGroup label="الوسوم (Tags)" helpText="افصل بين الوسوم بفاصلة">
                                    <input 
                                        className="form-input" 
                                        value={formData.tags?.join(', ') || ''} 
                                        onChange={e => updateFormData('tags', e.target.value.split(',').map(t => t.trim()))}
                                        placeholder="مثال: قطن، جملة، تصدير"
                                    />
                                </FormGroup>

                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                                    <div>
                                        <div className="font-bold text-sm text-slate-900">توثيق الحساب</div>
                                        <div className="text-xs text-slate-500">منح المورد شارة التوثيق الزرقاء</div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer" 
                                            checked={formData.isVerified || false}
                                            onChange={e => updateFormData('isVerified', e.target.checked)}
                                        />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'location' && (
                        <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="grid grid-cols-2 gap-4">
                                <FormGroup label="المحافظة">
                                   {!isAddingCity ? (
                                       <div className="flex gap-2">
                                           <select 
                                                className="form-select"
                                                value={formData.city}
                                                onChange={e => {
                                                    updateFormData('city', e.target.value);
                                                    updateFormData('region', ''); 
                                                }}
                                            >
                                                {dynamicCities.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                            <button onClick={() => setIsAddingCity(true)} className="icon-btn bg-slate-100 hover:bg-slate-200"><Plus size={18} /></button>
                                       </div>
                                   ) : (
                                       <div className="flex gap-2">
                                            <input 
                                                className="form-input"
                                                placeholder="اسم المحافظة"
                                                value={newCityName}
                                                onChange={(e) => setNewCityName(e.target.value)}
                                                autoFocus
                                            />
                                            <button onClick={handleAddCity} className="icon-btn bg-primary-600 text-white hover:bg-primary-700"><Check size={18} /></button>
                                            <button onClick={() => setIsAddingCity(false)} className="icon-btn bg-slate-100 text-slate-500 hover:bg-slate-200"><X size={18} /></button>
                                       </div>
                                   )}
                                </FormGroup>

                                <FormGroup label="المنطقة">
                                   {!isAddingRegion ? (
                                       <div className="flex gap-2">
                                           <select 
                                                className="form-select"
                                                value={formData.region || ''}
                                                onChange={e => updateFormData('region', e.target.value)}
                                                disabled={!formData.city}
                                            >
                                                <option value="">اختر المنطقة</option>
                                                {formData.city && dynamicCityData[formData.city]?.map(r => (
                                                    <option key={r} value={r}>{r}</option>
                                                ))}
                                            </select>
                                            <button 
                                                onClick={() => setIsAddingRegion(true)} 
                                                className="icon-btn bg-slate-100 hover:bg-slate-200 disabled:opacity-50"
                                                disabled={!formData.city}
                                            >
                                                <Plus size={18} />
                                            </button>
                                       </div>
                                   ) : (
                                       <div className="flex gap-2">
                                            <input 
                                                className="form-input"
                                                placeholder="اسم المنطقة"
                                                value={newRegionName}
                                                onChange={(e) => setNewRegionName(e.target.value)}
                                                autoFocus
                                            />
                                            <button onClick={handleAddRegion} className="icon-btn bg-primary-600 text-white hover:bg-primary-700"><Check size={18} /></button>
                                            <button onClick={() => setIsAddingRegion(false)} className="icon-btn bg-slate-100 text-slate-500 hover:bg-slate-200"><X size={18} /></button>
                                       </div>
                                   )}
                                </FormGroup>
                             </div>

                             <FormGroup label="العنوان التفصيلي">
                                 <input 
                                     className="form-input" 
                                     value={formData.address || ''} 
                                     onChange={e => updateFormData('address', e.target.value)}
                                 />
                             </FormGroup>

                             <FormGroup label="رابط خرائط جوجل (Google Maps URL)" icon={<LinkIcon size={14} />}>
                                 <div className="relative">
                                    <input 
                                        className="form-input pl-10 text-left" 
                                        placeholder="https://maps.google.com/..."
                                        dir="ltr"
                                        value={mapUrl}
                                        onChange={e => parseMapUrl(e.target.value)}
                                    />
                                    {formData.location?.lat && (
                                        <div className="absolute left-3 top-3 text-green-600 flex items-center gap-1 text-xs font-bold animate-pulse">
                                            <Check size={14} /> تم
                                        </div>
                                    )}
                                 </div>
                             </FormGroup>
                        </div>
                    )}

                    {activeTab === 'contact' && (
                        <div className="space-y-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="grid grid-cols-2 gap-4">
                                 <FormGroup label="رقم الهاتف">
                                     <input 
                                         className="form-input text-left" 
                                         dir="ltr"
                                         value={formData.contactPhone || ''} 
                                         onChange={e => updateFormData('contactPhone', e.target.value)}
                                     />
                                 </FormGroup>
                                 <FormGroup label="البريد الإلكتروني">
                                     <input 
                                         className="form-input text-left" 
                                         dir="ltr"
                                         value={formData.email || ''} 
                                         onChange={e => updateFormData('email', e.target.value)}
                                     />
                                 </FormGroup>
                             </div>
                             
                             <FormGroup label="الموقع الإلكتروني">
                                 <input 
                                     className="form-input text-left" 
                                     dir="ltr"
                                     value={formData.website || ''} 
                                     onChange={e => updateFormData('website', e.target.value)}
                                 />
                             </FormGroup>

                             {/* Sales Contacts */}
                             <div className="border rounded-lg p-4 bg-slate-50/50">
                                 <div className="flex justify-between items-center mb-4">
                                     <h3 className="font-bold text-sm text-slate-900">فريق المبيعات</h3>
                                     <button onClick={addSalesContact} className="text-primary-600 text-xs font-bold hover:underline">+ إضافة شخص</button>
                                 </div>
                                 <div className="space-y-3">
                                    {formData.salesContacts?.map((contact, idx) => (
                                        <div key={idx} className="flex gap-2 items-start">
                                            <input placeholder="الاسم" className="form-input text-xs py-2" value={contact.name} onChange={e => updateSalesContact(idx, 'name', e.target.value)} />
                                            <input placeholder="الوظيفة" className="form-input text-xs py-2" value={contact.role} onChange={e => updateSalesContact(idx, 'role', e.target.value)} />
                                            <input placeholder="الهاتف" className="form-input text-xs py-2 text-left" dir="ltr" value={contact.phone} onChange={e => updateSalesContact(idx, 'phone', e.target.value)} />
                                            <button onClick={() => removeSalesContact(idx)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                        </div>
                                    ))}
                                    {(!formData.salesContacts || formData.salesContacts.length === 0) && (
                                        <div className="text-center py-4 text-xs text-slate-400">لا يوجد جهات اتصال مضافة</div>
                                    )}
                                 </div>
                             </div>

                             {/* Social Media */}
                             <div className="border rounded-lg p-4 bg-slate-50/50">
                                 <div className="flex justify-between items-center mb-4">
                                     <h3 className="font-bold text-sm text-slate-900">منصات التواصل</h3>
                                     <button onClick={addSocialStat} className="text-primary-600 text-xs font-bold hover:underline">+ إضافة منصة</button>
                                 </div>
                                 <div className="space-y-3">
                                    {formData.socialStats?.map((stat, idx) => (
                                        <div key={idx} className="flex gap-2 items-start">
                                            <select className="form-select text-xs py-2 w-32" value={stat.platform} onChange={e => updateSocialStat(idx, 'platform', e.target.value)}>
                                                <option value="facebook">Facebook</option>
                                                <option value="instagram">Instagram</option>
                                                <option value="tiktok">TikTok</option>
                                            </select>
                                            <input type="number" placeholder="المتابعين" className="form-input text-xs py-2 w-24" value={stat.followers} onChange={e => updateSocialStat(idx, 'followers', parseInt(e.target.value))} />
                                            <input placeholder="الرابط" className="form-input text-xs py-2 text-left flex-1" dir="ltr" value={stat.url} onChange={e => updateSocialStat(idx, 'url', e.target.value)} />
                                            <button onClick={() => removeSocialStat(idx)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                        </div>
                                    ))}
                                 </div>
                             </div>
                        </div>
                    )}

                    {activeTab === 'media' && (
                        <div className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="p-4 border rounded-lg bg-slate-50 flex items-start gap-4">
                                 <div className="w-20 h-20 bg-white rounded-lg border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                                     {formData.logoUrl ? <img src={formData.logoUrl} className="w-full h-full object-contain" /> : <ImageIcon className="text-slate-300" />}
                                 </div>
                                 <div className="flex-1">
                                     <FormGroup label="رابط الشعار (Logo URL)">
                                        <input 
                                            className="form-input text-left" 
                                            dir="ltr"
                                            value={formData.logoUrl || ''} 
                                            onChange={e => updateFormData('logoUrl', e.target.value)}
                                        />
                                     </FormGroup>
                                 </div>
                             </div>

                             <div className="p-4 border rounded-lg bg-slate-50 flex items-start gap-4">
                                 <div className="w-32 h-20 bg-white rounded-lg border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                                     {formData.coverUrl ? <img src={formData.coverUrl} className="w-full h-full object-cover" /> : <ImageIcon className="text-slate-300" />}
                                 </div>
                                 <div className="flex-1">
                                     <FormGroup label="رابط الغلاف (Cover URL)">
                                        <input 
                                            className="form-input text-left" 
                                            dir="ltr"
                                            value={formData.coverUrl || ''} 
                                            onChange={e => updateFormData('coverUrl', e.target.value)}
                                        />
                                     </FormGroup>
                                 </div>
                             </div>

                             <FormGroup label="معرض الصور (URLs)" helpText="روابط مباشرة للصور، كل رابط في سطر أو مفصولة بفاصلة">
                                <textarea 
                                    className="form-textarea h-32 text-left font-mono text-xs"
                                    dir="ltr"
                                    value={formData.gallery?.join(', ') || ''}
                                    onChange={e => updateFormData('gallery', e.target.value.split(',').map(s => s.trim()))}
                                />
                             </FormGroup>
                        </div>
                    )}

                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-xl">
                 <button 
                    onClick={() => setIsEditing(false)} 
                    className="px-5 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition-all"
                 >
                   إلغاء
                 </button>
                 <button 
                    onClick={handleSave} 
                    className="px-6 py-2.5 rounded-lg text-sm font-bold bg-primary-900 text-white hover:bg-primary-800 shadow-md shadow-primary-900/10 flex items-center gap-2 transition-all active:scale-95"
                 >
                   {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                   حفظ التغييرات
                 </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// Helper Components for Cleaner JSX
const StatCard = ({ title, value, icon, trend, alert }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
       <div className={`p-2 rounded-lg ${alert ? 'bg-orange-50 text-orange-600' : 'bg-slate-50 text-slate-600'}`}>
          {icon}
       </div>
       {alert && <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>}
    </div>
    <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
    <div className="text-sm font-medium text-slate-500">{title}</div>
    <div className={`text-xs mt-3 font-medium ${alert ? 'text-orange-600' : 'text-green-600'}`}>
       {trend}
    </div>
  </div>
);

const FormGroup = ({ label, children, required, icon, helpText }: any) => (
    <div className="mb-1">
        <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
            {icon} {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        {helpText && <p className="text-[10px] text-slate-400 mt-1">{helpText}</p>}
    </div>
);

// Add these styles to your main CSS or inject via style tag if strictly no CSS file editing allowed (Simulated Tailwind abstractions)
const cssInjections = `
  .form-input { @apply w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm py-2.5; }
  .form-select { @apply w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm py-2.5 bg-white; }
  .form-textarea { @apply w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm py-2.5; }
  .icon-btn { @apply p-2.5 rounded-lg border border-transparent transition-colors flex items-center justify-center; }
`;

export default AdminDashboard;