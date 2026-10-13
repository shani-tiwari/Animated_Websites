import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollThumb() {
  const thumb = useRef(null);

  useEffect(() => {
    const el = thumb.current;
    const setY = gsap.quickSetter(el, "y", "px");

    const metrics = () => {
      const total = document.documentElement.scrollHeight;
      const view = window.innerHeight;
      const h = Math.max(40, (view / total) * view);
      return { max: total - view, h, track: view - h };
    };

    const update = () => {
      const { max, h, track } = metrics();
      if (max <= 0) return;
      el.style.height = h + "px";
      setY((window.scrollY / max) * track);
    };

    // drag support (the native bar is gone, so give the thumb its drag back)
    let startY = 0, startScroll = 0;
    const move = (e) => {
      const { max, track } = metrics();
      window.scrollTo(0, startScroll + (e.clientY - startY) * (max / track));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    const down = (e) => {
      startY = e.clientY;
      startScroll = window.scrollY;
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    ScrollTrigger.addEventListener("refresh", update); // page height changes after pin
    el.addEventListener("pointerdown", down);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ScrollTrigger.removeEventListener("refresh", update);
      el.removeEventListener("pointerdown", down);
      up();
    };
  }, []);

  return (
    <div
      ref={thumb}
      aria-hidden="true"
      className="scroll-thumb fixed right-1 top-0 z-60 w-1.5 cursor-grab touch-none rounded-full bg-white/50 opacity-0 hover:bg-white/80"
    />
  );
}