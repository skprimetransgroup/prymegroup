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
            className={`${getSlideClass(index)} absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out`}
            style={{
              zIndex: index === currentIndex ? 10 : 5,
              opacity: index === currentIndex ? 1 : 0,
              transform: index === currentIndex ? 'scale(1)' : 'scale(0.95)',
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              {child}
            </div>
          </div>
        ))}
      </div>

      {/* Professional Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/95 backdrop-blur-md border-2 border-primary/20 shadow-lg hover:shadow-xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
        onClick={goToPrevious}
        data-testid="carousel-prev"
      >
        <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-white/95 backdrop-blur-md border-2 border-primary/20 shadow-lg hover:shadow-xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
        onClick={goToNext}
        data-testid="carousel-next"
      >
        <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
      </Button>

      {/* Professional Pagination Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-20">
        <div className="bg-black/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
          <div className="flex space-x-2">
            {children.map((_, index) => (
              <button
                key={index}
                className={`relative transition-all duration-500 rounded-full ${
                  index === currentIndex 
                    ? "w-8 h-3 bg-primary shadow-lg" 
                    : "w-3 h-3 bg-white/60 hover:bg-white/80 hover:scale-110"
                }`}
                onClick={() => goToSlide(index)}
                data-testid={`carousel-dot-${index}`}
              >
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-primary rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}