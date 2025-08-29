import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CTA() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border rounded-xl p-8 lg:p-12 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-sm font-semibold text-primary">Explore new opportunities</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Put your CV in front of great employers.
            </h2>
            <p className="text-lg text-muted-foreground">
              Start your job-hunting journey today and connect with top employers across Canada.
            </p>
            <Link href="/jobs">
              <Button className="px-8 py-3" data-testid="button-find-job-cta">
                Find a Job
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
