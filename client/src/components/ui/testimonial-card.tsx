import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div 
      className="bg-card border border-border rounded-lg p-6 card-hover"
      data-testid={`testimonial-card-${testimonial.id}`}
    >
      <div className="flex items-start space-x-3 mb-4">
        <img
          src={testimonial.imageUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&w=80&h=80"}
          alt={`${testimonial.name} headshot`}
          className="w-12 h-12 rounded-full object-cover"
          data-testid={`testimonial-image-${testimonial.id}`}
        />
        <div className="flex-1">
          <div className="flex mb-2">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
      <p 
        className="text-muted-foreground mb-4"
        data-testid={`testimonial-content-${testimonial.id}`}
      >
        "{testimonial.content}"
      </p>
      <div 
        className="text-sm font-semibold text-foreground"
        data-testid={`testimonial-company-${testimonial.id}`}
      >
        {testimonial.company}
      </div>
      {testimonial.position && (
        <div 
          className="text-xs text-muted-foreground"
          data-testid={`testimonial-position-${testimonial.id}`}
        >
          {testimonial.position}
        </div>
      )}
    </div>
  );
}
