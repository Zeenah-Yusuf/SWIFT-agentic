import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, User, Zap, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { motion } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/agent", label: "AI Agent" },
  { to: "/new-arrivals", label: "New Arrivals" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/help", label: "Help" },
];

export function Navbar() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">SWIFT</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === l.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
              {location.pathname === l.to && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-lg bg-primary/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative rounded-xl">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-lg shadow-primary/30">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link to={user.isAdmin ? "/admin" : "/"}>
                <Button variant="ghost" size="sm" className="gap-1.5 rounded-xl">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <span className="max-w-[100px] truncate text-sm">{user.name}</span>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => logout()} className="rounded-xl text-muted-foreground hover:text-destructive">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link to="/login" className="hidden md:block">
              <Button size="sm" className="rounded-xl font-semibold">Sign In</Button>
            </Link>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="font-display text-lg">Menu</SheetTitle>
              <nav className="mt-6 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 ${
                      location.pathname === l.to ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
                <hr className="my-3 border-border" />
                {user ? (
                  <>
                    <Link to={user.isAdmin ? "/admin" : "/"} onClick={() => setOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-primary/10">
                      {user.isAdmin ? "Admin Dashboard" : "My Account"}
                    </Link>
                    <button onClick={() => { logout(); setOpen(false); }} className="rounded-xl px-4 py-2.5 text-left text-sm font-medium text-destructive hover:bg-destructive/10">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10">
                    Sign In
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
