import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
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
      className="min-h-screen flex items-center justify-center px-6 py-20 relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {showConfetti && <ConfettiExplosion />}

      <div className="text-center max-w-2xl relative z-20">
        {/* Glowing backdrop */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-warm/10 rounded-full blur-2xl animate-pulse" />
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
                animate={showButtons ? { opacity: 1 } : { opacity: 0 }}
              >
                <Sparkles className="w-5 h-5 text-gold-warm animate-pulse" />
                <Sparkles className="w-4 h-4 text-rose-soft animate-pulse animation-delay-200" />
                <Sparkles className="w-5 h-5 text-gold-warm animate-pulse animation-delay-400" />
              </motion.div>
              
              <h2 className="font-handwritten text-5xl md:text-7xl text-gradient-rose mb-4">
                Will you be my Valentine?
              </h2>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block"
              >
                <Heart className="w-10 h-10 text-primary mx-auto drop-shadow-lg" fill="currentColor" />
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
                className="px-12 py-4 bg-gradient-to-r from-primary to-rose-deep text-primary-foreground font-display text-xl rounded-full glow-rose transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Yes 💖</span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-deep to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
              <motion.button
                onClick={() => handleAnswer("Of course")}
                className="px-12 py-4 bg-gradient-to-r from-gold-warm to-gold-soft text-night-deep font-display text-xl rounded-full transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Of course 💕</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-soft to-gold-warm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
                      i === 2 ? "w-16 h-16" : i === 1 || i === 3 ? "w-10 h-10" : "w-6 h-6"
                    }`} 
                    fill="currentColor" 
                  />
                </motion.div>
              ))}
            </motion.div>
            
            <h2 className="font-handwritten text-5xl md:text-7xl text-gradient-rose mb-6">
              You just made me the happiest person alive
            </h2>
            <p className="font-display text-xl md:text-2xl text-cream-soft italic mb-8">
              I can't wait to spend every moment with you...
            </p>
            
            {/* Love message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="mt-12 p-6 glass rounded-2xl max-w-md mx-auto"
            >
              <p className="font-handwritten text-2xl text-gold-warm mb-2">
                Forever & Always
              </p>
              <p className="font-display text-cream-soft/80 italic">
                Like the sunset we love watching together, my love for you only grows more beautiful with time ✨
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
