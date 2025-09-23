import MovingCarousel from "@/components/ui/moving-carousel";
import { 
  Truck,
  Users, 
  Building2,
  Shield,
  Clock,
  Award,
  Target,
  Briefcase,
  Settings,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

const techIcons = [
  { icon: Users, label: "Expert Staff" },
  { icon: Truck, label: "Transportation" },
  { icon: Building2, label: "Warehouse" },
  { icon: Shield, label: "Secure" },
  { icon: Clock, label: "24/7 Service" },
  { icon: Award, label: "Certified" },
  { icon: Target, label: "Precise" },
  { icon: Briefcase, label: "Professional" },
  { icon: Settings, label: "Optimized" },
  { icon: MapPin, label: "Canada-Wide" },
  { icon: Phone, label: "Support" },
  { icon: Mail, label: "Communication" }
];

export default function TechCarousel() {
  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Our Services & Capabilities
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Comprehensive business solutions across Canada
          </p>
        </div>
        
        <MovingCarousel 
          speed="normal" 
          pauseOnHover={true}
          className="py-8"
        >
          {techIcons.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[140px] border border-gray-200 dark:border-gray-700"
                data-testid={`carousel-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-12 h-12 mb-3 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                  {item.label}
                </span>
              </div>
            );
          })}
        </MovingCarousel>
      </div>
    </section>
  );
}