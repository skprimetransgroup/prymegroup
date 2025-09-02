import { useEffect, useState } from "react";
import { Truck, Users, TrendingUp, Award, Clock, Target } from "lucide-react";

interface FloatingObject {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  style: React.CSSProperties;
  delay: number;
}

export default function FloatingObjects() {
  const [objects, setObjects] = useState<FloatingObject[]>([]);
  const [particles, setParticles] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    // Create floating objects
    const icons = [Truck, Users, TrendingUp, Award, Clock, Target];
    const newObjects: FloatingObject[] = [];
    
    for (let i = 0; i < 6; i++) {
      newObjects.push({
        id: i,
        icon: icons[i % icons.length],
        style: {
          top: `${Math.random() * 80 + 10}%`,
          left: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 20 + 20}px`,
          animationDelay: `${Math.random() * 15}s`,
          animationDuration: `${15 + Math.random() * 10}s`,
        },
        delay: Math.random() * 5000,
      });
    }
    setObjects(newObjects);

    // Create floating particles
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${8 + Math.random() * 4}s`,
        },
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="floating-objects">
      {/* Floating Icons */}
      {objects.map((obj) => {
        const IconComponent = obj.icon;
        return (
          <div
            key={obj.id}
            className="floating-object"
            style={obj.style}
          >
            <div className="bg-primary/20 rounded-full p-4 card-hover glow-3d">
              <IconComponent className="w-8 h-8 text-primary" />
            </div>
          </div>
        );
      })}

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="floating-particle"
          style={particle.style}
        />
      ))}

      {/* Morphing Blobs */}
      <div 
        className="morphing-blob"
        style={{
          width: '300px',
          height: '300px',
          top: '10%',
          left: '5%',
          animationDelay: '0s',
        }}
      />
      <div 
        className="morphing-blob"
        style={{
          width: '250px',
          height: '250px',
          top: '50%',
          right: '10%',
          animationDelay: '4s',
        }}
      />
      <div 
        className="morphing-blob"
        style={{
          width: '200px',
          height: '200px',
          top: '75%',
          left: '40%',
          animationDelay: '2s',
        }}
      />
    </div>
  );
}