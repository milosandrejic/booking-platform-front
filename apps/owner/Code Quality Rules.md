# Owner Portal — Code Quality Rules (Application-Specific)

*Project-specific rules for the **Owner Portal** application.*

> **📖 Global Standards:** This document extends the [Global Code Quality Rules](../../Code%20Quality%20Rules.md). Read the global rules first for universal coding standards.

---

## 1) Application-Specific Scope & Goals

* **Scope:** Owner Portal Next.js application for property management
* **Framework:** Next.js 14+ with App Router, React JSX
* **Purpose:** Property owners manage listings, bookings, and communications
* **Styling:** Primary styling via `sx` props, SCSS for complex animations only
* **Goals:** Secure, performant, accessible property management platform

---

## 2) Next.js App Router Structure

```
apps/owner/
  app/
    layout.jsx                 # Root layout (auth provider, theme)
    page.jsx                   # Dashboard (protected)
    login/
      page.jsx                 # Login form (uses AuthLayout)
    register/
      page.jsx                 # Register form (uses AuthLayout)
    forgot-password/
      page.jsx                 # Forgot password form (uses AuthLayout)
    (dashboard)/               # Protected route group
      layout.jsx               # Dashboard layout with navigation
      properties/
        page.jsx               # Properties list
        new/
          page.jsx             # Add property form
        [id]/
          page.jsx             # Property details
          edit/
            page.jsx           # Edit property
          analytics/
            page.jsx           # Property analytics
      bookings/
        page.jsx               # Bookings list
        [id]/
          page.jsx             # Booking details
      guests/
        page.jsx               # Guest management
      analytics/
        page.jsx               # Owner analytics dashboard
      settings/
        page.jsx               # Account settings
        billing/
          page.jsx             # Billing management
    api/
      auth/
        login/
          route.js             # Login API
        logout/
          route.js             # Logout API
        refresh/
          route.js             # Token refresh API
      properties/
        route.js               # Properties API
      bookings/
        route.js               # Bookings API
  components/
    layout/
      AuthLayout.jsx           # Authentication pages layout component
      DashboardLayout.jsx      # Main app layout with navigation component
      Sidebar.jsx              # Navigation sidebar component
      Header.jsx               # Dashboard header component
    forms/                     # Form components
    cards/                     # Card components
    modals/                    # Modal dialogs
  lib/
    api.js                     # API utilities
    auth.js                    # Authentication helpers
    constants.js               # Application constants
  hooks/                       # Custom React hooks
  middleware.js                # Route protection
```

### File Naming Conventions
* **Pages:** Use `page.jsx` for all route pages
* **Layouts:** Use `layout.jsx` for nested layouts
* **Route Groups:** Use `(groupName)` for organizing routes without affecting URLs
  - `(dashboard)` - For protected application pages only
* **Auth Pages:** Direct routes (`/login`, `/register`, `/forgot-password`) - each uses AuthLayout component
* **Layout Components:** PascalCase in `components/layout/` folder
  - `AuthLayout.jsx` - Reusable auth layout with background image and card
  - `DashboardLayout.jsx` - Main app layout with sidebar and header
  - `Sidebar.jsx` - Navigation sidebar component
  - `Header.jsx` - Dashboard header component
* **Regular Components:** PascalCase (e.g., `PropertyCard.jsx`)
* **Utilities:** camelCase (e.g., `apiHelpers.js`)

### Layout Hierarchy Rules
* **Root Layout** (`app/layout.jsx`) - Global providers only (theme, auth context)
* **Dashboard Route Group Layout** (`app/(dashboard)/layout.jsx`) - Uses DashboardLayout component for protected pages
* **Auth Pages** (`app/login/page.jsx`, etc.) - Each individually uses AuthLayout component
* **Layout Components** (`components/layout/`) - Reusable layout logic and styling
* **Single Responsibility** - Each layout component handles one specific layout pattern

---

