import { useState, useEffect } from "react";
import { Clock, Activity, TrendingUp, Users } from "lucide-react";

export default function WorkingObjects() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeUsers, setActiveUsers] = useState(247);
  const [jobsToday, setJobsToday] = useState(18);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Real-time clock
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate active users counter
    const usersInterval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);

    // Simulate jobs counter
    const jobsInterval = setInterval(() => {
      setJobsToday(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);

    // Track mouse position for interactive elements
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(timeInterval);
      clearInterval(usersInterval);
      clearInterval(jobsInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-30 space-y-4 pointer-events-none">
      {/* Real-time Clock */}
      <div className="bg-card/80 backdrop-blur-md border border-border rounded-lg p-3 card-hover working-clock pulse-glow">
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="w-4 h-4 text-primary clock-hand" />
          <span className="font-mono">
            {currentTime.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Live Activity Counter */}
      <div className="bg-card/80 backdrop-blur-md border border-border rounded-lg p-3 card-hover pulse-glow">
        <div className="flex items-center space-x-2 text-sm">
          <Activity className="w-4 h-4 text-green-500" />
          <span>Active Users: <span className="font-bold text-green-500">{activeUsers}</span></span>
        </div>
      </div>

      {/* Jobs Today Counter */}
      <div className="bg-card/80 backdrop-blur-md border border-border rounded-lg p-3 card-hover pulse-glow">
        <div className="flex items-center space-x-2 text-sm">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          <span>Jobs Today: <span className="font-bold text-blue-500">{jobsToday}</span></span>
        </div>
      </div>

      {/* Interactive Mouse Follower */}
      <div 
        className="fixed w-6 h-6 bg-primary/20 rounded-full pointer-events-none transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'translate3d(0,0,0)',
        }}
      />
      
      {/* Secondary Mouse Trail */}
      <div 
        className="fixed w-3 h-3 bg-primary/10 rounded-full pointer-events-none transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          transform: 'translate3d(0,0,0)',
        }}
      />
    </div>
  );
}