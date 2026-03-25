import Video from "./Video"

function HomeTop() {
  return (
    <div className="font-[f1] text-center pt-65 text-white md:pt-3 ">
      <div className="text-[9.5vw] uppercase leading-[8.5vw]  ">L'étincelle</div>

      <div className="text-[9.5vw] uppercase leading-[8.5vw] flex items-center justify-center overflow-hidden  ">qui 
        <div className="h-[7vw] w-[16vw] rounded-full -mt-5 object-cover overflow-hidden "><Video/></div> 
        génère
      </div>

      <div className="text-[9.5vw] uppercase leading-[8.5vw] ">la créativité</div>
    </div>
  )
}

export default HomeTop
