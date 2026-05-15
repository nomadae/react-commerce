import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { authConfig } from './config';
import type { AuthService } from './service';
import type { AuthUser } from './types';

export function createOidcAuthService(): AuthService {
  const userManager = new UserManager({
    authority: authConfig.authority,
    client_id: authConfig.googleClientId,
    redirect_uri: authConfig.redirectUri,
    scope: authConfig.scope,
    response_type: 'code',
    userStore: new WebStorageStateStore({ store: window.sessionStorage }),
    automaticSilentRenew: true,
  });

  function mapUser(profile: Record<string, unknown>): AuthUser {
    return {
      id: (profile.sub as string) || '',
      email: (profile.email as string) || '',
      name: (profile.name as string) || (profile.email as string) || '',
      picture: profile.picture as string | undefined,
      provider: 'google',
    };
  }

  return {
    isMock: false,

    async loginWithGoogle(): Promise<AuthUser> {
      await userManager.signinRedirect();
      // Browser redirects away — this line is never reached
      throw new Error('Redirect did not occur');
    },

    async handleRedirectCallback(): Promise<AuthUser> {
      const user = await userManager.signinRedirectCallback();
      return mapUser(user.profile);
    },

    async loginWithEmail(): Promise<AuthUser> {
      throw new Error('El inicio de sesión con correo no está disponible con OAuth.');
    },

    async logout(): Promise<void> {
      await userManager.signoutRedirect();
    },

    async getUser(): Promise<AuthUser | null> {
      const user = await userManager.getUser();
      if (!user || user.expired) return null;
      return mapUser(user.profile);
    },
  };
}
