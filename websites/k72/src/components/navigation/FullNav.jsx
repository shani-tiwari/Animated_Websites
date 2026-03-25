import { useGSAP } from "@gsap/react"
import gsap from 'gsap';
import  { useContext, useRef, useEffect } from 'react'
import { NavbarContext } from '../../context/NavContext'


function FullNav() {

    const fullNavLinksRef = useRef(null)
    const fullScreenRef = useRef(null)

    const [navOpen, setNavOpen] = useContext(NavbarContext)

    function gsapAnimation() {
        const tl = gsap.timeline()
        tl.to('.stairing', {
            // delay: 0.2,
            height: '100%',
            stagger: {
                amount: -0.3
            }
        })
        tl.to('.fullscreennav', {
            display: 'block'
        })
        tl.to('.link', {
            opacity: 1,
            rotateX: 0,
            stagger: {
                amount: 0.2
            }
        }, 'together')
        tl.to('.navlink', {
            opacity: 1
        },'together')
    }
    function gsapAnimationReverse() {
        const tl = gsap.timeline()
        tl.to('.link', {
            opacity: 0,
            rotateX: 90,
            stagger: {
                amount: 0.1
            }
        }, 'same')
        tl.to('.navlink', {
            opacity: 0
        }, 'same')
        tl.to('.fullscreennav', {
            delay : 0.3,
            display: 'none',
        }, 'same')
        tl.to('.stairing', {
            height: 0,
            stagger: {
                amount: 0.1
            }
        })
    }

    useGSAP(()=>{
        if (navOpen)  gsapAnimation();
        else  gsapAnimationReverse();
    }, [navOpen])

    useEffect(() => {
        const scrollY = window.scrollY;
        if (navOpen && fullScreenRef.current) {
            // Freeze scroll
            fullScreenRef.current.style.position = 'fixed';
            fullScreenRef.current.style.top = `-${scrollY}px`;
            fullScreenRef.current.style.width = '100%';
            document.body.style.overflow = 'hidden';
        }
        return () => {
            // Unfreeze scroll
            if (fullScreenRef.current) {
                fullScreenRef.current.style.position = '';
                fullScreenRef.current.style.top = '';
                fullScreenRef.current.style.width = '';
            }
            document.body.style.overflow = '';
            window.scrollTo(0, scrollY);
        };
    }, [navOpen]);

  return (
    <div ref={fullScreenRef} className=" fullscreennav h-[100vh]  w-full fixed bg-black overflow-hidden text-amber-100 z-40">

        <div className="h-screen w-full fixed" >
            <div className="h-full w-full flex ">
                <div className=" stairing h-full w-1/5 bg-black "></div>
                <div className=" stairing h-full w-1/5 bg-black "></div>
                <div className=" stairing h-full w-1/5 bg-black "></div>
                <div className=" stairing h-full w-1/5 bg-black "></div>
                <div className=" stairing h-full w-1/5 bg-black "></div>
            </div>
        </div>

        <div ref={fullNavLinksRef} className="relative ">

            <div className=" navlink flex w-full justify-between items-start p-2 mb-20 ">
                <div className=" w-28 md:w-36 p-2">
                    <svg className="w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 44">
                        <path fill="white" fillRule="evenodd" d="M35.1441047,8.4486911 L58.6905011,8.4486911 L58.6905011,-1.3094819e-14 L35.1441047,-1.3094819e-14 L35.1441047,8.4486911 Z M20.0019577,0.000230366492 L8.83414254,25.3433089 L18.4876971,25.3433089 L29.5733875,0.000230366492 L20.0019577,0.000230366492 Z M72.5255345,0.000691099476 L72.5255345,8.44846073 L94.3991559,8.44846073 L94.3991559,16.8932356 L72.5275991,16.8932356 L72.5275991,19.5237906 L72.5255345,19.5237906 L72.5255345,43.9274346 L102.80937,43.9274346 L102.80937,35.4798953 L80.9357483,35.4798953 L80.9357483,25.3437696 L94.3996147,25.3428482 L94.3996147,16.8953089 L102.80937,16.8953089 L102.80937,0.000691099476 L72.5255345,0.000691099476 Z M-1.30398043e-14,43.9278953 L8.78642762,43.9278953 L8.78642762,0.0057591623 L-1.30398043e-14,0.0057591623 L-1.30398043e-14,43.9278953 Z M58.6849955,8.4486911 L43.1186904,43.9274346 L52.3166592,43.9274346 L67.9877996,8.4486911 L58.6849955,8.4486911 Z M18.4688864,25.3437696 L26.7045278,43.9278953 L36.2761871,43.9278953 L28.1676325,25.3375497 L18.4688864,25.3437696 Z"></path>
                    </svg>
                </div>
                <div  onClick={() => {
                        setNavOpen(false)
                    }} className=" w-24 h-24 md:w-32 md:h-32  relative cursor-pointer  overflow-hidden ">
                    <div className=" h-36 md:h-44 w-[2px] md:w-1 absolute -rotate-45 origin-top bg-white  rounded-full "></div>
                    <div className=" h-36 md:h-44 w-[2px] md:w-1 absolute right-0 rotate-45 origin-top bg-white rounded-full "></div>
                </div>
            </div>

            <div className="">

                <div className="link origin-top border-t-1 border-white relative">
                    <h1 className="font-[f2] text-[8vh] md:text-[8vw] mt-1 md:-mb-4 text-center uppercase leading-[1]   tracking-tighter  ">Projects</h1>

                    <div className=" moveLink absolute text-black flex top-0 bg-[#D3Fd50] gap-5 ">
                    
                        <div className=" movex flex items-center gap-5  overflow-auto text-black ">  
                            <h2  className=" whitespace-nowrap font-[f2] text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full " src="https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---MenuThumbnail-640x290.jpg" alt="" />
                            <h2  className="  whitespace-nowrap font-[f2] md:text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full "  src="https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290-640x290.jpg" alt="" />
                        </div> 

                        <div className=" movex flex items-center gap-5  overflow-auto text-black ">  
                            <h2  className=" whitespace-nowrap font-[f2] md:text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full " src="https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---MenuThumbnail-640x290.jpg" alt="" />
                            <h2  className="  whitespace-nowrap font-[f2] md:text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full "  src="https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290-640x290.jpg" alt="" />
                        </div> 

                    </div>

                </div>
                <div className="link origin-top border-t-1 border-white relative">
                    <h1 className="font-[f2] text-[8vh] md:text-[8vw] mt-1 md:-mb-4 text-center uppercase leading-[1]   tracking-tighter  "> Agence </h1>

                    <div className=" moveLink absolute text-black flex top-0 bg-[#D3Fd50] gap-5 ">
                    
                        <div className=" movex flex items-center gap-5  overflow-auto text-black ">  
                            <h2  className=" whitespace-nowrap font-[f2] text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full " src="https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---MenuThumbnail-640x290.jpg" alt="" />
                            <h2  className="  whitespace-nowrap font-[f2] md:text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full "  src="https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290-640x290.jpg" alt="" />
                        </div> 

                        <div className=" movex flex items-center gap-5  overflow-auto text-black ">  
                            <h2  className=" whitespace-nowrap font-[f2] md:text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full " src="https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---MenuThumbnail-640x290.jpg" alt="" />
                            <h2  className="  whitespace-nowrap font-[f2] md:text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full "  src="https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290-640x290.jpg" alt="" />
                        </div> 

                    </div>

                </div>
                <div className="link origin-top border-t-1 border-white relative">
                    <h1 className="font-[f2] text-[8vh] md:text-[8vw] mt-1 md:-mb-4 text-center uppercase leading-[1]   tracking-tighter  ">CONTACT</h1>

                    <div className=" moveLink absolute text-black flex top-0 bg-[#D3Fd50] gap-5 ">
                    
                        <div className=" movex flex items-center gap-5  overflow-auto text-black ">  
                            <h2  className=" whitespace-nowrap font-[f2] text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full " src="https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---MenuThumbnail-640x290.jpg" alt="" />
                            <h2  className="  whitespace-nowrap font-[f2] md:text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full "  src="https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290-640x290.jpg" alt="" />
                        </div> 

                        <div className=" movex flex items-center gap-5  overflow-auto text-black ">  
                            <h2  className=" whitespace-nowrap font-[f2] md:text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full " src="https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---MenuThumbnail-640x290.jpg" alt="" />
                            <h2  className="  whitespace-nowrap font-[f2] md:text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full "  src="https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290-640x290.jpg" alt="" />
                        </div> 

                    </div>

                </div>
                <div className="link origin-top border-y-1 border-white relative">
                    <h1 className="font-[f2] text-[8vh] md:text-[8vw] mt-1 md:-mb-4 text-center uppercase leading-[1]   tracking-tighter  ">Blogue</h1>

                    <div className=" moveLink absolute text-black flex top-0 bg-[#D3Fd50] gap-5 ">
                    
                        <div className=" movex flex items-center gap-5  overflow-auto text-black ">  
                            <h2  className=" whitespace-nowrap font-[f2] text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full " src="https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---MenuThumbnail-640x290.jpg" alt="" />
                            <h2  className="  whitespace-nowrap font-[f2] md:text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full "  src="https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290-640x290.jpg" alt="" />
                        </div> 

                        <div className=" movex flex items-center gap-5  overflow-auto text-black ">  
                            <h2  className=" whitespace-nowrap font-[f2] md:text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full " src="https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---MenuThumbnail-640x290.jpg" alt="" />
                            <h2  className="  whitespace-nowrap font-[f2] md:text-[7.3vw] text-center uppercase leading-[1]  tracking-tighter">POUR TOUT VOIR</h2>
                            <img className="h-22 pb-2 w-60 shrink-0 rounded-full "  src="https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_640x290-640x290.jpg" alt="" />
                        </div> 

                    </div>

                </div>

            </div>
            
        </div>

    </div>
  )
}

export default FullNav
