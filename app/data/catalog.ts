import type { Product, Category } from '~/types';
import { mockProducts, mockCategories } from './mock';
import { slugify } from '~/utils/slugify';

/**
 * Read access to the product catalog, used by route `loader`s.
 *
 * Every function here is synchronous. The catalog is in-memory demo data, and
 * the routes read it during SSR, where a `simulateApiDelay` timer would just
 * add latency to the server render without simulating anything a user can see.
 * When app/api/client.ts is wired up to a real backend these become async and
 * the loaders keep their current shape - they only await the result.
 */

export function getProducts(): Product[] {
  return mockProducts;
}

export function getProductById(productId: number): Product | null {
  return mockProducts.find((p) => p.id === productId) ?? null;
}

/** Products carrying a discount, most-discounted first. Powers /ofertas. */
export function getDiscountedProducts(): Product[] {
  return mockProducts
    .filter((p) => p.discount > 0)
    .sort((a, b) => b.discount - a.discount);
}

export function getProductsByCategorySlug(categorySlug: string): Product[] {
  return mockProducts.filter((p) => slugify(p.category) === categorySlug);
}

export function getCategories(): Category[] {
  return mockCategories;
}

export function getCategoryBySlug(categorySlug: string): Category | null {
  return mockCategories.find((c) => c.slug === categorySlug) ?? null;
}

/** The "Todos" (all) option rendered first in the /products filter bar. */
export const ALL_CATEGORIES = 'Todos';

/**
 * The distinct categories that actually have products, in catalog order, with
 * the "all" option first. The /products filter bar is built from this rather
 * than from mockCategories, which lists categories no product belongs to.
 */
export function getProductFilterCategories(): string[] {
  return [ALL_CATEGORIES, ...new Set(mockProducts.map((p) => p.category))];
}
