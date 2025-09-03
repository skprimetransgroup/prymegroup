import { Button } from "@/components/ui/button";
import heroVideoPath from "@assets/Keep_it_original_202508291252_e5v3t_1756846516242.mp4";
import primeLogoPath from "@assets/Prime Group_Final (1)_1756488511870.png";

export default function VideoHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover"
          data-testid="hero-video"
        >
          <source src={heroVideoPath} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Animated Rocket */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="rocket-animation">
          <div className="relative">
            {/* Geometric Background Shapes */}
            <div className="absolute -inset-20">
              <div className="w-32 h-32 border-4 border-yellow-400/30 transform rotate-45 absolute top-0 left-0 animate-spin-slow"></div>
              <div className="w-24 h-24 border-4 border-blue-400/30 transform -rotate-12 absolute bottom-0 right-0 animate-pulse"></div>
              <div className="w-16 h-16 bg-primary/20 transform rotate-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce"></div>
            </div>
            
            {/* Central Logo */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-2xl border border-white/20">
              <img 
                src={primeLogoPath} 
                alt="Prime Trans Group" 
                className="w-32 h-20 md:w-48 md:h-30 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              Unrivaled <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Speed</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Of Fulfillment
            </h1>
            
            <div className="space-y-2 sm:space-y-3 text-lg sm:text-xl lg:text-2xl text-gray-200">
              <p className="font-medium">Powered by Passion.</p>
              <p className="font-medium">Driven by Talent.</p>
              <p className="font-medium">Revolutionize the way you hire.</p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 max-w-2xl">
            <p className="text-base sm:text-lg text-gray-300">
              Canada's premier workforce solutions provider. We connect businesses with top-tier talent 
              across transportation, manufacturing, and logistics industries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                data-testid="button-contact-us"
              >
                Contact Us
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg"
                data-testid="button-learn-more"
              >
                Learn More
              </Button>
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