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
    <section className="py-16 lg:py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Trusted Partners
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Working with Canada's leading transportation and logistics companies to deliver exceptional results
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {trustedPartners.map((partner) => (
            <div 
              key={partner.name} 
              className="bg-white rounded-xl p-6 shadow-sm card-hover image-3d flex items-center justify-center h-24 w-full max-w-[160px] border border-gray-100"
              data-testid={`partner-logo-${partner.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <img 
                src={partner.logo} 
                alt={`${partner.name} logo`}
                className="max-w-full max-h-full object-contain filter hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}