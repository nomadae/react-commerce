# Authentication System

## Overview

The auth system supports two modes of operation selected automatically at startup:

| Mode | Trigger | Google OAuth | Email/Password |
|------|---------|:------------:|:--------------:|
| **Mock** (default) | `VITE_GOOGLE_CLIENT_ID` is empty/absent | Instant demo login | `demo@techstore.com` / `demo123` |
| **OIDC** (production) | `VITE_GOOGLE_CLIENT_ID` is set | Real Google OAuth2 PKCE flow | Not available |

The system uses the **Authorization Code Flow with PKCE** — the current best practice for single-page applications. No client secret is exposed to the browser.

---

## Architecture

```
┌──────────────────────────────────────────────────────┐
│  app/root.tsx                                         │
│  <AuthProvider>        ← wraps entire app             │
│    <CartProvider>                                     │
│      <Outlet />         ← all routes                  │
│    </CartProvider>                                    │
│  </AuthProvider>                                      │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  app/context/AuthContext.tsx                          │
│  ┌────────────────────────────────────────────────┐  │
│  │  useState<AuthUser | null>   user state         │  │
│  │  useState<boolean>           isLoading           │  │
│  │  useState<string | null>     error               │  │
│  │                                                  │  │
│  │  useEffect → getAuthService() → getUser()       │  │
│  │  useCallback → login() / loginWithGoogle()      │  │
│  │  useCallback → logout() / handleRedirectCallback│  │
│  └────────────────────────────────────────────────┘  │
│  useAuth() hook — null-guarded consumer               │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  app/auth/index.ts      (Factory)                     │
│  ┌────────────────────────────────────────────────┐  │
│  │  isMockMode?                                    │  │
│  │    YES → createMockAuthService()                │  │
│  │    NO  → dynamic import('./oidc-service')       │  │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  app/auth/mock-service.ts                             │
│  ┌────────────────────────────────────────────────┐  │
│  │  sessionStorage['techstore_auth_user']          │  │
│  │  Hardcoded demo users + fake Google user        │  │
│  └────────────────────────────────────────────────┘  │
│                                                       │
│  app/auth/oidc-service.ts                             │
│  ┌────────────────────────────────────────────────┐  │
│  │  oidc-client-ts UserManager                     │  │
│  │  PKCE flow → Google OIDC → sessionStorage       │  │
│  └────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────┘
```

---

## File Reference

| File | Purpose |
|------|---------|
| `app/auth/types.ts` | `AuthUser`, `LoginCredentials`, `AuthContextValue` types |
| `app/auth/config.ts` | OIDC configuration, `isMockMode` toggle from env |
| `app/auth/service.ts` | `AuthService` interface (abstraction layer) |
| `app/auth/mock-service.ts` | Mock implementation using `sessionStorage` |
| `app/auth/oidc-service.ts` | Real OIDC using `oidc-client-ts` (dynamically imported) |
| `app/auth/index.ts` | Factory function — picks mock or OIDC service |
| `app/context/AuthContext.tsx` | React context provider + `useAuth()` hook |
| `app/components/LoginPage.tsx` | Login UI (Tailwind) |
| `app/routes/login.tsx` | `/login` route |
| `app/routes/auth/callback.tsx` | `/auth/callback` route (OAuth redirect handler) |
| `app/routes/cuenta.tsx` | `/cuenta` protected account page |
| `.env.example` | Environment variable template |

---

## Key Types

### `AuthUser`

```ts
interface AuthUser {
  id: string;                    // Unique identifier from the auth provider
  email: string;                 // User's email address
  name: string;                  // Display name
  picture?: string;              // Avatar URL (optional)
  provider: 'google' | 'email';  // How the user authenticated
}
```

### `LoginCredentials`

```ts
interface LoginCredentials {
  email: string;
  password: string;
}
```

---

## `useAuth()` Hook API

The `useAuth()` hook is the primary consumer-facing API. It throws if used outside `AuthProvider`.

```ts
const {
  user,                    // AuthUser | null
  isAuthenticated,         // boolean — derived: user !== null
  isLoading,               // boolean — true during service init and auth actions
  error,                   // string | null — last error message, cleared on new attempts
  isMockMode,              // boolean — true when no Google OAuth is configured

  login,                   // (credentials: LoginCredentials) => Promise<void>
  loginWithGoogle,         // () => Promise<void>
  logout,                  // () => Promise<void>
  handleRedirectCallback,  // () => Promise<void> — for /auth/callback route only
} = useAuth();
```

### Example: Login form submission

```tsx
const { login, error } = useAuth();

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  try {
    await login({ email: 'demo@techstore.com', password: 'demo123' });
    navigate('/cuenta');
  } catch {
    // error state is set automatically in context
  }
}
```

### Example: Conditional UI based on auth state

```tsx
const { user, isAuthenticated, isLoading } = useAuth();

if (isLoading) return <Spinner />;

if (isAuthenticated && user) {
  return <p>Welcome, {user.name}!</p>;
}

return <Link to="/login">Iniciar Sesión</Link>;
```

---

## `AuthService` Interface

The `AuthService` interface defines the contract between the React layer and the auth implementation. Two implementations exist:

