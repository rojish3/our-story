import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useRef } from "react";

export const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ opacity, scale, y }}
    >
      {/* Sunset horizon glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gold-warm/10 via-rose-deep/5 to-transparent pointer-events-none" />
      
      <div className="text-center px-6 relative z-10">
        {/* Decorative sparkles */}
        <motion.div
          className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Sparkles className="w-4 h-4 text-gold-warm/60 animate-pulse" />
          <Sparkles className="w-3 h-3 text-rose-soft/60 animate-pulse animation-delay-200" />
          <Sparkles className="w-4 h-4 text-gold-warm/60 animate-pulse animation-delay-400" />
        </motion.div>

        {/* Main title */}
        <motion.h1
          className="font-handwritten text-6xl md:text-8xl text-gradient-rose mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          A Journey to Us
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-display text-2xl md:text-3xl text-cream-soft/80 italic mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Like every sunset we've watched together, this story ends with something beautiful...
        </motion.p>

        {/* Decorative hearts */}
        <motion.div
          className="flex justify-center gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2, 
                delay: i * 0.15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart 
                className={`text-primary/60 ${i === 2 ? "w-6 h-6" : "w-4 h-4"}`} 
                fill="currentColor" 
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-display text-cream-soft/50 text-sm tracking-widest uppercase">
              Scroll to begin
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-cream-soft/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
