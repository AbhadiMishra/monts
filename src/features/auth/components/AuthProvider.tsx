import React, { createContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, AuthState } from '../types/auth.types';
import { authService } from '../services/auth.service';

interface AuthContextValue extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const user = authService.getCurrentUser();
    setState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  }, []);

  const login = useCallback(async (email: string, password: string, rememberMe?: boolean) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const user = await authService.login(email, password, rememberMe);
      setState({ user, isAuthenticated: true, isLoading: false });
    } catch (err) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw err;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, firstName: string, lastName: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const user = await authService.register(email, password, firstName, lastName);
      setState({ user, isAuthenticated: true, isLoading: false });
    } catch (err) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw err;
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    await authService.forgotPassword(email);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, forgotPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
