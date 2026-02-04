import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  isInView: boolean;
  hoverMessage?: string;
}

export const ImageGallery = ({ images, isInView, hoverMessage }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  const nextImage = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextImage();
    } else if (info.offset.x > threshold) {
      prevImage();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg shadow-2xl">
        {/* Swipeable image container */}
        <motion.div
          className="w-72 h-96 md:w-80 md:h-[28rem] cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Memory ${currentIndex + 1}`}
              className="w-full h-full object-cover pointer-events-none"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate={isInView ? "center" : "enter"}
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ filter: isInView ? "grayscale(0%)" : "grayscale(100%)" }}
            />
          </AnimatePresence>
        </motion.div>
        
        {/* Sunset gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-night-deep/70 via-rose-deep/10 to-gold-warm/5 pointer-events-none" />
        
        {/* Hover message - only on desktop, doesn't block interaction */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-night-deep/70 backdrop-blur-sm p-6 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-cream font-handwritten text-2xl text-center leading-relaxed">
            {hoverMessage || "This reminds me of you smiling..."}
          </p>
        </motion.div>

        {/* Navigation arrows - always slightly visible */}
        {images.length > 1 && (
          <>
            <motion.button
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-night-deep/80 backdrop-blur-sm flex items-center justify-center text-cream border border-cream/20 z-20"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              onClick={prevImage}
              whileHover={{ scale: 1.1, opacity: 1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-night-deep/80 backdrop-blur-sm flex items-center justify-center text-cream border border-cream/20 z-20"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              onClick={nextImage}
              whileHover={{ scale: 1.1, opacity: 1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={20} />
            </motion.button>
          </>
        )}

        {/* Swipe hint animation - shows briefly */}
        <motion.div
          className="absolute bottom-16 left-1/2 -translate-x-1/2 text-cream/60 font-handwritten text-sm pointer-events-none"
          initial={{ opacity: 0, x: "-50%" }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            x: ["-50%", "-40%", "-60%", "-50%"]
          }}
          transition={{ 
            duration: 2,
            delay: 1,
            times: [0, 0.2, 0.8, 1],
            repeat: 0
          }}
        >
          ← swipe →
        </motion.div>
      </div>

      {/* Image indicators - always visible and tappable */}
      {images.length > 1 && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
          {images.map((_, idx) => (
            <motion.button
              key={idx}
              className={`h-2 rounded-full transition-all border border-cream/30 ${
                idx === currentIndex 
                  ? "bg-primary w-6" 
                  : "bg-cream/30 w-2 hover:bg-cream/60"
              }`}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
