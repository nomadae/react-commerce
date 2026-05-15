import type { AuthUser, LoginCredentials } from './types';

export interface AuthService {
  readonly isMock: boolean;
  loginWithGoogle(): Promise<AuthUser>;
  handleRedirectCallback(): Promise<AuthUser>;
  loginWithEmail(credentials: LoginCredentials): Promise<AuthUser>;
  logout(): Promise<void>;
  getUser(): Promise<AuthUser | null>;
}
