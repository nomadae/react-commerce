interface ProductGridSkeletonProps {
  /** Number of placeholder cards to render. Ignored below 1. */
  count?: number;
}

/**
 * Placeholder cards shown while a catalog route's loader is in flight during a
 * client-side navigation.
 *
 * Under SSR the loader resolves before the response is sent, so this is never
 * on screen for a first paint - only for a <Link> transition to another catalog
 * route, where it replaces the full-page spinner those pages used to show.
 */
export function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      role="status"
      aria-label="Cargando productos"
    >
      {Array.from({ length: Math.max(1, count) }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-gray-200" />
          <div className="p-4 space-y-3">
            <div className="h-3 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-5 bg-gray-200 rounded w-2/5" />
            <div className="h-10 bg-gray-200 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
