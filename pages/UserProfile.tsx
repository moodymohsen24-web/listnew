
import React, { useState } from 'react';
import { User } from '../types';
import { updateUserProfile } from '../services/supabaseService';
import { UserCircle, Building2, Save, Loader2, Mail, Phone, Lock, AlertCircle } from 'lucide-react';

interface UserProfileProps {
  user: User;
  setUser: (user: User) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, setUser }) => {
  const [formData, setFormData] = useState<User>({ ...user });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
        const updatedUser = await updateUserProfile(formData);
        setUser(updatedUser);
        setMessage({ type: 'success', text: 'تم تحديث البيانات بنجاح' });
    } catch (error) {
        setMessage({ type: 'error', text: 'حدث خطأ أثناء التحديث' });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                <UserCircle size={32} />
            </div>
            <div>
                <h1 className="text-2xl font-black text-slate-900">إعدادات الحساب</h1>
                <p className="text-slate-500">قم بتحديث بياناتك الشخصية ومعلومات الدخول</p>
            </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                
                {message && (
                    <div className={`p-4 rounded-lg flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                        {message.type === 'success' ? <div className="w-2 h-2 rounded-full bg-green-500" /> : <AlertCircle size={18} />}
                        {message.text}
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">الاسم بالكامل</label>
                        <input 
                            type="text" 
                            className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-500 outline-none"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div>
                         <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف</label>
                         <div className="relative">
                            <Phone className="absolute right-3 top-3.5 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                className="w-full border border-slate-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-primary-500 outline-none"
                                value={formData.phone || ''}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                placeholder="010xxxxxxx"
                            />
                         </div>
                    </div>
                </div>

                <div>
                     <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
                     <div className="relative">
                        <Mail className="absolute right-3 top-3.5 text-slate-400" size={18} />
                        <input 
                            type="email" 
                            className="w-full border border-slate-300 rounded-lg p-3 pr-10 bg-slate-50 text-slate-500 cursor-not-allowed"
                            value={formData.email}
                            disabled
                        />
                     </div>
                     <p className="text-xs text-slate-400 mt-1">لا يمكن تغيير البريد الإلكتروني.</p>
                </div>

                {user.role === 'supplier' && (
                    <div className="p-4 bg-primary-50 rounded-xl border border-primary-100">
                        <div className="flex items-start gap-3">
                            <Building2 className="text-primary-600 mt-1" size={24} />
                            <div>
                                <h3 className="font-bold text-primary-900 mb-1">بيانات الشركة</h3>
                                <p className="text-sm text-primary-700 mb-3">
                                    أنت مسجل كحساب مورد. يمكنك تعديل بيانات شركتك ومنتجاتك من خلال لوحة تحكم الموردين.
                                </p>
                                <input 
                                    className="w-full border border-primary-200 rounded-lg p-2 mb-2 text-sm"
                                    placeholder="اسم الشركة"
                                    value={formData.companyName || ''}
                                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-500/20 flex items-center gap-2 disabled:opacity-70"
                    >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                        حفظ التعديلات
                    </button>
                </div>

            </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
