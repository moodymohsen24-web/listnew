import { Supplier } from './types';

export const CITIES = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'المنصورة',
  'المحلة الكبرى',
  'العاشر من رمضان',
  '6 أكتوبر',
  'بورسعيد',
  'دمياط'
];

export const CATEGORIES = [
  'ملابس ومنسوجات',
  'إلكترونيات',
  'مواد بناء',
  'أغذية ومشروبات',
  'أثاث وديكور',
  'بلاستيك وتغليف',
  'كيماويات'
];

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: '1',
    name: 'مصنع النور للمنسوجات',
    description: 'رائد في صناعة الملابس القطنية واليونيفورم بجودة تصدير عالية. نوفر خدمات التصنيع للغير.',
    category: 'ملابس ومنسوجات',
    city: 'المحلة الكبرى',
    rating: 4.8,
    reviewCount: 120,
    isVerified: true,
    logoUrl: 'https://picsum.photos/100/100?random=1',
    coverUrl: 'https://picsum.photos/800/400?random=1',
    contactPhone: '+201000000001',
    socialStats: [
      { platform: 'facebook', followers: 150000, url: '#' },
      { platform: 'telegram', followers: 5000, url: '#' }
    ],
    minOrderValue: 5000,
    foundedYear: 1995,
    tags: ['قطن 100%', 'تصدير', 'يونيفورم']
  },
  {
    id: '2',
    name: 'تكنو إيجيبت للإلكترونيات',
    description: 'مستورد وموزع معتمد لإكسسوارات المحمول وقطع الغيار الأصلية. أسعار خاصة للجملة.',
    category: 'إلكترونيات',
    city: 'القاهرة',
    rating: 4.5,
    reviewCount: 85,
    isVerified: true,
    logoUrl: 'https://picsum.photos/100/100?random=2',
    coverUrl: 'https://picsum.photos/800/400?random=2',
    contactPhone: '+201200000002',
    socialStats: [
      { platform: 'facebook', followers: 25000, url: '#' },
      { platform: 'tiktok', followers: 80000, url: '#' }
    ],
    minOrderValue: 2000,
    foundedYear: 2010,
    tags: ['جملة', 'شحن محافظات', 'ضمان']
  },
  {
    id: '3',
    name: 'البركة للأثاث الدمياطي',
    description: 'تشكيلة واسعة من الأثاث المودرن والكلاسيك. خشب زان أحمر روماني.',
    category: 'أثاث وديكور',
    city: 'دمياط',
    rating: 4.9,
    reviewCount: 200,
    isVerified: false,
    logoUrl: 'https://picsum.photos/100/100?random=3',
    coverUrl: 'https://picsum.photos/800/400?random=3',
    contactPhone: '+201100000003',
    socialStats: [
      { platform: 'facebook', followers: 300000, url: '#' }
    ],
    minOrderValue: 15000,
    foundedYear: 1980,
    tags: ['أثاث', 'غرف نوم', 'شحن دولي']
  },
  {
    id: '4',
    name: 'بلاستيك سيتي',
    description: 'حلول تغليف متكاملة للمصانع والمطاعم. أكياس، علب، ومطبوعات.',
    category: 'بلاستيك وتغليف',
    city: 'العاشر من رمضان',
    rating: 4.2,
    reviewCount: 45,
    isVerified: true,
    logoUrl: 'https://picsum.photos/100/100?random=4',
    coverUrl: 'https://picsum.photos/800/400?random=4',
    contactPhone: '+201500000004',
    socialStats: [
      { platform: 'facebook', followers: 12000, url: '#' },
      { platform: 'telegram', followers: 2000, url: '#' }
    ],
    foundedYear: 2018,
    tags: ['طباعة', 'تغليف', 'صديق للبيئة']
  }
];
