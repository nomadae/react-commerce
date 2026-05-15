import type { AuthService } from './service';
import type { AuthUser, LoginCredentials } from './types';
import { simulateApiDelay } from '~/data/mock';

const STORAGE_KEY = 'techstore_auth_user';

const MOCK_GOOGLE_USER: AuthUser = {
  id: 'mock-google-1',
  email: 'ana.garcia@gmail.com',
  name: 'Ana García',
  picture: 'https://ui-avatars.com/api/?name=Ana+Garcia&background=4f46e5&color=fff&size=128',
  provider: 'google',
};

const MOCK_USERS = [
  {
    email: 'demo@techstore.com',
    password: 'demo123',
    user: {
      id: 'mock-email-1',
      email: 'demo@techstore.com',
      name: 'Usuario Demo',
      picture: 'https://ui-avatars.com/api/?name=Usuario+Demo&background=4f46e5&color=fff&size=128',
      provider: 'email',
    } as AuthUser,
  },
  {
    email: 'admin@techstore.com',
    password: 'admin123',
    user: {
      id: 'mock-email-2',
      email: 'admin@techstore.com',
      name: 'Admin TechStore',
      picture: 'https://ui-avatars.com/api/?name=Admin+TechStore&background=dc2626&color=fff&size=128',
      provider: 'email',
    } as AuthUser,
  },
];

export function createMockAuthService(): AuthService {
  return {
    isMock: true,

    async loginWithGoogle(): Promise<AuthUser> {
      await simulateApiDelay(null, 1200);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_GOOGLE_USER));
      return MOCK_GOOGLE_USER;
    },

    async loginWithEmail(credentials: LoginCredentials): Promise<AuthUser> {
      await simulateApiDelay(null, 1000);
      const match = MOCK_USERS.find(
        (u) => u.email === credentials.email && u.password === credentials.password
      );
      if (!match) {
        throw new Error('Correo electrónico o contraseña inválidos');
      }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(match.user));
      return match.user;
    },

    async logout(): Promise<void> {
      await simulateApiDelay(null, 300);
      sessionStorage.removeItem(STORAGE_KEY);
    },

    async getUser(): Promise<AuthUser | null> {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      try {
        return JSON.parse(raw) as AuthUser;
      } catch {
        return null;
      }
    },

    async handleRedirectCallback(): Promise<AuthUser> {
      throw new Error('El callback de OAuth no está disponible en modo de prueba.');
    },
  };
}
