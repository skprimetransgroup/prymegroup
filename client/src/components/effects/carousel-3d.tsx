import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Carousel3DProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
}

export default function Carousel3D({ children, autoPlay = true, interval = 4000 }: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % children.length);
    }, interval);

    return () => clearInterval(timer);
  }, [children.length, interval, isPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + children.length) % children.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % children.length);
  };

  const getSlideClass = (index: number) => {
    if (index === currentIndex) return "carousel-slide active";
    if (index === (currentIndex - 1 + children.length) % children.length) return "carousel-slide prev";
    if (index === (currentIndex + 1) % children.length) return "carousel-slide next";
    return "carousel-slide";
  };

  return (
    <div 
      className="carousel-3d relative w-full h-full"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(autoPlay)}
    >
      <div className="relative overflow-hidden h-full">
        {children.map((child, index) => (
          <div
            key={index}
            className={`${getSlideClass(index)} absolute inset-0 flex items-center justify-center`}
            style={{
              zIndex: index === currentIndex ? 10 : 5,
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 button-3d bg-background/80 backdrop-blur-sm"
        onClick={goToPrevious}
        data-testid="carousel-prev"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 button-3d bg-background/80 backdrop-blur-sm"
        onClick={goToNext}
        data-testid="carousel-next"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {children.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-primary scale-125 pulse-glow" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => goToSlide(index)}
            data-testid={`carousel-dot-${index}`}
          />
        ))}
      </div>
    </div>
  );
}