import { useState, useEffect, useRef } from "react";
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
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const dragOffset = useRef(0);

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

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setIsPlaying(false);
    startX.current = e.clientX;
    currentX.current = e.clientX;
    dragOffset.current = 0;
    
    // Capture pointer for better drag handling
    e.currentTarget.setPointerCapture(e.pointerId);
    
    if (trackRef.current) {
      trackRef.current.style.cursor = 'grabbing';
      trackRef.current.style.transition = 'none';
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current || !containerRef.current) return;
    
    e.preventDefault();
    currentX.current = e.clientX;
    dragOffset.current = currentX.current - startX.current;
    
    // Use container width (viewport), not track width
    const containerWidth = containerRef.current.offsetWidth;
    const dragPercentage = (dragOffset.current / containerWidth) * 100;
    const translateX = -currentIndex * 100 + dragPercentage;
    
    trackRef.current.style.transform = `translate3d(${translateX}%, 0, 0)`;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current || !containerRef.current) return;
    
    setIsDragging(false);
    const containerWidth = containerRef.current.offsetWidth;
    const threshold = containerWidth * 0.2; // 20% of container width
    
    // Release pointer capture
    e.currentTarget.releasePointerCapture(e.pointerId);
    
    trackRef.current.style.cursor = 'grab';
    trackRef.current.style.transition = 'transform 0.5s ease-out';
    
    if (Math.abs(dragOffset.current) > threshold) {
      if (dragOffset.current > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    } else {
      // Snap back to current position
      trackRef.current.style.transform = `translate3d(${-currentIndex * 100}%, 0, 0)`;
    }
    
    dragOffset.current = 0;
    
    setTimeout(() => {
      if (autoPlay) setIsPlaying(true);
    }, 100);
  };

  useEffect(() => {
    if (trackRef.current && !isDragging) {
      trackRef.current.style.transform = `translate3d(${-currentIndex * 100}%, 0, 0)`;
    }
  }, [currentIndex, isDragging]);

  return (
    <div 
      className="carousel-3d relative w-full h-full"
      onMouseEnter={() => !isDragging && setIsPlaying(false)}
      onMouseLeave={() => !isDragging && setIsPlaying(autoPlay)}
    >
      <div ref={containerRef} className="relative w-full h-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full transition-transform duration-500 ease-out will-change-transform touch-pan-y cursor-grab select-none"
          style={{ transform: `translate3d(${-currentIndex * 100}%, 0, 0)` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {children.map((child, index) => (
            <div key={index} className="flex-none w-full h-full">
              <div className="w-full h-full flex items-center justify-center">
                {child}
              </div>
            </div>
          ))}
        </div>
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