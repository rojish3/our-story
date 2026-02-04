import { motion } from "framer-motion";

interface Cloud {
  id: number;
  x: number;
  y: number;
  scale: number;
  duration: number;
  delay: number;
}

const clouds: Cloud[] = [
  { id: 1, x: 10, y: 15, scale: 1, duration: 60, delay: 0 },
  { id: 2, x: 60, y: 25, scale: 0.7, duration: 80, delay: 10 },
  { id: 3, x: 30, y: 8, scale: 0.5, duration: 70, delay: 20 },
  { id: 4, x: 80, y: 35, scale: 0.8, duration: 90, delay: 5 },
  { id: 5, x: -10, y: 20, scale: 0.6, duration: 75, delay: 15 },
];

const CloudShape = ({ scale }: { scale: number }) => (
  <div 
    className="relative"
    style={{ transform: `scale(${scale})` }}
  >
    <div className="w-16 h-6 bg-cream/5 rounded-full blur-md" />
    <div className="absolute -top-2 left-2 w-10 h-5 bg-cream/5 rounded-full blur-md" />
    <div className="absolute -top-1 left-6 w-8 h-4 bg-cream/5 rounded-full blur-md" />
  </div>
);

export const FloatingClouds = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{
            top: `${cloud.y}%`,
            left: `${cloud.x}%`,
          }}
          animate={{
            x: ["0%", "100vw"],
          }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <CloudShape scale={cloud.scale} />
        </motion.div>
      ))}
    </div>
  );
};
