import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ImageGalleryProps {
  images: string[];
  isInView: boolean;
  hoverMessage?: string;
}

export const ImageGallery = ({ images, isInView, hoverMessage }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-shuffle every 4 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const slideVariants = {
    enter: {
      scale: 0.9,
      opacity: 0,
      rotateY: 15,
    },
    center: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      rotateY: -15,
    },
  };

  return (
    <div
      className="relative group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative frame glow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-2xl"
        animate={{
          boxShadow: isHovered 
            ? "0 0 60px hsl(350 80% 65% / 0.4)" 
            : "0 0 30px hsl(350 80% 65% / 0.2)",
        }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-border/30">
        {/* Auto-shuffling image container */}
        <div className="w-72 h-96 md:w-80 md:h-[28rem] relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Memory ${currentIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              variants={slideVariants}
              initial="enter"
              animate={isInView ? "center" : "enter"}
              exit="exit"
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{ filter: isInView ? "grayscale(0%)" : "grayscale(100%)" }}
            />
          </AnimatePresence>
        </div>
        
        {/* Sunset gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-night-deep/70 via-rose-deep/10 to-gold-warm/5 pointer-events-none" />
        
        {/* Hover message overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none"
          initial={{ opacity: 0, backgroundColor: "hsl(240 25% 3% / 0)" }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            backgroundColor: isHovered ? "hsl(240 25% 3% / 0.75)" : "hsl(240 25% 3% / 0)"
          }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-center"
          >
            <motion.div
              className="w-12 h-0.5 bg-primary/50 mx-auto mb-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <p className="text-cream font-handwritten text-2xl leading-relaxed">
              {hoverMessage || "This reminds me of you smiling..."}
            </p>
            <motion.div
              className="w-12 h-0.5 bg-primary/50 mx-auto mt-4"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* Subtle image counter */}
        <motion.div
          className="absolute bottom-4 right-4 flex gap-1.5 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {images.map((_, idx) => (
            <motion.div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? "bg-primary w-4" 
                  : "bg-cream/40"
              }`}
            />
          ))}
        </motion.div>

        {/* Corner decorations */}
        <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-cream/20 rounded-tl-sm pointer-events-none" />
        <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-cream/20 rounded-tr-sm pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-cream/20 rounded-bl-sm pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-cream/20 rounded-br-sm pointer-events-none" />
      </div>
    </div>
  );
};