## 3) Business Domain Components

### Property Management Components
```jsx
// components/PropertyCard.jsx
export const PropertyCard = ({ property, onEdit, onDelete, onViewAnalytics }) => {
  const statusColor = {
    active: 'success',
    inactive: 'error', 
    pending: 'warning',
    maintenance: 'info'
  };

  return (
    <Card sx={{ p: 3, mb: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="start">
        <Box>
          <Typography variant="titleMedium">{property.title}</Typography>
          <Typography variant="bodyMedium" color="text.secondary">
            {property.location}
          </Typography>
          <Typography variant="bodySmall" sx={{ mt: 1 }}>
            ${property.pricePerNight}/night
          </Typography>
        </Box>
        
        <Chip 
          label={property.status} 
          color={statusColor[property.status]} 
          size="small"
        />
      </Box>
      
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="outlined" size="small" onClick={() => onEdit(property.id)}>
          Edit
        </Button>
        <Button variant="text" size="small" onClick={() => onViewAnalytics(property.id)}>
          Analytics
        </Button>
      </Stack>
    </Card>
  );
};
```

### Booking Management Components
```jsx
// components/BookingCard.jsx
export const BookingCard = ({ booking, onUpdateStatus, onViewDetails }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      confirmed: 'success',
      cancelled: 'error',
      completed: 'info'
    };
    return colors[status] || 'default';
  };

  return (
    <Card sx={{ p: 3, mb: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="start">
        <Box>
          <Typography variant="titleMedium">
            {booking.guestName}
          </Typography>
          <Typography variant="bodyMedium" color="text.secondary">
            {booking.propertyTitle}
          </Typography>
          <Typography variant="bodySmall">
            {booking.checkIn} - {booking.checkOut}
          </Typography>
        </Box>
        
        <Chip 
          label={booking.status} 
          color={getStatusColor(booking.status)}
          size="small"
        />
      </Box>
    </Card>
  );
};
```

---

## 4) Data Fetching Patterns

### Server Components (Data Fetching)
```jsx
// app/properties/page.jsx
import { getCurrentUser } from '@/lib/auth-server';
import { fetchOwnerProperties } from '@/lib/api-server';

export default async function PropertiesPage() {
  const user = getCurrentUser(); // Will redirect if not authenticated
  
  try {
    const properties = await fetchOwnerProperties(user.id);
    
    return (
      <Container maxWidth="lg">
        <Typography variant="headlineMedium" sx={{ mb: 4 }}>
          My Properties
        </Typography>
        
        <PropertiesList properties={properties} />
      </Container>
    );
  } catch (error) {
    return (
      <ErrorState 
        title="Failed to load properties"
        message="Please try again later"
        action={<Button onClick={() => window.location.reload()}>Retry</Button>}
      />
    );
  }
}
```

### Client Components (Interactive Features)
```jsx
// components/PropertiesList.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const PropertiesList = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEdit = (propertyId) => {
    router.push(`/properties/${propertyId}/edit`);
  };

  const handleDelete = async (propertyId) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    setLoading(true);
    
    try {
      await deleteProperty(propertyId);
      setProperties(prev => prev.filter(p => p.id !== propertyId));
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {
        properties.map(property =>
          <PropertyCard
            key={property.id}
            property={property}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )
      }
    </Box>
  );
};
```

---

## 5) Form Management Patterns

