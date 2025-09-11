import { Button } from "@/components/ui/button";
import { Users, Truck, Building2, Handshake, Star, Award, TrendingUp } from "lucide-react";
import heroVideoPath from "@assets/Keep_the_logo_202509111239_1757610372529.mp4";

export default function VideoHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Video on Top - Mobile Optimized */}
      <div className="w-full bg-gray-200">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          controls={false}
          className="w-full h-[25vh] sm:h-[35vh] md:h-[45vh] lg:h-[55vh] object-cover block"
          data-testid="hero-video"
        >
          <source src={heroVideoPath} type="video/mp4" />
          <div className="w-full h-[25vh] sm:h-[35vh] md:h-[45vh] lg:h-[55vh] bg-gray-300 flex items-center justify-center">
            <p className="text-gray-600">Video loading...</p>
          </div>
        </video>
      </div>

      {/* Content Below Video - Mobile Optimized */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-8 sm:py-12 lg:py-16 pb-20 md:pb-16 overflow-hidden">
        {/* Subtle Background Particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-1 h-1 bg-primary/30 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute bottom-32 right-20 w-1 h-1 bg-white/40 rounded-full animate-ping opacity-40"></div>
          <div className="absolute top-1/2 right-10 w-1 h-1 bg-primary/20 rounded-full animate-pulse opacity-50"></div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
          {/* Left Side - Mobile Optimized Graphics */}
          <div className="flex items-center justify-center order-2 lg:order-1">
            <div className="relative">
              {/* Simplified Background Elements for Mobile */}
              <div className="absolute -inset-12 sm:-inset-16 lg:-inset-24 grid grid-cols-3 grid-rows-3 gap-4 sm:gap-6 lg:gap-8 place-items-center">
                {/* Top Row */}
                <div className="bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm rounded-full p-2 sm:p-3 lg:p-4 animate-float border border-white/10 shadow-xl">
                  <Truck className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                </div>
                <div></div> {/* Empty space */}
                <div className="bg-gradient-to-br from-secondary/20 to-secondary/10 backdrop-blur-sm rounded-full p-2 sm:p-3 lg:p-4 animate-float-delayed border border-white/10 shadow-xl">
                  <Building2 className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6 text-secondary" />
                </div>
                
                {/* Middle Row */}
                <div></div> {/* Empty space */}
                <div></div> {/* Center space for main image */}
                <div></div> {/* Empty space */}
                
                {/* Bottom Row */}
                <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full p-2 sm:p-3 lg:p-4 animate-float border border-white/10 shadow-xl">
                  <Users className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div></div> {/* Empty space */}
                <div className="bg-gradient-to-br from-primary/15 to-white/10 backdrop-blur-sm rounded-full p-2 sm:p-2 lg:p-3 animate-float-delayed border border-white/10 shadow-lg">
                  <Award className="w-3 h-3 sm:w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                </div>
              </div>
              
              {/* Mobile Optimized Professional Image */}
              <div className="relative group">
                {/* Single Clean Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl -z-10"></div>
                
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400"
                  alt="Professional team collaboration"
                  className="w-64 h-64 sm:w-80 h-80 lg:w-96 lg:h-96 rounded-2xl object-cover shadow-2xl border-3 border-white/20 group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Mobile Optimized Success Badge */}
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 lg:-top-4 lg:-right-4 bg-gradient-to-br from-primary to-secondary rounded-full p-2 sm:p-3 lg:p-4 shadow-xl border-2 border-white/20">
                  <Handshake className="w-5 h-5 sm:w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Mobile Optimized Content */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8 lg:space-y-10 order-1 lg:order-2">
            <div className="space-y-6 sm:space-y-8">
              {/* Mobile Optimized Headline */}
              <div className="relative">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Canada's <span className="text-primary font-black">Leading</span>
                  <br />
                  <span className="relative">
                    Business Solutions
                    {/* Clean Underline */}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-primary to-secondary mt-1 sm:mt-2"></div>
                  </span>
                </h1>
                
                {/* Mobile Optimized Badge */}
                <div className="absolute -top-3 sm:-top-4 lg:-top-6 right-0 bg-primary/20 backdrop-blur-sm text-primary text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full border border-primary/30">
                  #1 in Canada
                </div>
              </div>
              
              {/* Mobile Optimized Feature List */}
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl lg:text-2xl">
                <div className="flex items-center gap-3 sm:gap-4 animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                  <div className="w-6 h-6 sm:w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                  </div>
                  <p className="font-semibold text-gray-100">Expert Staffing & Recruitment</p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 animate-slide-in-left" style={{animationDelay: '0.4s'}}>
                  <div className="w-6 h-6 sm:w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                  </div>
                  <p className="font-semibold text-gray-100">E-commerce & Product Solutions</p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 animate-slide-in-left" style={{animationDelay: '0.6s'}}>
                  <div className="w-6 h-6 sm:w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm font-bold">✓</span>
                  </div>
                  <p className="font-semibold text-gray-100">Warehouse Services & Logistics</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Mobile Optimized Description */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg blur-sm"></div>
                <p className="relative text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-lg p-4 sm:p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  Trusted by <span className="text-primary font-bold">leading companies</span> across Canada, we deliver comprehensive business solutions 
                  spanning staffing services, e-commerce, and warehouse logistics to drive your success.
                </p>
              </div>
              
              {/* Mobile Optimized Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  size="lg" 
                  className="relative bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold px-6 sm:px-8 lg:px-10 py-4 sm:py-5 text-base sm:text-lg lg:text-xl shadow-2xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group overflow-hidden"
                  data-testid="button-contact-us"
                >
                  <span className="relative z-10">Get Started Today</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 sm:border-3 border-primary text-primary hover:bg-primary hover:text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 text-base sm:text-lg lg:text-xl font-bold shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 bg-white/5 backdrop-blur-sm"
                  data-testid="button-learn-more"
                >
                  Explore Solutions
                </Button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Mobile Optimized Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hidden md:block">
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm mb-2">Scroll to explore</span>
          <div className="w-5 h-8 sm:w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1 sm:mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}