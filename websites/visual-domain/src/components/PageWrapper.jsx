
import HeroSection from '../pages/HeroSection'
import WorkPage from '../pages/WorkPage'
import Carousal from '../pages/Carousal'

function PageWrapper() {
  return (
    <main className='page-wrapper '>
      <HeroSection/>
      <WorkPage/>
      <Carousal/>
    </main>
  )
}

export default PageWrapper
