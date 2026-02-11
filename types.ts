export interface SocialStats {
  platform: 'facebook' | 'tiktok' | 'telegram' | 'instagram';
  followers: number;
  url: string;
}

export interface Supplier {
  id: string;
  name: string;
  description: string;
  category: string;
  city: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  logoUrl: string;
  coverUrl: string;
  contactPhone: string;
  socialStats: SocialStats[];
  minOrderValue?: number;
  foundedYear: number;
  tags: string[];
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
