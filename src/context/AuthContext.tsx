import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserAddress } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, role?: 'customer' | 'admin') => Promise<boolean>;
  logout: () => void;
  updateUserAddresses: (addresses: UserAddress[]) => void;
  updateCrumbsPoints: (newPoints: number) => void;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('velvet_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        // Auto-login demo user by default for seamless instant user experience
        const savedUser = localStorage.getItem('velvet_user');
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (e) {
            console.error(e);
          }
        } else {
          // Default guest demo user
          const demoUser: User = {
            id: 'user-demo',
            name: 'Ananya Sharma',
            email: 'ananya@example.com',
            phone: '+91 98765 43210',
            role: 'customer',
            crumbsPoints: 350,
            addresses: [
              {
                id: 'addr-demo-1',
                fullName: 'Ananya Sharma',
                phone: '+91 98765 43210',
                addressLine1: 'Flat 402, Sunshine Apartments, Bandra West',
                city: 'Mumbai',
                state: 'Maharashtra',
                pincode: '400050',
                isDefault: true
              }
            ],
            savedWishlistIds: ['vc-prod-02']
          };
          setUser(demoUser);
          localStorage.setItem('velvet_user', JSON.stringify(demoUser));
        }
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
          localStorage.setItem('velvet_user', JSON.stringify(data.user));
        }
      } catch (err) {
        console.error('Failed to authenticate:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email: string, role: 'customer' | 'admin' = 'customer'): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('velvet_token', data.token);
        localStorage.setItem('velvet_user', JSON.stringify(data.user));
        return true;
      }
    } catch (err) {
      console.error('Login error:', err);
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('velvet_token');
    localStorage.removeItem('velvet_user');
  };

  const updateUserAddresses = (addresses: UserAddress[]) => {
    if (user) {
      const updated = { ...user, addresses };
      setUser(updated);
      localStorage.setItem('velvet_user', JSON.stringify(updated));
    }
  };

  const updateCrumbsPoints = (newPoints: number) => {
    if (user) {
      const updated = { ...user, crumbsPoints: newPoints };
      setUser(updated);
      localStorage.setItem('velvet_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateUserAddresses,
        updateCrumbsPoints,
        isAdmin: user?.role === 'admin',
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
