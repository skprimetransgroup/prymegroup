import { useQuery } from "@tanstack/react-query";
import TestimonialCard from "@/components/ui/testimonial-card";
import Carousel3D from "@/components/effects/carousel-3d";
import type { Testimonial } from "@shared/schema";
import { Star, Quote } from "lucide-react";
// Using API routes for asset serving
const ryderLogo = "/api/public/1_1758573580140.png";
const timHortonsLogo = "/api/public/2_1758573580139.png";
const redGeometricLogo = "/api/public/3_1758573580138.png";
const vitranLogo = "/api/public/4_1758573580138.png";
const tforceLogo = "/api/public/5_1758573580141.png";

const clientLogos = [
  { name: "Ryder", logo: ryderLogo },
  { name: "Tim Hortons", logo: timHortonsLogo },
  { name: "Company Partner", logo: redGeometricLogo },
  { name: "Vitran", logo: vitranLogo },
  { name: "TForce Freight", logo: tforceLogo }
];

const clientTestimonials = [
  {
    id: 1,
    quote: "Prime Trans Group helped us find the perfect warehouse team. Their recruitment process is thorough and professional.",
    author: "Sarah Mitchell",
    company: "Ryder Supply Chain",
    position: "Operations Manager",
    rating: 5
  },
  {
    id: 2,
    quote: "Outstanding transportation solutions! They connected us with reliable carriers that meet our delivery schedules consistently.",
    author: "Mike Johnson",
    company: "TForce Freight",
    position: "Logistics Director",
    rating: 5
  },
  {
    id: 3,
    quote: "The staffing solutions provided exceeded our expectations. Quality candidates who fit our company culture perfectly.",
    author: "Jennifer Chen",
    company: "Vitran Express",
    position: "HR Director",
    rating: 5
  },
  {
    id: 4,
    quote: "Professional service from start to finish. Prime Trans Group understands the transportation industry like no other.",
    author: "David Roberts",
    company: "Tim Hortons Distribution",
    position: "Fleet Manager",
    rating: 5
  }
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
        <div className="mb-12">
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
        
        {/* Client Testimonials */}
        <div className="">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">What Our Clients Say</h3>
            <p className="text-muted-foreground">Trusted feedback from industry leaders across Canada</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="client-testimonials">
            {clientTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-card border border-border rounded-xl p-6 card-hover relative overflow-hidden"
                data-testid={`testimonial-card-${testimonial.id}`}
              >
                {/* Background Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="h-8 w-8 text-primary" />
                </div>
                
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  "{testimonial.quote}"
                </blockquote>
                
                {/* Author Info */}
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.position}</div>
                  <div className="text-xs text-primary font-medium">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
