
import { useRef } from "react";
import Hero from "./pages/Hero";
import Work from "./pages/Work";
import Intro from "./component/IntroTimeline";
import Gallery from "./pages/Gallery";
import Footer from "./pages/Footer";
import ScrollThumb from "./component/ScrollThumb";


function App() {
  const heroRef = useRef(null);

  return (
    <main className="relative w-full h-fit bg-black ">
      <ScrollThumb/>
      {/* Hero: sits behind the text, scales from 0 to full screen */}
      <Hero heroRef={heroRef} />

      {/* Intro text layer: sits on top of the hero */}
      <Intro heroRef={heroRef} />

      <Work/>
      <Gallery/>
      <Footer/>

    </main>
  );
}

export default App;
 