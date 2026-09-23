import { useNavigation } from 'react-router';

/**
 * True while a client-side navigation is in flight.
 *
 * Route components render from their own loader's data, which has already
 * resolved by the time they mount - including on a full SSR response - so a
 * loading flag kept in component state can never observe a fetch any more.
 * The pending state now lives on the router, and this is how a route reads it.
 *
 * Note this is true for any pending navigation, including one leaving the
 * route, which is why the skeletons it drives are keyed to the departing view.
 */
export function useIsNavigating(): boolean {
  return useNavigation().state !== 'idle';
}
