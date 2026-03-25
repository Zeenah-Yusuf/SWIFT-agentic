import { Layout } from "@/components/layout/Layout";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <Layout>
      <section className="py-16">
        <div className="container max-w-4xl">
          <h1 className="font-display text-4xl font-bold text-foreground">Contact & Support</h1>
          <p className="mt-2 text-muted-foreground">Get in touch — we're here to help.</p>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">Reach Us</h2>
              <div className="mt-6 space-y-4">
                {[
                  { icon: Phone, label: "+234 817 683 1186", href: "tel:+2348176831186" },
                  { icon: Phone, label: "+234 903 715 5936", href: "tel:+2349037155936" },
                  { icon: Phone, label: "+234 813 610 0999", href: "tel:+2348136100999" },
                  { icon: Mail, label: "support@swift.com", href: "mailto:support@swift.com" },
                  { icon: MapPin, label: "Lagos, Nigeria", href: "#" },
                ].map((c) => (
                  <a key={c.label} href={c.href} className="flex items-center gap-3 rounded-lg border bg-card p-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                    <c.icon className="h-5 w-5 text-primary" />
                    {c.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-foreground">Send a Message</h2>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Textarea placeholder="How can we help?" value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} />
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
