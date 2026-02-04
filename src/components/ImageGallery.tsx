import { motion, AnimatePresence } from "framer-motion";
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

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Memory ${currentIndex + 1}`}
            className="w-72 h-96 md:w-80 md:h-[28rem] object-cover"
            initial={{ opacity: 0, scale: 1.1, filter: "grayscale(100%)" }}
            animate={isInView ? { 
              opacity: 1, 
              scale: 1, 
              filter: "grayscale(0%)" 
            } : { 
              opacity: 0, 
              scale: 1.1, 
              filter: "grayscale(100%)" 
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        
        {/* Sunset gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-night-deep/70 via-rose-deep/10 to-gold-warm/5" />
        
        {/* Hover message */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-night-deep/70 backdrop-blur-sm p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-cream font-handwritten text-2xl text-center leading-relaxed">
            {hoverMessage || "This reminds me of you smiling..."}
          </p>
        </motion.div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <motion.button
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-night-deep/60 backdrop-blur-sm flex items-center justify-center text-cream/80 hover:text-cream hover:bg-night-deep/80 transition-all"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              onClick={prevImage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-night-deep/60 backdrop-blur-sm flex items-center justify-center text-cream/80 hover:text-cream hover:bg-night-deep/80 transition-all"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              onClick={nextImage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={18} />
            </motion.button>
          </>
        )}
      </div>

      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <motion.button
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? "bg-primary w-4" : "bg-cream/40"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
