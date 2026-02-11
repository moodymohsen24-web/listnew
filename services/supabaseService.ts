import { Supplier, User } from '../types';
import { MOCK_SUPPLIERS } from '../mockData';

// NOTE: In a real application, you would initialize the Supabase client here.
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/**
 * Mocks fetching suppliers from a database.
 * Supports simulation of network delay.
 */
export const fetchSuppliers = async (): Promise<Supplier[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_SUPPLIERS);
    }, 800); // Simulate realistic network delay
  });
};

/**
 * Fetch a single supplier by ID
 */
export const fetchSupplierById = async (id: string): Promise<Supplier | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_SUPPLIERS.find(s => s.id === id));
      }, 500);
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
    }, 1000);
  });
};

/**
 * Mock adding a supplier (for Admin Dashboard)
 */
export const addSupplier = async (supplier: Partial<Supplier>): Promise<boolean> => {
  console.log("Adding supplier to Supabase:", supplier);
  return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
};
