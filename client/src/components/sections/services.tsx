import { Users, Bus, Calculator } from "lucide-react";

const services = [
  {
    icon: Users,
    title: "Contingent Staffing",
    description: "Employ seasonal and contract workers with ease",
  },
  {
    icon: Bus,
    title: "Permanent Staffing", 
    description: "Bring on board the best talent for your team",
  },
  {
    icon: Calculator,
    title: "Payroll Outsourcing",
    description: "Manage all your payroll procedures without hassle",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">What We Do</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our staffing solutions allow you to move seamlessly from recruitment to fulfillment
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.title} 
                className="bg-card border border-border rounded-lg p-8 text-center card-hover"
                data-testid={`service-card-${index + 1}`}
              >
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 
                  className="text-xl font-semibold text-foreground mb-3"
                  data-testid={`service-title-${index + 1}`}
                >
                  {service.title}
                </h3>
                <p 
                  className="text-muted-foreground"
                  data-testid={`service-description-${index + 1}`}
                >
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
