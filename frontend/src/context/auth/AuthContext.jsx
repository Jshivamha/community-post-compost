import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    return false;
  });

  const login = () => {
    setIsAuthenticated(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated', 'true');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAuthState = localStorage.getItem('isAuthenticated');
      if (storedAuthState === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
