import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupaUser } from "@supabase/supabase-js";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  adminLogin: (code: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function checkIsAdmin(userId: string): Promise<boolean> {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  return !!data;
}

async function buildProfile(su: SupaUser): Promise<UserProfile> {
  const isAdmin = await checkIsAdmin(su.id);
  return {
    id: su.id,
    name: su.user_metadata?.full_name || su.email?.split("@")[0] || "User",
    email: su.email || "",
    isAdmin,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await buildProfile(session.user);
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await buildProfile(session.user);
        setUser(profile);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return {};
  };

  const signup = async (name: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) return { error: error.message };
    return {};
  };

  const adminLogin = async (code: string) => {
    if (code !== "SWIFTOIZ2026") return false;
    // Admin login uses a pre-set admin account
    const { error } = await supabase.auth.signInWithPassword({
      email: "admin@swiftcommerce.app",
      password: "SWIFTOIZ2026admin!",
    });
    if (error) {
      // If admin account doesn't exist, create it
      const { error: signupErr } = await supabase.auth.signUp({
        email: "admin@swiftcommerce.app",
        password: "SWIFTOIZ2026admin!",
        options: { data: { full_name: "Admin" } },
      });
      if (signupErr) return false;
      // Assign admin role
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase.from("user_roles").insert({ user_id: session.user.id, role: "admin" } as any);
      }
    }
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
