import { useGSAP } from "@gsap/react"
import gsap from 'gsap';
import { useRef } from "react"
import { useLocation } from "react-router-dom";

function Stair({children}) {

    const currentPath = useLocation().pathname;
     
    const StairParent = useRef(null);
    const Pageref = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.to(StairParent.current, {
         autoAlpha: 1, 
         duration: 0
        });

        tl.from('.stair', {
        height: 0,
        stagger: {
            amount: -0.3
        }
        });

        tl.to('.stair', {
        y: '100%',
        stagger:{
            amount: -0.3,
        }
        });

        tl.to(StairParent.current, {
         autoAlpha: 0, duration: 0
        });

        gsap.from(Pageref.current, {
            scale: 1.2,
            opacity: 0,
            delay: 1,
        });

    }, [currentPath]);

  return (
    <div>

        <div ref={StairParent} className="h-screen w-full z-20 fixed" >
            <div className="top-0 left-0 right-0 h-screen w-screen fixed flex ">
                <div className=" stair h-full w-1/5 bg-black "></div>
                <div className=" stair h-full w-1/5 bg-black "></div>
                <div className=" stair h-full w-1/5 bg-black "></div>
                <div className=" stair h-full w-1/5 bg-black "></div>
                <div className=" stair h-full w-1/5 bg-black "></div>
            </div>
        </div>
 
        <div ref={Pageref}>
            {children}
        </div>

    </div>
  )
}

export default Stair
