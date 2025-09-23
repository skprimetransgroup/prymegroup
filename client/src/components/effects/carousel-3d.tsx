import { useState, useEffect, useRef } from "react";

interface Carousel3DProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
}

export default function Carousel3D({ children, autoPlay = true, interval = 4000 }: Carousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 to account for cloned first slide
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Create slides with clones for seamless looping
  const slides = [
    children[children.length - 1], // Clone of last slide
    ...children, // Original slides
    children[0] // Clone of first slide
  ];

  useEffect(() => {
    if (!isPlaying || isTransitioning) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, isTransitioning, children.length, interval]);

  useEffect(() => {
    if (!trackRef.current) return;
    
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      
      // Handle seamless looping
      if (currentIndex >= slides.length - 1) {
        // We're at the cloned first slide, jump to real first slide
        setCurrentIndex(1);
        trackRef.current!.style.transition = 'none';
        trackRef.current!.style.transform = `translate3d(-100%, 0, 0)`;
        // Force reflow
        trackRef.current!.offsetHeight;
        trackRef.current!.style.transition = 'transform 1000ms ease-in-out';
      } else if (currentIndex <= 0) {
        // We're at the cloned last slide, jump to real last slide
        setCurrentIndex(children.length);
        trackRef.current!.style.transition = 'none';
        trackRef.current!.style.transform = `translate3d(-${children.length * 100}%, 0, 0)`;
        // Force reflow
        trackRef.current!.offsetHeight;
        trackRef.current!.style.transition = 'transform 1000ms ease-in-out';
      }
    };

    const track = trackRef.current;
    track.addEventListener('transitionend', handleTransitionEnd);
    return () => track.removeEventListener('transitionend', handleTransitionEnd);
  }, [currentIndex, slides.length, children.length]);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };


  return (
    <div className="carousel-3d relative w-full h-full overflow-hidden">
      <div
        ref={trackRef}
        className="flex h-full transition-transform duration-1000 ease-in-out will-change-transform"
        style={{ transform: `translate3d(${-currentIndex * 100}%, 0, 0)` }}
      >
        {slides.map((child, index) => (
          <div key={`slide-${index}`} className="flex-none w-full h-full">
            <div className="w-full h-full flex items-center justify-center">
              {child}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}