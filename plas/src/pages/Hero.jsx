
export default function Hero({heroRef}) {
  return (
   <section ref={heroRef} className="hero relative w-full h-full">

        <div className="img w-full h-full absolute pointer-events-none">
          <img className=" w-full h-full object-cover" src="./ass-1.webp" />
          <div className="overlay absolute inset-0 bg-black/40" />
        </div>

        <div className="content w-full h-full p-8 flex flex-col justify-between">
          <div className="navbar w-full py-2 px-4 flex justify-between items-center border border-white/20 bg-black/20 backdrop-blur-sm rounded-lg">
            <div className="logo text-2xl text-white tracking-wide">LPAS</div>
            <div className="menu flex items-center gap-4">
              <div className="text px-3 py-0.5 text-white bg-black/40 rounded-md">
                Menu
              </div>
              <div className="icon"></div>
            </div>
          </div>

          <div className="herobody w-full h-fit ">
            <h1 className="text-8xl px-4 max-w-5xl text-white tracking-tight">
              We are a process driven architecture and interior design studio
            </h1>
          </div>
        </div>

      </section>
  );
};

