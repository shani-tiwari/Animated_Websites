import { Link } from 'react-router-dom'

function HomeBottomText() {
  return (
    <div className='font-[f2] flex justify-center items-center gap-4  uppercase pb-2 text-amber-100'> 
      <Link className='text-[6.2vw] border-3 border-white rounded-full px-4 md:px-8 p-1 md:pt-3 leading-[5vw] hover:border-[#D3FD50] hover:text-[#D3FD50] ' to='/projects'> Projects</Link>
      <Link className='text-[6.2vw] border-3 border-white rounded-full px-4 md:px-8 p-1 md:pt-3 leading-[5vw] hover:border-[#D3FD50] hover:text-[#D3FD50]' to='/agence'>Agence</Link>
      {/* while giving leading lesser then 5.6, i'm getting a  both sidescrollbar, for that i added overflow-hidden in parent(Home.jsx) 
       also for that i can add both link tags in seprate divs witn specfied height */}
    </div>
  )
}

export default HomeBottomText
