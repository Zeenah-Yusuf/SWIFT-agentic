import { Link } from "react-router-dom";
import swiftLogo from "@/assets/swift-logo.png";

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
    <footer className="border-t bg-card/50">
      <div className="container py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">SWIFT</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              AI-powered agentic commerce. Describe what you need — we handle the rest.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">{section.title}</h4>
              <ul className="space-y-2.5">
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

        <div className="mt-12 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} SWIFT — Smart Web Intelligence Fast Trading. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
