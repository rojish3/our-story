 import { motion, useScroll, useTransform } from "framer-motion";
 import { useRef } from "react";
 
 interface ScrollGalleryProps {
   images: string[];
   isEven: boolean;
   hoverMessage?: string;
 }
 
 export const ScrollGallery = ({ images, isEven, hoverMessage }: ScrollGalleryProps) => {
   const containerRef = useRef<HTMLDivElement>(null);
   
   const { scrollYProgress } = useScroll({
     target: containerRef,
     offset: ["start end", "end start"],
   });
 
   // Calculate which image should be visible based on scroll
   const imageIndex = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 2, 2]);
   
   // Parallax effect for depth
   const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
   const y2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
   const y3 = useTransform(scrollYProgress, [0, 1], [20, -20]);
   
   // Scale and opacity transforms for each image
   const scale1 = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0.9, 1, 1, 0.85]);
   const opacity1 = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
   
   const scale2 = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0.9, 1, 1, 0.85]);
   const opacity2 = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0]);
   
   const scale3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.9], [0.9, 1, 1, 1]);
   const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.9], [0, 1, 1, 0.8]);
 
   // Rotation for a subtle 3D feel
   const rotate1 = useTransform(scrollYProgress, [0.15, 0.3, 0.45], [isEven ? -3 : 3, 0, isEven ? 3 : -3]);
   const rotate2 = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [isEven ? 3 : -3, 0, isEven ? -3 : 3]);
   const rotate3 = useTransform(scrollYProgress, [0.55, 0.7, 0.85], [isEven ? -2 : 2, 0, 0]);
 
   return (
     <div 
       ref={containerRef}
       className="relative w-72 h-96 md:w-80 md:h-[28rem] perspective-1000"
     >
       {/* Decorative frame */}
       <div className="absolute inset-0 rounded-xl border border-cream/10 -m-2 pointer-events-none" />
       
       {/* Stacked images with scroll-based reveal */}
       <div className="relative w-full h-full">
         {/* Image 1 - starts visible */}
         <motion.div
           className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl"
           style={{
             y: y1,
             scale: scale1,
             opacity: opacity1,
             rotateZ: rotate1,
             zIndex: 3,
           }}
         >
           <img
             src={images[0]}
             alt="Memory 1"
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-night-deep/60 via-transparent to-transparent" />
         </motion.div>
 
         {/* Image 2 - reveals as you scroll */}
         <motion.div
           className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl"
           style={{
             y: y2,
             scale: scale2,
             opacity: opacity2,
             rotateZ: rotate2,
             zIndex: 2,
           }}
         >
           <img
             src={images[1] || images[0]}
             alt="Memory 2"
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-night-deep/60 via-transparent to-transparent" />
         </motion.div>
 
         {/* Image 3 - final image */}
         <motion.div
           className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl"
           style={{
             y: y3,
             scale: scale3,
             opacity: opacity3,
             rotateZ: rotate3,
             zIndex: 1,
           }}
         >
           <img
             src={images[2] || images[0]}
             alt="Memory 3"
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-night-deep/60 via-transparent to-transparent" />
         </motion.div>
       </div>
 
       {/* Soft glow behind images */}
       <motion.div
         className="absolute inset-0 -z-10 rounded-full blur-3xl"
         style={{
           background: "radial-gradient(circle, hsl(350 80% 65% / 0.15) 0%, transparent 70%)",
           scale: useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1.2]),
         }}
       />
 
       {/* Hover message that appears on scroll */}
       {hoverMessage && (
         <motion.div
           className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full text-center"
           style={{
             opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.85], [0, 1, 1, 0]),
           }}
         >
           <p className="font-handwritten text-cream-soft/80 text-lg italic">
             "{hoverMessage}"
           </p>
         </motion.div>
       )}
     </div>
   );
 };