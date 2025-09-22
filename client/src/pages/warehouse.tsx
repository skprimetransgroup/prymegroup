import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Warehouse as WarehouseIcon, 
  Truck, 
  Package, 
  Shield, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle,
  ArrowRight,
  BarChart3,
  Users,
  Target
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Forklift3D from "@/components/warehouse/forklift-3d";
import BackgroundVideo from "@/components/sections/background-video";
import warehousePosterPath from "@assets/27d89250-971c-4d38-8ad3-6c90f573e796_1758511522890.jpeg";

const warehouseServices = [
  {
    icon: Package,
    title: "Storage Solutions",
    description: "Secure, climate-controlled storage facilities with 24/7 monitoring and access control.",
    features: ["Climate Control", "Security Cameras", "Fire Protection", "Pest Control"]
  },
  {
    icon: Truck,
    title: "Distribution Network",
    description: "Comprehensive distribution services connecting your products to customers across Canada.",
    features: ["Cross-Docking", "Order Fulfillment", "Same-Day Delivery", "Return Processing"]
  },
  {
    icon: BarChart3,
    title: "Inventory Management",
    description: "Advanced inventory tracking and management systems for optimal stock control.",
    features: ["Real-time Tracking", "Automated Reordering", "Cycle Counting", "Reporting Analytics"]
  },
  {
    icon: Users,
    title: "Logistics Support",
    description: "Expert logistics coordination and supply chain optimization services.",
    features: ["Route Optimization", "Load Planning", "Carrier Management", "Cost Analysis"]
  }
];

const warehouseFeatures = [
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Comprehensive insurance coverage for all stored goods"
  },
  {
    icon: Clock,
    title: "24/7 Operations",
    description: "Round-the-clock access and monitoring capabilities"
  },
  {
    icon: Target,
    title: "99.9% Accuracy",
    description: "Industry-leading accuracy in inventory and fulfillment"
  },
  {
    icon: MapPin,
    title: "Strategic Locations",
    description: "Warehouses positioned for optimal distribution coverage"
  }
];

