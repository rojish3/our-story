import { StarField } from "@/components/StarField";
import { FloatingHearts } from "@/components/FloatingHearts";
import { ShootingStars } from "@/components/ShootingStars";
import { SunsetGlow } from "@/components/SunsetGlow";
import { FloatingClouds } from "@/components/FloatingClouds";
import { HeroSection } from "@/components/HeroSection";
import { MemorySection } from "@/components/MemorySection";
import { TransitionSection } from "@/components/TransitionSection";
import { ProposalSection } from "@/components/ProposalSection";

// Import memory images
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";

const memories = [
  {
    images: [memory1], // You can add more images: [memory1, anotherImage1, ...]
    caption: "Remember that sunset? I knew then that every moment with you would be painted in gold...",
    date: "That sunset we loved",
    hoverMessage: "I still feel the warmth of your hand in mine.",
  },
  {
    images: [memory2], // Add more images here for this category
    caption: "Those quiet mornings, our coffee talks... where we fell in love with the little things.",
    date: "Our favorite café",
    hoverMessage: "Your laugh over coffee is my favorite sound.",
  },
  {
    images: [memory3], // Add more images here
    caption: "Walking under city lights, you made every street feel like a fairytale...",
    date: "Night adventures",
    hoverMessage: "Every step with you is an adventure.",
  },
  {
    images: [memory4], // Add more images here
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
