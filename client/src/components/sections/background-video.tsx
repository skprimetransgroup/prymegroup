import { useEffect, useRef, useState } from "react";

interface BackgroundVideoProps {
  sources: {
    desktop: string;
    mobile: string;
    webm?: string;
  };
  poster: string;
  className?: string;
  children?: React.ReactNode;
}

export default function BackgroundVideo({ 
  sources, 
  poster, 
  className = "",
  children 
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isIntersectingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [dataSaver, setDataSaver] = useState(false);

  // Derive shouldShowVideo from current state instead of storing it
  const shouldShowVideo = !prefersReducedMotion && !dataSaver;
  const selectedSource = isMobile ? sources.mobile : sources.desktop;

  // Device and accessibility detection with proper listeners
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    const checkDataSaver = () => {
      // @ts-ignore - NetworkInformation is not fully supported in TS
      setDataSaver(navigator.connection?.saveData || false);
    };

    // Initial checks
    checkMobile();
    setPrefersReducedMotion(motionQuery.matches);
    checkDataSaver();
    
    // Event listeners
    window.addEventListener('resize', checkMobile);
    motionQuery.addEventListener('change', handleMotionChange);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Intersection Observer for play/pause control
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    
    if (!video || !container || !shouldShowVideo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersectingRef.current = entry.isIntersecting;
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            video.play().catch(() => {
              // Autoplay failed, probably due to browser policy
              console.log("Video autoplay prevented by browser");
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(container);

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isIntersectingRef.current) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [shouldShowVideo]);

  // Remove the imperative source handling - we'll use declarative sources only

  if (!shouldShowVideo) {
    // Fallback to static image for reduced motion or data saver
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={poster}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            data-testid="background-video-poster"
          />
        </div>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="absolute inset-0 w-full h-full">
        <video
          key={selectedSource}
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
          loop
          preload="metadata"
          poster={poster}
          aria-hidden="true"
          role="presentation"
          style={{ pointerEvents: 'none' }}
          data-testid="background-video"
        >
          {sources.webm && (
            <source src={sources.webm} type="video/webm" />
          )}
          <source src={selectedSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      {children}
    </div>
  );
}