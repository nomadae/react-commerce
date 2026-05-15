import { authConfig } from './config';
import type { AuthService } from './service';
import { createMockAuthService } from './mock-service';

let servicePromise: Promise<AuthService> | null = null;

export function getAuthService(): Promise<AuthService> {
  if (servicePromise) return servicePromise;

  if (authConfig.isMockMode) {
    servicePromise = Promise.resolve(createMockAuthService());
  } else {
    servicePromise = import('./oidc-service').then((m) => m.createOidcAuthService());
  }

  return servicePromise;
}
