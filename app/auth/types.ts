export interface AuthUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: 'google' | 'email';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isMockMode: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  handleRedirectCallback: () => Promise<void>;
}
