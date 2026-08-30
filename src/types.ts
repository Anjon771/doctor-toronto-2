export type ProductCategory = 
  | 'all'
  | 'ppe'
  | 'masks'
  | 'gloves'
  | 'gowns'
  | 'sanitizers'
  | 'dental'
  | 'shields'
  | 'infection-control'
  | 'accessories'
  | 'other';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  status: 'In Stock' | 'Low Stock' | 'Bulk Orders Available';
  inStock: boolean;
  packaging: string;
  minimumOrder: string;
  samplePrice?: string; // Clearly marked sample pricing
  certifications: string[];
  specs: {
    material?: string;
    grade?: string;
    filtrationEfficiency?: string;
    sterilization?: string;
    thickness?: string;
    color?: string;
    sizes?: string;
    compliance?: string;
    [key: string]: string | undefined;
  };
  keyFeatures: string[];
  applications: string[];
  rating: number;
  reviewsCount: number;
  featured?: boolean;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  itemCount: number;
  iconName: string;
  featured?: boolean;
}

export interface QuoteItem {
  product: Product;
  quantity: number;
  unit: 'boxes' | 'cases' | 'pallets' | 'units';
  notes?: string;
}

export interface QuoteFormData {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  productInterestedIn: string;
  quantity: string;
  urgency: 'Immediate (1-3 days)' | 'Standard (1-2 weeks)' | 'Bulk Supply Tender';
  businessType: 'Dental Clinic' | 'Medical Practice' | 'Hospital / Care Home' | 'Laboratory' | 'Corporate / Facility' | 'Other';
  message: string;
  agreeTerms: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  clinic: string;
  location: string;
  verified: boolean;
  rating: number;
  avatar: string;
  suppliesUsed: string;
}

export interface ContentArticle {
  id: string;
  tag: 'Product Tips' | 'PPE Information' | 'New Products' | 'Special Offers' | 'Healthcare Tips' | 'Customer Updates';
  title: string;
  readTime: string;
  date: string;
  excerpt: string;
  content: string[];
  takeaways: string[];
  image: string;
  author: string;
}

export interface Promotion {
  id: string;
  title: string;
  headline: string;
  description: string;
  discountBadge: string;
  code: string;
  applicableCategories: string[];
  validUntil: string;
  terms: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Orders & Shipping' | 'Certifications & Compliance' | 'Pricing & Bulk' | 'Account & Support';
}
