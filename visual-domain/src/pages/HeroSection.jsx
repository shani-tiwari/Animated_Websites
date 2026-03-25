import React, { useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "../utils/cn";
import Button from "../components/Button";
import BtnNav from "../components/BtnNav";

function HeroSection() {
  const items = ["Work", "About", "Insights", "Solutions", "Solution brief"];
  const [active, setActive] = useState(true);

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // offset: ["start end", "end end"],
  });

  const width = useTransform(scrollYProgress, [0, 1], ["25%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 1], ["35%", "100%"]);

  return (
    <>
      {/* backnav */}
      {!active && (
        <motion.div
          // initial={{ height: 0 }}
          // animate={{ height: 'full' }}
          // exit={{ height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={cn(
            `back-nav flex items-center justify-between gap-2 text-2xl px-8 pb-10 py-6 overflow-hidden
               ${active && "h-42"} transition-all duration-500 easeInOut `
          )}
        >
          <h1 className="mb-6">Let's Talk</h1>
          <div className="flex gap-2 px-3 py-2 rounded-lg">
            {items.map((item, idx) => (
              <Button key={idx} name={item} idx={idx} />
            ))}
          </div>
          <h1
            className="mb-6 cursor-pointer"
            onClick={() => setActive(!active)}
          >
            Close
          </h1>
        </motion.div>
      )}

      {/* hero page */}
      <motion.main
        className={cn(
          `hero-section min-h-[205vh] max-w-screen bg-linear-to-b from-neutral-100 via-neutral-700 to-neutral-800 
         ${
           active === false
             ? " w-[97%] mx-auto rounded-t-3xl "
             : " w-full mx-auto"
         } transition-all duration-400  ease-in-out`
        )}
      >
        {/* nav */}
        {active && (
          <div className="font-medium flex justify-between items-center px-6 py-2 text-xl text-black">
            <BtnNav name="Let's Talk" />
            <BtnNav name="VISUAL DOMAIN" />
            <div onClick={() => setActive(!active)} className="menu">
              <BtnNav name="Menu" />
            </div>
          </div>
        )}

        {/* hero Text */}
        <motion.span
          initial={{
            rotateX: 60,
            transformOrigin: "top",
            transformPerspective: 3000,
          }}
          animate={{ rotateX: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            textShadow:
              "0px 4px 3px rgba(0,0,0,0.2), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
          }}
          className="w-full inline-block text-center text-[340px] mx-auto overflow-hidden text-black font-bold  -tracking-[0.09em] "
        >
          WE CRAFT
        </motion.span>

        {/* next page text */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="text-5xl text-black mt-6 text-center -mb-20 "
        >
          Stories, Not Just Content
        </motion.h1>

        {/* video box scroll animation */}
        <div ref={containerRef} className="relative h-[200vh] ">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
            <motion.div
              style={{ width, height }}
              className="bg-neutral-950 shadow-2xl rounded-2xl overflow-hidden relative"
            >
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop"
                alt="Visual Domain Work"
                className="w-full h-full object-cover"
              />
              {/* Optional overlay for better text contrast if we add text later */}
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </motion.main>
    </>
  );
}

export default HeroSection;
