import { motion, useScroll, useTransform } from "framer-motion";

export const SunsetGlow = () => {
  const { scrollYProgress } = useScroll();
  
  // Transform opacity based on scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.6, 0.8, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1.5]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Main sunset glow - bottom */}
      <motion.div
        className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[150%] h-[60%] rounded-[50%]"
        style={{
          background: "radial-gradient(ellipse at center, hsl(25 80% 50% / 0.15) 0%, hsl(350 70% 50% / 0.1) 30%, hsl(280 50% 30% / 0.05) 60%, transparent 80%)",
          opacity,
          scale,
        }}
      />
      
      {/* Secondary warm glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[40%]"
        style={{
          background: "linear-gradient(to top, hsl(30 70% 50% / 0.08) 0%, hsl(350 60% 50% / 0.05) 50%, transparent 100%)",
          opacity,
        }}
      />

      {/* Horizon line effect */}
      <motion.div
        className="absolute bottom-[20%] left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(35 70% 55% / 0.3) 20%, hsl(350 80% 65% / 0.4) 50%, hsl(35 70% 55% / 0.3) 80%, transparent 100%)",
          opacity,
        }}
      />

      {/* Ambient sky gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, hsl(240 30% 8% / 0.9) 0%, hsl(260 25% 12% / 0.5) 40%, hsl(280 20% 15% / 0.3) 70%, hsl(30 50% 20% / 0.2) 100%)",
        }}
      />
    </div>
  );
};
