import { Layout } from "@/components/layout/Layout";

export default function Privacy() {
  return (
    <Layout>
      <section className="py-16">
        <div className="container max-w-3xl prose prose-sm">
          <h1 className="font-display text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: March 25, 2026</p>

          <div className="mt-8 space-y-6 text-sm text-muted-foreground">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">1. Information We Collect</h2>
              <p>We collect information you provide directly, including name, email, shipping address, and payment information when you use SWIFT's services. We also collect usage data to improve our AI shopping agent.</p>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
              <p>Your information is used to process orders, personalize shopping recommendations, improve our AI agent's performance, and communicate with you about your orders and our services.</p>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">3. Data Sharing</h2>
              <p>We share order information with partner retailers to fulfill your purchases. We do not sell your personal data to third parties. Data may be shared with service providers who assist in operating our platform.</p>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">4. Data Security</h2>
              <p>We implement industry-standard security measures to protect your data. All payment information is encrypted and processed through secure channels.</p>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">5. Your Rights</h2>
              <p>You have the right to access, correct, or delete your personal data. Contact us at support@swift.com to exercise these rights.</p>
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">6. Contact</h2>
              <p>For privacy-related inquiries, contact us at +234 817 683 1186 or support@swift.com.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
