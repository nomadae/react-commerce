export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
  count: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
