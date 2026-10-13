

export default function Work(){
    return (
        <div className="w-full h-fit bg-white p-8 pt-20">

            <div className="top-text w-full flex  items-center border-b-px border-gray-400 pb-8"> 
                <h2 className="text-black text-3xl ">A Selection of our work</h2>
            </div>

            <div className="media w-full h-[80vh] flex gap-4">
                <img className="w-1/2 h-[80vh] object-cover" src="/ass-5.webp" alt="" />
                <div className="w-1/2 h-fit flex gap-2 sticky top-56">
                    <img className="w-1/2 h-56 object-cover" src="/ass-6.webp" alt="" />
                    <img className="w-1/2 h-56 object-cover" src="/ass-7.webp" alt="" /> 
                </div> 
            </div> 

            <div className="media w-full h-[10vh] flex gap-4 pt-20"> 
            </div>

        </div>
    )
}