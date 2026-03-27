import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Zap, Loader2, ArrowRight, Mail, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Mode = "login" | "signup";

export default function Login() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const res = await signup(name, email, password, adminCode);
        if (res.error) {
          toast({ title: "Signup failed", description: res.error, variant: "destructive" });
        } else {
          toast({ title: "Account created! Please confirm your email." });
          navigate("/");
        }
      } else {
        const res = await login(email, password);
        if (res.error) {
          toast({ title: "Login failed", description: res.error, variant: "destructive" });
        } else {
          toast({ title: "Welcome back!" });
          navigate("/");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const titles: Record<Mode, { icon: React.ReactNode; heading: string; sub: string }> = {
    login: { icon: <Mail className="h-6 w-6" />, heading: "Welcome back", sub: "Sign in to your SWIFT account" },
    signup: { icon: <UserPlus className="h-6 w-6" />, heading: "Join SWIFT", sub: "Create your account and start shopping smarter" },
  };

  return (
    <Layout>
      <section className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="overflow-hidden rounded-2xl border bg-card shadow-xl shadow-primary/5">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary to-accent px-8 py-8 text-center text-primary-foreground">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/20 backdrop-blur-sm">
                <Zap className="h-7 w-7" />
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <h1 className="font-display text-2xl font-bold">{titles[mode].heading}</h1>
                  <p className="mt-1 text-sm text-primary-foreground/80">{titles[mode].sub}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    {mode === "signup" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Full Name</label>
                          <Input
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Admin Code (optional)</label>
                          <Input
                            placeholder="Enter admin code if applicable"
                            value={adminCode}
                            onChange={(e) => setAdminCode(e.target.value)}
                            className="h-12"
                          />
                        </div>
                      </>
                    )}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Password</label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                <Button type="submit" className="h-12 w-full gap-2 text-base font-semibold" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      {mode === "signup" ? "Create Account" : "Sign In"}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 flex flex-col gap-2 text-center">
                {mode !== "login" && (
                  <button
                    onClick={() => setMode("login")}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    Already have an account? <span className="font-semibold text-primary">Sign in</span>
                  </button>
                )}
                {mode !== "signup" && (
                  <button
                    onClick={() => setMode("signup")}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    Don't have an account? <span className="font-semibold text-primary">Sign up</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}
