import React, { useRef, useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "motion/react";

const CAROUSEL_ITEMS = [
  {
    id: 1,
    title: "A hub of creative excellence",
    description:
      "Ideate and collaborate with a nationwide network of animation, live action and post-production specialists, all under one roof.",
    imgUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Global Production Power",
    description:
      "Seamlessly integrating talent from around the world to deliver cinematic visuals that push the boundaries of storytelling.",
    imgUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Next-Gen Technology",
    description:
      "Harnessing real-time rendering and AI-driven workflows to create immersive experiences that redefine the industry standard.",
    imgUrl:
      "https://images.unsplash.com/photo-1766155072335-ab7e0465c35b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
  },
];

const TextSection = ({ item, setFeatureId }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      setFeatureId(item.id);
    }
  }, [isInView, item.id, setFeatureId]);

  return (
    <div
      ref={ref}
      className="h-screen w-full flex flex-col justify-center overflow-x-hidden group"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md"
      >
        <h2 className="text-4xl text-neutral-200 font-bold mb-6 group-hover:text-white transition-colors duration-300">
          {item.title}
        </h2>
        <p className="text-xl text-neutral-400 leading-relaxed font-light">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
};

const VisualSection = ({ items, featureId }) => {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: featureId === item.id ? 1 : 0,
            scale: featureId === item.id ? 1 : 1.1,
            zIndex: featureId === item.id ? 10 : 0,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-neutral-900"
        >
          <img
            src={item.imgUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}

      {/* Overlay Gradient for premium feel */}
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />
    </div>
  );
};

export default function Carousal() {
  const [featureId, setFeatureId] = useState(CAROUSEL_ITEMS[0].id);

  return (
    <div className="w-full bg-black ">
      {/* Spacer for navbar if needed */}
      {/* <div className="h-24" />  */}

      <div className="w-[90%] mx-auto flex items-start px-12 ">
        {/* Left: Sticky Visual */}
        <div className="w-[45%] h-screen sticky top-0 flex items-center justify-center p-12">
          <VisualSection items={CAROUSEL_ITEMS} featureId={featureId} />
        </div>

        {/* Right: Scrolling Text */}
        <div className="w-[55%] min-h-screen">
          {CAROUSEL_ITEMS.map((item) => (
            <TextSection
              key={item.id}
              item={item}
              setFeatureId={setFeatureId}
            />
          ))}
          {/* Extra generic space at bottom to allow last item to clear nicely if needed */}
          <div className="h-[20vh]" />
        </div>
      </div>
    </div>
  );
}
