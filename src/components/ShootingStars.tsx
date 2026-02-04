import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
}

export const ShootingStars = () => {
  const [stars, setStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: ShootingStar[] = [];
      for (let i = 0; i < 8; i++) {
        newStars.push({
          id: i,
          startX: Math.random() * 100,
          startY: Math.random() * 50,
          delay: Math.random() * 15 + i * 3,
          duration: Math.random() * 1.5 + 1,
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-5">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-cream rounded-full"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, 150, 300],
            y: [0, 100, 200],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 10 + 5,
            ease: "easeOut",
          }}
        >
          {/* Trail effect */}
          <div className="absolute w-24 h-0.5 bg-gradient-to-l from-cream/80 via-gold-warm/50 to-transparent -left-24 top-0 -rotate-45" />
        </motion.div>
      ))}
    </div>
  );
};
