import { useState, useEffect, useRef } from "react";

interface Carousel3DProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
}

export default function Carousel3D({ children, autoPlay = true, interval = 4000 }: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % children.length);
    }, interval);

    return () => clearInterval(timer);
  }, [children.length, interval, isPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % children.length);
  };


  return (
    <div className="carousel-3d relative w-full h-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex h-full transition-transform duration-1000 ease-in-out will-change-transform"
        style={{ transform: `translate3d(${-currentIndex * 100}%, 0, 0)` }}
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
  );
}