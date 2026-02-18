# Route Protection Documentation

## Overview

The application uses Next.js middleware to protect authenticated routes (`/dashboard`, `/agent`) and redirect unauthenticated users to login.

## Protected Routes

- `/dashboard/*` - All dashboard routes
- `/agent/*` - All agent routes

## How It Works

### 1. Middleware (`middleware.ts`)

Runs on the server before rendering pages:

```typescript
// Checks for auth token in cookies
// If missing/invalid → redirect to /login
// If valid → allow access
```

**Redirect with callback URL:**

```
/dashboard/marketplace → /login?callbackUrl=/dashboard/marketplace
```

After login, user is redirected back to the original page.

### 2. Cookie Storage

Auth tokens are stored in cookies (instead of localStorage) to enable server-side access:

**File:** `lib/storage/cookie-storage.ts`

- Cookies expire in 7 days
- SameSite: Lax (prevents CSRF)
- Secure in production (HTTPS only)

### 3. Auth Store Update

Zustand now persists to cookies:

```typescript
persist((set) => ({ ...state }), {
  name: "auth-storage",
  storage: cookieStorage, // Server-accessible
});
```

## Flow Diagram

```
User visits /dashboard
  ↓
Middleware checks cookie
  ↓
┌─────────────────┬──────────────────┐
│ No Token        │ Valid Token      │
│ or Invalid      │                  │
├─────────────────┼──────────────────┤
│ Redirect to     │ Allow access     │
│ /login          │ ✅               │
│ with callback   │                  │
└─────────────────┴──────────────────┘
```

## Public Routes (No Auth Required)

- `/` - Landing page
- `/login` - Login page
- `/signup` - Registration page
- `/forgot-password` - Password reset
- `/api/*` - API routes
- Static files

## Matcher Config

The middleware matcher excludes:

- API routes (`/api/*`)
- Static files (`_next/static`, `_next/image`)
- Public auth pages
- Assets (`.png`, `.jpg`, etc.)

## Testing

### Test Protected Route

1. Visit `/dashboard` without logging in
2. Should redirect to `/login?callbackUrl=/dashboard`
3. After login, automatically redirects back to `/dashboard`

### Test Public Route

1. Visit `/login` without auth
2. Should load normally (no redirect)

## Security Features

✅ **Server-side validation** - Middleware runs before page renders  
✅ **Callback URLs** - Users return to intended page after login  
✅ **Cookie security** - HTTPOnly, Secure, SameSite flags  
✅ **No flash** - Auth check happens before render

## Troubleshooting

### Issue: Stuck in redirect loop

- Clear cookies and localStorage
- Check auth-storage cookie has valid JSON

### Issue: Still accessible without auth

- Check middleware matcher config
- Ensure route matches protected pattern
- Verify cookie storage is working
