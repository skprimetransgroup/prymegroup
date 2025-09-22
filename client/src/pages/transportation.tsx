import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Truck, Shield, Clock, MapPin, Users, CheckCircle, Star, ArrowRight, Phone, Mail, Award, TrendingUp, Zap, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import transportPosterPath from "@assets/IMG_0454_1758510467427.png";

const quoteSchema = z.object({
  contactName: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  serviceType: z.string().min(1, "Please select a service type"),
  origin: z.string().min(2, "Origin location is required"),
  destination: z.string().min(2, "Destination location is required"),
  freightType: z.string().min(1, "Please select freight type"),
  weight: z.string().optional(),
  timeline: z.string().min(1, "Please select timeline"),
  specialRequirements: z.string().optional(),
});

type QuoteForm = z.infer<typeof quoteSchema>;

export default function Transportation() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isJoinSubmitting, setIsJoinSubmitting] = useState(false);
  const isMobile = useIsMobile();

  // SEO & Meta Tags
  useEffect(() => {
    // Set document title
    document.title = "Transportation & Freight Services | Prime Group - Trusted Canadian Logistics";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional transportation and freight services across Canada. Full truckload, LTL, expedited shipping with verified carriers. Get instant quote - 24/7 support.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Professional transportation and freight services across Canada. Full truckload, LTL, expedited shipping with verified carriers. Get instant quote - 24/7 support.';
      document.head.appendChild(meta);
    }

    // Set Open Graph tags
    const setOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    setOGTag('og:title', 'Transportation & Freight Services | Prime Group');
    setOGTag('og:description', 'Professional transportation and freight services across Canada. Full truckload, LTL, expedited shipping with verified carriers.');
    setOGTag('og:type', 'website');
    setOGTag('og:url', window.location.href);

    // Add JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "TransportService",
      "name": "Prime Group Transportation Services",
      "description": "Professional transportation and freight services across Canada",
      "serviceType": ["Full Truckload", "Less-Than-Truckload", "Expedited Shipping", "Last-Mile Delivery"],
      "areaServed": {
        "@type": "Country",
        "name": "Canada"
      },
      "provider": {
        "@type": "Organization",
        "name": "Prime Group",
        "telephone": "249-444-0004",
        "email": "logistics@groupworkforcesolutions.ca"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Remove the script tag when component unmounts
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('Prime Group Transportation Services')) {
          script.remove();
        }
      });
    };
  }, []);

  const form = useForm<QuoteForm>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      contactName: "",
      company: "",
      email: "",
      phone: "",
      serviceType: "",
      origin: "",
      destination: "",
      freightType: "",
      weight: "",
      timeline: "",
      specialRequirements: "",
    },
  });

  const onSubmit = async (data: QuoteForm) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "✅ Quote Request Submitted",
        description: "We'll contact you within 24 hours with a customized transportation solution.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "❌ Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const cleanValue = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (cleanValue.length >= 6) {
      return `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3, 6)}-${cleanValue.slice(6, 10)}`;
    } else if (cleanValue.length >= 3) {
      return `(${cleanValue.slice(0, 3)}) ${cleanValue.slice(3)}`;
    } else {
      return cleanValue;
    }
  };

  const handleJoinNetworkSubmit = async () => {
    setIsJoinSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "✅ Application Submitted",
        description: "Thank you for your interest! We'll review your application and contact you soon.",
      });
      
      setIsJoinModalOpen(false);
    } catch (error) {
      toast({
        title: "❌ Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsJoinSubmitting(false);
    }
  };

  const services = [
    {
      title: "Full Truckload (FTL)",
      description: "Dedicated trucks for large shipments with direct delivery",
      icon: Truck,
      features: ["Direct delivery", "No stops", "Faster transit", "Secure transport"]
    },
    {
      title: "Less-Than-Truckload (LTL)",
      description: "Cost-effective shipping for smaller loads with consolidated transport",
      icon: Users,
      features: ["Cost efficient", "Flexible scheduling", "Consolidated shipping", "Regional coverage"]
    },
    {
      title: "Expedited Shipping",
      description: "Time-critical deliveries with priority handling and tracking",
      icon: Clock,
      features: ["Rush delivery", "Priority handling", "Real-time tracking", "24/7 support"]
    },
    {
      title: "Verified Carrier Network",
      description: "All carriers vetted for safety, compliance, and reliability",
      icon: Shield,
      features: ["Safety certified", "Insurance verified", "Compliance checked", "Quality assured"]
    }
  ];

  const industries = [
    "Retail & E-Commerce", "Automotive", "Manufacturing", "Food & Beverage", 
    "Pharmaceuticals & Healthcare", "Warehousing & Fulfillment", "Construction", "Technology"
  ];

  const benefits = [
    {
      title: "Expert Matching & Relationships",
      description: "We build long-term partnerships ensuring consistency and reliability",
      icon: Users
    },
    {
      title: "Speed & Transparent Communication", 
      description: "Real-time updates, clear agreements, no hidden fees",
      icon: Clock
    },
    {
      title: "Premium Quality & Safety",
      description: "Insurance, regulatory compliance, and reliable carriers",
      icon: Shield
    },
    {
      title: "Flexible & Scalable",
      description: "From single shipments to full fleet management, we scale to your needs",
      icon: Truck
    }
  ];

  const trustBadges = [
    {
      title: "DOT Certified",
      description: "Department of Transportation certified carriers",
      icon: Award
    },
    {
      title: "Fully Insured",
      description: "$2M liability insurance coverage on all shipments",
      icon: Shield
    },
    {
      title: "24/7 Tracking",
      description: "Real-time GPS tracking and delivery updates",
      icon: Globe
    },
    {
      title: "15+ Years Experience",
      description: "Proven track record in Canadian logistics",
      icon: TrendingUp
    }
  ];

  const statistics = [
    {
      value: "98.5%",
      label: "On-Time Delivery Rate",
      icon: Clock
    },
    {
      value: "15+",
      label: "Years of Experience",
      icon: Award
    },
    {
      value: "500+",
      label: "Verified Carriers",
      icon: Truck
    },
    {
      value: "24/7",
      label: "Customer Support",
      icon: Phone
    }
  ];

  const testimonials = [
    {
      content: "Prime Group has been our logistics partner for 3 years. Their reliability and communication are unmatched. We've never had a late delivery.",
      author: "Sarah Martinez",
      company: "Distribution Plus Inc.",
      rating: 5
    },
    {
      content: "Switching to Prime Group reduced our shipping costs by 25% while improving delivery times. Their carrier network is exceptional.",
      author: "Michael Chen",
      company: "Tech Solutions Corp",
      rating: 5
    },
    {
      content: "The expedited service saved our production line when we had an urgent shipment. Prime Group delivered in 18 hours when we needed it most.",
      author: "Jennifer Taylor",
      company: "AutoParts Manufacturing",
      rating: 5
    }
  ];

  const faqData = [
    {
      question: "What types of freight do you handle?",
      answer: "We handle all types of freight including general cargo, refrigerated goods, hazardous materials, oversized loads, automotive parts, food & beverage, and specialized equipment."
    },
    {
      question: "How quickly can you arrange transportation?",
      answer: "For standard shipments, we can arrange pickup within 24-48 hours. For expedited service, we can often arrange same-day or next-day pickup depending on route availability."
    },
    {
      question: "Do you provide real-time tracking?",
      answer: "Yes, all shipments include GPS tracking with real-time updates. You'll receive notifications for pickup, transit milestones, and delivery confirmation."
    },
    {
      question: "What areas do you serve?",
      answer: "We provide comprehensive coverage across Canada and cross-border services to the United States. Our network spans from coast to coast with strong coverage in major industrial corridors."
    },
    {
      question: "How do you ensure carrier quality?",
      answer: "All carriers in our network are DOT certified, fully insured, and undergo regular safety audits. We verify licensing, insurance, and safety ratings before onboarding."
    },
    {
      question: "What if my shipment is damaged?",
      answer: "All shipments are covered by comprehensive insurance. In the rare event of damage, we have a dedicated claims team that handles the process quickly and professionally."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Video Background - Mobile Optimized */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            data-testid="video-transportation-hero"
            onError={() => console.log('Transportation video failed to load')}
            onLoadStart={() => console.log('Transportation video loading started')}
          >
            <source src="/api/public/transportation_hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Gradient overlay for enhanced text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>
        
        {/* Animated elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-1 h-1 bg-primary/50 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-20 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 right-10 w-1 h-1 bg-primary/40 rounded-full animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <Badge className="inline-block bg-primary/20 text-primary border-primary/30 px-3 py-1.5 text-sm sm:text-base font-semibold" data-testid="badge-premium">
              Premium Transport Facilitation
            </Badge>
            
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="heading-hero">
                Connecting Your Freight with 
                <span className="text-primary"> Trusted Carriers</span>
                <br className="hidden sm:block" />
                <span className="block sm:inline text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 font-normal mt-2 sm:mt-0">
                  On Time, Every Time
                </span>
              </h1>
            </div>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed px-2">
              In today's fast-paced supply chain world, every minute matters. We connect your freight 
              with trusted carriers across Canada and North America — ensuring excellence in delivery, 
              from dispatch to dock. No surprises, just results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                data-testid="button-get-quote"
                onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Your Quote <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Dialog open={isJoinModalOpen} onOpenChange={setIsJoinModalOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                    data-testid="button-join-network"
                  >
                    Join Our Network
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md" data-testid="dialog-join-network">
                  <DialogHeader>
                    <DialogTitle>Join Our Carrier Network</DialogTitle>
                    <DialogDescription>
                      Interested in becoming a verified carrier partner? We'd love to hear from you.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      As a carrier partner, you'll get access to:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-2 ml-4">
                      <li>• Consistent freight opportunities</li>
                      <li>• Quick payment terms</li>
                      <li>• Dedicated support team</li>
                      <li>• Competitive rates</li>
                    </ul>
                    <div className="space-y-3 pt-4">
                      <Button 
                        onClick={() => window.open('tel:249-444-0004', '_self')}
                        className="w-full"
                        variant="outline"
                        data-testid="button-call-join"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Call: 249-444-0004
                      </Button>
                      <Button 
                        onClick={() => window.open('mailto:logistics@groupworkforcesolutions.ca?subject=Carrier%20Network%20Interest', '_self')}
                        className="w-full"
                        variant="outline"
                        data-testid="button-email-join"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Email Us
                      </Button>
                      <Button 
                        onClick={handleJoinNetworkSubmit}
                        disabled={isJoinSubmitting}
                        className="w-full bg-gradient-to-r from-primary to-secondary"
                        data-testid="button-submit-join"
                      >
                        {isJoinSubmitting ? "Submitting..." : "Request Information"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 md:py-20 bg-background relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl sm:rounded-3xl"></div>
          <div className="absolute top-6 sm:top-10 left-6 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-primary/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
          <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 w-28 h-28 sm:w-40 sm:h-40 bg-secondary/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 bg-gradient-to-br from-background/80 via-background/60 to-background/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-border/50 shadow-xl">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                <Truck className="h-3 w-3 sm:h-4 sm:w-4" />
                Premium Logistics
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight" data-testid="heading-services">
                Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Transportation Services</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
                Comprehensive logistics solutions tailored to your business needs with nationwide coverage and expert support
              </p>
            </div>

            {/* Mobile-Optimized Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="group relative overflow-hidden border-0 bg-gradient-to-br from-background via-background/90 to-background/70 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2" data-testid={`card-service-${index}`}>
                    {/* Card Background Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                    
                    <div className="relative">
                      <CardHeader className="text-center pb-3 sm:pb-4 px-4 sm:px-6 pt-6">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                        </div>
                        <CardTitle className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{service.title}</CardTitle>
                        <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-2">{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 px-4 sm:px-6 pb-6">
                        <ul className="space-y-2 sm:space-y-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 sm:gap-3 group/feature">
                              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                                <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                              </div>
                              <span className="text-xs sm:text-sm text-muted-foreground group-hover/feature:text-foreground transition-colors duration-200">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Mobile-Optimized Bottom Section */}
            <div className="mt-12 sm:mt-16 text-center">
              <div className="flex flex-col sm:flex-row sm:inline-flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-4 sm:px-6 py-3 backdrop-blur-sm border border-primary/20 max-w-sm sm:max-w-none mx-auto">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-foreground">Real-time Tracking</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
                  <span className="text-sm font-medium text-foreground">Cross-border Service</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-1000"></div>
                  <span className="text-sm font-medium text-foreground">24/7 Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third Section - Full Transportation Poster (No Cropping) */}
      <section className="my-12 md:my-16" data-testid="section-transportation-poster">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative -mx-4 sm:mx-0">
            <img 
              src={transportPosterPath}
              alt=""
              className="block w-full h-auto rounded-none sm:rounded-2xl max-h-[80vh] object-contain"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" data-testid="heading-trust">
              Trusted & Certified
            </h2>
            <p className="text-lg text-muted-foreground">
              Your freight is in safe hands with our certified, insured carrier network
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-border text-center hover:shadow-md transition-shadow" data-testid={`trust-badge-${index}`}>
                  <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full w-fit">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{badge.title}</h3>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" data-testid="heading-stats">
              Proven Results
            </h2>
            <p className="text-lg text-muted-foreground">
              Numbers that demonstrate our commitment to excellence
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center" data-testid={`statistic-${index}`}>
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full w-fit">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="heading-industries">
              Industries We Serve
            </h2>
            <p className="text-xl text-muted-foreground">
              No matter your industry, we tailor transport solutions to your regulations, timelines, and expectations
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((industry, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center border border-border"
                data-testid={`industry-${index}`}
              >
                <h3 className="font-semibold text-foreground">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="heading-testimonials">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real feedback from transportation partners who trust us with their freight
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800" data-testid={`testimonial-${index}`}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-primary">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="heading-benefits">
              Why Choose Us
            </h2>
            <p className="text-xl text-muted-foreground">
              What makes our transportation services stand out in the industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center" data-testid={`benefit-${index}`}>
                  <div className="mx-auto mb-6 p-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full w-fit">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Request Form */}
      <section id="quote-form" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="heading-quote">
                Ready to Move Forward?
              </h2>
              <p className="text-xl text-muted-foreground">
                Request a personalized quote and see how we can optimize your supply chain
              </p>
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Get Your Transportation Quote</CardTitle>
                <CardDescription className="text-center">
                  Fill out the form below and we'll contact you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} data-testid="input-contact-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Your company name" {...field} data-testid="input-company" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@company.com" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="(555) 123-4567" 
                                {...field}
                                onChange={(e) => {
                                  const formatted = formatPhoneNumber(e.target.value);
                                  field.onChange(formatted);
                                }}
                                maxLength={14}
                                data-testid="input-phone" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-service-type">
                                  <SelectValue placeholder="Select service type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ftl">Full Truckload (FTL)</SelectItem>
                                <SelectItem value="ltl">Less-Than-Truckload (LTL)</SelectItem>
                                <SelectItem value="expedited">Expedited Shipping</SelectItem>
                                <SelectItem value="last-mile">Last-Mile Delivery</SelectItem>
                                <SelectItem value="custom">Custom Logistics</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="freightType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Freight Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-freight-type">
                                  <SelectValue placeholder="Select freight type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">General Freight</SelectItem>
                                <SelectItem value="refrigerated">Refrigerated</SelectItem>
                                <SelectItem value="hazmat">Hazardous Materials</SelectItem>
                                <SelectItem value="oversized">Oversized/Heavy</SelectItem>
                                <SelectItem value="automotive">Automotive</SelectItem>
                                <SelectItem value="food">Food & Beverage</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="origin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Origin</FormLabel>
                            <FormControl>
                              <Input placeholder="Pickup location (city, province)" {...field} data-testid="input-origin" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="destination"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Destination</FormLabel>
                            <FormControl>
                              <Input placeholder="Delivery location (city, province)" {...field} data-testid="input-destination" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 5,000 lbs" {...field} data-testid="input-weight" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Timeline</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-timeline">
                                  <SelectValue placeholder="When do you need this?" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="asap">ASAP (Rush)</SelectItem>
                                <SelectItem value="1-3-days">1-3 Days</SelectItem>
                                <SelectItem value="1-week">Within 1 Week</SelectItem>
                                <SelectItem value="2-weeks">Within 2 Weeks</SelectItem>
                                <SelectItem value="flexible">Flexible</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="specialRequirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Requirements (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Any special handling, equipment, or delivery requirements..."
                              className="min-h-[100px]"
                              {...field}
                              data-testid="textarea-requirements"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      disabled={isSubmitting}
                      data-testid="button-submit-quote"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </div>
                      ) : (
                        <>
                          Request Quote <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="heading-faq">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get answers to common questions about our transportation services
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white dark:bg-gray-800 rounded-lg border px-6" data-testid={`faq-item-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-semibold text-foreground">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="heading-coverage">
              Our Service Coverage
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive transportation network across Canada and cross-border to the US
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full w-fit">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Western Canada</h3>
              <p className="text-muted-foreground mb-4">BC, Alberta, Saskatchewan, Manitoba</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Vancouver & Lower Mainland</li>
                <li>• Calgary & Edmonton</li>
                <li>• Saskatoon & Regina</li>
                <li>• Winnipeg Metro</li>
              </ul>
            </Card>
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full w-fit">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Central Canada</h3>
              <p className="text-muted-foreground mb-4">Ontario, Quebec</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Greater Toronto Area</li>
                <li>• Ottawa & Kingston</li>
                <li>• Montreal & Laval</li>
                <li>• Quebec City</li>
              </ul>
            </Card>
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full w-fit">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Atlantic Canada</h3>
              <p className="text-muted-foreground mb-4">New Brunswick, Nova Scotia, PEI, Newfoundland</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Halifax & Dartmouth</li>
                <li>• Moncton & Saint John</li>
                <li>• Charlottetown</li>
                <li>• St. John's</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8" data-testid="heading-contact">
              Ready to Get Started?
            </h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <div className="flex items-center text-lg text-muted-foreground">
                <Phone className="h-6 w-6 text-primary mr-3" />
                <span>249-444-0004</span>
              </div>
              <div className="flex items-center text-lg text-muted-foreground">
                <Mail className="h-6 w-6 text-primary mr-3" />
                <span>logistics@groupworkforcesolutions.ca</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
      
      {/* Mobile Sticky CTA Bar */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-border shadow-lg z-50 p-4">
          <div className="flex gap-2">
            <Button 
              onClick={() => window.open('tel:249-444-0004', '_self')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              data-testid="mobile-cta-call"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </Button>
            <Button 
              onClick={() => document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              data-testid="mobile-cta-quote"
            >
              <Zap className="mr-2 h-4 w-4" />
              Get Quote
            </Button>
            <Button 
              onClick={() => window.open('mailto:logistics@groupworkforcesolutions.ca?subject=Transportation%20Inquiry', '_self')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              data-testid="mobile-cta-email"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}