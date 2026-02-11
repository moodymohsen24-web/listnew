import React, { useState } from 'react';
import { Supplier, SocialStats, SalesContact } from '../types';
import { MOCK_SUPPLIERS, CITIES, CITIES_DATA, CATEGORIES } from '../mockData';
import { Plus, Search, Edit, Trash2, Save, X, Image as ImageIcon, MapPin, Phone, Share2, Building2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'contact' | 'media' | 'location'>('basic');
  const [formData, setFormData] = useState<Partial<Supplier>>({});

  const handleAddNew = () => {
    setFormData({
      id: Math.random().toString(),
      name: '',
      category: CATEGORIES[0],
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
    });
    setIsEditing(true);
    setActiveTab('basic');
  };

  const handleEdit = (supplier: Supplier) => {
    setFormData({ ...supplier });
    setIsEditing(true);
    setActiveTab('basic');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المورد؟')) {
      setSuppliers(suppliers.filter(s => s.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name) return alert('يجب ادخال اسم المورد');
    
    if (suppliers.some(s => s.id === formData.id)) {
        // Update existing
        setSuppliers(suppliers.map(s => s.id === formData.id ? formData as Supplier : s));
    } else {
        // Create new
        setSuppliers([...suppliers, formData as Supplier]);
    }
    setIsEditing(false);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Helper for dynamic arrays (social stats, sales contacts)
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

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">لوحة التحكم</h1>
            <p className="text-slate-500">إدارة الموردين والبيانات</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all active:scale-95"
          >
            <Plus size={20} />
            إضافة مورد جديد
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'إجمالي الموردين', val: suppliers.length, color: 'bg-blue-500' },
            { label: 'طلبات الانضمام', val: 12, color: 'bg-orange-500' },
            { label: 'الموثقين', val: suppliers.filter(s => s.isVerified).length, color: 'bg-green-500' },
            { label: 'تقارير المستخدمين', val: 5, color: 'bg-red-500' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-800">{stat.val}</h3>
              </div>
              <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
            </div>
          ))}
        </div>

        {/* Edit Modal / Form */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                <h3 className="font-bold text-xl text-slate-800">
                    {formData.id && suppliers.find(s => s.id === formData.id) ? 'تعديل بيانات المورد' : 'إضافة مورد جديد'}
                </h3>
                <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-200 px-6 gap-6">
                {[
                  { id: 'basic', label: 'البيانات الأساسية', icon: Building2 },
                  { id: 'location', label: 'العنوان والموقع', icon: MapPin },
                  { id: 'contact', label: 'التواصل والمبيعات', icon: Phone },
                  { id: 'media', label: 'الصور والوسائط', icon: ImageIcon },
                ].map((tab) => (
                   <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id as any)}
                     className={`py-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                       activeTab === tab.id 
                       ? 'text-primary-600 border-primary-600' 
                       : 'text-slate-500 border-transparent hover:text-slate-700'
                     }`}
                   >
                     <tab.icon size={18} />
                     {tab.label}
                   </button>
                ))}
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                
                {/* Basic Info Tab */}
                {activeTab === 'basic' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2">
                     <div className="col-span-2">
                       <label className="block text-sm font-bold mb-2">اسم المورد / المصنع</label>
                       <input 
                         className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none" 
                         value={formData.name || ''} 
                         onChange={e => updateFormData('name', e.target.value)}
                         placeholder="مثال: مصنع الأمل للمنسوجات"
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-bold mb-2">التصنيف</label>
                       <select 
                         className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                         value={formData.category}
                         onChange={e => updateFormData('category', e.target.value)}
                       >
                         {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                       </select>
                     </div>
                     <div>
                       <label className="block text-sm font-bold mb-2">سنة التأسيس</label>
                       <input 
                         type="number"
                         className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none" 
                         value={formData.foundedYear || ''} 
                         onChange={e => updateFormData('foundedYear', parseInt(e.target.value))}
                       />
                     </div>
                     <div className="col-span-2">
                       <label className="block text-sm font-bold mb-2">نبذة تعريفية</label>
                       <textarea 
                         className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none h-32" 
                         value={formData.description || ''} 
                         onChange={e => updateFormData('description', e.target.value)}
                         placeholder="اكتب وصفاً مختصراً عن نشاط المورد..."
                       />
                     </div>
                     <div className="col-span-2">
                        <label className="block text-sm font-bold mb-2">الوسوم (Tags) - افصل بينها بفاصلة</label>
                        <input 
                         className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none" 
                         value={formData.tags?.join(', ') || ''} 
                         onChange={e => updateFormData('tags', e.target.value.split(',').map(t => t.trim()))}
                         placeholder="مثال: قطن، جملة، تصدير"
                       />
                     </div>
                     <div className="col-span-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={formData.isVerified || false}
                                onChange={e => updateFormData('isVerified', e.target.checked)}
                                className="w-5 h-5 accent-primary-600"
                            />
                            <span className="font-bold text-slate-800">توثيق الحساب (Verified)</span>
                        </label>
                     </div>
                  </div>
                )}

                {/* Location Tab */}
                {activeTab === 'location' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2">
                    <div>
                       <label className="block text-sm font-bold mb-2">المحافظة</label>
                       <select 
                         className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                         value={formData.city}
                         onChange={e => {
                             updateFormData('city', e.target.value);
                             updateFormData('region', ''); // Reset region on city change
                         }}
                       >
                         {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                       </select>
                     </div>
                     <div>
                       <label className="block text-sm font-bold mb-2">المنطقة / الحي</label>
                       <select 
                         className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none bg-white"
                         value={formData.region || ''}
                         onChange={e => updateFormData('region', e.target.value)}
                         disabled={!formData.city}
                       >
                         <option value="">اختر المنطقة</option>
                         {formData.city && CITIES_DATA[formData.city]?.map(r => (
                             <option key={r} value={r}>{r}</option>
                         ))}
                       </select>
                     </div>
                     <div className="col-span-2">
                       <label className="block text-sm font-bold mb-2">العنوان التفصيلي</label>
                       <input 
                         className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none" 
                         value={formData.address || ''} 
                         onChange={e => updateFormData('address', e.target.value)}
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-bold mb-2">خط العرض (Latitude)</label>
                       <input 
                         type="number"
                         step="any"
                         className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none" 
                         value={formData.location?.lat || ''} 
                         onChange={e => updateFormData('location', {...formData.location, lat: parseFloat(e.target.value)})}
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-bold mb-2">خط الطول (Longitude)</label>
                       <input 
                         type="number"
                         step="any"
                         className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none" 
                         value={formData.location?.lng || ''} 
                         onChange={e => updateFormData('location', {...formData.location, lng: parseFloat(e.target.value)})}
                       />
                     </div>
                  </div>
                )}

                {/* Contact Tab */}
                {activeTab === 'contact' && (
                   <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-2">رقم الهاتف الأساسي</label>
                                <input 
                                    className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none text-left" 
                                    dir="ltr"
                                    value={formData.contactPhone || ''} 
                                    onChange={e => updateFormData('contactPhone', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">البريد الإلكتروني</label>
                                <input 
                                    className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none text-left" 
                                    dir="ltr"
                                    value={formData.email || ''} 
                                    onChange={e => updateFormData('email', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">الموقع الإلكتروني</label>
                                <input 
                                    className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none text-left" 
                                    dir="ltr"
                                    value={formData.website || ''} 
                                    onChange={e => updateFormData('website', e.target.value)}
                                />
                            </div>
                       </div>

                       {/* Sales Contacts */}
                       <div className="border-t border-slate-100 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-bold text-slate-800">مسؤولي المبيعات</h4>
                                <button type="button" onClick={addSalesContact} className="text-primary-600 text-sm font-bold flex items-center gap-1 hover:bg-primary-50 px-3 py-1 rounded">
                                    <Plus size={16} /> إضافة
                                </button>
                            </div>
                            {formData.salesContacts?.map((contact, idx) => (
                                <div key={idx} className="flex gap-2 mb-2 items-start">
                                    <input placeholder="الاسم" className="flex-1 border p-2 rounded" value={contact.name} onChange={e => updateSalesContact(idx, 'name', e.target.value)} />
                                    <input placeholder="الوظيفة" className="flex-1 border p-2 rounded" value={contact.role} onChange={e => updateSalesContact(idx, 'role', e.target.value)} />
                                    <input placeholder="الهاتف" className="flex-1 border p-2 rounded text-left" dir="ltr" value={contact.phone} onChange={e => updateSalesContact(idx, 'phone', e.target.value)} />
                                    <button onClick={() => removeSalesContact(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                </div>
                            ))}
                       </div>

                       {/* Social Media */}
                       <div className="border-t border-slate-100 pt-6">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-bold text-slate-800">وسائل التواصل الاجتماعي</h4>
                                <button type="button" onClick={addSocialStat} className="text-primary-600 text-sm font-bold flex items-center gap-1 hover:bg-primary-50 px-3 py-1 rounded">
                                    <Plus size={16} /> إضافة
                                </button>
                            </div>
                            {formData.socialStats?.map((stat, idx) => (
                                <div key={idx} className="flex gap-2 mb-2 items-start">
                                    <select className="w-32 border p-2 rounded bg-white" value={stat.platform} onChange={e => updateSocialStat(idx, 'platform', e.target.value)}>
                                        <option value="facebook">Facebook</option>
                                        <option value="instagram">Instagram</option>
                                        <option value="tiktok">TikTok</option>
                                        <option value="telegram">Telegram</option>
                                    </select>
                                    <input type="number" placeholder="المتابعين" className="w-24 border p-2 rounded" value={stat.followers} onChange={e => updateSocialStat(idx, 'followers', parseInt(e.target.value))} />
                                    <input placeholder="الرابط" className="flex-1 border p-2 rounded text-left" dir="ltr" value={stat.url} onChange={e => updateSocialStat(idx, 'url', e.target.value)} />
                                    <button onClick={() => removeSocialStat(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                </div>
                            ))}
                       </div>
                   </div>
                )}

                {/* Media Tab */}
                {activeTab === 'media' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                        <div>
                           <label className="block text-sm font-bold mb-2">رابط الشعار (Logo URL)</label>
                           <div className="flex gap-4">
                             <input 
                                className="flex-1 border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none text-left" 
                                dir="ltr"
                                value={formData.logoUrl || ''} 
                                onChange={e => updateFormData('logoUrl', e.target.value)}
                             />
                             <div className="w-12 h-12 border rounded overflow-hidden bg-slate-100 shrink-0">
                                {formData.logoUrl && <img src={formData.logoUrl} className="w-full h-full object-cover" alt="Preview" />}
                             </div>
                           </div>
                        </div>

                        <div>
                           <label className="block text-sm font-bold mb-2">رابط صورة الغلاف (Cover URL)</label>
                           <div className="flex gap-4">
                             <input 
                                className="flex-1 border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none text-left" 
                                dir="ltr"
                                value={formData.coverUrl || ''} 
                                onChange={e => updateFormData('coverUrl', e.target.value)}
                             />
                              <div className="w-24 h-12 border rounded overflow-hidden bg-slate-100 shrink-0">
                                {formData.coverUrl && <img src={formData.coverUrl} className="w-full h-full object-cover" alt="Preview" />}
                             </div>
                           </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">معرض الصور (URLs مفصولة بفاصلة)</label>
                            <textarea 
                                className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none h-24 text-left"
                                dir="ltr"
                                value={formData.gallery?.join(', ') || ''}
                                onChange={e => updateFormData('gallery', e.target.value.split(',').map(s => s.trim()))}
                                placeholder="http://example.com/img1.jpg, http://example.com/img2.jpg"
                            />
                        </div>
                    </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end gap-3">
                 <button onClick={() => setIsEditing(false)} className="px-6 py-2.5 rounded-lg font-bold text-slate-500 hover:bg-slate-200 transition-colors">
                   إلغاء
                 </button>
                 <button onClick={handleSave} className="px-8 py-2.5 rounded-lg font-bold bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 flex items-center gap-2">
                   <Save size={18} /> حفظ البيانات
                 </button>
              </div>

            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex gap-4">
            <div className="relative flex-1 max-w-sm">
               <Search className="absolute right-3 top-3 text-slate-400" size={18} />
               <input type="text" placeholder="بحث سريع..." className="w-full pr-10 pl-4 py-2 border rounded-lg text-sm" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-slate-50 text-slate-600 text-sm font-bold">
                <tr>
                  <th className="p-4">الاسم</th>
                  <th className="p-4">التصنيف</th>
                  <th className="p-4">الموقع</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {suppliers.map(supplier => (
                  <tr key={supplier.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-800 flex items-center gap-3">
                        <img src={supplier.logoUrl} className="w-8 h-8 rounded bg-slate-100 object-cover" alt="" />
                        {supplier.name}
                    </td>
                    <td className="p-4 text-slate-600">
                      <span className="bg-slate-100 px-2 py-1 rounded text-xs">{supplier.category}</span>
                    </td>
                    <td className="p-4 text-slate-600 text-sm">
                        {supplier.city} 
                        {supplier.region && <span className="text-xs text-slate-400 block">{supplier.region}</span>}
                    </td>
                    <td className="p-4">
                      {supplier.isVerified ? (
                        <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">موثق</span>
                      ) : (
                        <span className="text-slate-500 text-xs font-bold bg-slate-100 px-2 py-1 rounded-full">غير موثق</span>
                      )}
                    </td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => handleEdit(supplier)} className="p-2 hover:bg-blue-50 text-blue-600 rounded transition-colors"><Edit size={16} /></button>
                      <button onClick={() => handleDelete(supplier.id)} className="p-2 hover:bg-red-50 text-red-600 rounded transition-colors"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;