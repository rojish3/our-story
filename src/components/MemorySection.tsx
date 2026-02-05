import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ImageGallery } from "./ImageGallery";

interface MemorySectionProps {
  images: string[];
  caption: string;
  date?: string;
  index: number;
  hoverMessage?: string;
}

export const MemorySection = ({
  images,
  caption,
  date,
  index,
  hoverMessage,
}: MemorySectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-6 py-20"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className={`flex flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-10 md:gap-16 max-w-5xl`}
      >
        {/* Auto-shuffling Photo Gallery */}
        <motion.div 
          className="relative flex-shrink-0"
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ImageGallery
            images={images}
            isInView={isInView}
            hoverMessage={hoverMessage}
          />
          
          {/* Date tag */}
          {date && (
            <motion.span
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm px-5 py-2 rounded-full text-cream-soft font-handwritten text-sm border border-border/50"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {date}
            </motion.span>
          )}
        </motion.div>

        {/* Caption */}
        <motion.div
          className="text-center md:text-left max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="font-handwritten text-3xl md:text-4xl text-cream leading-relaxed">
            {caption}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
