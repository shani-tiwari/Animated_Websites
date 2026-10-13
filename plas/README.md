"-=0.2" starts the tween 0.2s before the timeline’s current end (overlap).
"+=0.2" starts it 0.2s after the timeline’s current end (gap).
"<" starts it at the start of the previous tween (same time).
">" starts it at the end of the previous tween (the default).

Combining them: add a number after the symbol.

"<0.2" means 0.2s after the previous tween starts.
">-0.1" means 0.1s before the previous tween ends, so it overlaps.
">0.2" means 0.2s after the previous tween ends, so it leaves a gap.

One difference to remember: += and -= count from the end of the whole timeline so far (the latest-ending tween). < and > count from the previous tween only. If the previous tween isn’t the longest one, "+=0.2" and ">0.2" can give different results. For overlaps or gaps relative to the tween right before, use ">-0.1" and ">0.2".


Accessibility
Put aria-hidden="true" on the intro text layer, since it’s decorative. Keep a single real <h1> in the hero.
Keep the intro pointer-events-none, and remove it after the animation with display: none or by unmounting it.
Wrap animations in gsap.matchMedia() so users with prefers-reduced-motion skip the intro and see the hero immediately.
Don’t trap focus in the intro. If the hero has links or buttons, add inert to the hero until the intro finishes.
Performance
Animate only transform (x, scale) and opacity. The blur filter is fine on a few letters but expensive on large areas.
Use min-h-svh instead of h-screen so mobile browser bars don’t cause jumps.
Lock scroll during the intro (overflow: hidden on the body) and unlock it in the timeline’s onComplete.
Wait for fonts before measuring: document.fonts.ready.then(...).
Scroll
Create ScrollTriggers after the intro finishes, then call ScrollTrigger.refresh(), because the layout changes when the intro goes away.
Give each section its own component, ref and useGSAP({ scope }), so cleanup is automatic and class names can’t collide.
Keep one timeline per concern: intro, hero entrance, and each scroll section.


Setting overflow to "" removes the inline style, which is cleaner than setting "visible".


* Reduced motion: if you skip the intro for those users, remove inert and the scroll lock right away in that branch too, or the page stays locked.

browser scroll restoration,

scrollbar styling , gutter stable to keep it same across browsers