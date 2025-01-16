export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  original_price: number;
  image: string;
  category: string;
  rating: string;
  size: string;
  trending: boolean;
  reviews: string;
  in_stock: boolean;
  delivery_time: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}
