import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
  angle: number;
}

export const ShootingStars = () => {
  const [stars, setStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: ShootingStar[] = [];
      // Only 2-3 shooting stars for rarity
      for (let i = 0; i < 3; i++) {
        newStars.push({
          id: i,
          startX: Math.random() * 60 + 20, // Start more centered
          startY: Math.random() * 30, // Start from top portion
          delay: Math.random() * 20 + i * 15, // Much longer delays between stars
          duration: Math.random() * 0.8 + 0.6, // Faster streak
          angle: Math.random() * 20 + 35, // 35-55 degree angle
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
          className="absolute"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            transform: `rotate(${star.angle}deg)`,
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, 200, 400],
            y: [0, 150, 300],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 25 + 20, // Very long wait between appearances
            ease: "easeIn",
          }}
        >
          {/* Star head - bright point */}
          <div className="absolute w-1.5 h-1.5 bg-cream rounded-full shadow-[0_0_6px_2px_rgba(255,250,240,0.8)]" />
          {/* Trail - attached behind the star, fading away */}
          <div 
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-gold-warm/40 to-cream/90"
            style={{
              width: '80px',
              right: '6px', // Attached to the star
              top: '2px',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};
