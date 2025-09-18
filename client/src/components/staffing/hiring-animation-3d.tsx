import { useEffect, useState } from "react";

interface HiringAnimation3DProps {
  className?: string;
}

export default function HiringAnimation3D({ className = "" }: HiringAnimation3DProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isInterviewActive, setIsInterviewActive] = useState(false);

  useEffect(() => {
    const sceneInterval = setInterval(() => {
      setCurrentScene(prev => (prev + 1) % 3); // Cycle through 3 scenes
    }, 6000);

    const interviewInterval = setInterval(() => {
      setIsInterviewActive(prev => !prev);
    }, 4000);

    return () => {
      clearInterval(sceneInterval);
      clearInterval(interviewInterval);
    };
  }, []);

  return (
    <div className={`relative w-full h-96 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900 ${className}`}>
      {/* Office Building Background */}
      <div className="absolute bottom-0 w-full h-80 bg-gradient-to-t from-gray-300 via-gray-200 to-blue-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-600">
        {/* Building Structure */}
        <div className="absolute bottom-0 left-1/4 w-48 h-64 bg-gradient-to-t from-gray-600 via-gray-500 to-gray-400 transform perspective-1000 rotateY-5">
          {/* Windows Grid */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-8 h-6 rounded transition-all duration-1000 ${
                isInterviewActive && i % 3 === 0 
                  ? 'bg-gradient-to-br from-yellow-200 to-yellow-400' 
                  : 'bg-gradient-to-br from-blue-200 to-blue-300'
              }`}
              style={{
                left: `${10 + (i % 4) * 25}%`,
                top: `${20 + Math.floor(i / 4) * 20}%`,
                transform: 'translateZ(2px)',
              }}
            >
              {isInterviewActive && i % 3 === 0 && (
                <div className="absolute inset-1 bg-yellow-500 rounded-sm opacity-80"></div>
              )}
            </div>
          ))}
          
          {/* Company Logo */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-lg">
            PTG
          </div>
        </div>
      </div>

      {/* Animated Characters and Elements */}
      <div className="absolute bottom-16 left-0 w-full h-32">
        
        {/* Job Seeker Walking In */}
        <div 
          className={`job-seeker absolute bottom-8 transition-all duration-6000 ease-in-out transform ${
            currentScene === 0 ? 'left-4' : currentScene === 1 ? 'left-1/3' : 'left-2/3'
          }`}
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Person Body */}
          <div className="relative">
            {/* Head */}
            <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mb-1 relative mx-auto">
              <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-red-500 rounded-full"></div>
            </div>
            
            {/* Body */}
            <div className="w-8 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg relative mx-auto">
              {/* Tie */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-8 bg-red-600 rounded-sm"></div>
              {/* Briefcase */}
              <div className="absolute -right-3 top-2 w-4 h-3 bg-gradient-to-br from-amber-700 to-amber-800 rounded transform rotateZ-15">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-yellow-600 rounded"></div>
              </div>
            </div>
            
            {/* Legs */}
            <div className="flex justify-center gap-1 mt-1">
              <div className="w-2 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg animate-walk-left"></div>
              <div className="w-2 h-8 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg animate-walk-right"></div>
            </div>
          </div>

          {/* Resume Papers Floating */}
          <div className="absolute -top-4 left-8 w-6 h-8 bg-white rounded shadow-lg transform rotate-12 animate-float">
            <div className="absolute top-1 left-1 right-1 h-0.5 bg-gray-400 rounded"></div>
            <div className="absolute top-2 left-1 right-1 h-0.5 bg-gray-300 rounded"></div>
            <div className="absolute top-3 left-1 right-2 h-0.5 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* HR Manager/Interviewer */}
        <div className="hr-manager absolute bottom-8 right-1/4 transform transition-all duration-1000">
          {/* Person Body */}
          <div className="relative">
            {/* Head */}
            <div className="w-6 h-6 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full mb-1 relative mx-auto">
              <div className="absolute top-1 left-1 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-red-500 rounded-full"></div>
              {/* Hair */}
              <div className="absolute -top-1 left-0 right-0 h-2 bg-gradient-to-br from-amber-700 to-amber-800 rounded-t-full"></div>
            </div>
            
            {/* Body */}
            <div className="w-8 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg relative mx-auto">
              {/* Tablet/Interview Notes */}
              <div className="absolute -left-4 top-2 w-5 h-7 bg-gradient-to-br from-gray-800 to-gray-900 rounded">
                <div className="absolute inset-0.5 bg-blue-400 rounded"></div>
                <div className="absolute top-1 left-0.5 right-0.5 h-0.5 bg-white opacity-80 rounded"></div>
                <div className="absolute top-2 left-0.5 right-1 h-0.5 bg-white opacity-60 rounded"></div>
              </div>
            </div>
            
            {/* Legs */}
            <div className="flex justify-center gap-1 mt-1">
              <div className="w-2 h-8 bg-gradient-to-b from-gray-600 to-gray-700 rounded-lg"></div>
              <div className="w-2 h-8 bg-gradient-to-b from-gray-600 to-gray-700 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Interview Table */}
        <div className={`interview-table absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          isInterviewActive ? 'scale-110' : 'scale-100'
        }`}>
          <div className="w-16 h-4 bg-gradient-to-br from-amber-700 to-amber-800 rounded-lg relative">
            {/* Table Legs */}
            <div className="absolute -bottom-4 left-2 w-1 h-4 bg-gray-700 rounded"></div>
            <div className="absolute -bottom-4 right-2 w-1 h-4 bg-gray-700 rounded"></div>
            
            {/* Interview Documents */}
            <div className="absolute top-0 left-2 w-3 h-2 bg-white rounded shadow-sm">
              <div className="absolute top-0.5 left-0.5 right-0.5 h-0.5 bg-gray-400 rounded"></div>
            </div>
            <div className="absolute top-0 right-2 w-3 h-2 bg-white rounded shadow-sm transform rotate-6">
              <div className="absolute top-0.5 left-0.5 right-0.5 h-0.5 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>

        {/* Success Indicators */}
        {isInterviewActive && (
          <>
            {/* Handshake Animation */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-2 bg-yellow-400 rounded-full transform -rotate-12"></div>
                <div className="w-4 h-2 bg-pink-300 rounded-full transform rotate-12"></div>
              </div>
            </div>
            
            {/* Success Particles */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 -translate-x-4">
              <div className="w-1 h-1 bg-yellow-400 rounded-full animate-ping animation-delay-300"></div>
            </div>
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 translate-x-4">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping animation-delay-600"></div>
            </div>
          </>
        )}
      </div>

      {/* Job Postings Board */}
      <div className="absolute top-4 right-4 w-24 h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-600">
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 dark:text-gray-300">
          JOBS
        </div>
        
        {/* Job Posting Cards */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-5 h-6 bg-white dark:bg-gray-800 rounded shadow-sm border transform transition-all duration-1000 ${
              currentScene === i % 3 ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
            }`}
            style={{
              left: `${10 + (i % 2) * 45}%`,
              top: `${25 + Math.floor(i / 2) * 35}%`,
            }}
          >
            <div className="absolute top-1 left-0.5 right-0.5 h-0.5 bg-primary rounded"></div>
            <div className="absolute top-2 left-0.5 right-1 h-0.5 bg-gray-400 rounded"></div>
            <div className="absolute top-3 left-0.5 right-0.5 h-0.5 bg-gray-300 rounded"></div>
          </div>
        ))}
        
        {/* "We're Hiring!" Banner */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-2 py-1 rounded font-bold animate-pulse">
          HIRING!
        </div>
      </div>

      {/* Career Growth Arrow */}
      <div className="absolute top-8 left-8 transform transition-all duration-2000 animate-bounce">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-primary">📈</div>
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">Growth</div>
        </div>
      </div>

      {/* Statistics Display */}
      <div className="absolute top-4 left-1/3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="text-center">
          <div className="text-lg font-bold text-primary">{currentScene === 0 ? '1,485' : currentScene === 1 ? '740' : '376'}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {currentScene === 0 ? 'Hired' : currentScene === 1 ? 'Active Jobs' : 'Employers'}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Icons */}
        <div className="absolute top-16 right-16 text-2xl animate-float animation-delay-0">💼</div>
        <div className="absolute top-32 left-16 text-xl animate-float animation-delay-1000">🤝</div>
        <div className="absolute bottom-32 right-8 text-lg animate-float animation-delay-2000">✅</div>
      </div>
    </div>
  );
}

// CSS for animations
const styles = `
  @keyframes walk-left {
    0%, 100% { transform: translateY(0) rotateZ(0deg); }
    50% { transform: translateY(-2px) rotateZ(-5deg); }
  }
  
  @keyframes walk-right {
    0%, 100% { transform: translateY(0) rotateZ(0deg); }
    50% { transform: translateY(-2px) rotateZ(5deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) rotateZ(0deg); }
    50% { transform: translateY(-8px) rotateZ(5deg); }
  }
  
  .animate-walk-left {
    animation: walk-left 1s infinite;
  }
  
  .animate-walk-right {
    animation: walk-right 1s infinite reverse;
  }
  
  .animate-float {
    animation: float 3s infinite ease-in-out;
  }
  
  .animation-delay-300 {
    animation-delay: 300ms;
  }
  
  .animation-delay-600 {
    animation-delay: 600ms;
  }
  
  .animation-delay-1000 {
    animation-delay: 1000ms;
  }
  
  .animation-delay-2000 {
    animation-delay: 2000ms;
  }
  
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .rotateY-5 {
    transform: rotateY(-5deg);
  }
  
  .rotateZ-15 {
    transform: rotateZ(-15deg);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}