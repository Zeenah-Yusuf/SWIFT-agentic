import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Zap } from "lucide-react";

export default function Login() {
  const [mode, setMode] = useState<"login" | "signup" | "admin">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const { login, signup, adminLogin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "admin") {
      if (adminLogin(adminCode)) {
        toast({ title: "Welcome, Admin!" });
        navigate("/admin");
      } else {
        toast({ title: "Invalid admin code", variant: "destructive" });
      }
    } else if (mode === "signup") {
      signup(name, email, password);
      toast({ title: "Account created!" });
      navigate("/");
    } else {
      login(email, password);
      toast({ title: "Welcome back!" });
      navigate("/");
    }
  };

  return (
    <Layout>
      <section className="flex items-center justify-center py-16">
        <div className="w-full max-w-md rounded-xl border bg-card p-8">
          <div className="mb-6 text-center">
            <Zap className="mx-auto h-10 w-10 text-primary" />
            <h1 className="mt-3 font-display text-2xl font-bold text-foreground">
              {mode === "admin" ? "Admin Login" : mode === "signup" ? "Create Account" : "Sign In"}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "admin" ? (
              <Input placeholder="Enter admin code" value={adminCode} onChange={(e) => setAdminCode(e.target.value)} required />
            ) : (
              <>
                {mode === "signup" && <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />}
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </>
            )}
            <Button type="submit" className="w-full">{mode === "admin" ? "Login as Admin" : mode === "signup" ? "Sign Up" : "Sign In"}</Button>
          </form>

          <div className="mt-6 space-y-2 text-center text-sm text-muted-foreground">
            {mode !== "login" && <button onClick={() => setMode("login")} className="hover:text-primary">Sign in to existing account</button>}
            {mode !== "signup" && <button onClick={() => setMode("signup")} className="block w-full hover:text-primary">Create a new account</button>}
            {mode !== "admin" && <button onClick={() => setMode("admin")} className="block w-full hover:text-primary">Admin login</button>}
          </div>
        </div>
      </section>
    </Layout>
  );
}
