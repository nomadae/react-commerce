export const authConfig = {
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  get isMockMode() {
    return !import.meta.env.VITE_GOOGLE_CLIENT_ID;
  },
  authority: 'https://accounts.google.com',
  get redirectUri() {
    return `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`;
  },
  scope: 'openid profile email',
};
