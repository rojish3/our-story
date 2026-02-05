import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Heart, Sparkles, Stars } from "lucide-react";
import { TypewriterText } from "./TypewriterText";
import { ConfettiExplosion } from "./ConfettiExplosion";
import { supabase } from "@/integrations/supabase/client";

export const ProposalSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showButtons, setShowButtons] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswer = async (response: string) => {
    setAnswered(true);
    setShowConfetti(true);

    // Save response to database
    try {
      await supabase.from("valentine_responses").insert({
        response: response,
        message: `She said ${response}!`,
      });
    } catch (error) {
      console.error("Error saving response:", error);
    }
  };

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {showConfetti && <ConfettiExplosion />}

      {/* Floating sparkle particles */}
      {isInView && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: `${10 + (i * 7) % 80}%`, 
                y: "110%",
                opacity: 0 
              }}
              animate={{ 
                y: "-10%",
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 8 + (i % 4) * 2,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "linear"
              }}
            >
              <Stars 
                className="text-gold-warm/40" 
                size={8 + (i % 3) * 4} 
              />
            </motion.div>
          ))}
        </div>
      )}

      <div className="text-center max-w-2xl relative z-20">
        {/* Glowing backdrop */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-primary/15 rounded-full blur-3xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gold-warm/15 rounded-full blur-2xl"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-rose-soft/20 rounded-full blur-xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {!answered ? (
          <>
            <TypewriterText
              text="I've shared every moment here for a reason..."
              className="font-display text-2xl md:text-3xl text-cream-soft italic mb-12 block"
              speed={60}
              delay={500}
              onComplete={() => {
                setTimeout(() => setShowButtons(true), 1500);
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showButtons ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              {/* Sparkles decoration */}
              <motion.div
                className="flex justify-center gap-8 mb-6"
                initial={{ opacity: 0 }}
              animate={showButtons ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6 }}
              >
              <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Sparkles className="w-5 h-5 text-gold-warm" />
              </motion.div>
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <Sparkles className="w-4 h-4 text-rose-soft" />
              </motion.div>
              <motion.div animate={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>
                <Sparkles className="w-5 h-5 text-gold-warm" />
              </motion.div>
              </motion.div>
              
            <motion.h2 
              className="font-handwritten text-5xl md:text-7xl text-gradient-rose mb-4"
              initial={{ scale: 0.9 }}
              animate={showButtons ? { scale: 1 } : { scale: 0.9 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              Will you be my Valentine?
            </motion.h2>
              <motion.div
              animate={{ 
                scale: [1, 1.25, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 1.2, repeat: Infinity }}
                className="inline-block"
              >
              <Heart className="w-12 h-12 text-primary mx-auto drop-shadow-[0_0_15px_hsl(350_80%_65%/0.6)]" fill="currentColor" />
              </motion.div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={showButtons ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.button
                onClick={() => handleAnswer("Yes")}
              className="px-14 py-5 bg-gradient-to-r from-primary to-rose-deep text-primary-foreground font-display text-xl rounded-full transition-all duration-300 relative overflow-hidden group shadow-[0_0_40px_hsl(350_80%_65%/0.4)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Yes 💖</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-rose-deep to-primary"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              </motion.button>
              <motion.button
                onClick={() => handleAnswer("Of course")}
              className="px-14 py-5 bg-gradient-to-r from-gold-warm to-gold-soft text-night-deep font-display text-xl rounded-full transition-all duration-300 relative overflow-hidden group shadow-[0_0_30px_hsl(35_70%_55%/0.3)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Of course 💕</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-gold-soft to-gold-warm"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              </motion.button>
            </motion.div>
          </>
        ) : (
          <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-h-[80vh] flex flex-col items-center"
          >
            {/* Multiple hearts */}
            <motion.div className="flex justify-center gap-4 mb-8">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: [1, 1.2, 1],
                    y: 0 
                  }}
                  transition={{ 
                    delay: i * 0.1,
                    scale: { 
                      duration: 1, 
                      repeat: Infinity, 
                      delay: i * 0.2 
                    }
                  }}
                >
                  <Heart 
                    className={`text-primary drop-shadow-lg ${
                  i === 2 ? "w-14 h-14" : i === 1 || i === 3 ? "w-9 h-9" : "w-5 h-5"
                    }`} 
                    fill="currentColor" 
                  />
                </motion.div>
              ))}
            </motion.div>
            
        <h2 className="font-handwritten text-4xl md:text-6xl text-gradient-rose mb-4">
              You just made me the happiest person alive
            </h2>
        <p className="font-display text-lg md:text-xl text-cream-soft italic mb-6">
              I can't wait to spend every moment with you...
            </p>
            
            {/* Love message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
          className="mt-8 p-5 glass rounded-2xl max-w-sm mx-auto"
            >
          <p className="font-handwritten text-xl text-gold-warm mb-2">
                Forever & Always
              </p>
          <p className="font-display text-sm md:text-base text-cream-soft/80 italic">
                Like the sunset we love watching together, my love for you only grows more beautiful with time ✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
