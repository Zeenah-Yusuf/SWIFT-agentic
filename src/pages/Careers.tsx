import { Layout } from "@/components/layout/Layout";
import { MapPin, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const jobs = [
  { title: "Senior AI Engineer", dept: "Engineering", location: "Lagos / Remote", type: "Full-time" },
  { title: "Product Designer", dept: "Design", location: "Lagos", type: "Full-time" },
  { title: "Full-Stack Developer", dept: "Engineering", location: "Remote", type: "Full-time" },
  { title: "Growth Marketing Manager", dept: "Marketing", location: "Lagos", type: "Full-time" },
  { title: "Customer Success Lead", dept: "Support", location: "Lagos / Remote", type: "Full-time" },
];

export default function Careers() {
  return (
    <Layout>
      <section className="py-16">
        <div className="container max-w-3xl">
          <h1 className="font-display text-4xl font-bold text-foreground">Careers</h1>
          <p className="mt-2 text-muted-foreground">Join us in building the future of commerce.</p>

          <div className="mt-6 rounded-xl bg-primary/5 p-6">
            <h2 className="font-display text-lg font-semibold text-foreground">Why SWIFT?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Work on cutting-edge AI, solve real commerce problems, and join a team that values impact over hours.</p>
          </div>

          <div className="mt-10 space-y-4">
            {jobs.map((job) => (
              <div key={job.title} className="flex items-center justify-between rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
                <div>
                  <h3 className="font-display font-semibold text-foreground">{job.title}</h3>
                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {job.dept}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-1 shrink-0">Apply <ArrowRight className="h-3 w-3" /></Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
