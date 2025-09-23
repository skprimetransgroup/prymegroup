import { useEffect, useRef } from "react";

interface Carousel3DProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  speed?: number;
}

export default function Carousel3D({ children, autoPlay = true, speed = 50 }: Carousel3DProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoPlay || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    let animationId: number;
    
    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
      animationId = requestAnimationFrame(scroll);
    };
    
    const startScrolling = () => {
      animationId = requestAnimationFrame(scroll);
    };
    
    // Start after a brief delay
    const timer = setTimeout(startScrolling, 100);
    
    return () => {
      clearTimeout(timer);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [autoPlay]);

  return (
    <div className="carousel-3d relative w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 pointer-events-none" />
      <div
        ref={scrollRef}
        className="flex h-full overflow-hidden whitespace-nowrap"
        style={{
          scrollBehavior: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="flex h-full animate-marquee">
          {/* First set of logos */}
          {children.map((child, index) => (
            <div key={`first-${index}`} className="flex-shrink-0 h-full px-8 flex items-center justify-center">
              <div className="h-16 w-auto flex items-center justify-center">
                {child}
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {children.map((child, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 h-full px-8 flex items-center justify-center">
              <div className="h-16 w-auto flex items-center justify-center">
                {child}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}