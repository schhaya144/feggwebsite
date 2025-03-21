import React from 'react'
import Hero from './Hero'
import AboutSection from './LeaderBoard'
import InfoSection from './WhyDonate'
import ImportantLinks from './GiftorDonate'
import Testimonials from './Testimonials'

const Home = () => {
  return (
    <div >
      <Hero/>
      <AboutSection/>
      <InfoSection/>
      <Testimonials/>
      <ImportantLinks/>
     
    </div>
  )
}
export default Home