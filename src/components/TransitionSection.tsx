import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TransitionSectionProps {
  text: string;
}

export const TransitionSection = ({ text }: TransitionSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      className="min-h-[50vh] flex items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.p
        className="font-display text-2xl md:text-4xl text-cream-soft/80 text-center italic max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {text}
      </motion.p>
    </motion.section>
  );
};
