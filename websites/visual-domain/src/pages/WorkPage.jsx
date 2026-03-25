// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

function WorkPage() {
  return (
    <div className="work-page relative bg-black w-full  ">
      <motion.h1
        initial={{
          rotateX: 60,
          transformOrigin: "top",
          transformPerspective: 3000,
        }}
        whileInView={{ rotateX: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-[20rem] sticky top-0 text-white text-center font-bold -tracking-[0.09em] leading-none mb-5"
      >
        WORK
      </motion.h1>
      {[
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      ].map((img, index) => (
        <div
          key={index}
          className="w-[95%] sticky top-[40%] h-[80vh] bg-neutral-900 mx-auto rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl "
          style={{ top: `${40 + index * 5}%` }} // Staggered sticky effect
        >
          <img
            src={img}
            alt={`Work ${index + 1}`}
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
          />
        </div>
      ))}
    </div>
  );
}

export default WorkPage;
