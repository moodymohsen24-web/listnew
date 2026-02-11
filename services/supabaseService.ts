import { Supplier, User } from '../types';
import { MOCK_SUPPLIERS } from '../mockData';

// NOTE: In a real application, you would initialize the Supabase client here.
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/**
 * Mocks fetching suppliers from a database.
 * Reduced latency for a snappier feel.
 */
export const fetchSuppliers = async (): Promise<Supplier[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_SUPPLIERS);
    }, 150); // Reduced from 800ms to 150ms for "instant" feel
  });
};

/**
 * Fetch a single supplier by ID
 */
export const fetchSupplierById = async (id: string): Promise<Supplier | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_SUPPLIERS.find(s => s.id === id));
      }, 100); // Reduced from 500ms
    });
  };

/**
 * Mock authentication function
 */
export const loginUser = async (email: string): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'user_123',
        email,
        name: 'أحمد محمد',
        role: email.includes('admin') ? 'admin' : 'user',
      });
    }, 400); // Reduced delay
  });
};

/**
 * Mock adding a supplier (for Admin Dashboard)
 */
export const addSupplier = async (supplier: Partial<Supplier>): Promise<boolean> => {
  console.log("Adding supplier to Supabase:", supplier);
  return new Promise((resolve) => setTimeout(() => resolve(true), 300));
};