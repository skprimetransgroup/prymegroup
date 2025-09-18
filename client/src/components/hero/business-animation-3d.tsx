import { useEffect, useState } from "react";

interface BusinessAnimation3DProps {
  className?: string;
}

export default function BusinessAnimation3D({ className = "" }: BusinessAnimation3DProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isActiveCollab, setIsActiveCollab] = useState(false);
  const [growthLevel, setGrowthLevel] = useState(0);

  useEffect(() => {
    const sceneInterval = setInterval(() => {
      setCurrentScene(prev => (prev + 1) % 4); // 4 different business scenarios
    }, 5000);

    const collabInterval = setInterval(() => {
      setIsActiveCollab(prev => !prev);
    }, 3000);

    const growthInterval = setInterval(() => {
      setGrowthLevel(prev => (prev + 1) % 5);
    }, 2000);

    return () => {
      clearInterval(sceneInterval);
      clearInterval(collabInterval);
      clearInterval(growthInterval);
    };
  }, []);

  return (
    <div className={`relative w-full h-96 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl ${className}`}>
      
      {/* Modern Office Environment */}
      <div className="absolute inset-0">
        {/* Office Building Background */}
        <div className="absolute bottom-0 w-full h-80 bg-gradient-to-t from-gray-100 via-blue-50 to-transparent dark:from-gray-800 dark:via-gray-700 dark:to-transparent">
          
          {/* Glass Office Building */}
          <div className="absolute bottom-0 right-8 w-32 h-64 bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400 transform perspective-1000 rotateY-10 shadow-2xl">
            {/* Office Windows with Dynamic Lighting */}
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-6 h-4 rounded-sm transition-all duration-1000 border border-blue-300/30 ${
                  isActiveCollab && i % 4 === currentScene % 4
                    ? 'bg-gradient-to-br from-yellow-200 to-orange-300 shadow-lg shadow-yellow-400/50' 
                    : currentScene === 1 && i % 3 === 0
                    ? 'bg-gradient-to-br from-green-200 to-green-400'
                    : 'bg-gradient-to-br from-blue-100 to-blue-200'
                }`}
                style={{
                  left: `${8 + (i % 4) * 20}%`,
                  top: `${15 + Math.floor(i / 4) * 15}%`,
                  transform: 'translateZ(2px)',
                }}
              >
                {/* Window Details */}
                <div className="absolute inset-0.5 bg-white/20 rounded-sm"></div>
                {isActiveCollab && i % 4 === currentScene % 4 && (
                  <div className="absolute inset-1 bg-yellow-400 rounded-sm opacity-60 animate-pulse"></div>
                )}
              </div>
            ))}
            
            {/* PTG Logo on Building */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gradient-to-br from-primary to-secondary rounded-md flex items-center justify-center text-white font-bold text-xs shadow-lg border border-white/20">
              PTG
            </div>
          </div>

          {/* Modern Conference Room */}
          <div className="absolute bottom-0 left-8 w-24 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-t-lg shadow-lg transform perspective-500 rotateX-5">
            {/* Conference Table */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-3 bg-gradient-to-br from-amber-700 to-amber-800 rounded-lg">
              {/* Laptops on Table */}
              <div className="absolute top-0 left-2 w-3 h-2 bg-gray-800 rounded-sm">
                <div className="absolute inset-0.5 bg-blue-400 rounded-sm opacity-80"></div>
              </div>
              <div className="absolute top-0 right-2 w-3 h-2 bg-gray-800 rounded-sm">
                <div className="absolute inset-0.5 bg-green-400 rounded-sm opacity-80"></div>
              </div>
            </div>
            
            {/* Meeting Presentation Screen */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-gray-900 rounded border border-gray-600">
              <div className={`absolute inset-0.5 rounded transition-all duration-1000 ${
                currentScene === 0 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                currentScene === 1 ? 'bg-gradient-to-br from-green-400 to-green-600' :
                currentScene === 2 ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                'bg-gradient-to-br from-orange-400 to-orange-600'
              }`}>
                {/* Chart/Graph Lines */}
                <div className="absolute bottom-1 left-1 right-1 h-0.5 bg-white/60 rounded"></div>
                <div className="absolute bottom-1.5 left-2 w-0.5 h-2 bg-white/80 rounded"></div>
                <div className="absolute bottom-1.5 right-2 w-0.5 h-1 bg-white/60 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Business Professionals */}
      <div className="absolute bottom-0 left-0 w-full h-40">
        
        {/* Team Leader/Manager */}
        <div className={`absolute bottom-12 left-1/4 transform transition-all duration-2000 ${
          isActiveCollab ? 'scale-110' : 'scale-100'
        }`}>
          <div className="relative">
            {/* Head */}
            <div className="w-8 h-8 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full mb-1 relative mx-auto">
              <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-red-500 rounded-full"></div>
              {/* Professional Hair */}
              <div className="absolute -top-1 left-0 right-0 h-3 bg-gradient-to-br from-amber-700 to-amber-800 rounded-t-full"></div>
            </div>
            
            {/* Professional Suit */}
            <div className="w-10 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg relative mx-auto">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-10 bg-blue-600 rounded-sm"></div>
              {/* Briefcase */}
              <div className="absolute -right-4 top-3 w-5 h-4 bg-gradient-to-br from-amber-700 to-amber-800 rounded">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-yellow-600 rounded"></div>
              </div>
            </div>
            
            {/* Legs */}
            <div className="flex justify-center gap-1 mt-1">
              <div className="w-2 h-10 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg"></div>
              <div className="w-2 h-10 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg"></div>
            </div>
          </div>

          {/* Leadership Aura */}
          {isActiveCollab && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-primary/20 rounded-full animate-pulse blur-sm"></div>
          )}
        </div>

        {/* Team Member 1 - Developer */}
        <div className={`absolute bottom-12 left-1/2 transform transition-all duration-1500 ${
          currentScene === 1 ? '-translate-x-8' : 'translate-x-0'
        }`}>
          <div className="relative">
            <div className="w-7 h-7 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full mb-1 relative mx-auto">
              <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-red-500 rounded-full"></div>
              <div className="absolute -top-0.5 left-0 right-0 h-2 bg-gradient-to-br from-brown-600 to-brown-700 rounded-t-full"></div>
            </div>
            
            <div className="w-9 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg relative mx-auto">
              {/* Laptop */}
              <div className="absolute -left-3 top-2 w-4 h-3 bg-gray-800 rounded-sm">
                <div className="absolute inset-0.5 bg-green-400 rounded-sm"></div>
                <div className="absolute top-0.5 left-0.5 right-0.5 h-0.5 bg-white opacity-60 rounded"></div>
              </div>
            </div>
            
            <div className="flex justify-center gap-1 mt-1">
              <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-blue-700 rounded-lg"></div>
              <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-blue-700 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Team Member 2 - Analyst */}
        <div className={`absolute bottom-12 right-1/4 transform transition-all duration-1800 ${
          currentScene === 2 ? 'translate-x-4' : 'translate-x-0'
        }`}>
          <div className="relative">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full mb-1 relative mx-auto">
              <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-red-500 rounded-full"></div>
              <div className="absolute -top-0.5 left-0 right-0 h-2 bg-gradient-to-br from-black to-gray-800 rounded-t-full"></div>
            </div>
            
            <div className="w-9 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg relative mx-auto">
              {/* Tablet/Charts */}
              <div className="absolute -right-3 top-2 w-4 h-5 bg-gray-800 rounded">
                <div className="absolute inset-0.5 bg-blue-400 rounded"></div>
                <div className="absolute bottom-1 left-0.5 right-0.5 h-0.5 bg-white opacity-80 rounded"></div>
                <div className="absolute bottom-1.5 left-1 w-0.5 h-1.5 bg-white opacity-60 rounded"></div>
              </div>
            </div>
            
            <div className="flex justify-center gap-1 mt-1">
              <div className="w-2 h-8 bg-gradient-to-b from-gray-600 to-gray-700 rounded-lg"></div>
              <div className="w-2 h-8 bg-gradient-to-b from-gray-600 to-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Collaboration Lines */}
        {isActiveCollab && (
          <>
            <div className="absolute bottom-20 left-1/4 right-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary animate-pulse transform rotate-12"></div>
            <div className="absolute bottom-20 left-1/2 right-1/4 h-0.5 bg-gradient-to-r from-secondary to-primary animate-pulse transform -rotate-12"></div>
          </>
        )}
      </div>

      {/* Growth Metrics & Data Visualization */}
      <div className="absolute top-4 left-4 right-4 flex justify-between">
        
        {/* Growth Chart */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20">
          <div className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">Growth Metrics</div>
          <div className="flex items-end gap-1 h-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 bg-gradient-to-t transition-all duration-1000 rounded-t-sm ${
                  i <= growthLevel 
                    ? 'from-green-400 to-green-600 h-full' 
                    : 'from-gray-300 to-gray-400 h-2'
                }`}
              ></div>
            ))}
          </div>
          <div className="text-xs font-bold text-green-600 mt-1">
            {Math.round((growthLevel + 1) * 20)}% ↗
          </div>
        </div>

        {/* Live Stats */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              {currentScene === 0 ? '375+' : 
               currentScene === 1 ? '740' : 
               currentScene === 2 ? '1.5K' : '98%'}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {currentScene === 0 ? 'Employers' : 
               currentScene === 1 ? 'Active Jobs' : 
               currentScene === 2 ? 'Placements' : 'Success Rate'}
            </div>
          </div>
        </div>

        {/* Service Indicator */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20">
          <div className="text-center">
            <div className="text-xl">
              {currentScene === 0 ? '👥' : 
               currentScene === 1 ? '📦' : 
               currentScene === 2 ? '🚛' : '💼'}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {currentScene === 0 ? 'Staffing' : 
               currentScene === 1 ? 'Warehouse' : 
               currentScene === 2 ? 'Transport' : 'Solutions'}
            </div>
          </div>
        </div>
      </div>

      {/* Success Particles & Effects */}
      {isActiveCollab && (
        <>
          <div className="absolute top-16 left-16 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute top-24 right-20 w-2 h-2 bg-green-400 rounded-full animate-ping animation-delay-500"></div>
          <div className="absolute bottom-32 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping animation-delay-1000"></div>
          
          {/* Success Burst */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 bg-gradient-radial from-primary/30 via-secondary/20 to-transparent rounded-full animate-pulse"></div>
          </div>
        </>
      )}

      {/* Floating Business Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 right-12 text-2xl animate-float animation-delay-0">💡</div>
        <div className="absolute top-20 left-12 text-xl animate-float animation-delay-1000">📈</div>
        <div className="absolute bottom-24 right-16 text-lg animate-float animation-delay-2000">🎯</div>
        <div className="absolute bottom-28 left-16 text-xl animate-float animation-delay-1500">⚡</div>
      </div>

      {/* Premium Glow Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-primary/50 via-secondary/50 to-primary/50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 rounded-2xl pointer-events-none"></div>
    </div>
  );
}

// Enhanced CSS animations
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0) rotateZ(0deg); }
    50% { transform: translateY(-12px) rotateZ(8deg); }
  }
  
  .animate-float {
    animation: float 4s infinite ease-in-out;
  }
  
  .animation-delay-500 {
    animation-delay: 500ms;
  }
  
  .animation-delay-1000 {
    animation-delay: 1000ms;
  }
  
  .animation-delay-1500 {
    animation-delay: 1500ms;
  }
  
  .animation-delay-2000 {
    animation-delay: 2000ms;
  }
  
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .perspective-500 {
    perspective: 500px;
  }
  
  .rotateY-10 {
    transform: rotateY(-10deg);
  }
  
  .rotateX-5 {
    transform: rotateX(-5deg);
  }
  
  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}