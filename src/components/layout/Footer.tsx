import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const footerSections = [
  {
    title: "Shop",
    links: [
      { to: "/agent", label: "AI Agent" },
      { to: "/new-arrivals", label: "New Arrivals" },
      { to: "/cart", label: "Cart" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/blog", label: "Blog" },
      { to: "/press", label: "Press" },
      { to: "/careers", label: "Careers" },
      { to: "/reviews", label: "Reviews" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/help", label: "Help Center" },
      { to: "/contact", label: "Contact" },
      { to: "/shipping", label: "Shipping & Tracking" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms of Service" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-bold text-foreground">SWIFT</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Smart Web Intelligence Fast Trading. AI-powered agentic commerce for effortless shopping.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 font-display text-sm font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} SWIFT — Smart Web Intelligence Fast Trading. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