### Property Form Example
```jsx
// components/forms/PropertyForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const PropertyForm = ({ property = null, isEdit = false }) => {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    description: property?.description || '',
    pricePerNight: property?.pricePerNight || '',
    location: property?.location || '',
    amenities: property?.amenities || [],
    ...
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Property title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.pricePerNight || formData.pricePerNight <= 0) {
      newErrors.pricePerNight = 'Valid price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      if (isEdit) {
        await updateProperty(property.id, formData);
      } else {
        await createProperty(formData);
      }
      
      router.push('/properties');
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          label="Property Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={!!errors.title}
          helperText={errors.title}
          required
          fullWidth
        />

        <TextField
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          error={!!errors.description}
          helperText={errors.description}
          multiline
          rows={4}
          required
          fullWidth
        />

        <TextField
          label="Price per Night"
          type="number"
          value={formData.pricePerNight}
          onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
          error={!!errors.pricePerNight}
          helperText={errors.pricePerNight}
          required
          fullWidth
        />

        {
          errors.submit &&
          <Alert severity="error">
            {errors.submit}
          </Alert>
        }

        <Box display="flex" gap={2}>
          <Button
            type="submit"
            variant="filled"
            disabled={loading}
            size="large"
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Property' : 'Create Property')}
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
```

---

## 6) Owner Portal Specific API Patterns

