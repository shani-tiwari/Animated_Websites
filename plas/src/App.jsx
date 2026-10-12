
import { useRef } from "react";
import Hero from "./pages/Hero";
import Work from "./pages/Work";
import Intro from "./component/IntroTimeline";


function App() {
  const heroRef = useRef(null);

  return (
    <main className="relative w-screen h-fit bg-black ">

      {/* Hero: sits behind the text, scales from 0 to full screen */}
      <Hero heroRef={heroRef} />

      <Work/>


        {/* Intro text layer: sits on top of the hero */}
      <Intro heroRef={heroRef} />

    </main>
  );
}

export default App;
