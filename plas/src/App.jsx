import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const groups = [
  [
    { first: "L", remain: "isten" },
    { first: "P", remain: "lan" },
  ],
  [
    { first: "A", remain: "nalyze" },
    { first: "S", remain: "hape" },
  ],
];

function App() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const container = ref.current;
      const letters   = gsap.utils.toArray(".letter", container);
      const masks     = gsap.utils.toArray(".mask", container);
      const remains   = gsap.utils.toArray(".remain", container);
      const groupEls  = gsap.utils.toArray(".group", container);
      const hero      = container.querySelector(".hero");
      const intro     = container.querySelector(".intro");

      // Measure BEFORE any transform is applied
      const box = container.getBoundingClientRect();
      const centerX = box.left + box.width / 2;

      const offsets = letters.map((el) => {
        const r = el.getBoundingClientRect();
        return centerX - (r.left + r.width / 2);
      });

      // Start state
      gsap.set(letters, { x: (i) => offsets[i] });
      gsap.set(masks, { x: (i) => offsets[i] });
      gsap.set(letters, { opacity: 0, filter: "blur(12px)" });
      gsap.set(remains, { xPercent: -100 });
      gsap.set(hero, { scale: 0 });

      const tl = gsap.timeline();

      // 1) First letters appear one by one in the center
      tl.to(letters, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.3,
      })
      // 2) Letters + masks move to the left column, remains reveal together
        .to([letters, masks], { x: 0, duration: 0.9, ease: "power3.inOut" }, "+=0.2")
        .to(remains, { xPercent: 0, duration: 0.9, ease: "power3.inOut" }, "<")

      // 3) Split phase: hero scales to 0.3 and groups move apart, together
      .addLabel("split", "+=0.4")
      .to(hero, { scale: 0.3, duration: 0.6, ease: "power3.inOut" }, "split")
      .to(
        groupEls[0],
        { x: () => -window.innerWidth * 0.2, duration: 0.7, ease: "power2.inOut" },
        "split"
      )
      .to(
        groupEls[1],
        { x: () => window.innerWidth * 0.2, duration: 0.7, ease: "power2.inOut" },
        "split"
      )

      // 0.2s break, then expand phase: hero grows while the text scales out and fades
      .addLabel("expand", "+=0.2")
      .to(hero, { scale: 1, duration: 1.6, ease: "power3.inOut" }, "expand")
      .to(
        groupEls,
        {
          scale: 0.5,
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
          onComplete: () => gsap.set(intro, { display: "none" }),
        },
        "expand"
      );
    },
    { scope: ref }
  );

  return (
    <main
      ref={ref}
      className="relative w-screen h-screen overflow-hidden bg-black"
    >

      {/* Hero: sits behind the text, scales from 0 to full screen */}
      <section className="hero absolute inset-0 z-0 bg-indigo-600">
        {/* hero content goes here later */}
      </section>

      {/* Intro text layer: sits on top of the hero */}
      <div className="intro absolute inset-0 z-10 flex items-center justify-center text-white text-5xl pointer-events-none">
        {/* left-aligned so every first letter forms one column */}
        <div className="flex flex-col items-start">
          {groups.map((group, g) => (
            <div key={g} className="group flex flex-col items-start">
              {group.map((l, i) => (
                <div key={i} className="word flex items-center">
                  <span className="letter relative z-20 inline-block">
                    {l.first}
                  </span>
                  <span className="mask inline-block overflow-hidden py-2">
                    <span className="remain inline-block">{l.remain}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>


    </main>
  );
}

export default App;

