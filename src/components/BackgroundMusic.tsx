 import { useState, useRef, useEffect } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { Music, Volume2, VolumeX } from "lucide-react";
 
 export const BackgroundMusic = () => {
   const [isPlaying, setIsPlaying] = useState(false);
   const [showHint, setShowHint] = useState(true);
   const audioRef = useRef<HTMLAudioElement>(null);
 
   // Romantic ambient music - royalty free
   const musicUrl = "https://cdn.pixabay.com/audio/2024/11/04/audio_e5b4e8edd3.mp3";
 
   useEffect(() => {
     // Hide hint after 5 seconds
     const timer = setTimeout(() => setShowHint(false), 5000);
     return () => clearTimeout(timer);
   }, []);
 
   const toggleMusic = () => {
     if (audioRef.current) {
       if (isPlaying) {
         audioRef.current.pause();
       } else {
         audioRef.current.play();
       }
       setIsPlaying(!isPlaying);
       setShowHint(false);
     }
   };
 
   return (
     <>
       <audio
         ref={audioRef}
         src={musicUrl}
         loop
         preload="auto"
       />
       
       {/* Floating music button */}
       <motion.div
         className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 2, duration: 0.8 }}
       >
         {/* Play hint */}
         <AnimatePresence>
           {showHint && !isPlaying && (
             <motion.div
               className="bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50"
               initial={{ opacity: 0, x: 10 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 10 }}
             >
               <p className="font-handwritten text-cream-soft text-sm whitespace-nowrap">
                 Play our song? 🎵
               </p>
             </motion.div>
           )}
         </AnimatePresence>
 
         {/* Music toggle button */}
         <motion.button
           onClick={toggleMusic}
           className="w-14 h-14 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center text-cream shadow-lg"
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.95 }}
           animate={isPlaying ? {
             boxShadow: [
               "0 0 20px hsl(350 80% 65% / 0.3)",
               "0 0 30px hsl(350 80% 65% / 0.5)",
               "0 0 20px hsl(350 80% 65% / 0.3)",
             ]
           } : {}}
           transition={isPlaying ? {
             duration: 2,
             repeat: Infinity,
             ease: "easeInOut"
           } : {}}
         >
           {isPlaying ? (
             <motion.div
               className="flex items-center gap-0.5"
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
             >
               {/* Animated equalizer bars */}
               {[0, 1, 2].map((i) => (
                 <motion.div
                   key={i}
                   className="w-1 bg-primary rounded-full"
                   animate={{
                     height: ["8px", "20px", "12px", "18px", "8px"],
                   }}
                   transition={{
                     duration: 0.8,
                     repeat: Infinity,
                     delay: i * 0.15,
                     ease: "easeInOut",
                   }}
                 />
               ))}
             </motion.div>
           ) : (
             <Music size={24} />
           )}
         </motion.button>
       </motion.div>
     </>
   );
 };