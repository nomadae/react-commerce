/**
 * Lower-cases `name`, strips diacritics and joins words with hyphens, so
 * "Electrónica" becomes "electronica" and "Tablet Pro 12.9"" becomes
 * "tablet-pro-12.9"".
 *
 * This lived as two verbatim copies - one private to `~/data/mock` to build the
 * category slugs, one private to `CategoryProductsPage` to match a product's
 * category against the `:categorySlug` route param. Two copies meant the demo
 * data and the URL matcher could drift apart silently, producing category pages
 * that rendered "no products" with no error anywhere.
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-');
}
