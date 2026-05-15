import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { AuthUser, LoginCredentials } from '~/auth/types';
import type { AuthService } from '~/auth/service';
import { getAuthService } from '~/auth';
import { authConfig } from '~/auth/config';

interface AuthContextValue {
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

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [service, setService] = useState<AuthService | null>(null);

  useEffect(() => {
    let cancelled = false;
    getAuthService().then((svc) => {
      if (cancelled) return;
      setService(svc);
      svc.getUser().then((existing) => {
        if (cancelled) return;
        setUser(existing);
        setIsLoading(false);
      }).catch(() => {
        if (cancelled) return;
        setIsLoading(false);
      });
    });
    return () => { cancelled = true; };
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    if (!service) return;
    setError(null);
    setIsLoading(true);
    try {
      const u = await service.loginWithEmail(credentials);
      setUser(u);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  const loginWithGoogle = useCallback(async () => {
    if (!service) return;
    setError(null);
    setIsLoading(true);
    try {
      const u = await service.loginWithGoogle();
      setUser(u);
    } catch (err) {
      if (err instanceof Error && err.message.includes('Redirect')) {
        // Real OIDC: browser redirects, this is expected
        return;
      }
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión con Google');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  const logout = useCallback(async () => {
    if (!service) return;
    setError(null);
    try {
      await service.logout();
    } catch {
      // OIDC redirect may throw
    }
    setUser(null);
  }, [service]);

  const handleRedirectCallback = useCallback(async () => {
    if (!service) return;
    setError(null);
    setIsLoading(true);
    try {
      const u = await service.handleRedirectCallback();
      setUser(u);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar autenticación');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        error,
        isMockMode: authConfig.isMockMode,
        login,
        loginWithGoogle,
        logout,
        handleRedirectCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
