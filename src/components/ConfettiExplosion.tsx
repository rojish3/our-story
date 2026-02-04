import { motion } from "framer-motion";
import { Heart, Star, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  type: "heart" | "circle" | "star" | "sun" | "sparkle";
  delay: number;
  velocity: { x: number; y: number };
}

export const ConfettiExplosion = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      "hsl(350, 80%, 65%)", // rose
      "hsl(340, 70%, 55%)", // deep rose
      "hsl(35, 70%, 55%)", // gold warm
      "hsl(25, 80%, 60%)", // sunset orange
      "hsl(350, 60%, 75%)", // soft pink
      "hsl(30, 30%, 92%)", // cream
      "hsl(280, 50%, 60%)", // purple sky
    ];
    
    const types: Particle["type"][] = ["heart", "circle", "star", "sun", "sparkle"];
    
    const newParticles: Particle[] = [];
    // Create explosion from center
    for (let i = 0; i < 80; i++) {
      const angle = (Math.PI * 2 * i) / 80;
      const velocity = Math.random() * 15 + 10;
      newParticles.push({
        id: i,
        x: 50,
        y: 50,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.8 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 0.2,
        velocity: {
          x: Math.cos(angle) * velocity,
          y: Math.sin(angle) * velocity,
        },
      });
    }
    
    // Add extra falling particles
    for (let i = 80; i < 120; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.6 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 2 + 0.5,
        velocity: {
          x: (Math.random() - 0.5) * 5,
          y: Math.random() * 5 + 3,
        },
      });
    }
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            color: particle.color,
          }}
          initial={{
            scale: 0,
            rotate: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            scale: [0, particle.scale, particle.scale, 0],
            rotate: [0, particle.rotation, particle.rotation * 2, particle.rotation * 3],
            x: [0, particle.velocity.x * 20, particle.velocity.x * 30],
            y: [0, particle.velocity.y * 15, particle.velocity.y * 40 + 200],
          }}
          transition={{
            duration: 4,
            delay: particle.delay,
            ease: "easeOut",
          }}
        >
          {particle.type === "heart" ? (
            <Heart size={24} fill="currentColor" />
          ) : particle.type === "star" ? (
            <Star size={20} fill="currentColor" />
          ) : particle.type === "sun" ? (
            <Sun size={22} />
          ) : particle.type === "sparkle" ? (
            <div className="relative">
              <div 
                className="w-2 h-2 rotate-45" 
                style={{ backgroundColor: particle.color }} 
              />
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-0.5" 
                style={{ backgroundColor: particle.color }} 
              />
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-4" 
                style={{ backgroundColor: particle.color }} 
              />
            </div>
          ) : (
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: particle.color }} 
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
