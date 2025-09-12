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
    <div className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 z-40 space-y-3">
      {buttons.map((button) => {
        const Icon = button.icon;
        return (
          <Button
            asChild
            size="lg"
            className="group bg-[#0b0d1e] hover:bg-[#edc247] text-white hover:text-[#0b0d1e] shadow-xl border-2 border-[#edc247] hover:border-[#0b0d1e] transition-all duration-300 transform hover:scale-105 w-12 h-12 md:w-14 md:h-14 rounded-full relative"
          >
            <Link 
              key={button.path} 
              href={button.path}
              data-testid={`floating-button-${button.label.toLowerCase()}`}
              aria-label={`${button.label} - ${button.description}`}
              className="flex items-center justify-center"
            >
              <Icon className="h-5 w-5 md:h-6 md:w-6" />
              <div className="absolute right-14 md:right-16 bg-[#0b0d1e] text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg hidden md:block">
                <div className="font-semibold">{button.label}</div>
                <div className="text-xs text-[#edc247]">{button.description}</div>
                <div className="absolute right-[-6px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[6px] border-transparent border-l-[#0b0d1e]"></div>
              </div>
            </Link>
          </Button>
        );
      })}
    </div>
  );
}