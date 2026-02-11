
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Supplier, User, AppSettings } from '../types';
import { 
    fetchSuppliers, deleteSupplierService, 
    fetchUsers, updateUserStatus, deleteUser,
    fetchSettings, updateSettings,
    fetchCategories, addCategory, removeCategory
} from '../services/supabaseService';
import { 
  Plus, Search, Edit, Trash2, Users, LayoutDashboard, 
  Settings, Power, Shield, Check, X, Tag, Lock, Unlock
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'suppliers' | 'users' | 'settings'>('overview');
  
  // Data States
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  
  // New Category State
  const [newCategoryName, setNewCategoryName] = useState('');

  // Load All Data
  const refreshData = async () => {
      setIsLoading(true);
      const [s, u, sets, cats] = await Promise.all([
          fetchSuppliers(), 
          fetchUsers(),
          fetchSettings(),
          fetchCategories()
      ]);
      setSuppliers(s);
      setUsers(u);
      setSettings(sets);
      setCategories(cats);
      setIsLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  // --- Handlers ---

  const handleDeleteSupplier = async (id: string) => {
      if (window.confirm('حذف المورد؟')) {
          await deleteSupplierService(id);
          refreshData();
      }
  };

  const handleUserStatus = async (id: string, currentStatus: boolean) => {
      await updateUserStatus(id, !currentStatus);
      refreshData();
  };

  const handleDeleteUser = async (id: string) => {
      if (window.confirm('حذف المستخدم نهائياً؟')) {
          await deleteUser(id);
          refreshData();
      }
  };

  const toggleSetting = async (key: keyof AppSettings) => {
      if (!settings) return;
      const newSets = { ...settings, [key]: !settings[key] };
      await updateSettings(newSets);
      setSettings(newSets);
  };

  const handleAddCategory = async () => {
      if (newCategoryName) {
          await addCategory(newCategoryName);
          setNewCategoryName('');
          refreshData();
      }
  };

  const handleRemoveCategory = async (cat: string) => {
      if (window.confirm(`حذف تصنيف ${cat}؟`)) {
          await removeCategory(cat);
          refreshData();
      }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 pb-20 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">لوحة التحكم المركزية</h1>
            <p className="text-slate-500 mt-1">التحكم الكامل في الأعضاء، الموردين، وإعدادات المنصة.</p>
          </div>
          <div className="flex gap-2">
             <button 
                onClick={() => navigate('/admin/add-supplier')}
                className="bg-primary-900 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-primary-800 transition-all flex items-center gap-2"
             >
                <Plus size={18} /> إضافة مورد
             </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 gap-6">
            <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={LayoutDashboard} label="نظرة عامة" />
            <TabButton active={activeTab === 'suppliers'} onClick={() => setActiveTab('suppliers')} icon={Tag} label="إدارة الموردين" />
            <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={Users} label="إدارة الأعضاء" />
            <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={Settings} label="الإعدادات العامة" />
        </div>

        {/* Content */}
        {isLoading ? (
            <div className="py-20 text-center text-slate-500">جاري تحميل البيانات...</div>
        ) : (
            <div className="animate-in fade-in slide-in-from-bottom-2">
                
                {/* Overview */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <StatCard title="الموردين" value={suppliers.length} icon={<Tag size={20} />} />
                        <StatCard title="الأعضاء" value={users.length} icon={<Users size={20} />} />
                        <StatCard title="المحظورين" value={users.filter(u => !u.isActive).length} icon={<Lock size={20} />} color="red" />
                        <StatCard title="التصنيفات" value={categories.length} icon={<LayoutDashboard size={20} />} />
                    </div>
                )}

                {/* Suppliers List */}
                {activeTab === 'suppliers' && (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 flex gap-4">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute right-3 top-2.5 text-slate-400" size={18} />
                                <input className="w-full pr-10 pl-4 py-2 bg-slate-50 border rounded-lg" placeholder="بحث..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                            </div>
                        </div>
                        <table className="w-full text-right text-sm">
                            <thead className="bg-slate-50 text-slate-500 font-bold">
                                <tr>
                                    <th className="p-4">الاسم</th>
                                    <th className="p-4">التصنيف</th>
                                    <th className="p-4">الحالة</th>
                                    <th className="p-4">إجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suppliers.filter(s => s.name.includes(searchQuery)).map(s => (
                                    <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50">
                                        <td className="p-4 font-bold">{s.name}</td>
                                        <td className="p-4">{s.category}</td>
                                        <td className="p-4">{s.isVerified ? <span className="text-green-600">موثق</span> : 'عادي'}</td>
                                        <td className="p-4 flex gap-2">
                                            <button onClick={() => navigate(`/admin/edit-supplier/${s.id}`)} className="text-blue-600 hover:bg-blue-50 p-2 rounded"><Edit size={16} /></button>
                                            <button onClick={() => handleDeleteSupplier(s.id)} className="text-red-600 hover:bg-red-50 p-2 rounded"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Users Management */}
                {activeTab === 'users' && (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100">
                             <h3 className="font-bold text-lg">قائمة الأعضاء المسجلين</h3>
                        </div>
                        <table className="w-full text-right text-sm">
                            <thead className="bg-slate-50 text-slate-500 font-bold">
                                <tr>
                                    <th className="p-4">الاسم</th>
                                    <th className="p-4">البريد</th>
                                    <th className="p-4">الدور</th>
                                    <th className="p-4">الحالة</th>
                                    <th className="p-4">تاريخ الانضمام</th>
                                    <th className="p-4">تحكم</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50">
                                        <td className="p-4 font-bold">{u.name}</td>
                                        <td className="p-4">{u.email}</td>
                                        <td className="p-4"><span className="bg-slate-100 px-2 py-1 rounded text-xs">{u.role}</span></td>
                                        <td className="p-4">
                                            {u.isActive ? <span className="text-green-600 flex items-center gap-1"><Check size={14} /> نشط</span> : <span className="text-red-600 flex items-center gap-1"><Lock size={14} /> محظور</span>}
                                        </td>
                                        <td className="p-4">{u.joinedDate}</td>
                                        <td className="p-4 flex gap-2">
                                            <button onClick={() => handleUserStatus(u.id, u.isActive)} className={`p-2 rounded ${u.isActive ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'}`} title={u.isActive ? 'حظر' : 'تنشيط'}>
                                                {u.isActive ? <Lock size={16} /> : <Unlock size={16} />}
                                            </button>
                                            <button onClick={() => handleDeleteUser(u.id)} className="text-red-600 hover:bg-red-50 p-2 rounded" title="حذف نهائي"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Settings & Categories */}
                {activeTab === 'settings' && settings && (
                    <div className="space-y-6">
                        {/* Global Settings */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <h3 className="font-bold text-xl mb-6 flex items-center gap-2"><Settings size={22} className="text-slate-500" /> إعدادات النظام</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                    <div>
                                        <div className="font-bold text-slate-800">فتح باب التسجيل</div>
                                        <div className="text-xs text-slate-500">السماح للأعضاء الجدد بإنشاء حسابات</div>
                                    </div>
                                    <button onClick={() => toggleSetting('registrationOpen')} className={`w-12 h-6 rounded-full relative transition-colors ${settings.registrationOpen ? 'bg-green-500' : 'bg-slate-300'}`}>
                                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings.registrationOpen ? 'left-1' : 'right-1'}`}></div>
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                    <div>
                                        <div className="font-bold text-slate-800">وضع الصيانة</div>
                                        <div className="text-xs text-slate-500">إغلاق الموقع مؤقتاً للتحديثات</div>
                                    </div>
                                    <button onClick={() => toggleSetting('maintenanceMode')} className={`w-12 h-6 rounded-full relative transition-colors ${settings.maintenanceMode ? 'bg-green-500' : 'bg-slate-300'}`}>
                                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${settings.maintenanceMode ? 'left-1' : 'right-1'}`}></div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Category Manager */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <h3 className="font-bold text-xl mb-6 flex items-center gap-2"><Tag size={22} className="text-slate-500" /> إدارة التصنيفات</h3>
                            <div className="flex gap-2 mb-6">
                                <input 
                                    className="flex-1 border border-slate-300 rounded-lg px-4 py-2" 
                                    placeholder="اسم التصنيف الجديد..."
                                    value={newCategoryName}
                                    onChange={e => setNewCategoryName(e.target.value)}
                                />
                                <button onClick={handleAddCategory} className="bg-primary-600 text-white px-6 py-2 rounded-lg font-bold">إضافة</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <div key={cat} className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                        <span className="font-medium text-slate-700">{cat}</span>
                                        <button onClick={() => handleRemoveCategory(cat)} className="text-slate-400 hover:text-red-500"><X size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 pb-4 px-2 font-bold transition-colors border-b-2 ${active ? 'text-primary-900 border-primary-900' : 'text-slate-500 border-transparent hover:text-slate-700'}`}
    >
        <Icon size={18} /> {label}
    </button>
);

const StatCard = ({ title, value, icon, color = 'blue' }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
     <div className="flex justify-between items-start mb-2">
        <div className={`p-2 rounded-lg ${color === 'red' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{icon}</div>
        <div className="text-3xl font-black text-slate-900">{value}</div>
     </div>
     <div className="text-slate-500 text-sm font-medium">{title}</div>
  </div>
);

export default AdminDashboard;
