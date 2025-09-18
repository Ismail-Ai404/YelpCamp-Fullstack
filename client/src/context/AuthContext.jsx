import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/me');
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log('Auth check failed:', error.message);
        setUser(null);
        // If server is not available, don't keep trying
        if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
          console.warn('Backend server not available');
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []); // Empty dependency array to run only once

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', {
        username,
        password
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (email, username, password) => {
    try {
      const response = await api.post('/auth/register', {
        email,
        username,
        password
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};