export default function Warehouse() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    serviceType: "",
    storageNeeds: "",
    message: ""
  });


  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the form data to your backend
    alert("Thank you for your inquiry! We'll contact you within 24 hours.");
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      serviceType: "",
      storageNeeds: "",
      message: ""
    });
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Warehouse Services - Prime Trans Group</title>
      <meta name="description" content="Professional warehouse and distribution services across Canada. Storage solutions, inventory management, and logistics support from trusted partners." />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section with Optimized Video Background - Mobile Optimized */}
        <BackgroundVideo
          sources={{
            desktop: "/api/public/warehouse_hero.gif",
            mobile: "/api/public/warehouse_hero.gif", // Same GIF for mobile
          }}
          poster="/api/public/warehouse_hero.gif"
          className="py-12 sm:py-16 md:py-20 lg:py-32 text-white overflow-hidden"
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Gradient overlay for enhanced text visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>
          
          {/* Content - Mobile Optimized */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
              <Badge className="inline-block bg-primary/20 text-primary border-primary/30 px-3 py-1.5 text-sm sm:text-base font-semibold" data-testid="badge-warehouse">
                Premium Warehouse Solutions
              </Badge>
              
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" data-testid="page-title-warehouse">
                  Warehouse & 
                  <span className="text-primary"> Distribution</span>
                  <br className="hidden sm:block" />
                  <span className="block sm:inline text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-300 font-normal mt-2 sm:mt-0">
                    Excellence in Every Operation
                  </span>
                </h1>
              </div>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed px-2" data-testid="page-description-warehouse">
                Connect with trusted warehouse partners for comprehensive storage, distribution, 
                and logistics solutions. From inventory management to order fulfillment, 
                we deliver operational excellence that scales with your business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                  data-testid="button-get-warehouse-quote"
                  onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Your Quote <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
              
              {/* Mobile-Optimized Stats Badges */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-4 pt-4">
                <Badge className="bg-white/10 text-white border-white/20 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base lg:text-lg backdrop-blur-sm font-medium">
                  500+ Satisfied Clients
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base lg:text-lg backdrop-blur-sm font-medium">
                  10+ Partner Facilities
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base lg:text-lg backdrop-blur-sm font-medium">
                  99.9% Accuracy Rate
                </Badge>
              </div>
            </div>
          </div>
        </BackgroundVideo>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Second Section - Full Warehouse Poster (No Cropping) */}
          <section className="my-12 md:my-16" data-testid="section-warehouse-poster">
            <div className="relative -mx-4 sm:mx-0">
              <img 
                src={warehousePosterPath}
                alt=""
                className="block w-full h-auto rounded-none sm:rounded-2xl max-h-[80vh] object-contain"
                loading="eager"
              />
            </div>
          </section>
          {/* Services Overview - Mobile Optimized */}
          <section className="mb-16 sm:mb-20 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl sm:rounded-3xl"></div>
              <div className="absolute top-6 sm:top-10 left-6 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-primary/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
              <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 w-28 h-28 sm:w-40 sm:h-40 bg-secondary/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 bg-gradient-to-br from-background/80 via-background/60 to-background/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-border/50 shadow-xl">
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                  <Package className="h-3 w-3 sm:h-4 sm:w-4" />
                  Premium Solutions
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
                  Comprehensive <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Warehouse Solutions</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
                  From storage to distribution, we provide complete warehouse services to streamline your operations and accelerate your business growth
                </p>
              </div>

              {/* Mobile-Optimized Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {warehouseServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <Card key={service.title} className="group relative overflow-hidden border-0 bg-gradient-to-br from-background via-background/90 to-background/70 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2" data-testid={`service-card-${index + 1}`}>
                      {/* Card Background Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                      
                      <div className="relative">
                        <CardHeader className="text-center pb-3 sm:pb-4 px-4 sm:px-6 pt-6">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                          </div>
                          <CardTitle className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300" data-testid={`service-title-${index + 1}`}>
                            {service.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 px-4 sm:px-6 pb-6">
                          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 text-center leading-relaxed" data-testid={`service-description-${index + 1}`}>
                            {service.description}
                          </p>
                          <div className="space-y-2 sm:space-y-3">
                            {service.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2 sm:gap-3 group/feature">
                                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                                  <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                                </div>
                                <span className="text-xs sm:text-sm text-muted-foreground group-hover/feature:text-foreground transition-colors duration-200">{feature}</span>
                              </div>
                            ))}
                          </div>
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
                    <span className="text-xs sm:text-sm font-medium text-foreground">24/7 Operations</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-border"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
                    <span className="text-xs sm:text-sm font-medium text-foreground">Nationwide Coverage</span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-border"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-1000"></div>
                    <span className="text-xs sm:text-sm font-medium text-foreground">Expert Support</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Key Features */}
          <section className="mb-20 bg-muted/30 rounded-2xl p-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Our Warehouse Partners</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Industry-leading standards and proven track record in warehouse operations
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {warehouseFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="text-center" data-testid={`feature-${index + 1}`}>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Get Your Quote Today</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Ready to optimize your warehouse operations? Contact us for a customized quote 
                tailored to your specific storage and distribution needs.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">Call us for immediate assistance</p>
                    <a href="tel:+1-555-0123" className="text-primary font-medium hover:underline" data-testid="link-phone">
                      +1 (555) 012-3456
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">Send us your requirements</p>
                    <a href="mailto:warehouse@primetransgroup.com" className="text-primary font-medium hover:underline" data-testid="link-email">
                      warehouse@primetransgroup.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Response Time</h3>
                    <p className="text-muted-foreground">We respond within 24 hours</p>
                    <span className="text-primary font-medium">Guaranteed Quick Response</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <WarehouseIcon className="h-6 w-6 text-primary" />
                  Request a Quote
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-warehouse-quote">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company *</Label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        required
                        data-testid="input-company"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        data-testid="input-phone"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="serviceType">Service Type *</Label>
                    <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
                      <SelectTrigger data-testid="select-service-type">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="storage">Storage Solutions</SelectItem>
                        <SelectItem value="distribution">Distribution Services</SelectItem>
                        <SelectItem value="fulfillment">Order Fulfillment</SelectItem>
                        <SelectItem value="inventory">Inventory Management</SelectItem>
                        <SelectItem value="logistics">Full Logistics Support</SelectItem>
                        <SelectItem value="custom">Custom Solution</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="storageNeeds">Storage Needs (sq ft)</Label>
                    <Input
                      id="storageNeeds"
                      type="text"
                      placeholder="e.g., 5,000 sq ft"
                      value={formData.storageNeeds}
                      onChange={(e) => handleInputChange("storageNeeds", e.target.value)}
                      data-testid="input-storage-needs"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Additional Requirements</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your specific warehouse requirements..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      data-testid="textarea-message"
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" data-testid="button-submit-quote">
                    Request Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Process Section */}
          <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our streamlined process connects you with the perfect warehouse solution
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Submit Requirements</h3>
                <p className="text-muted-foreground">
                  Tell us about your storage needs, location preferences, and specific requirements.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Get Matched</h3>
                <p className="text-muted-foreground">
                  We connect you with pre-vetted warehouse partners that match your criteria.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Start Operations</h3>
                <p className="text-muted-foreground">
                  Begin your warehouse operations with ongoing support and management assistance.
                </p>
              </div>
            </div>
          </section>
        </div>


        <Footer />
      </div>
    </>
  );
}