

export default function Footer(){
    return (
        <>
            <footer 
             style={{clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)"}} 
             className="relative h-96 w-full bg-linear-to-b from-white/40 to-white/80 "
            >
                {/* sticky area */}
                <div className="relative h-[calc(100vh+384px)] top-[-100vh]">
                    <div className="sticky top-[calc(100vh-384px)] h-96">

                        {/* content */}
                         <Content/>
                         
                    </div>
                </div>
                
            </footer>
        </>
    )
};

function Content(){
    return( 
        <div className="h-96 w-full bg-linear-to-b from-white-30 to-white-70 flex items-end justify-center ">
            <p className="text-9xl font-semibold text-black/30">
                Sticky Footer
            </p>
        </div>
    )
}