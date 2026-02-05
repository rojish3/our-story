 import { motion, useScroll, useTransform } from "framer-motion";
 import { useRef } from "react";
 import { ScrollGallery } from "./ScrollGallery";

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
   const isEven = index % 2 === 0;
   
   const { scrollYProgress } = useScroll({
     target: containerRef,
     offset: ["start end", "end start"],
   });
   
   // Fade in the entire section
   const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
   
   // Caption animation synced with scroll
   const captionY = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);
   const captionOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.75, 0.9], [0, 1, 1, 0]);

 
   return (
     <motion.div
       ref={containerRef}
       className="min-h-[150vh] flex items-center justify-center px-6 py-32 sticky-container"
       style={{ opacity: sectionOpacity }}
     >
       <div className="sticky top-1/2 -translate-y-1/2">
         <div
           className={`flex flex-col ${
             isEven ? "md:flex-row" : "md:flex-row-reverse"
           } items-center gap-12 md:gap-20 max-w-5xl`}
         >
           {/* Scroll-based Photo Gallery */}
           <div className="relative flex-shrink-0">
             <ScrollGallery
               images={images}
               isEven={isEven}
               hoverMessage={hoverMessage}
             />
             
             {/* Date tag */}
             {date && (
               <motion.span
                 className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-cream-soft font-handwritten text-sm border border-border/50 z-10"
                 style={{
                   opacity: useTransform(scrollYProgress, [0.25, 0.35, 0.75, 0.85], [0, 1, 1, 0]),
                 }}
               >
                 {date}
               </motion.span>
             )}
           </div>
 
           {/* Caption with scroll animation */}
           <motion.div
             className="text-center md:text-left max-w-md"
             style={{
               y: captionY,
               opacity: captionOpacity,
             }}
           >
             <p className="font-handwritten text-3xl md:text-4xl text-cream leading-relaxed">
               {caption}
             </p>
           </motion.div>
         </div>
       </div>
     </motion.div>
   );
};
