import { ReactNode } from "react";

interface MovingCarouselProps {
  children: ReactNode[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
}

export default function MovingCarousel({ 
  children, 
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className = ""
}: MovingCarouselProps) {
  const speedConfig = {
    slow: "animate-scroll-50s",
    normal: "animate-scroll-30s", 
    fast: "animate-scroll-15s"
  };

  const animationClass = speedConfig[speed];
  const directionClass = direction === "left" ? "" : "animate-reverse";
  const pauseClass = pauseOnHover ? "group-hover:animate-pause" : "";

  return (
    <div className={`group relative overflow-hidden ${className}`}>
      {/* Moving content */}
      <div className={`flex ${animationClass} ${directionClass} ${pauseClass}`}>
        {/* First set of items */}
        <div className="flex shrink-0 items-center justify-around gap-8 pr-8">
          {children.map((child, index) => (
            <div key={`first-${index}`} className="flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="flex shrink-0 items-center justify-around gap-8 pr-8">
          {children.map((child, index) => (
            <div key={`second-${index}`} className="flex-shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>
      
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}