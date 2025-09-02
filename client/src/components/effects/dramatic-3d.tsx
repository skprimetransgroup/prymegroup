import { useState, useEffect } from "react";
import { Zap, Rocket, Star, Target } from "lucide-react";

export default function Dramatic3D() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-20 right-4 z-50 space-y-4 pointer-events-none">
      {/* Spinning 3D Cube */}
      <div 
        className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-lg shadow-2xl"
        style={{
          transform: `perspective(200px) rotateX(${rotation}deg) rotateY(${rotation * 1.5}deg) rotateZ(${rotation * 0.5}deg)`,
          transformStyle: 'preserve-3d',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 30px rgba(59, 130, 246, 0.5)',
        }}
      />

      {/* Floating Rocket */}
      <div 
        className="bg-green-500 text-white p-3 rounded-full shadow-2xl pulse-glow"
        style={{
          transform: `translateY(${Math.sin(rotation * 0.1) * 10}px) rotateZ(${Math.sin(rotation * 0.05) * 15}deg)`,
          animation: 'float-rotate 8s infinite ease-in-out',
        }}
      >
        <Rocket className="w-6 h-6" />
      </div>

      {/* Pulsing Star */}
      <div 
        className="bg-yellow-500 text-white p-3 rounded-full shadow-2xl"
        style={{
          transform: `scale(${1 + Math.sin(rotation * 0.2) * 0.3}) rotateZ(${rotation * 2}deg)`,
          boxShadow: '0 0 40px rgba(234, 179, 8, 0.8)',
        }}
      >
        <Star className="w-6 h-6" />
      </div>

      {/* Energy Bolt */}
      <div 
        className="bg-purple-500 text-white p-3 rounded-full shadow-2xl glow-3d"
        style={{
          transform: `translateX(${Math.cos(rotation * 0.1) * 15}px) rotateY(${rotation * 3}deg)`,
          filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.8))',
        }}
      >
        <Zap className="w-6 h-6" />
      </div>

      {/* Target Ring */}
      <div 
        className="bg-red-500 text-white p-3 rounded-full shadow-2xl"
        style={{
          transform: `perspective(100px) rotateX(${rotation * 2}deg) scale(${1 + Math.sin(rotation * 0.15) * 0.2})`,
          boxShadow: '0 0 50px rgba(239, 68, 68, 0.6)',
        }}
      >
        <Target className="w-6 h-6" />
      </div>
    </div>
  );
}