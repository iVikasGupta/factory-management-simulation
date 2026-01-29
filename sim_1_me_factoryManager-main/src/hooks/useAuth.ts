import { useEffect, useState } from 'react';
import { registerUser as apiRegisterUser, loginUser as apiLoginUser } from '../utils/api';

interface AuthUser {
  name: string;
  email: string;
  role: 'student' | 'instructor';
  // Add more fields as needed
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Optionally, fetch current user from backend if you have a session/token
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string, _studentId?: string, role: 'student' | 'instructor' = 'student') => {
    const res = await apiRegisterUser({ name: fullName, email, password, role });
    if (res.message && res.message !== 'User registered successfully') {
      throw new Error(res.message);
    }
    // Store user info if backend returns it
    if (res.user) setUser(res.user);
    return res;
  };

  const signIn = async (email: string, password: string) => {
    const res = await apiLoginUser({ email, password });
    if (!res.token) {
      throw new Error(res.message || 'Invalid credentials');
    }
    // Store user info if backend returns it
    if (res.user) setUser(res.user);
    // Optionally store token in localStorage for persistent login
    localStorage.setItem('token', res.token);
    return res;
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return { user, loading, signUp, signIn, signOut };
};
