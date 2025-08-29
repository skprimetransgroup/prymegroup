import { useQuery } from "@tanstack/react-query";
import TestimonialCard from "@/components/ui/testimonial-card";
import type { Testimonial } from "@shared/schema";

const clientLogos = [
  "VITRAN EXPRESS",
  "CCT CANADA", 
  "Ryder",
  "TForce Freight",
  "Tim Hortons",
  "FastFrate"
];

export default function Testimonials() {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials", "featured=true"],
  });

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-sm font-semibold text-primary mb-2">Testimonials</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Trusted Clients</h2>
        </div>

        {/* Testimonials Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-muted rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded w-20 mb-2"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                </div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16" data-testid="testimonials-grid">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}

        {/* Client Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
          {clientLogos.map((logo) => (
            <div 
              key={logo} 
              className="bg-white px-6 py-4 rounded-lg shadow-sm"
              data-testid={`client-logo-${logo.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className={`text-sm lg:text-base font-bold ${
                logo === "Tim Hortons" ? "text-red-600" : "text-gray-800"
              }`}>
                {logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
