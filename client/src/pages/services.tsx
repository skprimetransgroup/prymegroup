import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import SEOManager, { SEOConfigs } from "@/components/seo/SEOManager";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Building2, Users, Calculator, CheckCircle, Star, ArrowRight, Shield, Clock, Target } from "lucide-react";
import { useLocation } from "wouter";

const services = [
  {
    icon: Users,
    title: "Contingent Staffing",
    description: "Flexible staffing solutions for seasonal peaks, special projects, and temporary workforce needs",
    features: ["Seasonal workers", "Project-based staffing", "Temporary assignments", "Quick deployment"],
    color: "bg-blue-500"
  },
  {
    icon: Building2,
    title: "Permanent Staffing", 
    description: "Find and place top-tier talent for long-term positions across all industries",
    features: ["Full-time placements", "Executive search", "Skill assessment", "Cultural fit evaluation"],
    color: "bg-green-500"
  },
  {
    icon: Calculator,
    title: "Payroll Outsourcing",
    description: "Complete payroll management services to streamline your HR operations",
    features: ["Payroll processing", "Tax compliance", "Benefits administration", "Reporting & analytics"],
    color: "bg-purple-500"
  },
  {
    icon: Truck,
    title: "Transportation Staffing",
    description: "Specialized recruitment for drivers, logistics, and transportation professionals",
    features: ["Class A/Z drivers", "Local & long-haul", "Logistics coordinators", "Safety compliance"],
    color: "bg-red-500"
  }
];

const industries = [
  {
    title: "Transportation & Logistics",
    description: "Professional drivers, logistics coordinators, warehouse staff, and transportation management",
    positions: ["Truck Drivers (Class A/Z)", "Logistics Coordinators", "Warehouse Associates", "Dispatchers"]
  },
  {
    title: "Manufacturing",
    description: "Skilled production workers, machine operators, quality control, and manufacturing support",
    positions: ["Machine Operators", "Production Workers", "Quality Control", "Maintenance Technicians"]
  },
  {
    title: "Administrative",
    description: "Office professionals, customer service representatives, and administrative support staff",
    positions: ["Administrative Assistants", "Customer Service Reps", "Data Entry Clerks", "Receptionists"]
  },
  {
    title: "Warehouse & Distribution",
    description: "Material handlers, forklift operators, inventory specialists, and distribution center staff",
    positions: ["Forklift Operators", "Warehouse Associates", "Inventory Specialists", "Shipping Clerks"]
  }
];

const benefits = [
  {
    icon: Shield,
    title: "Fully Insured & Bonded",
    description: "Complete protection for employers and employees with comprehensive insurance coverage"
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Rapid placement services with candidates available within 24-48 hours"
  },
  {
    icon: Target,
    title: "Quality Guarantee",
    description: "Rigorous screening process ensures only qualified, reliable candidates"
  },
  {
    icon: CheckCircle,
    title: "Proven Track Record",
    description: "Over 8 years of successful placements across Ontario"
  }
];

export default function Services() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      <SEOManager data={SEOConfigs.services} />
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background via-background to-muted py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive workforce solutions tailored to meet your business needs. From temporary staffing to permanent placements, we connect you with the right talent.
            </p>
          </div>
        </div>
      </div>

      {/* Main Services */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          
          {/* Services Grid */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">What We Offer</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive staffing solutions are designed to help businesses thrive while connecting talented professionals with meaningful opportunities.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={service.title} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300" data-testid={`service-card-${index + 1}`}>
                    <CardContent className="p-6">
                      <div className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3" data-testid={`service-title-${index + 1}`}>
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-4" data-testid={`service-description-${index + 1}`}>
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Industries We Serve */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Industries We Serve</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We specialize in providing workforce solutions across key industries throughout Ontario.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {industries.map((industry, index) => (
                <Card key={industry.title} className="p-6 hover:shadow-lg transition-shadow duration-300" data-testid={`industry-card-${index + 1}`}>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{industry.title}</h3>
                  <p className="text-muted-foreground mb-4">{industry.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-foreground">Common Positions:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {industry.positions.map((position, idx) => (
                        <div key={idx} className="flex items-center text-sm text-muted-foreground">
                          <Star className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                          {position}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-20 bg-muted/30 rounded-2xl p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Prime Trans Group</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our commitment to excellence and proven track record make us Ontario's trusted workforce partner.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="text-center" data-testid={`benefit-${index + 1}`}>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Process</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A streamlined approach to connecting the right talent with the right opportunities.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Understand Your Needs</h3>
                <p className="text-muted-foreground">
                  We work closely with you to understand your specific workforce requirements, company culture, and job expectations.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Source & Screen</h3>
                <p className="text-muted-foreground">
                  Our extensive network and rigorous screening process ensures we find qualified candidates who meet your criteria.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Place & Support</h3>
                <p className="text-muted-foreground">
                  We facilitate the placement and provide ongoing support to ensure successful, long-term employment relationships.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Whether you're an employer looking for talent or a job seeker exploring opportunities, we're here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setLocation("/contact")}
                className="bg-white text-primary hover:bg-gray-100 font-semibold"
                data-testid="button-get-started"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                onClick={() => setLocation("/contact")}
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary font-semibold transition-all duration-300"
                data-testid="button-contact-us"
              >
                Contact Us
              </Button>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}