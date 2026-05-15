import type { Product, Category } from '~/types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Laptop Gamer Pro',
    price: 899.99,
    originalPrice: 1599.99,
    discount: 20,
    rating: 4.8,
    reviews: 156,
    image: 'https://via.placeholder.com/300x200?text=Laptop',
    category: 'Electrónica',
    stock: 15,
  },
  {
    id: 2,
    name: 'Smartphone Ultra',
    price: 899.99,
    originalPrice: 999.99,
    discount: 10,
    rating: 2.6,
    reviews: 243,
    image: 'https://via.placeholder.com/300x200?text=Smartphone',
    category: 'Electrónica',
    stock: 8,
  },
  {
    id: 3,
    name: 'Auriculares Bluetooth',
    price: 79.99,
    originalPrice: 129.99,
    discount: 38,
    rating: 3.5,
    reviews: 567,
    image: 'https://via.placeholder.com/300x200?text=Headphones',
    category: 'Audio',
    stock: 25,
  },
  {
    id: 4,
    name: 'Smart Watch Series 5',
    price: 249.99,
    originalPrice: 329.99,
    discount: 24,
    rating: 4.7,
    reviews: 189,
    image: 'https://via.placeholder.com/300x200?text=Watch',
    category: 'Wearables',
    stock: 12,
  },
  {
    id: 5,
    name: 'Tablet Pro 12.9"',
    price: 699.99,
    originalPrice: 799.99,
    discount: 12,
    rating: 4.9,
    reviews: 98,
    image: 'https://via.placeholder.com/300x200?text=Tablet',
    category: 'Electrónica',
    stock: 5,
  },
  {
    id: 6,
    name: 'Cámara Mirrorless',
    price: 899.99,
    originalPrice: 1099.99,
    discount: 18,
    rating: 4.7,
    reviews: 76,
    image: 'https://via.placeholder.com/300x200?text=Camera',
    category: 'Fotografía',
    stock: 7,
  },
];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-');
}

export const mockCategories: Category[] = [
  { id: 1, name: 'Electrónica', slug: slugify('Electrónica'), count: 245, image: 'https://via.placeholder.com/150x150?text=Electronica' },
  { id: 2, name: 'Moda', slug: slugify('Moda'), count: 567, image: 'https://via.placeholder.com/150x150?text=Moda' },
  { id: 3, name: 'Hogar', slug: slugify('Hogar'), count: 389, image: 'https://via.placeholder.com/150x150?text=Hogar' },
  { id: 4, name: 'Deportes', slug: slugify('Deportes'), count: 178, image: 'https://via.placeholder.com/150x150?text=Deportes' },
  { id: 5, name: 'Libros', slug: slugify('Libros'), count: 423, image: 'https://via.placeholder.com/150x150?text=Libros' },
  { id: 6, name: 'Juguetes', slug: slugify('Juguetes'), count: 156, image: 'https://via.placeholder.com/150x150?text=Juguetes' },
  { id: 7, name: 'Audio', slug: slugify('Audio'), count: 89, image: 'https://via.placeholder.com/150x150?text=Audio' },
  { id: 8, name: 'Wearables', slug: slugify('Wearables'), count: 64, image: 'https://via.placeholder.com/150x150?text=Wearables' },
  { id: 9, name: 'Fotografía', slug: slugify('Fotografía'), count: 42, image: 'https://via.placeholder.com/150x150?text=Fotografia' },
  { id: 10, name: 'Computadoras', slug: slugify('Computadoras'), count: 120, image: 'https://via.placeholder.com/150x150?text=Computadoras' },
  { id: 11, name: 'Accesorios', slug: slugify('Accesorios'), count: 310, image: 'https://via.placeholder.com/150x150?text=Accesorios' },
];

export function simulateApiDelay<T>(data: T, ms = 1000): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}
