import { useGSAP } from "@gsap/react"
import { navLinks } from "../../constants"
import gsap from 'gsap'


function Navbar() {

    useGSAP(()=>{
        gsap.from('nav', {
            y: -100,
            ease: 'power1.inOut'
        })
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger: 'nav',
                start: 'bottom top',
                toggleActions: 'play reverse play reverse',
            }
        });

        tl.fromTo('nav', { backgroundColor: 'transparent' }, {
            backgroundColor: 'rgba(0,0,0,0.31)',
            backdropFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
        })
    })

  return (
    <nav>
        <div>
            <a href="#home" className="flex items-center gap-2 "> 
                <img src="/images/logo.png" alt="logo" />
                <p> Velvet Pour </p>
            </a>
            <ul>
                {
                    navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`}> {link.title} </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
