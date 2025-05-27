import { useState } from 'react';
import Checklist from '../components/Checklist'
import Footer from '../components/Footer'
import type { ChecklistItem } from '../types';

export default function HomePage({ setScore } : { setScore: (score: number) => void }) {
  const items = [
    "Spent money on an LLM",
    "Used ChatGPT on an assignment",
    "Failed a test",
    "Failed a course",
    "Took 20+ credits in one term",
    "Survived CS 162",
    "Got denied an assignment deadline extension",
    "Attended a hackathon",
    "Attended a hackathon outside of Oregon",
    "Won a hackathon",
    "Attended a computer science club meeting",
    "Attended an <a href='https://acm.oregonstate.edu' target='_blank' rel='noopener noreferrer' class='text-link'>ACM</a> club meeting (shameless plug)",
    "'sudo rm -rf'd something you weren't supposed to",
    "500+ connections on LinkedIn",
    "Cried over an assignment",
    "Cried during an exam",
    "Pulled an all-nighter",
    "Spent the night in Kelley",
    "Bought a Subway sandwich after 2am",
    "Studied on the library 6th floor",
    "Applied to 50+ internships without hearing back",
    "Applied to 100+ internships",
    "Got an internship",
    "Got a job offer",
    "Got a job offer before graduating",
    "Graduated with a CS degree",
    "Graduated with honors",
    "Dropped out of the honors college",
    "Didn't have to take Operating Systems II",
    "Took a class with Hess",
    "Took 162 as a freshman",
    "Been a TA",
    "Had to do an unpaid internship",
    "Failed an OA",
    "Failed a technical interview question",
    "Fell asleep in a class",
    "Caused a fork bomb on the OS1 server",
    "Caused a fork bomb on the flip server (uh oh)",
    "Considered switching majors",
  ]

  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    items.map(item => ({
      id: items.indexOf(item),
      text: item,
      isChecked: false
    }))
  );

  return (
    <div className='home-div'>
      <h1 className='text h1-text orange-text title-text'>Oregon State Purity Test</h1>
      <h2 className='text italic-text subtitle-text h2-text'>Computer Science Edition</h2>

      <div className='website-description'>
        <p className='text p-text'>The official purity test for the true STEM critters of OSU (Computer Science majors). Click on every item you have done.</p>
        <p className='text p-text bold-text'>Caution: This is NOT a bucket list. Completion of all items on this test will make you a critter.</p>
      </div>

      <Checklist checklist={checklist} setChecklist={setChecklist}/>

      <div className='calculate-button-div'>
        <a href='/results'>
          <button 
            className='calculate-button'
            onClick={() => {
              const score = checklist.filter(item => item.isChecked).length;
              setScore(100 - score);
            }}
          >
            Calculate my score.
          </button>
        </a>
      </div>

      <Footer />
    </div>
  )
}
