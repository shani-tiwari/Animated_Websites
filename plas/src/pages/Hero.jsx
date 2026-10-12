import { useGSAP } from "@gsap/react";
import Navar from "../component/Navbar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";


gsap.registerPlugin(ScrollTrigger)

export default function Hero({heroRef}) {

 useGSAP(() => {
  ScrollTrigger.config({ ignoreMobileResize: true });

    const slides = heroRef.current.querySelector(".slides");
    const track = heroRef.current.querySelector(".track");
    const overlay = heroRef.current.querySelector(".overlay");
    const vw = () => slides.clientWidth; // real visible width, no scrollbar
     gsap.set(overlay, { opacity: 0.4 }); 

   const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        pin: true,
        scrub: 0.5,
        start: "top top",
        end: () => "+=" + track.scrollWidth,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    tl.fromTo(
      track,
      { x: () => vw() },
      { x: () => -(track.scrollWidth - vw()), ease: "none", duration: 1 },
      0
    ).to(overlay, { opacity: 0.9, ease: "none", duration: 1 }, 0);
  },
  { scope: heroRef }
);

  return (
    <section ref={heroRef} className="hero relative h-screen w-full overflow-hidden">
      {/* z-0: background */}
      <div className="img absolute inset-0 z-0 pointer-events-none">
        <img className="h-full w-full object-cover" src="/ass-1.webp" alt="" />
        <div className="overlay absolute inset-0 bg-black" /> 
      </div>

      {/* z-10: hero body, stays in place */}
      <div className="content relative z-10 flex items-end h-full w-full p-8 pb-16">
        <div className="herobody h-fit w-full">
          <h1 className="max-w-5xl px-4 text-8xl tracking-tight text-white">
            We are a process driven architecture and interior design studio
          </h1>
        </div>
      </div>

      {/* z-20: slides, full height so they run UNDER the navbar */}
      <div className="slides absolute inset-0 z-20 overflow-hidden">
        <div className="track flex h-full w-full">
          <div className="slide-1 h-full w-full shrink-0 bg-red-100 text-5xl"> shani</div>
        </div>
      </div>


      <div className="absolute inset-x-0 top-0 z-30 p-8">
        <Navar />
      </div>
    </section>
  );
};

