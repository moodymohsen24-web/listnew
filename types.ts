export interface SocialStats {
  platform: 'facebook' | 'tiktok' | 'telegram' | 'instagram' | 'website';
  followers: number;
  url: string;
}

export interface SalesContact {
  name: string;
  role: string;
  phone: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Supplier {
  id: string;
  name: string;
  description: string;
  category: string;
  city: string;
  address: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  logoUrl: string;
  coverUrl: string;
  gallery: string[];
  contactPhone: string;
  email?: string;
  website?: string;
  socialStats: SocialStats[];
  salesContacts: SalesContact[];
  location: { lat: number; lng: number };
  minOrderValue?: number;
  foundedYear: number;
  tags: string[];
  reviews: Review[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'supplier';
}

export interface FilterState {
  searchQuery: string;
  city: string;
  category: string;
  minRating: number;
  minFollowers: number;
  verifiedOnly: boolean;
}
