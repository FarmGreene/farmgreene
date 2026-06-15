# Zustand Auth Store - Documentation

## Overview

Complete authentication state management with Zustand for the FarmGreene frontend.

## Features

- ✅ JWT token management (access + refresh)
- ✅ Automatic token persistence (localStorage)
- ✅ Automatic token refresh on expiry
- ✅ User state management
- ✅ Login, register, logout actions
- ✅ Error handling
- ✅ Multi-role support

## Usage

### Basic Authentication

```tsx
import { useAuthStore } from "@/lib/store/useAuthStore";

function LoginButton() {
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async () => {
    try {
      await login({
        email: "test@farmgreene.com",
        password: "password123",
      });
      // Redirect or show success
    } catch (error) {
      // Error is already in store
    }
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

### Get Current User

```tsx
function UserProfile() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return <div>Please login</div>;

  return (
    <div>
      <p>{user.email}</p>
      <p>Roles: {user.roles.join(", ")}</p>
    </div>
  );
}
```

### Role-Based Access

```tsx
import { useHasRole, useHasAnyRole } from "@/lib/store/useRoleHooks";

function OwnerDashboard() {
  const hasOwnerRole = useHasRole("OWNER");

  if (!hasOwnerRole) {
    return <div>Access denied</div>;
  }

  return <div>Owner features...</div>;
}

function MarketplacePage() {
  const canAccessMarketplace = useHasAnyRole(["FARMER", "OWNER"]);

  if (!canAccessMarketplace) {
    return <div>Please register as a farmer or owner</div>;
  }

  return <div>Marketplace...</div>;
}
```

### Logout

```tsx
function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);

  return <button onClick={logout}>Logout</button>;
}
```

## Store State

```typescript
interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
```

## Store Actions

- `login(credentials)` - Login user
- `register(data)` - Register new user
- `logout()` - Logout and clear state
- `refreshAccessToken()` - Get new access token
- `loadUser()` - Load user from stored token
- `clearError()` - Clear error message
- `setError(error)` - Set error message

## Automatic Features

### Token Persistence

Tokens are automatically saved to localStorage and restored on page reload.

### Token Refresh

When the access token expires:

1. Store automatically tries to refresh using refresh token
2. If successful, updates access token
3. If refresh fails, logs out user

### User Loading

On app mount, `AuthProvider` automatically:

1. Checks for stored tokens
2. Loads user profile if tokens exist
3. Refreshes token if expired

## Integration

Add `AuthProvider` to root layout:

```tsx
import { AuthProvider } from "@/components/providers/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
```
