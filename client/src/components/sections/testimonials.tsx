import { useQuery } from "@tanstack/react-query";
import TestimonialCard from "@/components/ui/testimonial-card";
import Carousel3D from "@/components/effects/carousel-3d";
import type { Testimonial } from "@shared/schema";
import ryderLogo from "@assets/1_1758573580140.png";
import timHortonsLogo from "@assets/2_1758573580139.png";
import redGeometricLogo from "@assets/3_1758573580138.png";
import vitranLogo from "@assets/4_1758573580138.png";
import tforceLogo from "@assets/5_1758573580141.png";

const clientLogos = [
  { name: "Ryder", logo: ryderLogo },
  { name: "Tim Hortons", logo: timHortonsLogo },
  { name: "Company Partner", logo: redGeometricLogo },
  { name: "Vitran", logo: vitranLogo },
  { name: "TForce Freight", logo: tforceLogo }
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

        {/* Client Logos Carousel */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Trusted by Industry Leaders</h3>
            <p className="text-muted-foreground">Working with Canada's top transportation and logistics companies</p>
          </div>
          
          <div className="h-48" data-testid="client-logos-carousel">
            <Carousel3D autoPlay={true} interval={3000}>
              {clientLogos.map((client) => (
                <div 
                  key={client.name} 
                  className="w-full max-w-xs mx-auto"
                  data-testid={`client-logo-${client.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg card-hover image-3d flex items-center justify-center h-32">
                    <img 
                      src={client.logo} 
                      alt={`${client.name} logo`}
                      className="max-w-full max-h-full object-contain filter hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </Carousel3D>
          </div>
        </div>
      </div>
    </section>
  );
}
