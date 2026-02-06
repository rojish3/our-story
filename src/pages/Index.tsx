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
import sunset1 from "@/assets/memories/sunset1.jpg";
import sunset2 from "@/assets/memories/sunset2.jpg";
import cafe1 from "@/assets/memories/cafe1.jpg";
import cafe2 from "@/assets/memories/cafe2.jpg";
import us1 from "@/assets/memories/us1.jpg";
import us2 from "@/assets/memories/us2.jpg";
import us3 from "@/assets/memories/us3.jpg";
import together1 from "@/assets/memories/together1.jpg";
import together2 from "@/assets/memories/together2.jpg";

// Memory images - using curated sunset/sky themed images
const memories = [
  {
    images: [sunset1, sunset2],
    caption:
      "Remember that sunset? I knew then that every moment with you would be painted in gold...",
    date: "That sunset we loved",
    hoverMessage: "I still feel the warmth of your hand in mine.",
  },
  {
    images: [cafe1, cafe2],
    caption:
      "Those cafe dates, our coffee talks... where we fell in love with the little things.",
    date: "Our favorite café",
    hoverMessage: "Your laugh over coffee is my favorite sound.",
  },
  {
    images: [us1, us2, us3],
    caption:
      "Exploring new places together, turning unfamiliar streets into shared memories, and realizing that every journey felt complete just because I was walking it with you.",
    date: "You & me",
    hoverMessage: "Getting lost in new places, but never losing each other. ",
  },
  {
    images: [together1, together2],
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
