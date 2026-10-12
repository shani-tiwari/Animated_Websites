import Navar from "../component/Navbar";


export default function Hero({heroRef}) {



  return (
   <section ref={heroRef} className="hero relative w-full h-full">

        <div className="img w-full h-full absolute pointer-events-none">
          <img className=" w-full h-full object-cover" src="/ass-1.webp" />
          <div className="overlay absolute inset-0 bg-black/40" />
        </div>

        <div className="content relative z-10 w-full h-full p-8 flex flex-col justify-between ">

          <Navar />
          
          <div className="herobody w-full h-fit ">
            <h1 className="text-8xl px-4 max-w-5xl text-white tracking-tight">
              We are a process driven architecture and interior design studio
            </h1>
          </div>
        </div>

      </section>
  );
};

