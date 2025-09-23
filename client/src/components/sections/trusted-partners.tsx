import Carousel3D from "@/components/effects/carousel-3d";
import ryderLogo from "@assets/1_1758574249966.png";
import timHortonsLogo from "@assets/2_1758574249964.png";
import redGeometricLogo from "@assets/3_1758574249963.png";
import vitranLogo from "@assets/4_1758574249969.png";
import tforceLogo from "@assets/5_1758574249967.png";

const trustedPartners = [
  { name: "Ryder", logo: ryderLogo },
  { name: "Tim Hortons", logo: timHortonsLogo },
  { name: "Company Partner", logo: redGeometricLogo },
  { name: "Vitran", logo: vitranLogo },
  { name: "TForce Freight", logo: tforceLogo }
];

export default function TrustedPartners() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-muted/30 via-background to-muted/30 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Industry Leaders</div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-3d">
            Trusted Partners
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Building strategic partnerships with Canada's most respected transportation and logistics companies to deliver exceptional results across every sector
          </p>
        </div>

        {/* Partner Logos Carousel */}
        <div className="relative">
          <div className="h-56" data-testid="trusted-partners-carousel">
            <Carousel3D autoPlay={true} interval={2500}>
              {trustedPartners.map((partner) => (
                <div 
                  key={partner.name} 
                  className="w-full max-w-sm mx-auto"
                  data-testid={`partner-logo-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-lg card-hover image-3d flex items-center justify-center h-40 border border-white/20 professional-shadow">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="max-w-full max-h-full object-contain filter hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </Carousel3D>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">9+</div>
            <div className="text-base text-muted-foreground font-medium">Years of Partnership</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">50M+</div>
            <div className="text-base text-muted-foreground font-medium">Successful Deliveries</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">99.8%</div>
            <div className="text-base text-muted-foreground font-medium">On-Time Performance</div>
          </div>
        </div>
      </div>
    </section>
  );
}