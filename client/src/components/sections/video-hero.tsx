import { Button } from "@/components/ui/button";
import { Users, Truck, Building2, Handshake } from "lucide-react";
import heroVideoPath from "@assets/Keep_it_original_202508291252_e5v3t_1756846516242.mp4";

export default function VideoHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Video on Top */}
      <div className="w-full bg-gray-200">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          controls={false}
          className="w-full h-[60vh] lg:h-[70vh] object-cover block"
          data-testid="hero-video"
        >
          <source src={heroVideoPath} type="video/mp4" />
          <div className="w-full h-[60vh] lg:h-[70vh] bg-gray-300 flex items-center justify-center">
            <p className="text-gray-600">Video loading...</p>
          </div>
        </video>
      </div>

      {/* Content Below Video */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Professional Workforce Graphics */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Professional Background Elements */}
              <div className="absolute -inset-20">
                {/* Floating Industry Icons */}
                <div className="absolute top-0 left-0 bg-white/10 backdrop-blur-sm rounded-full p-4 animate-float">
                  <Truck className="w-8 h-8 text-white/80" />
                </div>
                <div className="absolute top-20 right-0 bg-white/10 backdrop-blur-sm rounded-full p-4 animate-float-delayed">
                  <Building2 className="w-8 h-8 text-white/80" />
                </div>
                <div className="absolute bottom-0 left-10 bg-white/10 backdrop-blur-sm rounded-full p-4 animate-float">
                  <Users className="w-8 h-8 text-white/80" />
                </div>
              </div>
              
              {/* Central Professional Image */}
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400"
                  alt="Professional team collaboration"
                  className="w-64 h-64 rounded-2xl object-cover shadow-2xl border-4 border-white/20"
                />
                
                {/* Success Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-br from-primary to-secondary rounded-full p-4 shadow-xl animate-pulse">
                  <Handshake className="w-8 h-8 text-white" />
                </div>
                
                {/* Glowing Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl -z-10"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Canada's <span className="text-gradient-3d">Leading</span>
                <br />
                Workforce Solutions
              </h1>
              
              <div className="space-y-3 text-xl lg:text-2xl text-gray-200">
                <p className="font-medium">Expert Recruitment & Staffing</p>
                <p className="font-medium">Proven Industry Experience</p>
                <p className="font-medium">Connecting Talent with Opportunity</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-300 max-w-lg">
                Trusted by leading companies across Canada, we deliver comprehensive staffing solutions 
                for transportation, manufacturing, warehousing, and administrative roles.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 text-lg"
                  data-testid="button-contact-us"
                >
                  Get Started Today
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-bold"
                  data-testid="button-learn-more"
                >
                  Our Services
                </Button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}