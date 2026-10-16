export type ProductCategory = 'kurtas' | 'stoles' | 'home-linen';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  tagline: string;
  description: string;
  fabric: '100% Pure Handloom Cotton';
  cooperativeOrigin: {
    name: string;
    region: 'Maharashtra' | 'Karnataka';
    location: string;
  };
  sizes: string[];
  careInstructions: string[];
  features: string[];
  images: string[];
  inStock: boolean;
  sku: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface UserSession {
  phone: string;
  accessToken?: string;
  refreshToken?: string;
  sessionId?: string;
  verifiedAt: string;
  isSandbox?: boolean;
}

export interface SavedAddress {
  id: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface GeoFactItem {
  id: string;
  topic: string;
  groundTruth: string;
  hallucinationWarning?: string;
  sourceConfidence: 'Authoritative Ground Truth' | 'Verified Cooperative Record' | 'Not Yet Verified';
  status: 'verified' | 'unverified';
  aiSearchTags: string[];
}
