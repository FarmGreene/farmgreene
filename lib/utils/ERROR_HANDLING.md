# Error Handling Documentation

## Overview

The application uses a centralized error handling system that processes API errors and returns user-friendly messages to display in the UI.

## Architecture

### Error Flow

1. **Backend** throws error with status code and message
2. **Axios interceptor** catches the response (in `lib/api/axios.ts`)
3. **Service layer** catches errors and passes to `handleApiError()` (in `lib/services/auth.service.ts`)
4. **Error handler** processes the error and returns formatted message (in `lib/utils/error-handler.ts`)
5. **React Query hook** receives the error and updates state (in `lib/hooks/useAuth.ts`)
6. **UI component** displays the error from Zustand store

## Files

### 1. Error Handler (`lib/utils/error-handler.ts`)

Centralized error processing that handles different HTTP status codes:

- **400** - Bad Request (validation errors)
- **401** - Unauthorized (invalid credentials)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found
- **409** - Conflict (duplicates)
- **422** - Unprocessable Entity (validation)
- **Default** - Generic error handling

### 2. Auth Service (`lib/services/auth.service.ts`)

Wraps all API calls in try-catch blocks:

```typescript
async login(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}
```

### 3. React Query Hooks (`lib/hooks/useAuth.ts`)

Handles errors in `onError` callback:

```typescript
export function useLogin() {
  return useMutation({
    mutationFn: (credentials) => authService.login(credentials),
    onError: (error: Error) => {
      setError(error.message); // User-friendly message
    },
  });
}
```

## Backend Error Format

The NestJS backend returns errors in this format:

```json
{
  "message": "Invalid credentials",
  "error": "Unauthorized",
  "statusCode": 401
}
```

## Error Handler Priority

The `handleApiError` function checks for errors in this order:

1. `data?.error?.message` - Detailed error from error object
2. `data?.error` (stringified) - Generic error object
3. `data?.message` - Simple message string
4. Default message for status code

## Usage Example

### In a Component

```tsx
function LoginForm() {
  const { mutate: login, isPending } = useLogin();
  const { error } = useAuthStore();

  const handleSubmit = (data) => {
    login(data); // Error automatically handled
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* Form fields */}
    </form>
  );
}
```

### Custom Service

```typescript
class MyService {
  async doSomething() {
    try {
      const response = await apiClient.post("/endpoint", data);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}
```

## Benefits

✅ **Consistent** - All errors formatted the same way
✅ **User-friendly** - Technical errors converted to readable messages
✅ **Centralized** - One place to update error handling logic
✅ **Type-safe** - TypeScript ensures proper error handling
✅ **Debuggable** - Console logs for development
