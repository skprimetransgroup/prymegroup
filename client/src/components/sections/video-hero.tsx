import { Button } from "@/components/ui/button";
import {
  Users,
  Truck,
  Building2,
  Handshake,
  Star,
  Award,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Use same route as staffing page
const officeVideo = "/Office-latest.mp4";

export default function VideoHero() {
  const [showFallback, setShowFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      const handleLoadStart = () => console.log("Video loading started");
      const handleCanPlay = () => console.log("Video can start playing");
      const handleError = (e: Event) => console.error("Video error:", e);

      video.addEventListener("loadstart", handleLoadStart);
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("error", handleError);

      return () => {
        video.removeEventListener("loadstart", handleLoadStart);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("error", handleError);
      };
    }
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Video on Top - Mobile Optimized */}
      <div className="relative w-full bg-gray-900 min-h-[25vh] sm:min-h-[30vh] md:min-h-[35vh] flex items-center justify-center">
        {/* Video element - always rendered */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          data-testid="hero-video"
        >
          <source src={officeVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Fallback content when video fails - positioned above video */}
        {showFallback && (
          <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#0b0d1e] via-gray-800 to-[#0b0d1e] flex items-center justify-center">
            <div className="text-center text-white p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#edc247] rounded-full flex items-center justify-center">
                <Truck className="w-8 h-8 text-[#0b0d1e]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Prime Trans Group</h2>
              <p className="text-gray-300">
                Canada's Leading Business Solutions
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Professional Content Section */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-6 sm:py-8 lg:py-12 overflow-hidden">
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-6xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Professional Headline */}
            <div className="space-y-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-3d">
                Canada's{" "}
                <span className="text-primary font-black">Leading</span>
                <br />
                <span className="relative">
                  Business Solutions
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 bg-gradient-to-r from-primary to-secondary mt-2"></div>
                </span>
              </h1>

              <div className="inline-flex items-center bg-primary/10 backdrop-blur-sm text-primary text-sm font-semibold px-4 py-2 rounded-full border border-primary/20">
                <Star className="w-4 h-4 mr-2" />
                #1 in Canada
              </div>
            </div>

            {/* Professional Description */}
            <div className="max-w-4xl mx-auto">
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
                Trusted by{" "}
                <span className="text-primary font-semibold">
                  leading companies
                </span>{" "}
                across Canada, we deliver comprehensive business solutions
                spanning staffing services, warehouse logistics, and
                transportation to drive your success.
              </p>
            </div>

            {/* Service Categories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
              <div className="text-center space-y-3 sm:space-y-4 px-4 sm:px-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Expert Staffing
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Professional recruitment and staffing solutions
                </p>
              </div>

              <div className="text-center space-y-3 sm:space-y-4 px-4 sm:px-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Warehouse Services
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Complete logistics and warehouse management
                </p>
              </div>

              <div className="text-center space-y-3 sm:space-y-4 px-4 sm:px-0 sm:col-span-2 md:col-span-1">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Truck className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  Transportation
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Reliable transportation and delivery solutions
                </p>
              </div>
            </div>

            {/* Professional Call-to-Action */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                data-testid="button-contact-us"
              >
                Get Started Today
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 bg-white/5 backdrop-blur-sm"
                data-testid="button-learn-more"
              >
                Explore Solutions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
