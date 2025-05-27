import React from 'react'
import Checklist from '../components/Checklist'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className='home-div'>
      <h1 className='text h1-text orange-text title-text'>Oregon State Purity Test</h1>
      <h2 className='text italic-text subtitle-text h2-text'>Computer Science Edition</h2>

      <div className='website-description'>
        <p className='text p-text'>The official purity test for the true STEM critters of OSU (Computer Science majors). Click on every item you have done.</p>
        <p className='text p-text bold-text'>Caution: This is NOT a bucket list. Completion of all items on this test will make you a critter.</p>
      </div>

      <Checklist />

      <div className='calculate-button-div'>
        <button className='calculate-button'>
          Calculate my score.
        </button>
      </div>

      <Footer />
    </div>
  )
}
