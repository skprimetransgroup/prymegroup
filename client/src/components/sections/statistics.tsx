import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (stats) {
      const finalStats: StatItem[] = [
        { value: stats.jobs, label: "Jobs", description: "Active opportunities" },
        { value: stats.employers, label: "Employers", description: "Trusted partners" },
        { value: stats.hired, label: "Hired", description: "Successful placements" },
      ];

      // Animate counters
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      finalStats.forEach((stat, index) => {
        let currentValue = 0;
        const increment = stat.value / steps;

        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= stat.value) {
            currentValue = stat.value;
            clearInterval(timer);
          }

          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[index] = { ...stat, value: Math.floor(currentValue) };
            return newStats;
          });
        }, stepTime);
      });
    }
  }, [stats]);

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {animatedStats.map((stat, index) => (
            <div key={stat.label} className="space-y-2 animate-counter stat-3d">
              <div 
                className="text-4xl lg:text-5xl font-bold text-primary text-3d"
                data-testid={`stat-value-${stat.label.toLowerCase()}`}
              >
                {stat.value.toLocaleString()}+
              </div>
              <div 
                className="text-lg font-medium text-foreground"
                data-testid={`stat-label-${stat.label.toLowerCase()}`}
              >
                {stat.label}
              </div>
              <div 
                className="text-sm text-muted-foreground"
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
