import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import heroVideoPath from "@assets/Keep_it_original_202508291252_e5v3t_1756846516242.mp4";

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

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - 3D Rocket/Graphics */}
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Geometric Background Shapes */}
              <div className="absolute -inset-20">
                <div className="w-40 h-40 border-4 border-yellow-400 transform rotate-45 absolute top-0 left-0 opacity-30"></div>
                <div className="w-32 h-32 border-4 border-blue-400 transform -rotate-12 absolute bottom-0 right-0 opacity-30"></div>
                <div className="w-24 h-24 bg-primary/20 transform rotate-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              
              {/* Central Rocket Icon */}
              <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-8 w-32 h-32 flex items-center justify-center shadow-2xl">
                <Rocket className="w-16 h-16 text-white transform rotate-45" />
                
                {/* Exhaust Effect */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-2 h-16 bg-gradient-to-b from-orange-400 to-transparent rounded-full opacity-80 animate-pulse"></div>
                  <div className="w-1 h-20 bg-gradient-to-b from-yellow-300 to-transparent rounded-full absolute left-1/2 transform -translate-x-1/2 top-2 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Unrivaled <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Speed</span>
                <br />
                Of Fulfillment
              </h1>
              
              <div className="space-y-3 text-xl lg:text-2xl text-gray-200">
                <p className="font-medium">Powered by Passion.</p>
                <p className="font-medium">Driven by Talent.</p>
                <p className="font-medium">Revolutionize the way you hire.</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-gray-300 max-w-lg">
                Canada's premier workforce solutions provider. We connect businesses with top-tier talent 
                across transportation, manufacturing, and logistics industries.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg"
                  data-testid="button-contact-us"
                >
                  Contact Us
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
                  data-testid="button-learn-more"
                >
                  Learn More
                </Button>
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