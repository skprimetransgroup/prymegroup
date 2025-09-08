import { Button } from "@/components/ui/button";
import { Users, Truck, Building2, Handshake, Star, Award, TrendingUp } from "lucide-react";
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
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 overflow-hidden">
        {/* Animated Background Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-ping opacity-40"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse opacity-60"></div>
          <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-primary/60 rounded-full animate-ping opacity-50"></div>
          <div className="absolute bottom-20 right-40 w-1 h-1 bg-white/60 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute top-60 left-1/3 w-1 h-1 bg-primary/40 rounded-full animate-ping opacity-30"></div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Enhanced Professional Graphics */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Enhanced Background Elements */}
              <div className="absolute -inset-32">
                {/* Floating Industry Icons with Enhanced Animations */}
                <div className="absolute top-0 left-0 bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm rounded-full p-4 animate-float border border-white/10 shadow-xl">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute top-20 right-0 bg-gradient-to-br from-secondary/20 to-secondary/10 backdrop-blur-sm rounded-full p-4 animate-float-delayed border border-white/10 shadow-xl">
                  <Building2 className="w-8 h-8 text-secondary" />
                </div>
                <div className="absolute bottom-0 left-10 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full p-4 animate-float border border-white/10 shadow-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-32 left-32 bg-gradient-to-br from-primary/15 to-white/10 backdrop-blur-sm rounded-full p-3 animate-float-delayed border border-white/10 shadow-lg">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute bottom-32 right-20 bg-gradient-to-br from-secondary/15 to-white/10 backdrop-blur-sm rounded-full p-3 animate-float border border-white/10 shadow-lg">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
              </div>
              
              {/* Enhanced Central Professional Image */}
              <div className="relative group">
                {/* Multiple Glow Layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl blur-2xl -z-10 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl blur-xl -z-5"></div>
                
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400"
                  alt="Professional team collaboration"
                  className="w-80 h-80 rounded-2xl object-cover shadow-2xl border-4 border-white/30 group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Enhanced Success Badge */}
                <div className="absolute -top-6 -right-6 bg-gradient-to-br from-primary via-primary to-secondary rounded-full p-5 shadow-2xl animate-bounce border-4 border-white/20">
                  <Handshake className="w-10 h-10 text-white" />
                </div>
                
                {/* Floating Achievement Badges */}
                <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-secondary to-primary rounded-full p-4 shadow-xl animate-pulse border-2 border-white/20">
                  <Star className="w-8 h-8 text-white" />
                </div>
                
                {/* Rotating Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary via-white to-secondary bg-clip-border animate-spin-slow opacity-40"></div>
              </div>
            </div>
          </div>

          {/* Right Side - Enhanced Content */}
          <div className="text-center lg:text-left space-y-10">
            <div className="space-y-8">
              {/* Enhanced Headline with Staggered Animation */}
              <div className="relative">
                <h1 className="text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary leading-tight animate-fade-in-up">
                  Canada's <span className="text-gradient-3d animate-pulse">Leading</span>
                  <br />
                  <span className="relative">
                    Workforce Solutions
                    {/* Underline Effect */}
                    <div className="absolute bottom-2 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary opacity-60 animate-expand-width"></div>
                  </span>
                </h1>
                
                {/* Floating Text Effect */}
                <div className="absolute -top-8 right-0 text-primary/60 text-sm font-bold animate-bounce">
                  #1 in Canada
                </div>
              </div>
              
              {/* Enhanced Feature List with Icons */}
              <div className="space-y-4 text-xl lg:text-2xl">
                <div className="flex items-center gap-4 animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="font-semibold text-gray-100">Expert Recruitment & Staffing</p>
                </div>
                <div className="flex items-center gap-4 animate-slide-in-left" style={{animationDelay: '0.4s'}}>
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="font-semibold text-gray-100">Proven Industry Experience</p>
                </div>
                <div className="flex items-center gap-4 animate-slide-in-left" style={{animationDelay: '0.6s'}}>
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="font-semibold text-gray-100">Connecting Talent with Opportunity</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Enhanced Description with Highlight Box */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg blur-sm"></div>
                <p className="relative text-xl text-gray-200 max-w-lg p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  Trusted by <span className="text-primary font-bold">leading companies</span> across Canada, we deliver comprehensive staffing solutions 
                  for transportation, manufacturing, warehousing, and administrative roles.
                </p>
              </div>
              
              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="relative bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold px-10 py-5 text-xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group overflow-hidden"
                  data-testid="button-contact-us"
                >
                  <span className="relative z-10">Get Started Today</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-3 border-primary text-primary hover:bg-primary hover:text-white px-10 py-5 text-xl font-bold shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 bg-white/5 backdrop-blur-sm"
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