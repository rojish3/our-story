import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  type: "heart" | "circle" | "star";
  delay: number;
}

export const ConfettiExplosion = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      "hsl(350, 80%, 65%)",
      "hsl(340, 70%, 55%)",
      "hsl(35, 70%, 55%)",
      "hsl(350, 60%, 75%)",
      "hsl(30, 30%, 92%)",
    ];
    
    const types: Particle["type"][] = ["heart", "circle", "star"];
    
    const newParticles: Particle[] = [];
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.8 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 0.3,
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
            y: 0,
          }}
          animate={{
            scale: [0, particle.scale, particle.scale, 0],
            rotate: [0, particle.rotation, particle.rotation * 2],
            y: [0, -200, -500],
            x: [0, (Math.random() - 0.5) * 200],
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            ease: "easeOut",
          }}
        >
          {particle.type === "heart" ? (
            <Heart size={24} fill="currentColor" />
          ) : particle.type === "circle" ? (
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: particle.color }} 
            />
          ) : (
            <div 
              className="w-3 h-3 rotate-45" 
              style={{ backgroundColor: particle.color }} 
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
