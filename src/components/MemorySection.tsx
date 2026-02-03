import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface MemorySectionProps {
  image: string;
  caption: string;
  date?: string;
  index: number;
  hoverMessage?: string;
}

export const MemorySection = ({
  image,
  caption,
  date,
  index,
  hoverMessage,
}: MemorySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-20"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className={`flex flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-8 md:gap-16 max-w-5xl`}
      >
        {/* Photo */}
        <motion.div
          className="relative group cursor-pointer flex-shrink-0"
          initial={{ opacity: 0, x: isEven ? -50 : 50, filter: "blur(20px)" }}
          animate={
            isInView
              ? { opacity: 1, x: 0, filter: "blur(0px)" }
              : { opacity: 0, x: isEven ? -50 : 50, filter: "blur(20px)" }
          }
          transition={{ duration: 1, delay: 0.2 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative overflow-hidden rounded-lg shadow-2xl">
            <motion.img
              src={image}
              alt={caption}
              className="w-72 h-96 md:w-80 md:h-[28rem] object-cover"
              initial={{ filter: "grayscale(100%)" }}
              animate={isInView ? { filter: "grayscale(0%)" } : { filter: "grayscale(100%)" }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-deep/60 via-transparent to-transparent" />
            
            {/* Hover message */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-night-deep/70 p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-cream font-handwritten text-2xl text-center leading-relaxed">
                {hoverMessage || "This reminds me of you smiling..."}
              </p>
            </motion.div>
          </div>
          
          {/* Date tag */}
          {date && (
            <motion.span
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm px-4 py-1 rounded-full text-cream-soft font-handwritten text-sm border border-border/50"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.8 }}
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
    </motion.div>
  );
};
