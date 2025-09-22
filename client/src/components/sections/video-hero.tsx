import { Button } from "@/components/ui/button";
import { Users, Truck, Building2, Handshake, Star, Award, TrendingUp } from "lucide-react";
import { useState } from "react";

// Use public/ so the URL is stable in prod
const officeVideo = "/Office-latest.mp4";

export default function VideoHero() {
  const [showFallback, setShowFallback] = useState(false);
  return (
    <section className="relative overflow-hidden">
      {/* Video on Top - Mobile Optimized */}
      <div className="relative w-full bg-gray-900 min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] flex items-center justify-center">
        {/* Video element - always rendered */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          controls={false}
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noplaybackrate"
          aria-hidden="true"
          tabIndex={-1}
          className="w-full h-full object-cover"
          style={{ minHeight: '40vh' }}
          data-testid="hero-video"
          onError={(e) => {
            console.log('Video failed to load:', e);
            console.log('Video source:', officeVideo);
            setShowFallback(true);
          }}
          onLoadStart={() => {
            console.log('Video loading started from:', officeVideo);
          }}
          onCanPlay={() => {
            console.log('Video can play:', officeVideo);
          }}
          onLoadedData={() => {
            console.log('Video loaded data:', officeVideo);
          }}
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
              <p className="text-gray-300">Canada's Leading Business Solutions</p>
            </div>
          </div>
        )}
      </div>

      {/* Professional Content Section */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 lg:py-24 overflow-hidden">
        {/* Subtle Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-6xl mx-auto space-y-12">
            
            {/* Professional Headline */}
            <div className="space-y-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-white text-3d">
                Canada's <span className="text-primary font-black">Leading</span>
                <br />
                <span className="relative">
                  Business Solutions
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-primary to-secondary mt-2"></div>
                </span>
              </h1>
              
              <div className="inline-flex items-center bg-primary/10 backdrop-blur-sm text-primary text-sm font-semibold px-4 py-2 rounded-full border border-primary/20">
                <Star className="w-4 h-4 mr-2" />
                #1 in Canada
              </div>
            </div>

            {/* Professional Description */}
            <div className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed">
                Trusted by <span className="text-primary font-semibold">leading companies</span> across Canada, 
                we deliver comprehensive business solutions spanning staffing services, 
                warehouse logistics, and transportation to drive your success.
              </p>
            </div>

            {/* Service Categories */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Expert Staffing</h3>
                <p className="text-gray-300">Professional recruitment and staffing solutions</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Warehouse Services</h3>
                <p className="text-gray-300">Complete logistics and warehouse management</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Transportation</h3>
                <p className="text-gray-300">Reliable transportation and delivery solutions</p>
              </div>
            </div>

            {/* Professional Call-to-Action */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                data-testid="button-contact-us"
              >
                Get Started Today
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 bg-white/5 backdrop-blur-sm"
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