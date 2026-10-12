
import { useRef } from "react";
import Hero from "./pages/Hero";
// import Intro from "./component/IntroTimeline";


function App() {
  const heroRef = useRef(null);

  return (
    <main className="relative w-screen h-fit bg-black">

      {/* Hero: sits behind the text, scales from 0 to full screen */}
      <Hero heroRef={heroRef} />
      
      <div className="w-full h-screen bg-black z-99">

      </div>


        {/* Intro text layer: sits on top of the hero */}
      {/* <Intro heroRef={heroRef} /> */}

    </main>
  );
}

export default App;
