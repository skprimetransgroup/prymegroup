import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

interface CinematicBusiness3DProps {
  className?: string;
}

interface StatsData {
  jobs: number;
  employers: number;
  hired: number;
}

const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const startValueRef = useRef(value);
  const frameRef = useRef<number>();
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (value === startValueRef.current) return;
    
    // Instant update if reduced motion is preferred
    if (reducedMotion) {
      setDisplayValue(value);
      startValueRef.current = value;
      return;
    }
    
    setIsAnimating(true);
    const startValue = startValueRef.current;
    const startTime = Date.now();
    const difference = value - startValue;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (difference * easeOutQuart));
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        startValueRef.current = value;
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration, reducedMotion]);
  
  return (
    <span 
      className={`transition-all duration-300 ${
        isAnimating ? 'text-[#edc247] scale-110' : ''
      }`}
    >
      {displayValue.toLocaleString()}
    </span>
  );
};

export default function CinematicBusiness3D({ className = "" }: CinematicBusiness3DProps) {
  const [currentAct, setCurrentAct] = useState(0); // 0: Staffing, 1: Warehouse, 2: Transport
  const [animationPhase, setAnimationPhase] = useState(0);
  const [particlesBurst, setParticlesBurst] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false);

  // Live data integration with error handling
  const { data: stats, isLoading: statsLoading, error: statsError } = useQuery<StatsData>({
    queryKey: ['/api/stats'],
    refetchInterval: 30000, // Refresh every 30 seconds
    retry: 3,
    staleTime: 20000,
  });
  
  // Fallback stats for when API fails
  const fallbackStats = { jobs: 740, employers: 376, hired: 1485 };
  const displayStats = stats || fallbackStats;
  
  // Performance and accessibility detection
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    // Basic performance detection
    const checkPerformance = () => {
      const connection = (navigator as any).connection;
      const isSlowConnection = connection && connection.effectiveType && 
        ['slow-2g', '2g'].includes(connection.effectiveType);
      const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
      
      setPerformanceMode(isSlowConnection || isLowEndDevice);
    };
    
    checkPerformance();
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    const actInterval = setInterval(() => {
      setCurrentAct(prev => (prev + 1) % 3); // 3 acts: Staffing → Warehouse → Transport
      setAnimationPhase(0); // Reset phase for new act
      setParticlesBurst(true);
      setTimeout(() => setParticlesBurst(false), 2000);
    }, 8000); // 8 seconds per act

    const phaseInterval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000); // 2 seconds per phase

    return () => {
      clearInterval(actInterval);
      clearInterval(phaseInterval);
    };
  }, []);

  const getActTitle = () => {
    switch(currentAct) {
      case 0: return { title: "Expert Staffing", subtitle: "Connecting Talent", icon: "👥" };
      case 1: return { title: "Warehouse Solutions", subtitle: "Logistics Excellence", icon: "📦" };
      case 2: return { title: "Transportation", subtitle: "Delivery Network", icon: "🚛" };
      default: return { title: "Business Solutions", subtitle: "Prime Trans Group", icon: "💼" };
    }
  };

  const currentScene = getActTitle();

  return (
    <div className={`relative w-full h-96 bg-gradient-to-br from-[#0b0d1e] via-gray-900 to-black rounded-2xl overflow-hidden border-2 border-[#edc247]/20 shadow-2xl ${className}`}>
      
      {/* Cinematic Stage Environment */}
      <div 
        className="absolute inset-0 transition-all duration-2000 ease-in-out"
        style={{
          transform: `perspective(1200px) rotateY(${currentAct * 15 - 15}deg) rotateX(${5 - currentAct * 2}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        
        {/* Dynamic Background Cityscape */}
        <div className="absolute bottom-0 w-full h-full">
          {/* City Skyline with Branded Colors */}
          <div className="absolute bottom-0 w-full h-80">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`absolute bottom-0 transition-all duration-2000 ${
                  currentAct === 0 ? 'bg-gradient-to-t from-blue-800 via-blue-600 to-blue-400' :
                  currentAct === 1 ? 'bg-gradient-to-t from-green-800 via-green-600 to-green-400' :
                  'bg-gradient-to-t from-orange-800 via-orange-600 to-orange-400'
                }`}
                style={{
                  left: `${i * 8}%`,
                  width: `${4 + (i % 3) * 2}%`,
                  height: `${40 + (i % 4) * 20}%`,
                  transform: `translateZ(${-50 + i * 10}px)`,
                  clipPath: 'polygon(0 100%, 0 0, 70% 0, 100% 15%, 100% 100%)'
                }}
              >
                {/* Dynamic Windows */}
                {[...Array(Math.floor((40 + (i % 4) * 20) / 12))].map((_, j) => (
                  <div
                    key={j}
                    className={`absolute w-2 h-2 transition-all duration-1000 ${
                      animationPhase === j % 4 ? 'bg-[#edc247] shadow-lg shadow-[#edc247]/50' :
                      'bg-blue-200/40'
                    }`}
                    style={{
                      left: `${20 + (j % 3) * 25}%`,
                      bottom: `${15 + j * 12}%`,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Ground Grid with Neon Effects */}
          <div className="absolute bottom-0 w-full h-32 opacity-60">
            <div 
              className="w-full h-full bg-gradient-to-t from-[#edc247]/20 to-transparent"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, rgba(237, 194, 71, 0.3) 1px, transparent 1px),
                  linear-gradient(rgba(237, 194, 71, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                transform: 'perspective(400px) rotateX(75deg)',
                transformOrigin: 'bottom'
              }}
            />
          </div>
        </div>

        {/* Act-Specific 3D Scene Elements */}
        <div className="absolute inset-0">
          {/* ACT 1: STAFFING - Network Connections */}
          {currentAct === 0 && (
            <div className="relative w-full h-full">
              {/* Recruitment Network Nodes */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-12 h-12 rounded-full transition-all duration-2000 ${
                      animationPhase === i % 4 
                        ? 'bg-gradient-to-br from-[#edc247] to-yellow-600 scale-125 shadow-2xl shadow-[#edc247]/50' 
                        : 'bg-gradient-to-br from-blue-500 to-blue-700 scale-100'
                    }`}
                    style={{
                      left: `${20 + (i % 4) * 20}%`,
                      top: `${20 + Math.floor(i / 4) * 30}%`,
                      transform: `translateZ(${50 + i * 20}px)`,
                    }}
                  >
                    {/* Profile Icons */}
                    <div className="absolute inset-2 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {i % 2 === 0 ? '👤' : '🏢'}
                      </span>
                    </div>
                    
                    {/* Connection Lines */}
                    {animationPhase === i % 4 && (
                      <div className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-[#edc247] origin-left animate-pulse"
                           style={{ transform: 'translateY(-50%) rotate(45deg)' }} />
                    )}
                  </div>
                ))}

                {/* Success Match Animation */}
                {animationPhase === 3 && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center text-white font-bold shadow-2xl animate-bounce">
                      MATCH! 🎉
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ACT 2: WAREHOUSE - Logistics Grid */}
          {currentAct === 1 && (
            <div className="relative w-full h-full">
              {/* Warehouse Shelving */}
              <div className="absolute bottom-8 left-8 right-8 h-40">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-gradient-to-t from-gray-700 to-gray-500 rounded-t"
                    style={{
                      left: `${i * 15}%`,
                      width: '12%',
                      height: `${60 + (i % 3) * 20}%`,
                      transform: `perspective(600px) rotateY(${-20 + i * 5}deg) translateZ(${i * 10}px)`,
                    }}
                  >
                    {/* Animated Packages */}
                    {[...Array(3)].map((_, j) => (
                      <div
                        key={j}
                        className={`absolute w-8 h-6 rounded transition-all duration-1000 ${
                          animationPhase === (i + j) % 4 
                            ? 'bg-gradient-to-br from-[#edc247] to-yellow-600 shadow-lg shadow-[#edc247]/50' 
                            : 'bg-gradient-to-br from-orange-400 to-orange-600'
                        }`}
                        style={{
                          left: '10%',
                          bottom: `${20 + j * 25}%`,
                          transform: animationPhase === (i + j) % 4 ? 'translateY(-5px) scale(1.1)' : 'translateY(0) scale(1)',
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Forklift Animation */}
              <div 
                className="absolute bottom-12 transition-all duration-4000 ease-in-out"
                style={{
                  left: `${20 + animationPhase * 15}%`,
                  transform: `translateZ(80px) scale(${1 + animationPhase * 0.1})`
                }}
              >
                <div className="w-16 h-12 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-lg relative">
                  <div className="absolute -top-4 left-2 w-2 h-8 bg-gray-600 rounded"></div>
                  <div className="absolute -top-6 left-1 w-4 h-2 bg-gray-700 rounded"></div>
                  <div className="absolute -bottom-2 left-1 w-3 h-3 bg-black rounded-full"></div>
                  <div className="absolute -bottom-2 right-1 w-3 h-3 bg-black rounded-full"></div>
                </div>
              </div>
            </div>
          )}

          {/* ACT 3: TRANSPORTATION - Route Network */}
          {currentAct === 2 && (
            <div className="relative w-full h-full">
              {/* Route Map */}
              <div className="absolute inset-8">
                <svg className="w-full h-full opacity-80">
                  {/* Route Lines */}
                  <path
                    d="M 50,250 Q 150,150 250,200 T 450,180"
                    stroke="#edc247"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="10,5"
                    className="animate-pulse"
                  />
                  <path
                    d="M 100,300 Q 200,200 300,250 T 500,230"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8,4"
                    className="animate-pulse"
                    style={{ animationDelay: '1s' }}
                  />
                  
                  {/* Destination Points */}
                  {[...Array(5)].map((_, i) => (
                    <circle
                      key={i}
                      cx={100 + i * 80}
                      cy={200 + (i % 2) * 60}
                      r={animationPhase === i ? "12" : "6"}
                      fill={animationPhase === i ? "#edc247" : "#3b82f6"}
                      className="transition-all duration-1000"
                    />
                  ))}
                </svg>
              </div>

              {/* Animated Truck */}
              <div 
                className="absolute bottom-20 transition-all duration-3000 ease-in-out"
                style={{
                  left: `${10 + animationPhase * 20}%`,
                  transform: `translateZ(60px) rotate(${animationPhase * 10}deg)`
                }}
              >
                <div className="w-20 h-12 relative">
                  {/* Truck Cab */}
                  <div className="absolute right-0 w-8 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-r-lg"></div>
                  {/* Trailer */}
                  <div className="absolute left-0 w-12 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-l-lg top-1"></div>
                  {/* Wheels */}
                  <div className="absolute -bottom-1 left-2 w-3 h-3 bg-black rounded-full"></div>
                  <div className="absolute -bottom-1 left-8 w-3 h-3 bg-black rounded-full"></div>
                  <div className="absolute -bottom-1 right-1 w-3 h-3 bg-black rounded-full"></div>
                  
                  {/* Motion Trail */}
                  <div className="absolute -left-8 top-1/2 w-8 h-0.5 bg-[#edc247] opacity-60 animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Success Particle Burst - Performance Gated */}
        {particlesBurst && !reducedMotion && !performanceMode && (
          <div className="absolute inset-0 pointer-events-none" data-testid="success-particles">
            {[...Array(performanceMode ? 6 : 12)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-[#edc247] rounded-full ${!reducedMotion && 'animate-ping'}`}
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  transform: `translateZ(${Math.random() * 100}px)`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cinematic HUD Overlay */}
      <div className="absolute inset-0">
        
        {/* Scene Title */}
        <div className="absolute top-6 left-6 text-white" data-testid="scene-title">
          <div className={`text-xs uppercase tracking-wider text-[#edc247] font-bold mb-1 ${!reducedMotion && 'animate-cinematic-counter-up'}`}>
            Act {currentAct + 1} / 3
          </div>
          <h3 
            className={`text-2xl font-bold mb-1 flex items-center gap-2 ${!reducedMotion && 'animate-cinematic-slide-in'}`} 
            data-testid="scene-heading"
            aria-live="polite"
          >
            <span className={`text-3xl ${!reducedMotion && !performanceMode && 'animate-bounce'}`}>{currentScene.icon}</span>
            {currentScene.title}
          </h3>
          <p className={`text-gray-300 text-sm ${!reducedMotion && 'animate-cinematic-counter-up'}`} style={{animationDelay: '0.5s'}}>{currentScene.subtitle}</p>
        </div>

        {/* Live Statistics Display with Animated Counters */}
        <div className="absolute top-6 right-6 grid grid-cols-1 gap-3">
          <div 
            className="bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-[#edc247]/30 hover:border-[#edc247]/60 transition-all duration-300"
            data-testid="stat-jobs"
          >
            <div className="text-2xl font-bold text-[#edc247]">
              <AnimatedCounter value={displayStats.jobs} />
            </div>
            <div className="text-xs text-gray-300 flex items-center gap-1">
              Active Jobs
              {statsLoading && <span className="animate-pulse text-[#edc247]">●</span>}
            </div>
          </div>
          <div 
            className="bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-[#edc247]/30 hover:border-green-400/60 transition-all duration-300"
            data-testid="stat-employers"
          >
            <div className="text-2xl font-bold text-green-400">
              <AnimatedCounter value={displayStats.employers} />
            </div>
            <div className="text-xs text-gray-300 flex items-center gap-1">
              Employers
              {statsLoading && <span className="animate-pulse text-green-400">●</span>}
            </div>
          </div>
          <div 
            className="bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-[#edc247]/30 hover:border-blue-400/60 transition-all duration-300"
            data-testid="stat-hired"
          >
            <div className="text-2xl font-bold text-blue-400">
              <AnimatedCounter value={displayStats.hired} />
            </div>
            <div className="text-xs text-gray-300 flex items-center gap-1">
              Placed
              {statsLoading && <span className="animate-pulse text-blue-400">●</span>}
            </div>
          </div>
          
          {statsError && (
            <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-2 border border-red-500/30">
              <div className="text-xs text-red-300">Using cached data</div>
            </div>
          )}
        </div>

        {/* Progress Indicator - Fully Interactive */}
        <div 
          className="absolute bottom-6 left-6 right-6 pointer-events-auto" 
          data-testid="progress-indicator"
        >
          <div className="flex justify-center gap-3 mb-4" role="tablist" aria-label="Business service acts">
            {[0, 1, 2].map((act) => {
              const actNames = ['Staffing', 'Warehouse', 'Transportation'];
              return (
                <button
                  key={act}
                  role="tab"
                  tabIndex={0}
                  aria-selected={act === currentAct}
                  aria-label={`View ${actNames[act]} services`}
                  className={`w-12 h-2 rounded-full transition-all duration-500 cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#edc247] focus:ring-opacity-50 ${
                    act === currentAct 
                      ? 'bg-[#edc247] shadow-lg shadow-[#edc247]/50' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  onClick={() => {
                    setCurrentAct(act);
                    setAnimationPhase(0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setCurrentAct(act);
                      setAnimationPhase(0);
                    }
                  }}
                  data-testid={`act-indicator-${act}`}
                />
              );
            })}
          </div>
          
          {/* Phase Progress */}
          <div className="w-full bg-white/10 rounded-full h-1">
            <div 
              className={`bg-gradient-to-r from-[#edc247] to-yellow-500 h-1 rounded-full ${
                reducedMotion ? '' : 'transition-all duration-2000'
              }`}
              style={{ width: `${((animationPhase + 1) / 4) * 100}%` }}
            />
          </div>
          
          {/* Performance Mode Indicator */}
          {performanceMode && (
            <div className="text-center mt-2">
              <div className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">
                Performance Mode Active
              </div>
            </div>
          )}
        </div>

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 rounded-2xl" style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
        }} />
      </div>
      
      {/* Premium Border Glow */}
      <div className="absolute inset-0 rounded-2xl border-2 border-[#edc247]/30 shadow-2xl shadow-[#edc247]/20 pointer-events-none" />
    </div>
  );
}

// Enhanced Cinematic Styles
const cinematicStyles = `
  @keyframes cinematic-float {
    0%, 100% { transform: translateY(0) rotateZ(0deg); }
    50% { transform: translateY(-8px) rotateZ(4deg); }
  }
  
  @keyframes cinematic-glow-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(237, 194, 71, 0.3); }
    50% { box-shadow: 0 0 40px rgba(237, 194, 71, 0.6), 0 0 60px rgba(237, 194, 71, 0.3); }
  }
  
  @keyframes cinematic-slide-in {
    0% { 
      opacity: 0; 
      transform: translateX(-100px) translateZ(-200px) rotateY(-30deg);
    }
    100% { 
      opacity: 1; 
      transform: translateX(0) translateZ(0) rotateY(0deg);
    }
  }
  
  @keyframes cinematic-particle-burst {
    0% { 
      opacity: 1; 
      transform: translateY(0) scale(1);
    }
    100% { 
      opacity: 0; 
      transform: translateY(-100px) scale(0.5);
    }
  }
  
  @keyframes cinematic-counter-up {
    0% { transform: translateY(20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  
  .animate-cinematic-float {
    animation: cinematic-float 3s infinite ease-in-out;
  }
  
  .animate-cinematic-glow-pulse {
    animation: cinematic-glow-pulse 2s infinite ease-in-out;
  }
  
  .animate-cinematic-slide-in {
    animation: cinematic-slide-in 1.5s ease-out;
  }
  
  .animate-cinematic-particle-burst {
    animation: cinematic-particle-burst 2s ease-out forwards;
  }
  
  .animate-cinematic-counter-up {
    animation: cinematic-counter-up 0.8s ease-out forwards;
  }
  
  /* Accessibility: Respect reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    .animate-cinematic-float,
    .animate-cinematic-glow-pulse,
    .animate-cinematic-slide-in,
    .animate-cinematic-particle-burst,
    .animate-cinematic-counter-up,
    .animate-pulse,
    .animate-ping,
    .animate-bounce {
      animation: none;
    }
    
    .transition-all {
      transition: none;
    }
  }
  
  /* Custom duration classes that might be missing from Tailwind */
  .duration-2000 { transition-duration: 2000ms; }
  .duration-3000 { transition-duration: 3000ms; }
  .duration-4000 { transition-duration: 4000ms; }
`;

// Safe CSS injection with cleanup
if (typeof document !== 'undefined' && typeof window !== 'undefined') {
  const styleId = 'cinematic-business-styles';
  
  // Remove existing styles to prevent duplication
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // Add new styles
  const styleSheet = document.createElement("style");
  styleSheet.id = styleId;
  styleSheet.innerText = cinematicStyles;
  document.head.appendChild(styleSheet);
}