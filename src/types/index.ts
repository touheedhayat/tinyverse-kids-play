// Product Types
export interface Product {
  id: string;
  title: string;
  titleUrdu?: string;
  description: string;
  price: number;
  salePrice?: number;
  category: 'boys' | 'girls' | 'baby';
  ageGroup: string[];
  sizes: ProductSize[];
  colors: ProductColor[];
  images: string[];
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSize {
  size: string;
  stock: number;
  ageRange?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Order Types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  landmark?: string;
}

// Category Type
export interface Category {
  id: string;
  name: string;
  nameUrdu?: string;
  slug: string;
  image: string;
  productCount: number;
}

// Store Settings
export interface StoreSettings {
  name: string;
  phone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  freeDeliveryThreshold: number;
  deliveryCharges: DeliveryCharge[];
  socialLinks: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
}

export interface DeliveryCharge {
  city: string;
  charge: number;
}

// Banner Type
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  isActive: boolean;
  order: number;
}
