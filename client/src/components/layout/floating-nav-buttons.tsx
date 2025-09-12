import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Briefcase, Warehouse, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingNavButtons() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show buttons when user scrolls down more than 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const buttons = [
    {
      label: "Staffing",
      path: "/jobs",
      icon: Briefcase,
      description: "Find Jobs"
    },
    {
      label: "Warehouse",
      path: "/warehouse", 
      icon: Warehouse,
      description: "Storage Solutions"
    },
    {
      label: "Transportation",
      path: "/transportation",
      icon: Truck,
      description: "Freight Services"
    }
  ];

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 flex gap-4 md:gap-6">
      {buttons.map((button) => {
        const Icon = button.icon;
        return (
          <Button
            key={button.path}
            asChild
            size="lg"
            className="group bg-[#0b0d1e] hover:bg-[#edc247] text-white hover:text-[#0b0d1e] shadow-xl border-2 border-[#edc247] hover:border-[#0b0d1e] transition-all duration-300 transform hover:scale-105 rounded-lg px-4 py-3 md:px-6 md:py-4"
          >
            <Link 
              href={button.path}
              data-testid={`floating-button-${button.label.toLowerCase()}`}
              aria-label={`${button.label} - ${button.description}`}
              className="flex items-center gap-2 md:gap-3"
            >
              <Icon className="h-5 w-5 md:h-6 md:w-6" />
              <span className="font-semibold text-sm md:text-base">{button.label}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}