import React from "react";
import { Link } from "wouter";
import { Briefcase, Warehouse, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingNavButtons() {

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
    <div className="absolute top-4/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex justify-center gap-4 max-w-[90vw] animate-fade-in-up">
      {buttons.map((button, index) => {
        const Icon = button.icon;
        const delayClass = index === 0 ? '' : index === 1 ? 'animation-delay-500' : 'animation-delay-700';
        return (
          <Button
            key={button.path}
            asChild
            size="lg"
            className={`group bg-[#0b0d1e] hover:bg-[#edc247] text-white hover:text-[#0b0d1e] shadow-xl border-2 border-[#edc247] hover:border-[#0b0d1e] transition-all duration-300 transform hover:scale-105 rounded-lg px-4 py-3 animate-slide-in-up ${delayClass}`}
          >
            <Link 
              href={button.path}
              data-testid={`floating-button-${button.label.toLowerCase()}`}
              aria-label={`${button.label} - ${button.description}`}
              className="flex items-center gap-2"
            >
              <Icon className="h-5 w-5" />
              <span className="font-semibold text-sm">{button.label}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}