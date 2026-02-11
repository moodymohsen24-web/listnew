import React, { useState } from 'react';
import { Supplier } from '../types';
import { MOCK_SUPPLIERS, CITIES, CATEGORIES } from '../mockData';
import { Plus, Search, Edit, Trash2, Save } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Supplier>>({});

  const handleAddNew = () => {
    setFormData({
      id: Math.random().toString(),
      name: '',
      category: CATEGORIES[0],
      city: CITIES[0],
      isVerified: false,
      socialStats: []
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (formData.name) {
      setSuppliers([...suppliers, formData as Supplier]);
      setIsEditing(false);
      // Here you would call Supabase insert
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">لوحة التحكم</h1>
            <p className="text-slate-500">إدارة الموردين والبيانات</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-700 shadow-lg shadow-primary-500/20"
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

        {/* Edit Modal (Inline for simplicity) */}
        {isEditing && (
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-primary-100 mb-10 animate-in fade-in slide-in-from-top-4">
            <h3 className="font-bold text-xl mb-6">بيانات المورد</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">اسم المورد / المصنع</label>
                <input 
                  className="w-full border rounded-lg p-3" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">المدينة</label>
                <select 
                  className="w-full border rounded-lg p-3 bg-white"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                >
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">التصنيف</label>
                <select 
                  className="w-full border rounded-lg p-3 bg-white"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-4 mt-6">
                 <button onClick={handleSave} className="bg-primary-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2">
                   <Save size={18} /> حفظ
                 </button>
                 <button onClick={() => setIsEditing(false)} className="text-slate-500 font-bold">إلغاء</button>
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
                  <th className="p-4">المدينة</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {suppliers.map(supplier => (
                  <tr key={supplier.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-800">{supplier.name}</td>
                    <td className="p-4 text-slate-600">
                      <span className="bg-slate-100 px-2 py-1 rounded text-xs">{supplier.category}</span>
                    </td>
                    <td className="p-4 text-slate-600">{supplier.city}</td>
                    <td className="p-4">
                      {supplier.isVerified ? (
                        <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">موثق</span>
                      ) : (
                        <span className="text-slate-500 text-xs font-bold bg-slate-100 px-2 py-1 rounded-full">غير موثق</span>
                      )}
                    </td>
                    <td className="p-4 flex gap-2">
                      <button className="p-2 hover:bg-blue-50 text-blue-600 rounded"><Edit size={16} /></button>
                      <button className="p-2 hover:bg-red-50 text-red-600 rounded"><Trash2 size={16} /></button>
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
