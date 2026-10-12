import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


const ITEMS = ["About", "Home", "Business", "Reach Out"];
// Tune every duration / easing here
const CONFIG = {
  openButton:  { duration: 0.4, ease: "power2.inOut" },
  panelOpen:   { duration: 0.7, ease: "power4.out" },
  links:       { duration: 0.5, ease: "power2.out", stagger: 0.15 },
  closeButton: { duration: 0.4, ease: "power2.inOut" },
  panelClose:  { duration: 0.6, ease: "power3.inOut" },
};

export default function Navbar() {

  const ref = useRef(null);
  const panelRef = useRef(null);
  const tlRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Initial (closed) state
  const { contextSafe } = useGSAP(() => {
      const q = gsap.utils.selector(ref);
      gsap.set(panelRef.current, { yPercent: 100, display: 'hidden' }); 
      gsap.set(q(".label-close"), { yPercent: 100 });
      gsap.set(q(".line"), { transformOrigin: "50% 50%" });
      panelRef.current.setAttribute("inert", ""); // links not focusable while hidden
    }, { scope: ref });

  // eslint-disable-next-line react-hooks/refs
  const toggle = contextSafe(() => {
    const q = gsap.utils.selector(ref);
    const panel = panelRef.current;
    const menu = q(".menu");
    const lines = q(".line");
    const lineOne = q(".line-one");
    const lineTwo = q(".line-two");
    const labelMenu = q(".label-menu");
    const labelClose = q(".label-close"); 
    const links = q(".link");

    tlRef.current?.kill(); // clicking mid-animation continues from the current state 
    const tl = gsap.timeline();
    tlRef.current = tl;

    if (!open) {
      // 1) button: bg + icon + label
      tl.to(menu, { backgroundColor: "#fff", ...CONFIG.openButton })
        .to(lines, { stroke: "#000", ...CONFIG.openButton }, "<")
        .to(lineOne, { y: 3.5, rotation: 45, ...CONFIG.openButton }, "<")
        .to(lineTwo, { y: -3.5, rotation: -45, ...CONFIG.openButton }, "<")
        .to(labelMenu, { yPercent: -100, ...CONFIG.openButton }, "<")
        .to(labelClose, { yPercent: 0, ...CONFIG.openButton }, "<")
        // 2) panel slides up
        .to(panel,{
          display: 'visible',
            yPercent: 0,
            ...CONFIG.panelOpen,
            onStart: () => panel.removeAttribute("inert")
        }, ">")
        // 3) links animate in, starting just before the panel settles
        .fromTo(links,
          { opacity: 0, y: 8, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", ...CONFIG.links },
          "-=0.3"
        );
    } else {
      // button back to default and panel down, together
      tl.to(menu, { backgroundColor: "rgba(0,0,0,0.8)", ...CONFIG.closeButton }, 0)
        .to(lines, { stroke: "#fff", ...CONFIG.closeButton }, 0)
        .to(lineOne, { y: 0, rotation: 0, ...CONFIG.closeButton }, 0)
        .to(lineTwo, { y: 0, rotation: 0, ...CONFIG.closeButton }, 0)
        .to(labelMenu, { yPercent: 0, ...CONFIG.closeButton }, 0)
        .to(labelClose, { yPercent: 100, ...CONFIG.closeButton }, 0)
        .fromTo(links,
          { opacity: 1, y: 0, filter: "blur(0px)" },
          { opacity: 0, y: -8, filter: "blur(6px)", ...CONFIG.links },
          "-=0.2")
        .to(panel,{
          display: 'hidden',
            yPercent: 100,
            ...CONFIG.panelClose,
            onComplete: () => panel.setAttribute("inert", ""),
        }, "+0.8");
    }

    setOpen(!open);
  });

  return (
    <div ref={ref}>
      <div className="navbar relative z-50 flex w-full items-center justify-between rounded-lg px-4 py-2 ">
        <div className="logo text-2xl tracking-wide text-white">LPAS</div>

        <div
          className="menu flex h-fit items-center gap-2 rounded-lg p-1"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          {/* label: two stacked spans, GSAP slides between them */}
          <div className="grid overflow-hidden rounded-md bg-black px-3 py-0.5 text-white">
            <span className="label-menu col-start-1 row-start-1 text-center">Menu</span>
            <span className="label-close col-start-1 row-start-1 text-center">Close</span>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="h-6 w-7 cursor-pointer"
          >
            <svg className="h-full w-full" viewBox="0 0 29 29" fill="none" aria-hidden="true">
              <path className="line line-one" d="M4 11H25" stroke="#fff" strokeLinecap="round" />
              <path className="line line-two" d="M4 18H25" stroke="#fff" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* menu panel: GSAP controls its position */}
      <nav
        ref={panelRef}
        className="menuOptions fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-lg"
      >
        <div className="links flex flex-col gap-6 text-center">
          {ITEMS.map((item) => (
            <a key={item} href="#" className="link text-5xl font-medium text-white">
              {item}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
