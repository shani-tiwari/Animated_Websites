


const images = [{main: '1', vig: '5'}, {main: '2', vig: '7'}, {main: '3', vig: '8'}];

export default function Gallery(){
    return (
        
        images.map(imgC => {
            return (
                <div 
                 style={{clipPath: 'polygon(0 0, 0 100%, 100% 100%, 100% 0)'}} 
                 className="h-fit w-full relative flex flex-col items-center overflow-hidden"
                >
                    <div className="img-container w-full h-full relative ">
                        <img className="w-full max-h-[90vh] h-full object-cover" src={`/ass-${imgC.main}.webp`}/>  
                    </div>

                    <div className="vignette h-[20vw] w-[25vw] fixed top-[calc(50%-10vw)] ">
                        <img className="w-full h-full object-cover" src={`/ass-${imgC.vig}.webp`}/>    
                    </div>
                </div>
            )
        })
        
    )
}