| Method | Mock behavior | OIDC behavior |
|--------|--------------|---------------|
| `getUser()` | Reads from `sessionStorage` | Calls `userManager.getUser()` |
| `loginWithGoogle()` | Creates fake Google user, 1200ms delay | Redirects to `https://accounts.google.com` |
| `loginWithEmail(creds)` | Validates against hardcoded users | Throws (not supported in OIDC mode) |
| `logout()` | Clears `sessionStorage` | Calls `userManager.signoutRedirect()` |
| `handleRedirectCallback()` | Throws (not applicable) | Processes OAuth callback URL |
| `isMock` | `true` | `false` |

---

## Login Page States

The login page (`/login`) handles these states:

| State | What the user sees |
|-------|--------------------|
| **Loading** | Centered spinner + "Verificando sesión..." |
| **Already logged in** | Green checkmark + "Ya has iniciado sesión" + link to `/cuenta` |
| **Error** | Red alert box below the form with the error message; form re-enabled |
| **Submitting** | Spinner in submit button, all inputs disabled |
| **Mock mode** | Amber "Modo Demo" badge + demo credentials hint box |
| **Redirect after login** | Navigates to `?redirect=` query param (defaults to `/cuenta`) |

---

## Protected Routes

The `/cuenta` route demonstrates the protection pattern:

```tsx
export default function CuentaPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login?redirect=/cuenta', { replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) return <Spinner />;
  if (!user) return null; // Will redirect via useEffect

  return <AccountContent user={user} />;
}
```

Key points:
- The `isLoading` check prevents a flash of the login page before redirect completes
- The `?redirect=/cuenta` query param ensures the user returns after login
- `replace: true` prevents the protected page from appearing in browser history when unauthenticated

---

## Navbar Integration

The Navbar renders conditionally based on `useAuth()`:

**Unauthenticated:**
- Desktop: "Iniciar Sesión" outline button → `/login`
- Mobile: "Iniciar Sesión" menu link

**Authenticated:**
- Desktop: Bootstrap `NavDropdown` with user avatar, name, email preview, "Mi Cuenta" link, and "Cerrar Sesión"
- Mobile: "Mi Cuenta" link + "Cerrar Sesión" button

---

## Environment Configuration

### `.env` file (project root)

```bash
# Google OAuth — leave empty for mock/demo mode
VITE_GOOGLE_CLIENT_ID=
```

The `VITE_` prefix is required by Vite for client-exposed environment variables. The `vite.config.ts` is configured with `envDir: resolve(__dirname)` to explicitly look for the `.env` file at the project root.

### Google Cloud Console setup (real OAuth)

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create an OAuth 2.0 Client ID of type "Web application"
3. Add `http://localhost:5173/auth/callback` to Authorized redirect URIs
4. Copy the Client ID into your `.env`:
   ```bash
   VITE_GOOGLE_CLIENT_ID=1234567890-xxxxx.apps.googleusercontent.com
   ```
5. Restart the dev server

After restart, the "Modo Demo" badge disappears from the login page, and clicking "Continuar con Google" triggers a real OAuth redirect to Google.

---

## Mock Mode Credentials

Default demo accounts available in mock mode:

| Email | Password | Role |
|-------|----------|------|
| `demo@techstore.com` | `demo123` | Standard user |
| `admin@techstore.com` | `admin123` | Admin user |

The mock Google button logs in as: `ana.garcia@gmail.com` (provider: Google).

---

## Security Considerations

- **Token storage**: Tokens are stored in `sessionStorage` only — never in `localStorage`. This prevents XSS-based token theft via persistent storage while keeping the session alive across page refreshes within the same tab.
- **PKCE**: The OIDC flow uses PKCE (Proof Key for Code Exchange), eliminating the need for a client secret in the browser and protecting against authorization code interception.
- **Dynamic import**: `oidc-client-ts` is loaded via `import()` only when `VITE_GOOGLE_CLIENT_ID` is configured. In mock mode, the library is never bundled or downloaded.
- **SSR compatibility**: The `AuthProvider` initializes the auth service inside a `useEffect`, which only runs on the client. During SSR, `isLoading` is `true` and the HTML renders a brief spinner. The `oidc-service.ts` module guards against server-side evaluation via the dynamic import.
- **No client secret**: The OAuth client secret never appears in frontend code. Only the public `client_id` is used.

---

## Adding a New OAuth Provider

To add support for another OIDC provider (GitHub, Microsoft, etc.):

1. Add provider config to `app/auth/config.ts`:
   ```ts
   githubClientId: import.meta.env.VITE_GITHUB_CLIENT_ID || '',
   githubAuthority: 'https://github.com/login/oauth',
   ```

2. Create a new service (or extend `oidc-service.ts`):
   ```ts
   // app/auth/github-service.ts
   export function createGithubAuthService(): AuthService { ... }
   ```

3. Add a `loginWithGithub()` method to `AuthContext` and expose it via `useAuth()`

4. Add the provider button to `LoginPage.tsx`

5. Register the callback route if the redirect URI differs

---

## Future Enhancements

- **Cart-user association**: When a user logs in, merge their anonymous cart (from `CartContext`) with any persisted cart from a backend
- **Token refresh**: `oidc-client-ts` supports `automaticSilentRenew` — configure `silent_redirect_uri` and an iframe-based silent renew page for long-lived sessions
- **Backend integration**: Replace mock `sessionStorage` persistence with real API calls to a backend auth server
- **Role-based access**: Extend `AuthUser` with a `role` field and add route guards that check permissions
- **Registration flow**: Add a registration form that creates mock users (mock mode) or integrates with the OIDC provider's registration
