import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from 'gsap';
import scrollTrigger from 'gsap/ScrollTrigger';
import Navbar from "../components/navigation/Navbar";



function Agents() {

  const imageDiv = useRef(null);
  const imageRef = useRef(null);
  gsap.registerPlugin(scrollTrigger);

  const imageArray = [
    'https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Olivier_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Lawrence_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/ChantalG_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/HugoJoseph_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MyleneS_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Claire_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/SophieA_480x640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/Michele_480X640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MEL_480X640-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/CAMILLE_480X640_2-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MAXIME_480X640_2-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/joel_480X640_3-480x640.jpg',
    'https://k72.ca/uploads/teamMembers/MEGGIE_480X640_2-480x640.jpg',
  ]


  useGSAP(() => {
    gsap.to(imageDiv.current,{
      scrollTrigger:{
        trigger:imageDiv.current,
        // markers:true,
        start:'top 21%',
        end:'top -135%',
        scrub:true,
        pin:true, pinReparent: true, pinSpacing: true, pinType: 'transform',
        onUpdate: (elem) => {
          const ImageIndex = Math.floor(elem.progress * 13 ); // no. of elems in ImageArray -1 
          imageRef.current.src = imageArray[ImageIndex];
        }
      }
    })
  });

  return (
    <div className="overflow-x-hidden">

      <Navbar/>

      <div className="section1 py-1  "> {/* the image div came down due to it's behaviour pulling parent with it, on mt-55vh property */}

        <div ref={imageDiv}  className=" h-[18vh] w-[14vh] md:h-[20vw] md:w-[15vw] overflow-hidden rounded-3xl -z-1 absolute top-30 md:top-38 left-[14vh] md:left-[30.5vw] ">  {/* when img don't visibally rounded, then overflow hidden  */}
          <img ref={imageRef} className="h-full w-full object-cover" src="https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg" alt="" />
        </div>

        <div className="font-[f2] mt-[32vh] text-center md:mt-[55vh] ">
          <h1 className="font-[f2] uppercase text-[20vw] text-center leading-[17vw] ">
            Soixan7e <br /> Douze{" "}
          </h1>
          <div className=" md:pl-[40%] md:pr-5 mt-20  p-2 ">
            <p className=" text-2xl md:text-5xl  indent-[17vw] text-left leading-[1.25rem] md:leading-normal ">
              Notre curiosité nourrit notre créativité. On reste humbles et on dit non
              aux gros egos, même le vôtre. Une marque est vivante. Elle a des
              valeurs, une personnalité, une histoire. Si on oublie ça, on peut faire
              de bons chiffres à court terme, mais on la tue à long terme. C’est pour
              ça qu’on s’engage à donner de la perspective, pour bâtir des marques
              influentes.
            </p>
          </div>
        </div>


      </div>

      <div className="section2 h-screen"> 

        <div  className="h-[20vw] w-[15vw] overflow-hidden rounded-3xl -z-1 absolute top-38 left-[30.5vw] ">  {/* when img don't visibally rounded, then overflow hidden  */}
          {/* <img className="h-full w-full object-cover" src="https://k72.ca/uploads/teamMembers/Carl_480x640-480x640.jpg" alt="" /> */}
        </div>

        <div className="font-[f2] mt-[55vh]  ">
          <h1 className="font-[f2] uppercase text-[20vw] text-center leading-[17vw] ">
            Soixan7e <br /> Douze{" "}
          </h1>
          <div className="pl-[40%] pr-5 mt-20  ">
            <p className="text-5xl  indent-[17vw]  ">
              Notre curiosité nourrit notre créativité. On reste humbles et on dit non
              aux gros egos, même le vôtre. Une marque est vivante. Elle a des
              valeurs, une personnalité, une histoire. Si on oublie ça, on peut faire
              de bons chiffres à court terme, mais on la tue à long terme. C’est pour
              ça qu’on s’engage à donner de la perspective, pour bâtir des marques
              influentes.
            </p>
          </div>
        </div>


      </div>


    </div>


  );
}

export default Agents;
