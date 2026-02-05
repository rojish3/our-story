import { StarField } from "@/components/StarField";
import { FloatingHearts } from "@/components/FloatingHearts";
import { ShootingStars } from "@/components/ShootingStars";
import { SunsetGlow } from "@/components/SunsetGlow";
import { FloatingClouds } from "@/components/FloatingClouds";
import { HeroSection } from "@/components/HeroSection";
import { MemorySection } from "@/components/MemorySection";
import { TransitionSection } from "@/components/TransitionSection";
import { ProposalSection } from "@/components/ProposalSection";
 import { BackgroundMusic } from "@/components/BackgroundMusic";

// Memory images - using curated sunset/sky themed images
const memories = [
  {
    images: [
      "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&q=80",
      "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&q=80",
      "https://images.unsplash.com/photo-1503803548695-c2a7b4a5b875?w=800&q=80",
    ],
    caption: "Remember that sunset? I knew then that every moment with you would be painted in gold...",
    date: "That sunset we loved",
    hoverMessage: "I still feel the warmth of your hand in mine.",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=800&q=80",
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80",
      "https://images.unsplash.com/photo-1489914099268-1dad649f76bf?w=800&q=80",
    ],
    caption: "Those quiet mornings, our coffee talks... where we fell in love with the little things.",
    date: "Our favorite café",
    hoverMessage: "Your laugh over coffee is my favorite sound.",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1532074534361-bb09a38cf917?w=800&q=80",
      "https://images.unsplash.com/photo-1464852045489-bccb7d17fe39?w=800&q=80",
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
    ],
    caption: "Walking under city lights, you made every street feel like a fairytale...",
    date: "Night adventures",
    hoverMessage: "Every step with you is an adventure.",
  },
  {
    images: [
      "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80",
    ],
    caption: "Simple moments became treasures when you were there beside me.",
    date: "That perfect day",
    hoverMessage: "You make ordinary moments extraordinary.",
  },
];

const Index = () => {
  return (
    <div className="relative bg-night-gradient min-h-screen overflow-x-hidden">
      {/* Background effects - layered for depth */}
      <SunsetGlow />
      <StarField />
      <ShootingStars />
      <FloatingClouds />
      <FloatingHearts />
 
       {/* Background Music Player */}
       <BackgroundMusic />

      {/* Hero Section */}
      <HeroSection />

      {/* First transition */}
      <TransitionSection text="Every moment with you became a memory I'd never want to forget..." />

      {/* Memory sections */}
      {memories.map((memory, index) => (
        <MemorySection
          key={index}
          images={memory.images}
          caption={memory.caption}
          date={memory.date}
          index={index}
          hoverMessage={memory.hoverMessage}
        />
      ))}

      {/* Final transition before proposal */}
      <TransitionSection text="And now, there's one last thing I need to say..." />

      {/* The Proposal */}
      <ProposalSection />

      {/* Footer */}
      <footer className="py-12 text-center relative z-10">
        <p className="font-handwritten text-cream-soft/40 text-lg">
          Made with all my heart, just for you 💕
        </p>
      </footer>
    </div>
  );
};

export default Index;
