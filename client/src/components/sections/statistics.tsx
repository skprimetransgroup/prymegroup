import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";

interface StatItem {
  value: number;
  label: string;
  description: string;
}

export default function Statistics() {
  const { data: stats } = useQuery<{ jobs: number; employers: number; hired: number }>({
    queryKey: ["/api/stats"],
  });

  const [animatedStats, setAnimatedStats] = useState<StatItem[]>([
    { value: 0, label: "Jobs", description: "Active opportunities" },
    { value: 0, label: "Employers", description: "Trusted partners" },
    { value: 0, label: "Hired", description: "Successful placements" },
  ]);
  
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const easeOutQuart = (t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  };

  const animateCounters = (finalStats: StatItem[]) => {
    const duration = 2500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      setAnimatedStats(prev => 
        finalStats.map((stat, index) => ({
          ...stat,
          value: Math.floor(stat.value * easedProgress)
        }))
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  useEffect(() => {
    if (!stats || hasAnimated) return;

    const finalStats: StatItem[] = [
      { value: stats.jobs, label: "Jobs", description: "Active opportunities" },
      { value: stats.employers, label: "Employers", description: "Trusted partners" },
      { value: stats.hired, label: "Hired", description: "Successful placements" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Small delay before starting animation
            setTimeout(() => {
              animateCounters(finalStats);
            }, 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [stats, hasAnimated]);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-8 text-center">
          {animatedStats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="space-y-2 text-center transform transition-all duration-700 hover:scale-105"
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              <div 
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary transition-all duration-300 hover:text-primary/80"
                data-testid={`stat-value-${stat.label.toLowerCase()}`}
              >
                {stat.value.toLocaleString()}+
              </div>
              <div 
                className="text-base sm:text-lg font-medium text-foreground"
                data-testid={`stat-label-${stat.label.toLowerCase()}`}
              >
                {stat.label}
              </div>
              <div 
                className="text-sm text-muted-foreground px-2 sm:px-0"
                data-testid={`stat-description-${stat.label.toLowerCase()}`}
              >
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
