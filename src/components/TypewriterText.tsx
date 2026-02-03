import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export const TypewriterText = ({
  text,
  className = "",
  speed = 50,
  delay = 0,
  onComplete,
}: TypewriterTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isInView || started) return;

    const timeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, delay, started]);

  useEffect(() => {
    if (!started) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]);

  return (
    <div ref={ref}>
      <motion.span
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
      >
        {displayedText}
        {started && displayedText.length < text.length && (
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block ml-1"
          >
            |
          </motion.span>
        )}
      </motion.span>
    </div>
  );
};
