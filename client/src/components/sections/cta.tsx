import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, ShoppingCart, Warehouse, ArrowRight } from "lucide-react";

export default function CTA() {
  const ctaSections = [
    {
      icon: Users,
      tag: "Start Your Career",
      title: "Find Your Perfect Job",
      description: "Connect with top employers across Canada. Browse thousands of opportunities in transportation, manufacturing, and administration.",
      buttonText: "Find Jobs",
      link: "/jobs",
      gradient: "from-primary/10 to-red-500/10"
    },
    {
      icon: ShoppingCart,
      tag: "Shop With Confidence",
      title: "Browse Quality Products",
      description: "Discover our comprehensive catalog of quality products from trusted suppliers. Shop online with secure transactions and reliable delivery.",
      buttonText: "Shop Now",
      link: "/shop",
      gradient: "from-blue-500/10 to-primary/10"
    },
    {
      icon: Warehouse,
      tag: "Optimize Your Operations",
      title: "Warehouse Solutions",
      description: "Connect with trusted warehouse partners for storage, distribution, and logistics solutions tailored to your specific business needs.",
      buttonText: "Get Quote",
      link: "/warehouse",
      gradient: "from-green-500/10 to-secondary/10"
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your path and let us help you achieve your business goals
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {ctaSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div 
                key={section.title}
                className={`relative bg-card border border-border rounded-xl p-6 lg:p-8 text-center card-hover group overflow-hidden`}
                data-testid={`cta-card-${index + 1}`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">{section.tag}</div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {section.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {section.description}
                  </p>
                  
                  <Link href={section.link}>
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2"
                      data-testid={`button-cta-${section.buttonText.toLowerCase().replace(' ', '-')}`}
                    >
                      {section.buttonText}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
