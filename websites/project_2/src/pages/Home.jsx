import HomeBottomText from '../components/home/HomeBottomText'
import HomeTop from '../components/home/HomeTop'
import Video from '../components/home/Video'
import Navbar from '../components/navigation/Navbar'

function Home() {
  return (
    <div>

      <Navbar/>
      <div className='h-screen w-screen fixed '>
        <Video/>
      </div>

      <div className='h-screen w-screen relative flex flex-col justify-between overflow-hidden'>
        <HomeTop/>
        <HomeBottomText/>
      </div>

    </div>
  )
}

export default Home
