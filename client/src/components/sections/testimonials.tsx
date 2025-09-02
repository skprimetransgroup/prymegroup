import { useQuery } from "@tanstack/react-query";
import TestimonialCard from "@/components/ui/testimonial-card";
import Carousel3D from "@/components/effects/carousel-3d";
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
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-3d">Our Trusted Clients</h2>
        </div>

        {/* 3D Testimonials Carousel */}
        {isLoading ? (
          <div className="h-96 mb-16 flex items-center justify-center">
            <div className="loading-3d w-16 h-16 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="h-96 mb-16" data-testid="testimonials-carousel">
            <Carousel3D>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full max-w-4xl mx-auto px-8">
                  <div className="card-stack-3d">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                </div>
              ))}
            </Carousel3D>
          </div>
        )}

        {/* Client Logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
          {clientLogos.map((logo) => (
            <div 
              key={logo} 
              className="bg-white px-6 py-4 rounded-lg shadow-sm card-hover image-3d"
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
