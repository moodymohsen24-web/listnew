import { Supplier, CityData } from './types';

export const CITIES_DATA: CityData = {
  'القاهرة': ['مدينة نصر', 'المعادي', 'مصر الجديدة', 'التجمع الخامس', 'وسط البلد', 'شبرا'],
  'الجيزة': ['6 أكتوبر', 'الهرم', 'فيصل', 'الدقي', 'المهندسين', 'الشيخ زايد'],
  'الإسكندرية': ['سموحة', 'ميامي', 'المنشية', 'العجمي', 'برج العرب'],
  'المنصورة': ['المشاية', 'توريل', 'حي الجامعة'],
  'المحلة الكبرى': ['المنطقة الصناعية', 'شارع البحر'],
  'العاشر من رمضان': ['المنطقة الصناعية الأولى', 'المنطقة الصناعية الثانية', 'الأردنية'],
  'بورسعيد': ['حي الشرق', 'بورفؤاد'],
  'دمياط': ['دمياط الجديدة', 'المنطقة الصناعية'],
  'الغربية': ['طنطا', 'كفر الزيات']
};

export const CITIES = Object.keys(CITIES_DATA);

export const CATEGORIES = [
  'ملابس ومنسوجات',
  'إلكترونيات',
  'مواد بناء',
  'أغذية ومشروبات',
  'أثاث وديكور',
  'بلاستيك وتغليف',
  'كيماويات',
  'طباعة وإعلان',
  'سيارات وقطع غيار'
];

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: '1',
    name: 'مصنع النور للمنسوجات',
    description: 'رائد في صناعة الملابس القطنية واليونيفورم بجودة تصدير عالية. نوفر خدمات التصنيع للغير ونمتلك خطوط إنتاج حديثة لتلبية الطلبات الكبيرة.',
    category: 'ملابس ومنسوجات',
    city: 'المحلة الكبرى',
    region: 'المنطقة الصناعية',
    address: 'المنطقة الصناعية الثانية، قطعة 44',
    rating: 4.8,
    reviewCount: 120,
    isVerified: true,
    logoUrl: 'https://picsum.photos/100/100?random=1',
    coverUrl: 'https://picsum.photos/800/400?random=1',
    gallery: [
      'https://picsum.photos/400/300?random=10',
      'https://picsum.photos/400/300?random=11',
      'https://picsum.photos/400/300?random=12',
      'https://picsum.photos/400/300?random=13'
    ],
    contactPhone: '+201000000001',
    email: 'info@elnoor-tex.com',
    website: 'www.elnoor-tex.com',
    socialStats: [
      { platform: 'facebook', followers: 150000, url: '#' },
      { platform: 'telegram', followers: 5000, url: '#' }
    ],
    salesContacts: [
      { name: 'أستاذ محمد علي', role: 'مدير المبيعات', phone: '+201001111111' },
      { name: 'أستاذة سارة', role: 'مسئولة مبيعات الجملة', phone: '+201002222222' }
    ],
    location: { lat: 30.9661, lng: 31.1688 },
    minOrderValue: 5000,
    foundedYear: 1995,
    tags: ['قطن 100%', 'تصدير', 'يونيفورم', 'ملابس أطفال'],
    reviews: [
      { id: '1', user: 'محمود حسن', rating: 5, comment: 'خامات ممتازة وتعامل راقي جداً', date: '2023-10-15' },
      { id: '2', user: 'شركة الأمل', rating: 4, comment: 'التزام بالمواعيد ولكن الأسعار مرتفعة قليلاً', date: '2023-09-20' }
    ]
  },
  {
    id: '2',
    name: 'تكنو إيجيبت للإلكترونيات',
    description: 'مستورد وموزع معتمد لإكسسوارات المحمول وقطع الغيار الأصلية. أسعار خاصة للجملة.',
    category: 'إلكترونيات',
    city: 'القاهرة',
    region: 'وسط البلد',
    address: 'شارع عبدالعزيز، العتبة، القاهرة',
    rating: 4.5,
    reviewCount: 85,
    isVerified: true,
    logoUrl: 'https://picsum.photos/100/100?random=2',
    coverUrl: 'https://picsum.photos/800/400?random=2',
    gallery: [
      'https://picsum.photos/400/300?random=20',
      'https://picsum.photos/400/300?random=21'
    ],
    contactPhone: '+201200000002',
    socialStats: [
      { platform: 'facebook', followers: 25000, url: '#' },
      { platform: 'tiktok', followers: 80000, url: '#' }
    ],
    salesContacts: [
      { name: 'م/ أحمد سامي', role: 'مبيعات الشركات', phone: '+201223334444' }
    ],
    location: { lat: 30.0444, lng: 31.2357 },
    minOrderValue: 2000,
    foundedYear: 2010,
    tags: ['جملة', 'شحن محافظات', 'ضمان', 'اكسسوارات'],
    reviews: []
  },
  {
    id: '3',
    name: 'البركة للأثاث الدمياطي',
    description: 'تشكيلة واسعة من الأثاث المودرن والكلاسيك. خشب زان أحمر روماني.',
    category: 'أثاث وديكور',
    city: 'دمياط',
    region: 'دمياط الجديدة',
    address: 'شارع بورسعيد، دمياط',
    rating: 4.9,
    reviewCount: 200,
    isVerified: false,
    logoUrl: 'https://picsum.photos/100/100?random=3',
    coverUrl: 'https://picsum.photos/800/400?random=3',
    gallery: ['https://picsum.photos/400/300?random=30'],
    contactPhone: '+201100000003',
    socialStats: [
      { platform: 'facebook', followers: 300000, url: '#' }
    ],
    salesContacts: [],
    location: { lat: 31.4175, lng: 31.8144 },
    minOrderValue: 15000,
    foundedYear: 1980,
    tags: ['أثاث', 'غرف نوم', 'شحن دولي'],
    reviews: []
  },
  {
    id: '4',
    name: 'بلاستيك سيتي',
    description: 'حلول تغليف متكاملة للمصانع والمطاعم. أكياس، علب، ومطبوعات.',
    category: 'بلاستيك وتغليف',
    city: 'العاشر من رمضان',
    region: 'المنطقة الصناعية الأولى',
    address: 'المنطقة الصناعية الثالثة، العاشر من رمضان',
    rating: 4.2,
    reviewCount: 45,
    isVerified: true,
    logoUrl: 'https://picsum.photos/100/100?random=4',
    coverUrl: 'https://picsum.photos/800/400?random=4',
    gallery: [],
    contactPhone: '+201500000004',
    socialStats: [
      { platform: 'facebook', followers: 12000, url: '#' },
      { platform: 'telegram', followers: 2000, url: '#' }
    ],
    salesContacts: [
       { name: 'مكتب المبيعات', role: 'المبيعات', phone: '+201555555555' }
    ],
    location: { lat: 30.2995, lng: 31.7455 },
    foundedYear: 2018,
    tags: ['طباعة', 'تغليف', 'صديق للبيئة'],
    reviews: []
  }
];