
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Supplier, SocialStats, SalesContact } from '../types';
import { saveSupplier, fetchSupplierById, fetchCategories } from '../services/supabaseService';
import { CITIES, CITIES_DATA, CATEGORIES } from '../mockData'; // Default categories as fallback
import { 
  Save, ArrowLeft, Image as ImageIcon, MapPin, Phone, 
  Building2, Link as LinkIcon, Check, Plus, Trash2, Loader2, X 
} from 'lucide-react';

const AdminSupplierForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  
  // Dynamic categories state
  const [categories, setCategories] = useState<string[]>([]);

  const [activeTab, setActiveTab] = useState<'basic' | 'contact' | 'media' | 'location'>('basic');
  
  // Default Empty State
  const defaultState: Partial<Supplier> = {
      id: Math.random().toString(),
      name: '',
      category: '',
      city: CITIES[0],
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
  };

  const [formData, setFormData] = useState<Partial<Supplier>>(defaultState);
  
  // Local UI States
  const [mapUrl, setMapUrl] = useState("");
  const [dynamicCities, setDynamicCities] = useState<string[]>(CITIES);
  const [dynamicCityData, setDynamicCityData] = useState<{[key: string]: string[]}>(CITIES_DATA);
  const [isAddingCity, setIsAddingCity] = useState(false);
  const [newCityName, setNewCityName] = useState("");
  const [isAddingRegion, setIsAddingRegion] = useState(false);
  const [newRegionName, setNewRegionName] = useState("");

  // Load Data
  useEffect(() => {
    const init = async () => {
        const fetchedCats = await fetchCategories();
        setCategories(fetchedCats);
        
        // If categories empty, fallback
        if (fetchedCats.length === 0) setCategories(CATEGORIES);
        
        // If ID exists, fetch supplier
        if (id) {
            const supplier = await fetchSupplierById(id);
            if (supplier) {
                setFormData(supplier);
                // Set initial category if not set
                if (!supplier.category && fetchedCats.length > 0) {
                    setFormData(prev => ({...prev, category: fetchedCats[0]}));
                }
                // Parse Map URL
                if (supplier.location) {
                    setMapUrl(`https://www.google.com/maps/@${supplier.location.lat},${supplier.location.lng},15z`);
                }
            }
        } else {
             // New Supplier: Set default category
             if (fetchedCats.length > 0) {
                 setFormData(prev => ({...prev, category: fetchedCats[0]}));
             }
        }
        setInitialLoading(false);
    };
    init();
  }, [id]);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.name) return alert('يجب ادخال اسم المورد');
    setLoading(true);
    await saveSupplier(formData as Supplier);
    setLoading(false);
    navigate('/admin');
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

  // --- Map Parser ---
  const parseMapUrl = (url: string) => {
    setMapUrl(url);
    const regexAt = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const regexQ = /q=(-?\d+\.\d+),(-?\d+\.\d+)/;
    const regexEmbed = /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/;

    let match = url.match(regexAt) || url.match(regexQ) || url.match(regexEmbed);
    if (match) {
        updateFormData('location', { lat: parseFloat(match[1]), lng: parseFloat(match[2]) });
    }
  };

  // --- Nested List Helpers ---
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

  if (initialLoading) {
      return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-primary-600" size={40} /></div>
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
       <div className="max-w-5xl mx-auto px-4">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                  <button onClick={() => navigate('/admin')} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                      <ArrowLeft size={24} className="text-slate-600" />
                  </button>
                  <div>
                      <h1 className="text-3xl font-bold text-slate-900">{id ? 'تعديل بيانات المورد' : 'إضافة مورد جديد'}</h1>
                      <p className="text-slate-500">قم بملء البيانات التالية بدقة لضمان ظهور المورد بشكل صحيح.</p>
                  </div>
              </div>
              <button 
                onClick={handleSave}
                disabled={loading}
                className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/20 flex items-center gap-2 disabled:opacity-70 transition-all"
              >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  حفظ البيانات
              </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Sidebar Tabs */}
              <div className="lg:col-span-1 space-y-2">
                 {[
                    { id: 'basic', label: 'البيانات الأساسية', icon: Building2 },
                    { id: 'location', label: 'العنوان والموقع', icon: MapPin },
                    { id: 'contact', label: 'التواصل والمبيعات', icon: Phone },
                    { id: 'media', label: 'الصور والوسائط', icon: ImageIcon },
                 ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl font-bold text-right transition-all ${
                            activeTab === tab.id 
                            ? 'bg-white text-primary-700 shadow-md border-r-4 border-primary-600' 
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                        }`}
                    >
                        <tab.icon size={20} className={activeTab === tab.id ? 'text-primary-600' : 'text-slate-400'} />
                        {tab.label}
                    </button>
                 ))}
              </div>

              {/* Form Content */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[600px]">
                  
                  {activeTab === 'basic' && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                           <div className="grid grid-cols-1 gap-6">
                                <FormGroup label="اسم المورد / المصنع" required>
                                    <input className="form-input" value={formData.name || ''} onChange={e => updateFormData('name', e.target.value)} placeholder="مثال: مصنع الأمل" />
                                </FormGroup>
                                
                                <div className="grid grid-cols-2 gap-6">
                                    <FormGroup label="التصنيف">
                                        <select className="form-select" value={formData.category} onChange={e => updateFormData('category', e.target.value)}>
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </FormGroup>
                                    <FormGroup label="سنة التأسيس">
                                        <input type="number" className="form-input" value={formData.foundedYear || ''} onChange={e => updateFormData('foundedYear', parseInt(e.target.value))} />
                                    </FormGroup>
                                </div>

                                <FormGroup label="نبذة تعريفية">
                                    <textarea className="form-textarea h-32" value={formData.description || ''} onChange={e => updateFormData('description', e.target.value)} placeholder="وصف النشاط..." />
                                </FormGroup>

                                <FormGroup label="الوسوم (Tags)">
                                    <input className="form-input" value={formData.tags?.join(', ') || ''} onChange={e => updateFormData('tags', e.target.value.split(',').map(t => t.trim()))} placeholder="قطن، جملة، تصدير" />
                                </FormGroup>

                                <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                                    <span className="font-bold text-slate-800">توثيق الحساب (Verified)</span>
                                    <input type="checkbox" className="w-6 h-6 accent-primary-600" checked={formData.isVerified || false} onChange={e => updateFormData('isVerified', e.target.checked)} />
                                </div>
                           </div>
                      </div>
                  )}

                  {activeTab === 'location' && (
                       <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                           <div className="grid grid-cols-2 gap-6">
                                <FormGroup label="المحافظة">
                                   {!isAddingCity ? (
                                       <div className="flex gap-2">
                                           <select className="form-select" value={formData.city} onChange={e => { updateFormData('city', e.target.value); updateFormData('region', ''); }}>
                                                {dynamicCities.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                            <button onClick={() => setIsAddingCity(true)} className="icon-btn bg-slate-100 hover:bg-slate-200"><Plus size={18} /></button>
                                       </div>
                                   ) : (
                                       <div className="flex gap-2">
                                            <input className="form-input" placeholder="اسم المحافظة" value={newCityName} onChange={(e) => setNewCityName(e.target.value)} autoFocus />
                                            <button onClick={handleAddCity} className="icon-btn bg-primary-600 text-white"><Check size={18} /></button>
                                            <button onClick={() => setIsAddingCity(false)} className="icon-btn bg-slate-100"><X size={18} /></button>
                                       </div>
                                   )}
                                </FormGroup>

                                <FormGroup label="المنطقة">
                                   {!isAddingRegion ? (
                                       <div className="flex gap-2">
                                           <select className="form-select" value={formData.region || ''} onChange={e => updateFormData('region', e.target.value)} disabled={!formData.city}>
                                                <option value="">اختر المنطقة</option>
                                                {formData.city && dynamicCityData[formData.city]?.map(r => <option key={r} value={r}>{r}</option>)}
                                            </select>
                                            <button onClick={() => setIsAddingRegion(true)} className="icon-btn bg-slate-100 hover:bg-slate-200" disabled={!formData.city}><Plus size={18} /></button>
                                       </div>
                                   ) : (
                                       <div className="flex gap-2">
                                            <input className="form-input" placeholder="اسم المنطقة" value={newRegionName} onChange={(e) => setNewRegionName(e.target.value)} autoFocus />
                                            <button onClick={handleAddRegion} className="icon-btn bg-primary-600 text-white"><Check size={18} /></button>
                                            <button onClick={() => setIsAddingRegion(false)} className="icon-btn bg-slate-100"><X size={18} /></button>
                                       </div>
                                   )}
                                </FormGroup>
                           </div>

                           <FormGroup label="العنوان التفصيلي">
                               <input className="form-input" value={formData.address || ''} onChange={e => updateFormData('address', e.target.value)} />
                           </FormGroup>

                           <FormGroup label="رابط خرائط جوجل">
                                <div className="relative">
                                    <input className="form-input pl-10 text-left" dir="ltr" value={mapUrl} onChange={e => parseMapUrl(e.target.value)} placeholder="https://maps.google.com/..." />
                                    {formData.location?.lat && <div className="absolute left-3 top-3 text-green-600 flex gap-1 text-xs font-bold"><Check size={14} /> تم</div>}
                                </div>
                           </FormGroup>
                       </div>
                  )}

                  {activeTab === 'contact' && (
                      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                           <div className="grid grid-cols-2 gap-6">
                               <FormGroup label="رقم الهاتف"><input className="form-input text-left" dir="ltr" value={formData.contactPhone || ''} onChange={e => updateFormData('contactPhone', e.target.value)} /></FormGroup>
                               <FormGroup label="البريد الإلكتروني"><input className="form-input text-left" dir="ltr" value={formData.email || ''} onChange={e => updateFormData('email', e.target.value)} /></FormGroup>
                           </div>
                           <FormGroup label="الموقع الإلكتروني"><input className="form-input text-left" dir="ltr" value={formData.website || ''} onChange={e => updateFormData('website', e.target.value)} /></FormGroup>

                           {/* Dynamic Lists Section (Simplified for brevity, similar to dashboard logic) */}
                           <div className="border rounded-xl p-6 bg-slate-50">
                               <div className="flex justify-between mb-4"><h3 className="font-bold">فريق المبيعات</h3><button onClick={addSalesContact} className="text-primary-600 text-sm font-bold">+ إضافة</button></div>
                               <div className="space-y-3">
                                  {formData.salesContacts?.map((c, i) => (
                                      <div key={i} className="flex gap-2"><input placeholder="الاسم" className="form-input py-2" value={c.name} onChange={e => updateSalesContact(i, 'name', e.target.value)} /><input placeholder="الهاتف" className="form-input py-2 text-left" dir="ltr" value={c.phone} onChange={e => updateSalesContact(i, 'phone', e.target.value)} /><button onClick={() => removeSalesContact(i)} className="text-red-500"><Trash2 size={18} /></button></div>
                                  ))}
                               </div>
                           </div>

                            <div className="border rounded-xl p-6 bg-slate-50">
                               <div className="flex justify-between mb-4"><h3 className="font-bold">السوشيال ميديا</h3><button onClick={addSocialStat} className="text-primary-600 text-sm font-bold">+ إضافة</button></div>
                               <div className="space-y-3">
                                  {formData.socialStats?.map((s, i) => (
                                      <div key={i} className="flex gap-2"><select className="form-select py-2 w-32" value={s.platform} onChange={e => updateSocialStat(i, 'platform', e.target.value)}><option value="facebook">Facebook</option><option value="instagram">Instagram</option></select><input placeholder="الرابط" className="form-input py-2 text-left" dir="ltr" value={s.url} onChange={e => updateSocialStat(i, 'url', e.target.value)} /><button onClick={() => removeSocialStat(i)} className="text-red-500"><Trash2 size={18} /></button></div>
                                  ))}
                               </div>
                           </div>
                      </div>
                  )}

                  {activeTab === 'media' && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                           <FormGroup label="رابط الشعار"><input className="form-input text-left" dir="ltr" value={formData.logoUrl || ''} onChange={e => updateFormData('logoUrl', e.target.value)} /></FormGroup>
                           <FormGroup label="رابط الغلاف"><input className="form-input text-left" dir="ltr" value={formData.coverUrl || ''} onChange={e => updateFormData('coverUrl', e.target.value)} /></FormGroup>
                           <FormGroup label="معرض الصور (URLs)"><textarea className="form-textarea h-32 text-left" dir="ltr" value={formData.gallery?.join(', ') || ''} onChange={e => updateFormData('gallery', e.target.value.split(',').map(s => s.trim()))} /></FormGroup>
                      </div>
                  )}

              </div>
          </div>
       </div>
    </div>
  );
};

const FormGroup = ({ label, children, required }: any) => (
    <div className="mb-1">
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label} {required && <span className="text-red-500">*</span>}</label>
        {children}
    </div>
);
// Injected styles
const cssInjections = `
  .form-input { @apply w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm py-3 bg-white; }
  .form-select { @apply w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm py-3 bg-white; }
  .form-textarea { @apply w-full rounded-lg border-slate-300 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm py-3 bg-white; }
  .icon-btn { @apply p-3 rounded-lg border border-transparent transition-colors flex items-center justify-center; }
`;

export default AdminSupplierForm;
