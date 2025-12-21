import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Agents from './pages/Agents'
import Projects from './pages/Projects'
import FullNav from "./components/navigation/FullNav"
import { useRef, useEffect } from "react"


function App() {
  const circle = useRef(null);

  useEffect(() => {
      function handleMouseMove(e) {
        if (!circle.current) return; 
        const followerHeight = circle.current.offsetHeight;
        circle.current.style.transform = `translate(${e.clientX + followerHeight*0.8}px, ${e.clientY + followerHeight*1.6}px) `;
      }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  return (
   <>
      <div
        ref={circle}
        className="fixed h-2 w-2 bg-white rounded-full pointer-events-none z-50 transition-transform duration-200 ease-out"
      ></div> 

      <FullNav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Agence' element={<Agents/>}/>
        <Route path='/projects' element={<Projects/>}/> 
      </Routes>
   </>
  )
}

export default App
