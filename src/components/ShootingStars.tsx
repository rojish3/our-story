 import { motion } from "framer-motion";
 import { useEffect, useState } from "react";
 
 interface ShootingStar {
   id: number;
   startX: number;
   startY: number;
   delay: number;
   duration: number;
 }
 
 export const ShootingStars = () => {
   const [stars, setStars] = useState<ShootingStar[]>([]);
 
   useEffect(() => {
     const generateStars = () => {
       const newStars: ShootingStar[] = [];
       // Only 2 shooting stars - very rare
       for (let i = 0; i < 2; i++) {
         newStars.push({
           id: i,
           startX: Math.random() * 40 + 10,
           startY: Math.random() * 20 + 5,
           delay: Math.random() * 15 + i * 25,
           duration: Math.random() * 0.4 + 0.5,
         });
       }
       setStars(newStars);
     };
     generateStars();
   }, []);
 
   return (
     <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
       {stars.map((star) => (
         <motion.div
           key={star.id}
           className="absolute"
           style={{
             left: `${star.startX}%`,
             top: `${star.startY}%`,
           }}
           initial={{ opacity: 0, x: 0, y: 0 }}
           animate={{
             opacity: [0, 0.9, 0.9, 0],
             x: [0, 150, 280],
             y: [0, 120, 220],
           }}
           transition={{
             duration: star.duration,
             delay: star.delay,
             repeat: Infinity,
             repeatDelay: Math.random() * 35 + 30,
             ease: "easeOut",
           }}
         >
           {/* Shooting star with integrated tail using SVG for precision */}
           <svg
             width="60"
             height="3"
             viewBox="0 0 60 3"
             className="overflow-visible"
             style={{ transform: "rotate(40deg)" }}
           >
             {/* Tail gradient - fades from transparent to bright */}
             <defs>
               <linearGradient id={`tail-${star.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="rgba(255,250,240,0)" />
                 <stop offset="60%" stopColor="rgba(255,250,240,0.3)" />
                 <stop offset="90%" stopColor="rgba(255,250,240,0.7)" />
                 <stop offset="100%" stopColor="rgba(255,250,240,1)" />
               </linearGradient>
               <filter id={`glow-${star.id}`}>
                 <feGaussianBlur stdDeviation="0.5" result="blur" />
                 <feMerge>
                   <feMergeNode in="blur" />
                   <feMergeNode in="SourceGraphic" />
                 </feMerge>
               </filter>
             </defs>
             {/* Tail line */}
             <line
               x1="0"
               y1="1.5"
               x2="58"
               y2="1.5"
               stroke={`url(#tail-${star.id})`}
               strokeWidth="1"
               strokeLinecap="round"
             />
             {/* Star head - small bright point at the end */}
             <circle
               cx="59"
               cy="1.5"
               r="1"
               fill="rgba(255,250,240,1)"
               filter={`url(#glow-${star.id})`}
             />
           </svg>
         </motion.div>
       ))}
     </div>
   );
 };
