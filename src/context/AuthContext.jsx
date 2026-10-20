import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS, uid } from '../utils/helpers';
import { seedUsers } from '../utils/seedData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage(STORAGE_KEYS.USERS, seedUsers);
  const [user, setUser] = useLocalStorage(STORAGE_KEYS.USER, null);

  const signup = ({ name, email, role }) => {
    const existing = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('An account with that email already exists. Try logging in.');
    }
    const next = { id: uid(), name, email, role };
    setUsers((current) => [...current, next]);
    setUser(next);
    return next;
  };

  const login = ({ email }) => {
    const found = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      throw new Error('No account found for that email. Sign up to get started.');
    }
    setUser(found);
    return found;
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({ user, users, signup, login, logout }),
    [user, users],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