### API Client with Authentication
```jsx
// lib/api.js
class OwnerPortalAPI {
  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL;
  }

  async request(endpoint, options = {}) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include HTTP-only cookies
      ...options,
    };

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      if (response.status === 401) {
        // Redirect to login
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Properties
  async getProperties() {
    return this.request('/owner/properties');
  }

  async createProperty(propertyData) {
    return this.request('/owner/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
  }

  async updateProperty(id, propertyData) {
    return this.request(`/owner/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    });
  }

  // Bookings
  async getBookings() {
    return this.request('/owner/bookings');
  }

  async updateBookingStatus(id, status) {
    return this.request(`/owner/bookings/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Analytics
  async getAnalytics(timeRange = '30d') {
    return this.request(`/owner/analytics?range=${timeRange}`);
  }
}

export const api = new OwnerPortalAPI();
```

---

## 7) Business Logic Hooks

### Property Management Hook
```jsx
// hooks/useProperties.js
import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProperties();
      setProperties(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProperty = useCallback(async (propertyData) => {
    try {
      const newProperty = await api.createProperty(propertyData);
      setProperties(prev => [...prev, newProperty]);
      return newProperty;
    } catch (err) {
      throw err;
    }
  }, []);

  const updateProperty = useCallback(async (id, propertyData) => {
    try {
      const updatedProperty = await api.updateProperty(id, propertyData);
      setProperties(prev => 
        prev.map(p => p.id === id ? updatedProperty : p)
      );
      return updatedProperty;
    } catch (err) {
      throw err;
    }
  }, []);

  const deleteProperty = useCallback(async (id) => {
    try {
      await api.deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return {
    properties,
    loading,
    error,
    actions: {
      refetch: fetchProperties,
      create: createProperty,
      update: updateProperty,
      delete: deleteProperty,
    }
  };
};
```

---

## 8) Navigation and Layout Patterns

### App Layout with Navigation
```jsx
## 8) Layout Architecture Patterns

### Root Layout (Global Providers)
```jsx
// app/layout.jsx - Root layout with global providers only
import { AuthProvider } from '@/providers/AuthProvider';
import { ThemeProvider } from '@booking-platform-shared/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Dashboard Route Group Layout (Protected Pages Only)
```jsx
// app/(dashboard)/layout.jsx - Protected dashboard layout
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function DashboardGroupLayout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
```

### Auth Layout Component (Reusable)
```jsx
// components/layout/AuthLayout.jsx
'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Box, Container, Card, Typography, Progress } from '@booking-platform-shared/ui';

export const AuthLayout = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/'); // Redirect to dashboard if already logged in
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh'
        }}
      >
        <Progress size="large" />
      </Box>
    );
  }

  if (user) {
    return null; // Router will redirect
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/images/auth-bg.jpg)', // Background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay
          backdropFilter: 'blur(2px)', // Blur effect
        }
      }}
    >
      {/* Auth Card Container */}
      <Container 
        maxWidth="sm" 
        sx={{ 
          position: 'relative', 
          zIndex: 1 
        }}
      >
        <Card
          sx={{
            p: 4,
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            borderRadius: 3
          }}
        >
          {/* Logo/Branding */}
          <Box
            sx={{
              textAlign: 'center',
              mb: 4
            }}
          >
            <Typography variant="headlineMedium" sx={{ mb: 1 }}>
              Owner Portal
            </Typography>
            <Typography variant="bodyMedium" color="text.secondary">
              Manage your rental properties
            </Typography>
          </Box>

          {/* Auth Form Content */}
          {children}
        </Card>
      </Container>
    </Box>
  );
};
```

### Auth Page Example
```jsx
// app/login/page.jsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Box, Stack, TextField, Button, Typography } from '@booking-platform-shared/ui';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login({ email, password });
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          
          <Button
            type="submit"
            variant="filled"
            size="large"
            disabled={loading}
            fullWidth
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
          
          <Box textAlign="center">
            <Button 
              variant="text" 
              component={Link} 
              href="/register"
            >
              Don't have an account? Sign up
            </Button>
          </Box>
          
          <Box textAlign="center">
            <Button 
              variant="text" 
              component={Link} 
              href="/forgot-password"
            >
              Forgot password?
            </Button>
          </Box>
        </Stack>
      </Box>
    </AuthLayout>
  );
}
```

### Layout Benefits with Clean URLs
* **Clean URLs** - `/login`, `/register`, `/forgot-password` (no `/auth` prefix)
* **Reusable AuthLayout** - Component used by all auth pages individually
* **`(dashboard)` route group** - Protected pages only, doesn't affect URLs
* **Single AuthLayout component** - Background image, card, and consistent styling
* **Better SEO** - Clean URLs are better for search engines
* **User-friendly** - Simple, memorable URLs for authentication

---
```

### Sidebar Navigation
```jsx
// components/layout/Sidebar.jsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const Sidebar = () => {
  const pathname = usePathname();

  const navigationItems = [
    { label: 'Dashboard', href: '/', icon: DashboardIcon },
    { label: 'Properties', href: '/properties', icon: HomeIcon },
    { label: 'Bookings', href: '/bookings', icon: CalendarIcon },
    { label: 'Guests', href: '/guests', icon: PeopleIcon },
    { label: 'Analytics', href: '/analytics', icon: AnalyticsIcon },
    { label: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  return (
    <Box
      sx={{
        width: 280,
        bgcolor: 'surface.variant',
        borderRight: '1px solid',
        borderColor: 'outline.variant',
        p: 3
      }}
    >
      <Typography variant="titleLarge" sx={{ mb: 4 }}>
        Owner Portal
      </Typography>

      <Stack spacing={1}>
        {
          navigationItems.map(item => {
            const isActive = pathname === item.href;
            
            return (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                variant={isActive ? 'filled' : 'text'}
                color={isActive ? 'primary' : 'inherit'}
                startIcon={<item.icon />}
                sx={{
                  justifyContent: 'flex-start',
                  py: 1.5,
                  px: 2
                }}
              >
                {item.label}
              </Button>
            );
          })
        }
      </Stack>
    </Box>
  );
};
```

---

## 12) Code Review Checklist (Owner Portal Specific)

Before submitting code for review, ensure:

### Universal Standards (from Global Rules)
- [ ] **Formatting:** Code follows spacing and conditional rendering rules
- [ ] **Styling:** sx props used appropriately, SCSS only when necessary
- [ ] **Components:** Proper multiline JSX formatting for 2+ props
- [ ] **Performance:** No unnecessary re-renders or expensive operations in render
- [ ] **Accessibility:** ARIA labels and semantic HTML where needed
- [ ] **Error Handling:** Proper error states and loading states
- [ ] **Responsiveness:** Works on mobile and desktop devices

### Owner Portal Specific
- [ ] **Route Protection:** All sensitive pages are protected with middleware
- [ ] **API Security:** All API endpoints are properly authenticated and authorized
- [ ] **User Permissions:** User permissions are checked before rendering sensitive UI
- [ ] **Data Validation:** Form validation is implemented client-side and server-side
- [ ] **Business Logic:** Property/booking logic follows domain requirements
- [ ] **Navigation:** Proper Next.js App Router patterns used
- [ ] **State Management:** Appropriate use of server vs client components
- [ ] **Error Boundaries:** Error boundaries wrap route-level components
- [ ] **Loading States:** All async operations show loading indicators
- [ ] **Optimistic Updates:** UI updates optimistically where appropriate

### Security Specific
- [ ] **Authentication:** Protected routes redirect unauthenticated users
- [ ] **Authorization:** Role-based access control properly implemented
- [ ] **Data Privacy:** Owner data is properly scoped and protected
- [ ] **Input Sanitization:** All user inputs are validated and sanitized
- [ ] **XSS Prevention:** No dangerouslySetInnerHTML without sanitization

### Business Domain Specific
- [ ] **Property Management:** Property CRUD operations work correctly
- [ ] **Booking Management:** Booking status updates work properly
- [ ] **Guest Communication:** Guest interaction features are accessible
- [ ] **Analytics:** Analytics data is accurate and real-time
- [ ] **Notifications:** Real-time notifications work for important events

---

*This document covers only Owner Portal-specific rules. For universal coding standards, refer to the [Global Code Quality Rules](../../Code%20Quality%20Rules.md).*

### Authentication Strategy
* **Server-side authentication** using Next.js middleware and server components
* **JWT tokens** stored in HTTP-only cookies for security
* **Role-based access control** (RBAC) - only property owners can access owner portal
* **Session management** with proper expiration and refresh

### Route Protection Implementation

#### Middleware for Route Protection
```javascript
// middleware.js (root level)
import { NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Public routes that don't need authentication
  const publicRoutes = ['/login', '/register', '/forgot-password'];
  const isPublicRoute = publicRoutes.includes(pathname);
  
  if (isPublicRoute) {
    return NextResponse.next();
  }
  
  // Get token from HTTP-only cookie
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  try {
    const payload = await verifyToken(token);
    
    // Check if user has owner role
    if (payload.role !== 'owner') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    
    // Add user info to request headers for server components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-role', payload.role);
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
  ],
};
```

#### Authentication Context Provider
```jsx
// app/providers/AuthProvider.jsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children, initialUser = null }) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(!initialUser);
  const router = useRouter();

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userData = await response.json();
      setUser(userData.user);
      router.push('/');
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isOwner: user?.role === 'owner'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### Server Component User Access
```jsx
// lib/auth-server.js
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export function getCurrentUser() {
  const headersList = headers();
  const userId = headersList.get('x-user-id');
  const userRole = headersList.get('x-user-role');
  
  if (!userId || userRole !== 'owner') {
    redirect('/login');
  }
  
  return {
    id: userId,
    role: userRole
  };
}

// Usage in server components
export default async function PropertiesPage() {
  const user = getCurrentUser(); // Will redirect if not authenticated
  
  // Fetch user-specific data
  const properties = await fetchUserProperties(user.id);
  
  return (
    <Container maxWidth="lg">
      {/* Page content */}
    </Container>
  );
}
```

### API Route Protection

#### Protected API Routes
```javascript
// lib/auth-api.js
import { NextResponse } from 'next/server';
import { verifyToken } from './auth';

export function withAuth(handler, options = {}) {
  return async (request, context) => {
    try {
      const token = request.cookies.get('auth-token')?.value;
      
      if (!token) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
      
      const payload = await verifyToken(token);
      
      // Role-based access control
      if (options.requiredRole && payload.role !== options.requiredRole) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }
      
      // Add user to request
      request.user = payload;
      
      return handler(request, context);
    } catch (error) {
      console.error('API Auth error:', error);
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  };
}

// Usage in API routes
// app/api/properties/route.js
import { withAuth } from '@/lib/auth-api';

async function getPropertiesHandler(request) {
  const { user } = request;
  
  // Fetch properties for authenticated owner
  const properties = await fetchOwnerProperties(user.userId);
  
  return NextResponse.json(properties);
}

export const GET = withAuth(getPropertiesHandler, { requiredRole: 'owner' });
```

### Client-Side Route Guards

#### Page-Level Protection
```jsx
// components/guards/OwnerGuard.jsx
'use client';

import { useAuth } from '@/app/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Box, Progress, Typography } from '@booking-platform-shared/ui';

export const OwnerGuard = ({ children }) => {
  const { user, loading, isOwner } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isOwner) {
      router.push('/login');
    }
  }, [loading, isOwner, router]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 2
        }}
      >
        <Progress size="large" />
        <Typography variant="bodyMedium">
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!isOwner) {
    return null; // Router will redirect
  }

  return children;
};
```

### Security Best Practices

#### Environment Variables
```bash
# .env.local
NEXTAUTH_SECRET=your-super-secret-jwt-secret-here
NEXTAUTH_URL=http://localhost:3000
API_URL=http://localhost:3001
```

#### Security Headers
```javascript
// next.config.mjs
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};
```

#### Data Access Patterns
```jsx
// hooks/useSecureApi.js
import { useAuth } from '@/app/providers/AuthProvider';
import { useCallback } from 'react';

export const useSecureApi = () => {
  const { user, logout } = useAuth();

  const secureRequest = useCallback(async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        credentials: 'include', // Include HTTP-only cookies
      });

      if (response.status === 401) {
        // Token expired or invalid
        logout();
        throw new Error('Session expired');
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Secure request failed:', error);
      throw error;
    }
  }, [logout]);

  return { secureRequest };
};
```

### Permission-Based UI Rendering
```jsx
// components/guards/PermissionGuard.jsx
import { useAuth } from '@/app/providers/AuthProvider';

export const PermissionGuard = ({ 
  permission, 
  children, 
  fallback = null,
  requireOwnership = false,
  resourceId = null 
}) => {
  const { user, isOwner } = useAuth();

  if (!isOwner) {
    return fallback;
  }

  // Check specific permissions
  if (permission && !user?.permissions?.includes(permission)) {
    return fallback;
  }

  // Check resource ownership
  if (requireOwnership && resourceId) {
    const hasOwnership = user?.ownedResources?.includes(resourceId);
    if (!hasOwnership) {
      return fallback;
    }
  }

  return children;
};

// Usage
<PermissionGuard 
  permission="properties.delete"
  requireOwnership={true}
  resourceId={property.id}
  fallback={
    <Typography variant="bodySmall" color="text.secondary">
      You don't have permission to delete this property
    </Typography>
  }
>
  <Button
    variant="outlined"
    color="error"
    onClick={handleDelete}
  >
    Delete Property
  </Button>
</PermissionGuard>
```

---

## 12) Code Review Checklist

Before submitting code for review, ensure:

- [ ] All shared UI components are used correctly
- [ ] sx props are used for styling instead of inline styles or SCSS where possible
- [ ] Conditional rendering follows the established formatting rules
- [ ] Components are accessible with proper ARIA attributes
- [ ] Error states and loading states are handled
- [ ] Code follows the established spacing and formatting rules
- [ ] No console.log statements in production code
- [ ] All props are properly typed (if using TypeScript in the future)
- [ ] Components are responsive and work on mobile devices
- [ ] Performance optimization techniques are applied where needed
- [ ] **Route protection is implemented for sensitive pages**
- [ ] **API endpoints are properly authenticated and authorized**
- [ ] **User permissions are checked before rendering sensitive UI**
- [ ] **No sensitive data is exposed in client-side code**
- [ ] **Security headers are properly configured**

---

*This document should be reviewed and updated as the Owner Portal evolves and new patterns emerge.*
