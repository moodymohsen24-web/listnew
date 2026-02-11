
import { Supplier, User, AppSettings } from '../types';
import { MOCK_SUPPLIERS, CATEGORIES } from '../mockData';

// --- Simulation State (In-Memory for Demo) ---
let localSuppliers = [...MOCK_SUPPLIERS];
let localCategories = [...CATEGORIES];

// Mock Users Data
let localUsers: User[] = [
  { id: 'u1', name: 'مدير النظام', email: 'admin@suppliers.eg', role: 'admin', isActive: true, joinedDate: '2023-01-01' },
  { id: 'u2', name: 'أحمد محمد', email: 'user@test.com', role: 'user', isActive: true, joinedDate: '2023-05-15', phone: '01012345678' },
  { id: 'u3', name: 'مصنع النور', email: 'info@elnoor-tex.com', role: 'supplier', isActive: true, joinedDate: '2023-06-20', companyName: 'مصنع النور للمنسوجات' },
  { id: 'u4', name: 'مستخدم محظور', email: 'banned@test.com', role: 'user', isActive: false, joinedDate: '2023-08-10' },
];

let appSettings: AppSettings = {
  registrationOpen: true,
  maintenanceMode: false,
  allowUserSupplierCreation: true
};

// --- Suppliers Services ---

export const fetchSuppliers = async (): Promise<Supplier[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(localSuppliers);
    }, 150);
  });
};

export const fetchSupplierById = async (id: string): Promise<Supplier | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(localSuppliers.find(s => s.id === id));
      }, 100);
    });
};

export const saveSupplier = async (supplier: Supplier): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = localSuppliers.findIndex(s => s.id === supplier.id);
      if (index >= 0) {
        localSuppliers[index] = supplier;
      } else {
        localSuppliers.push(supplier);
      }
      resolve(true);
    }, 400);
  });
};

export const deleteSupplierService = async (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            localSuppliers = localSuppliers.filter(s => s.id !== id);
            resolve(true);
        }, 300);
    });
}

// --- Auth & User Services ---

export const loginUser = async (email: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = localUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      // Auto-create admin for demo if 'admin' keyword is used and not exists
      if (!user && email.includes('admin')) {
         const newAdmin: User = { 
             id: Math.random().toString(), 
             email, 
             name: 'Admin User', 
             role: 'admin', 
             isActive: true, 
             joinedDate: new Date().toISOString().split('T')[0] 
         };
         localUsers.push(newAdmin);
         resolve(newAdmin);
         return;
      }

      if (user) {
        if (!user.isActive) {
            reject("تم حظر هذا الحساب. يرجى التواصل مع الإدارة.");
        } else {
            resolve(user);
        }
      } else {
        // Auto register for demo purposes
        if (!appSettings.registrationOpen) {
            reject("التسجيل مغلق حالياً.");
            return;
        }
        const newUser: User = {
            id: Math.random().toString(),
            email,
            name: 'مستخدم جديد',
            role: 'user',
            isActive: true,
            joinedDate: new Date().toISOString().split('T')[0]
        };
        localUsers.push(newUser);
        resolve(newUser);
      }
    }, 400);
  });
};

export const fetchUsers = async (): Promise<User[]> => {
    return new Promise(resolve => setTimeout(() => resolve(localUsers), 300));
};

export const updateUserStatus = async (userId: string, isActive: boolean): Promise<boolean> => {
    return new Promise(resolve => {
        const user = localUsers.find(u => u.id === userId);
        if (user) user.isActive = isActive;
        resolve(true);
    });
};

export const updateUserProfile = async (user: User): Promise<User> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const idx = localUsers.findIndex(u => u.id === user.id);
            if (idx >= 0) localUsers[idx] = user;
            resolve(user);
        }, 500);
    });
};

export const deleteUser = async (userId: string): Promise<boolean> => {
    return new Promise(resolve => {
        localUsers = localUsers.filter(u => u.id !== userId);
        resolve(true);
    });
};

// --- Settings & Categories Services ---

export const fetchCategories = async (): Promise<string[]> => {
    return new Promise(resolve => setTimeout(() => resolve(localCategories), 100));
};

export const addCategory = async (category: string): Promise<boolean> => {
    return new Promise(resolve => {
        if (!localCategories.includes(category)) {
            localCategories.push(category);
        }
        resolve(true);
    });
};

export const removeCategory = async (category: string): Promise<boolean> => {
    return new Promise(resolve => {
        localCategories = localCategories.filter(c => c !== category);
        resolve(true);
    });
};

export const fetchSettings = async (): Promise<AppSettings> => {
    return new Promise(resolve => setTimeout(() => resolve(appSettings), 100));
};

export const updateSettings = async (newSettings: AppSettings): Promise<boolean> => {
    return new Promise(resolve => {
        appSettings = newSettings;
        resolve(true);
    });
};
