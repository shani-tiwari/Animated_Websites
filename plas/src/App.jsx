import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(useGSAP);

const word = [
  { first: "L", remain: "isten" },
  { first: "P", remain: "lan" },
  { first: "A", remain: "nalyze" },
  { first: "S", remain: "hape" },
];

function App() {
  const ref = useRef(null);

  useGSAP(() => {

      const container =  ref.current;
      const letters   =  gsap.utils.toArray(".letter", container);
      const masks     =  gsap.utils.toArray(".mask", container);
      const remains   =  gsap.utils.toArray(".remain", container);

      // Measure BEFORE applying any transform: how far each first letter
      // must shift so it sits at the horizontal center of the container.
      const box = container.getBoundingClientRect();
      const centerX = box.left + box.width / 2;

      const offsets = letters.map((el) => {
        const r = el.getBoundingClientRect();
        return centerX - (r.left + r.width / 2);
      });

      // Start state
      gsap.set(letters, { x: (i) => offsets[i] });  // with no mask also look good
      gsap.set(masks, { x: (i) => offsets[i] });
      gsap.set(letters, { opacity: 0, filter: "blur(12px)" });
      gsap.set(remains, { xPercent: -100 });

      const tl = gsap.timeline();

      // 1) First letters appear one by one 
      tl.to(letters, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.3,
      })
        // 2) All letters (and their masks) move to the left column together
        .to( [letters, masks],
          { x: 0, duration: 0.9, ease: "power3.inOut" },
          "+=0.2"
        )
        // remaining texts slide out from behind, together
        .to( remains,
          { xPercent: 0, duration: 0.9, ease: "power3.inOut" },
          "<"
        );
    },
    { scope: ref }
  );

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-slate-800">
      <div
        ref={ref}
        className="w-96 h-80 bg-black flex items-center justify-center text-white text-5xl"
      >
        {/* left-aligned block so all first letters form one column */}
        <div className="flex flex-col items-start">
          {word.map((l, i) => (
            <div key={i} className="word flex items-center">
              <span className="letter relative z-20 inline-block">
                {l.first}
              </span>
              <span className="mask inline-block overflow-hidden">
                <span className="remain inline-block ">{l.remain}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
