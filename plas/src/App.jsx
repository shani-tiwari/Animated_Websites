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
  const heroRef = useRef(null);

  useGSAP(() => {

      heroRef.current.setAttribute("inert", "");   // lock at start - non-focusable and non-clickable, and hides it from screen readers.
      const container = ref.current;

      const letters   = gsap.utils.toArray(".letter", container);  // elem on this page, outside this container are ignored
      const masks     = gsap.utils.toArray(".mask", container);
      const remains   = gsap.utils.toArray(".remain", container);
      const groupEls  = gsap.utils.toArray(".group", container);
      const img       = container.querySelector(".img");
      const intro     = container.querySelector(".intro");

      // Measure BEFORE any transform is applied
      const box = container.getBoundingClientRect();
      const centerX = box.left + box.width / 2;  // center point of container - from left edge of viewport + half of width of element(box)

      // returns a array of - distance of each letter from center of container
      const offsets = letters.map((el) => {
        const r = el.getBoundingClientRect();
        return centerX - (r.left + r.width / 2);
        // ^ where I want to be   ^ where the letter's own center is now 
      });

      // Start state
      gsap.set(letters, { x: (i) => offsets[i] });  // offsets[i] is the number of pixels letter i must move on the X axis to land at the horizontal center of the container.
      gsap.set(masks,   { x: (i) => offsets[i] });
      gsap.set(letters, { opacity: 0, y: 4, filter: "blur(12px)" });
      gsap.set(remains, { xPercent: -100 });
      gsap.set(img,    { scale: 0 });

      document.body.style.overflow='hidden';
      const tl = gsap.timeline({onComplete: () => {
        heroRef.current.removeAttribute("inert"); // Unlock hero, focusable and clickable by screen readers. 
        document.body.style.overflow = "";
      }});

      // 1) First letters appear one by one in the center
      tl.to(letters, {
        y       : 0,
        opacity : 1,
        duration: 0.7,
        stagger : 0.2,
        filter  : "blur(0px)",
        ease    : "power2.out",
      })
        // 2) Letters + masks move to the left column, remains reveal together
      .to([letters, masks], {
        x       : 0, 
        duration: 0.9,
        ease    : "power3.inOut"
      },"+=0.2")
      .to(remains, { xPercent: 0, duration: 0.9, ease: "power3.inOut" }, "<")

        // 3) Split phase: img scales to 0.3 and groups move apart, together
      .addLabel("split", "+=0.4")
      .to(img, {
        scale    : 0.3, 
        duration : 0.6, 
        ease     : "power3.inOut" 
      }, "split") 
      .to(groupEls[0],{
        x        : () => -window.innerWidth * 0.2,
        duration : 0.7,
        ease     : "power2.inOut",
      }, "split")
      .to(groupEls[1],{
        x        : () =>  window.innerWidth * 0.2,
        duration : 0.7,
        ease     : "power2.inOut",
      }, "split")
      
      // 0.2s break, then expand phase: img grows while the text scales out and fades
      .addLabel("expand", "+=0.2")
      .to(img, { scale: 1, duration: 1.6, ease: "power3.inOut" }, "expand")
      .to(groupEls,{
        scale: 0.5,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => gsap.set(intro, { display: "none" })  // imp***
      }, "expand")
      .from(['.overlay','.navbar', '.herobody'], {
        opacity: 0, y: 6, duration: 0.6, ease: "power2.inOut", stagger: 0.4
      }, ">-0.1")
    },
    { scope: ref },
  );

  return (
    <main
      ref={ref}
      className="relative h-dvh w-screen overflow-hidden bg-black"
    >


      {/* Hero: sits behind the text, scales from 0 to full screen */}
      <section ref={heroRef} className="hero relative w-full h-full">

        {/* scaled/animated by gsap */}
        <div className="img w-full h-full absolute">
          <img className=" w-full h-full object-cover" src="./ass-1.webp" />
          <div className="overlay absolute inset-0 bg-black/40" />
        </div>

        <div className="content w-full h-full p-8 flex flex-col justify-between">
          {/* navbar */}
          <div className="navbar w-full py-2 px-4 flex justify-between items-center border border-white/20 bg-black/20 backdrop-blur-sm rounded-lg">
            <div className="logo text-2xl text-white tracking-wide">LPAS</div>
            <div className="menu flex items-center gap-4">
              <div className="text px-3 py-0.5 text-white bg-black/40 rounded-md">
                Menu
              </div>
              <div className="icon"></div>
            </div>
          </div>

          {/* need this text on bottom */}
          <div className="herobody w-full h-fit ">
            <h1 className="text-8xl px-4 max-w-5xl text-white tracking-tight">
              We are a process driven architecture and interior design studio
            </h1>
          </div>
        </div>
      </section>

      

      {/* Intro text layer: sits on top of the hero */}
      <div aria-hidden="true" className="intro pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-white text-5xl">
        {/* left-aligned so every first letter forms one column */}
        <div className="flex flex-col items-start">
          {
            groups.map((group, g) => (
              <div key={g} className="group flex flex-col items-start">
                {
                  group.map((l, i) => (
                    <div key={i} className="word flex items-center">
                      <span className="letter relative z-20 inline-block">
                        {l.first}
                      </span>
                      <span className="mask inline-block overflow-hidden py-2">
                        <span className="remain inline-block">{l.remain}</span>
                      </span>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>

    </main>
  );
}

export default App;
