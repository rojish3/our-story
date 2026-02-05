 import { useState, useRef, useEffect } from "react";
 import { motion, AnimatePresence } from "framer-motion";
import { Music } from "lucide-react";
 
 export const BackgroundMusic = () => {
   const [isPlaying, setIsPlaying] = useState(false);
   const [showHint, setShowHint] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
   const audioRef = useRef<HTMLAudioElement>(null);
 
  // Romantic ambient music - royalty free from Pixabay
  const musicUrl = "https://cdn.pixabay.com/audio/2022/10/25/audio_5cf04b4e25.mp3";
 
   useEffect(() => {
     // Hide hint after 5 seconds
     const timer = setTimeout(() => setShowHint(false), 5000);
     return () => clearTimeout(timer);
   }, []);
 
  const toggleMusic = async () => {
    if (!audioRef.current) return;
    
    setHasInteracted(true);
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Reset and configure audio
        audioRef.current.volume = 0.4;
        audioRef.current.currentTime = 0;
        
        // Attempt to play
        await audioRef.current.play();
        setIsPlaying(true);
       }
    } catch (error) {
      console.log("Audio playback failed:", error);
      // On mobile, some browsers require the audio to be loaded first
      audioRef.current.load();
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (retryError) {
        console.log("Retry failed:", retryError);
      }
     }
    
    setShowHint(false);
   };
 
   return (
     <>
       <audio
         ref={audioRef}
         src={musicUrl}
         loop
         preload="auto"
        playsInline
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
              className="bg-card/95 backdrop-blur-md px-5 py-2.5 rounded-full border border-primary/30 shadow-lg"
               initial={{ opacity: 0, x: 10 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 10 }}
             >
              <p className="font-handwritten text-cream text-base whitespace-nowrap">
                Tap to play our song 🎵
               </p>
             </motion.div>
           )}
         </AnimatePresence>
 
         {/* Music toggle button */}
         <motion.button
           onClick={toggleMusic}
          className={`w-14 h-14 rounded-full backdrop-blur-sm flex items-center justify-center shadow-xl transition-colors duration-300 ${
            isPlaying 
              ? "bg-primary/90 text-primary-foreground border-2 border-primary" 
              : "bg-card/90 text-cream border border-border/50 hover:border-primary/50"
          }`}
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.95 }}
           animate={isPlaying ? {
             boxShadow: [
               "0 0 30px hsl(350 80% 65% / 0.5)",
              "0 0 50px hsl(350 80% 65% / 0.7)",
              "0 0 30px hsl(350 80% 65% / 0.5)",
             ]
          } : {
            boxShadow: "0 4px 20px hsl(0 0% 0% / 0.3)"
          }}
           transition={isPlaying ? {
            duration: 1.5,
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