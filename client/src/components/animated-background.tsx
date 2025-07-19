import { useEffect, useState } from 'react';

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  direction: number;
}

export function AnimatedBackground() {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);

    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  useEffect(() => {
    if (!windowSize.width || !windowSize.height) return;

    const colors = [
      'rgba(59, 130, 246, 0.1)',  // blue
      'rgba(34, 197, 94, 0.1)',   // green
      'rgba(168, 85, 247, 0.1)',  // purple
      'rgba(245, 158, 11, 0.1)',  // amber
      'rgba(239, 68, 68, 0.1)',   // red
    ];

    const newShapes: FloatingShape[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * windowSize.width,
      y: Math.random() * windowSize.height,
      size: Math.random() * 100 + 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 0.5 + 0.2,
      direction: Math.random() * Math.PI * 2,
    }));

    setShapes(newShapes);
  }, [windowSize]);

  useEffect(() => {
    const animateShapes = () => {
      setShapes(prevShapes =>
        prevShapes.map(shape => {
          let newX = shape.x + Math.cos(shape.direction) * shape.speed;
          let newY = shape.y + Math.sin(shape.direction) * shape.speed;
          let newDirection = shape.direction;

          // Bounce off edges
          if (newX < -shape.size / 2 || newX > windowSize.width + shape.size / 2) {
            newDirection = Math.PI - shape.direction;
            newX = Math.max(-shape.size / 2, Math.min(windowSize.width + shape.size / 2, newX));
          }
          if (newY < -shape.size / 2 || newY > windowSize.height + shape.size / 2) {
            newDirection = -shape.direction;
            newY = Math.max(-shape.size / 2, Math.min(windowSize.height + shape.size / 2, newY));
          }

          return {
            ...shape,
            x: newX,
            y: newY,
            direction: newDirection,
          };
        })
      );
    };

    const interval = setInterval(animateShapes, 16); // ~60fps
    return () => clearInterval(interval);
  }, [windowSize]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 animate-bg-pulse" />
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-50/50 via-transparent to-pink-50/50" />
      
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="geometric-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="25" cy="25" r="2" fill="rgba(59, 130, 246, 0.2)" />
              <circle cx="75" cy="75" r="1.5" fill="rgba(34, 197, 94, 0.2)" />
              <rect x="45" y="45" width="10" height="10" fill="rgba(168, 85, 247, 0.1)" rx="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geometric-pattern)" />
        </svg>
      </div>

      {/* Floating shapes */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${shape.x}px`,
            top: `${shape.y}px`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            backgroundColor: shape.color,
            filter: 'blur(1px)',
            transform: 'translate(-50%, -50%)',
            animation: `float ${3 + shape.id}s ease-in-out infinite alternate`,
            animationDelay: `${shape.id * 0.2}s`,
          }}
        />
      ))}

      {/* Morphing orbs with enhanced effects */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-25 animate-morphing blur-2xl" />
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-400 opacity-25 animate-float blur-2xl" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-40 w-40 h-40 bg-gradient-to-r from-purple-400 to-pink-400 opacity-20 animate-morphing blur-3xl" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-amber-400 to-orange-400 opacity-25 animate-float blur-2xl" style={{ animationDelay: '3s' }} />
      
      {/* Additional animated particles */}
      <div className="absolute top-1/2 left-10 w-4 h-4 bg-blue-300 rounded-full opacity-40 animate-particles" style={{ animationDelay: '0s' }} />
      <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-green-300 rounded-full opacity-40 animate-particles" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/4 right-1/3 w-5 h-5 bg-purple-300 rounded-full opacity-40 animate-particles" style={{ animationDelay: '4s' }} />
      <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-pink-300 rounded-full opacity-40 animate-particles" style={{ animationDelay: '6s' }} />
      
      {/* Floating geometric shapes */}
      <div className="absolute top-16 right-16 w-20 h-20 border-2 border-blue-300/30 rotate-45 animate-float-enhanced" />
      <div className="absolute bottom-16 left-16 w-16 h-16 border-2 border-green-300/30 rotate-12 animate-float-enhanced" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-lg rotate-45 animate-float-enhanced" style={{ animationDelay: '3s' }} />
    </div>
  );
}