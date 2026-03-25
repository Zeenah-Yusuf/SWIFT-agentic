import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  adminLogin: (code: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string) => {
    setUser({ id: "u1", name: email.split("@")[0], email, isAdmin: false });
    return true;
  };

  const adminLogin = (code: string) => {
    if (code === "SWIFTOIZ2026") {
      setUser({ id: "admin", name: "Admin", email: "admin@swift.com", isAdmin: true });
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, _password: string) => {
    setUser({ id: "u" + Date.now(), name, email, isAdmin: false });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, adminLogin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
