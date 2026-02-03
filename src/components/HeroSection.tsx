import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6">
      {/* Subtle gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <motion.p
          className="font-display text-lg md:text-xl text-cream-soft/70 mb-8 tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          A Story Written in the Stars
        </motion.p>

        <motion.h1
          className="font-handwritten text-5xl md:text-7xl lg:text-8xl text-cream mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5 }}
        >
          It all started with a hello...
        </motion.h1>

        <motion.div
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
        />

        <motion.p
          className="font-display text-xl md:text-2xl text-cream-soft/80 italic max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          Scroll down to journey through our memories
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-cream-soft/50 hover:text-cream transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { duration: 1, delay: 3 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </section>
  );
};
