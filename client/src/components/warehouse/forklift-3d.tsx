import { useEffect, useState } from "react";

interface Forklift3DProps {
  className?: string;
}

export default function Forklift3D({ className = "" }: Forklift3DProps) {
  const [isMoving, setIsMoving] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsMoving(prev => !prev);
    }, 8000); // Change direction every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full h-96 overflow-hidden ${className}`}>
      {/* Warehouse Floor */}
      <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-gray-800 via-gray-700 to-transparent opacity-50"></div>
      
      {/* 3D Forklift */}
      <div
        className={`forklift-container absolute bottom-20 transition-all duration-8000 ease-in-out transform-gpu ${
          isMoving 
            ? 'left-10 translate-x-0' 
            : 'left-[calc(100%-200px)] translate-x-0'
        }`}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="forklift-body relative">
          {/* Main Forklift Body */}
          <div 
            className="forklift-chassis w-32 h-16 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg relative shadow-2xl"
            style={{
              transform: 'rotateX(15deg) rotateY(5deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Cabin */}
            <div 
              className="forklift-cabin absolute top-0 left-4 w-16 h-12 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-t-lg border border-gray-600"
              style={{
                transform: 'translateZ(8px)',
              }}
            >
              {/* Windows */}
              <div className="absolute top-1 left-1 w-6 h-4 bg-gradient-to-br from-cyan-200 to-cyan-400 rounded opacity-70"></div>
              <div className="absolute top-1 right-1 w-6 h-4 bg-gradient-to-br from-cyan-200 to-cyan-400 rounded opacity-70"></div>
            </div>

            {/* Engine/Hood */}
            <div 
              className="forklift-hood absolute top-2 right-2 w-8 h-10 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500 rounded"
              style={{
                transform: 'translateZ(4px)',
              }}
            ></div>

            {/* Side Panels */}
            <div 
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg opacity-90"
              style={{
                transform: 'translateZ(-2px)',
              }}
            ></div>
          </div>

          {/* Forks */}
          <div 
            className="forklift-forks absolute top-4 -left-8 w-16 h-2 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 rounded-full shadow-lg"
            style={{
              transform: 'rotateX(15deg) translateZ(2px)',
            }}
          >
            {/* Fork Tines */}
            <div className="absolute top-0 left-0 w-1 h-2 bg-gray-700 rounded-full"></div>
            <div className="absolute top-0 left-6 w-1 h-2 bg-gray-700 rounded-full"></div>
          </div>

          {/* Mast */}
          <div 
            className="forklift-mast absolute -top-8 left-8 w-3 h-16 bg-gradient-to-t from-gray-700 via-gray-600 to-gray-500 rounded shadow-lg"
            style={{
              transform: 'rotateX(15deg) translateZ(1px)',
            }}
          ></div>

          {/* Wheels */}
          <div className="forklift-wheels">
            {/* Front Wheels */}
            <div 
              className="wheel absolute -bottom-2 left-2 w-6 h-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-full border-2 border-gray-600 shadow-lg"
              style={{
                transform: 'rotateX(45deg)',
              }}
            >
              <div className="absolute inset-1 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full"></div>
            </div>
            <div 
              className="wheel absolute -bottom-2 right-8 w-6 h-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-full border-2 border-gray-600 shadow-lg"
              style={{
                transform: 'rotateX(45deg)',
              }}
            >
              <div className="absolute inset-1 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full"></div>
            </div>

            {/* Rear Wheels */}
            <div 
              className="wheel absolute -bottom-2 right-2 w-5 h-5 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-full border-2 border-gray-600 shadow-lg"
              style={{
                transform: 'rotateX(45deg)',
              }}
            >
              <div className="absolute inset-1 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full"></div>
            </div>
          </div>

          {/* Shadow */}
          <div 
            className="forklift-shadow absolute -bottom-4 left-0 w-40 h-8 bg-black opacity-20 rounded-full blur-md"
            style={{
              transform: 'rotateX(90deg) translateZ(-10px)',
            }}
          ></div>

          {/* Warning Lights */}
          <div className="warning-lights">
            <div className="absolute top-1 left-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse shadow-lg shadow-orange-400/50"></div>
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
          </div>

          {/* Exhaust */}
          <div className="absolute top-0 right-0 w-1 h-4">
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Warehouse Elements */}
      <div className="warehouse-elements absolute bottom-0 left-0 w-full">
        {/* Pallet Stacks */}
        <div className="absolute bottom-20 left-1/4 w-8 h-12 bg-gradient-to-t from-amber-700 via-amber-600 to-amber-500 transform rotate-3 shadow-lg"></div>
        <div className="absolute bottom-20 right-1/4 w-8 h-16 bg-gradient-to-t from-amber-700 via-amber-600 to-amber-500 transform -rotate-2 shadow-lg"></div>
        
        {/* Floor Markings */}
        <div className="absolute bottom-16 left-0 w-full h-1 bg-yellow-400 opacity-60"></div>
        <div className="absolute bottom-12 left-0 w-full h-0.5 bg-white opacity-40"></div>
        
        {/* Loading Dock Lines */}
        <div className="absolute bottom-20 left-1/2 w-px h-8 bg-yellow-400 opacity-60"></div>
        <div className="absolute bottom-20 left-3/4 w-px h-8 bg-yellow-400 opacity-60"></div>
      </div>

      {/* Ambient Warehouse Lighting */}
      <div className="absolute top-0 left-1/4 w-20 h-20 bg-gradient-radial from-yellow-200/20 via-yellow-100/10 to-transparent rounded-full blur-xl"></div>
      <div className="absolute top-0 right-1/4 w-20 h-20 bg-gradient-radial from-blue-200/20 via-blue-100/10 to-transparent rounded-full blur-xl"></div>
    </div>
  );
}

// CSS for smooth transitions
const styles = `
  @keyframes forklift-move {
    0% { transform: translateX(0) rotateY(0deg); }
    45% { transform: translateX(calc(100vw - 200px)) rotateY(0deg); }
    50% { transform: translateX(calc(100vw - 200px)) rotateY(180deg); }
    95% { transform: translateX(0) rotateY(180deg); }
    100% { transform: translateX(0) rotateY(360deg); }
  }

  .forklift-container {
    animation: forklift-move 16s infinite linear;
  }

  .wheel {
    animation: spin 2s infinite linear;
  }

  @keyframes spin {
    from { transform: rotateX(45deg) rotateZ(0deg); }
    to { transform: rotateX(45deg) rotateZ(360deg); }
  }

  .duration-8000 {
    transition-duration: 8s;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}