import Navbar from "../components/navigation/Navbar"
import ProjectCard from "../components/projects/ProjectCard"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

function Projects() {

  const projects = [{
    image1: 'https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_1280x960-1280x960.jpg',
    image2: 'https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---Thumbnail-1280x960.jpg'
  }, {
    image1: 'https://k72.ca/uploads/caseStudies/OKA/OKA_thumbnail-1280x960.jpg',
    image2: 'https://k72.ca/uploads/caseStudies/Opto/thumbnailimage_opto-1280x960.jpg'
  }, {
    image1: 'https://k72.ca/uploads/caseStudies/LAMAJEURE_-_Son_sur_mesure/chalaxeur-thumbnail_img-1280x960.jpg',
    image2: 'https://k72.ca/uploads/caseStudies/SHELTON/thumbnailimage_shelton-1280x960.jpg'
  }];

   gsap.registerPlugin(ScrollTrigger)

    useGSAP(() => {
      gsap.from('.hero', {
        height: '100px',
        stagger: {
          amount: 0.4
        },
        scrollTrigger: {
          trigger: '.lol',
          start: 'top 100%',
          end: 'top -150%',
          scrub: true
        }
      })
    })

  return (
    <>
    <Navbar/>
    <div className="p-2 ">

      <div className=" pt-[40vh]  md:pt-[30vh] ">
        <h2 className=" font-[f2]  uppercase text-[11vh] md:text-[9vw] text-black text-center md:text-left md:text-amber-100"> Projects </h2>
      </div>

    {/* this will contain all the images */}
      <div className="lol">
        { projects.map((elem, idx) => 
            <div key={idx} className='hero w-full lg:h-[400px] mb-4 flex lg:flex-row flex-col lg:gap-4 gap-2'>
              <ProjectCard image1={elem.image1} image2={elem.image2} />
            </div>
        )}
      </div>

    </div>
    </>
  )
}

export default Projects
