import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Briefcase, 
  Award, 
  Shield, 
  Clock, 
  Star, 
  Phone, 
  Mail, 
  CheckCircle,
  ArrowRight,
  UserCheck,
  Target,
  TrendingUp
} from "lucide-react";
import { useEffect, useRef } from "react";

const staffingServices = [
  {
    icon: Users,
    title: "Temporary Staffing",
    description: "Flexible temporary workforce solutions to meet your immediate staffing needs.",
    features: ["Quick Deployment", "Skill-Matched Candidates", "Flexible Duration", "Quality Assurance"]
  },
  {
    icon: Briefcase,
    title: "Permanent Placement",
    description: "Find the right permanent employees who align with your company culture and goals.",
    features: ["Executive Search", "Technical Roles", "Cultural Fit Assessment", "Long-term Retention"]
  },
  {
    icon: Award,
    title: "Specialized Roles",
    description: "Expert recruitment for specialized positions across various industries.",
    features: ["Industry Expertise", "Niche Skills", "Compliance Knowledge", "Certified Professionals"]
  },
  {
    icon: UserCheck,
    title: "Contract-to-Hire",
    description: "Evaluate candidates through contract work before making permanent hiring decisions.",
    features: ["Risk Mitigation", "Trial Periods", "Performance Assessment", "Seamless Transition"]
  }
];

const staffingFeatures = [
  {
    icon: Shield,
    title: "Pre-Screened Talent",
    description: "All candidates undergo thorough background checks and skills assessment"
  },
  {
    icon: Clock,
    title: "Rapid Deployment",
    description: "Quick turnaround times to meet urgent staffing requirements"
  },
  {
    icon: Target,
    title: "Perfect Match",
    description: "Advanced matching algorithms ensure best fit for your requirements"
  },
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "95% client satisfaction rate with long-term placement success"
  }
];

export default function Staffing() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadStart = () => console.log('Video loading started');
      const handleCanPlay = () => console.log('Video can start playing');
      const handleError = (e: Event) => console.error('Video error:', e);
      
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      
      return () => {
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            data-testid="staffing-hero-video"
          >
            <source src="/api/public/Staffing.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <div className="space-y-8">
            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold leading-tight" data-testid="hero-title">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600">
                  Staffing
                </span>
                <span className="block text-white">
                  Solutions
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed" data-testid="hero-subtitle">
                Connect with Canada's top talent through our comprehensive staffing services. 
                From temporary assignments to permanent placements, we deliver the right people for your success.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                data-testid="button-find-talent"
              >
                Find Talent Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold rounded-xl"
                data-testid="button-learn-more"
              >
                Learn More
                <Phone className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center" data-testid="stat-placements">
                <div className="text-4xl font-bold text-blue-400">5,000+</div>
                <div className="text-gray-300">Successful Placements</div>
              </div>
              <div className="text-center" data-testid="stat-clients">
                <div className="text-4xl font-bold text-purple-400">200+</div>
                <div className="text-gray-300">Satisfied Clients</div>
              </div>
              <div className="text-center" data-testid="stat-satisfaction">
                <div className="text-4xl font-bold text-blue-400">95%</div>
                <div className="text-gray-300">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Enhanced Visual Design */}
      <section className="py-20 bg-white relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 bg-gradient-to-br from-background/80 via-background/60 to-background/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-border/50 shadow-xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Users className="h-4 w-4" />
                Premium Staffing
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight" data-testid="services-title">
                Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Staffing Services</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Comprehensive workforce solutions tailored to your industry and business needs with expert talent matching
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {staffingServices.map((service, index) => (
                <Card key={index} className="group relative overflow-hidden border-0 bg-gradient-to-br from-background via-background/90 to-background/70 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2" data-testid={`service-card-${index}`}>
                  {/* Card Background Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>
                  
                  <div className="relative">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground mb-6 text-center leading-relaxed">
                        {service.description}
                      </p>
                      <div className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3 group/feature">
                            <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                              <CheckCircle className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm text-muted-foreground group-hover/feature:text-foreground transition-colors duration-200">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Enhanced Bottom Section */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-6 py-3 backdrop-blur-sm border border-primary/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Pre-screened Talent</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
                  <span className="text-sm font-medium text-foreground">24/7 Support</span>
                </div>
                <div className="w-px h-4 bg-border"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-1000"></div>
                  <span className="text-sm font-medium text-foreground">Rapid Deployment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" data-testid="features-title">
              Why Choose Prime Trans Group
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference with Canada's trusted staffing partner
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {staffingFeatures.map((feature, index) => (
              <div key={index} className="text-center group" data-testid={`feature-${index}`}>
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-700 transition-colors duration-300">
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4" data-testid="contact-title">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
              Let our experienced team help you find the right talent or the perfect opportunity
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl"
                data-testid="button-contact-staffing"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-xl"
                data-testid="button-email-staffing"
              >
                <Mail className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}