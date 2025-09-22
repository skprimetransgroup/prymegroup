import { Users, Warehouse, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const businessDivisions = [
  {
    icon: Users,
    title: "Staffing Solutions",
    description: "We provide flexible and strategic staffing services for transportation, manufacturing, warehousing, and administrative roles across Canada.",
    features: ["Expert Recruitment", "Permanent & Contract", "Payroll Management"],
    link: "/jobs",
    buttonText: "Find Jobs"
  },
  {
    icon: Warehouse,
    title: "Warehouse Services",
    description: "We connect businesses with trusted warehouse partners for storage, distribution, and logistics solutions tailored to your needs.",
    features: ["Storage Solutions", "Distribution Network", "Logistics Support"],
    link: "/warehouse",
    buttonText: "Get Quote"
  },
  {
    icon: Truck,
    title: "Transportation Solutions",
    description: "Premium transport facilitation connecting your freight with trusted carriers across Canada and North America for reliable, on-time delivery.",
    features: ["FTL & LTL Matching", "Expedited Shipping", "Verified Carriers"],
    link: "/transportation",
    buttonText: "Get Quote"
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Business Divisions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three specialized divisions working together to deliver comprehensive business solutions across Canada
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {businessDivisions.map((division, index) => {
            const Icon = division.icon;
            return (
              <div 
                key={division.title} 
                className="bg-card border border-border rounded-lg p-8 card-hover group relative overflow-hidden"
                data-testid={`division-card-${index + 1}`}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  
                  <h3 
                    className="text-2xl font-bold text-foreground mb-4 text-center"
                    data-testid={`division-title-${index + 1}`}
                  >
                    {division.title}
                  </h3>
                  
                  <p 
                    className="text-muted-foreground mb-6 text-center leading-relaxed"
                    data-testid={`division-description-${index + 1}`}
                  >
                    {division.description}
                  </p>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <div className="grid grid-cols-1 gap-2">
                      {division.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="text-center">
                    <Link href={division.link}>
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold transition-all duration-300 group-hover:scale-105"
                        data-testid={`button-${division.buttonText.toLowerCase().replace(' ', '-')}-${index + 1}`}
                      >
                        {division.buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
