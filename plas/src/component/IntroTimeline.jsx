import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

export default function Intro({ heroRef }) {

  const ref = useRef(null);

 
  useGSAP(() => {
    // fixed refresh issue
    ScrollTrigger.clearScrollMemory("manual");
    window.scrollTo(0, 0);  // always start the intro from the top
    ScrollTrigger.refresh();
    const container = ref.current;
    const hero_ref = heroRef.current;
    
      hero_ref.setAttribute("inert", "");   // lock at start - non-focusable and non-clickable, and hides it from screen readers.

      const letters   =  gsap.utils.toArray(".letter", container);  // elem on this page, outside this container are ignored
      const masks     =  gsap.utils.toArray(".mask", container);
      const remains   =  gsap.utils.toArray(".remain", container);
      const groupEls  =  gsap.utils.toArray(".group", container);
      const intro     =  container.querySelector(".intro");

      const slides = hero_ref.querySelector(".slides");


      const q = gsap.utils.selector(hero_ref);
      const [img, navbar, herobody] = [".img", ".navbar", ".herobody"].map(i => q(i)[0]);

      // Measure BEFORE any transform is applied
      const box = container.getBoundingClientRect();
      const centerX = box.left + (box.width / 2);  // center point of container - from left edge of viewport + half of width of element(box)

      // returns a array of - distance of each letter from center of container
      const offsets = letters.map((el) => {
        const r = el.getBoundingClientRect();
        return centerX - (r.left + (r.width / 2)); 
        // ^ where I want to be   ^ where the letter's own center is now 
      });

      // Start state
      gsap.set(letters, { x: (i) => offsets[i] });  // offsets[i] is the number of pixels letter i must move on the X axis to land at the horizontal center of the container.
      gsap.set(masks,   { x: (i) => offsets[i] });
      gsap.set(letters, { opacity: 0, y: 6, filter: "blur(12px)" });
      gsap.set(remains, { xPercent: -100 });
      gsap.set(img,    { scale: 0 });

      gsap.set(slides, { xPercent: 100 }); // wrapper waits fully off-screen right

      const doc = document.body.style;
      doc.overflow='hidden';
      const tl = gsap.timeline({onComplete: () => {
        heroRef.current.removeAttribute("inert"); // Unlock hero, focusable and clickable by screen readers. 
        doc.overflow = ""; // if we lock it in start it will appear suddenly after intro animation - don't want
        // either manage it, so it won't affect layout space - scrollbar gutter, y-scroll, or width-none
        gsap.to(document.querySelector(".scroll-thumb"), { opacity: 1, duration: 0.5 });
        ScrollTrigger.refresh();
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
      .to(groupEls, {
        scale: 0.7,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => gsap.set(intro, { display: "none" })  // imp***
      }, "expand")
      .from([navbar, herobody], {
         opacity: 0, y: 8, duration: 1, ease: "power2.inOut", stagger: 0.5
      }, "<0.7")
      .to(slides, { xPercent: 0, duration: 0.8, ease: "power3.out" }, ">");

      // clean up what GSAP doesn’t revert
      return () => {
        document.body.style.overflow = "";
        heroRef.current?.removeAttribute("inert");
      };
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center text-5xl text-white pointer-events-none"
    >
      <div className="flex flex-col items-start">
        {groups.map((group, g) => (
          <div key={g} className="group flex flex-col items-start">
            {group.map((l, i) => (
              <div key={i} className="word flex items-center">
                <span className="letter relative z-20 inline-block">{l.first}</span>
                <span className="mask inline-block overflow-hidden py-2">
                  <span className="remain inline-block">{l.remain}</span>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}