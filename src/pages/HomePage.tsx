import { useState } from 'react';
import Checklist from '../components/Checklist'
import Footer from '../components/Footer'
import type { ChecklistItem } from '../types';

export default function HomePage({ setScore } : { setScore: (score: number) => void }) {
  const items = [
    "Used ChatGPT on an assignment",
    "Took 18+ credits in one term",
    "Skipped every lecture after week 1",
    "Failed an exam",
    "Failed a course",
    "Emailed a professor for an extension",
    "Been denied an extension",
    "Cried over an assignment/exam",
    "Spent money on an LLM",
    "Survived CS 162",
    "Went 2 days in a row without showering",
    "Went 3+ days in a row without showering",
    "Attended a <a href='https://beaverhacks.org/' target='_blank' rel='noopener noreferrer' class='text-link'>Beaverhacks</a> hackathon",
    "Attended a hackathon outside of Oregon",
    "Placed in a hackathon",
    "Attended a computer science club meeting",
    "Attended an <a href='https://acm.oregonstate.edu' target='_blank' rel='noopener noreferrer' class='text-link'>ACM</a> club meeting (shameless plug)",
    "'sudo rm -rf'd something you weren't supposed to",
    "Pulled an all-nighter",
    "Pulled 2+ all-nighters in a row",
    "Spent the night in Kelley",
    "Bought a Subway sandwich after 2am",
    "Studied on the library 6th floor",
    "Left the library at 12am",
    "Got an interview from a career fair",
    "Applied to 50+ internships",
    "Applied to 100+ internships",
    "Got an internship",
    "Got a job offer",
    "Dropped out of the honors college",
    "Didn't have to take Operating Systems II",
    "Took a class with Hess",
    "Delayed taking a course to take it with a specific professor",
    "Took 162 as a freshman",
    "Did an unpaid internship",
    "Failed an OA",
    "Failed a technical interview question",
    "Fell asleep in class",
    "Fork bombed the OS1 or flip server",
    "Considered switching majors",
    "Sat in the front row of a class",
    "Used Jake's Resume template (or Peter's <a href='https://formacv.org/' target='_blank' rel='noopener noreferrer' class='text-link'>resume builder</a>)",
    "Moved seats because of someone's B.O.",
    "Drank 400+ mg of caffeine in one day",
    "Made 500+ connections on LinkedIn",
    "Made a LinkedIn post",
    "Commented on a LinkedIn post",
    "Watched a LinkedIn reel",
    "Maintained a 4.0",
    "Joined a club officer board",
    "Completed the LeetCode problem 'Two Sum'",
    "Bought LeetCode Premium",
    "Completed 100+ LeetCode problems",
    "Completed a LeetCode hard (without looking at the solution)",
    "Coded outside",
    "Coded at Dixon",
    "Coded drunk",
    "Coded on a Friday night",
    "Coded in high school",
    "Coded on your phone",
    "Had to get glasses mid-degree",
    "Grew a beard",
    "Joined a Teams meeting",
    "Been mock interviewed",
    "Mock interviewed someone",
    "Owned an RGB keyboard",
    "Used a personal mouse in class",
    "Never attended a party",
    "Stuttered while talking to someone",
    "Put 'REST' or 'RESTful API' on your resume",
    "Built a personal website",
    "Raised your hand in class",
    "Had the dawgs out in class",
    "Eaten a whole meal in class",
    "Solved a LeetCode problem in class",
    "Used a physical computer science textbook",
    "Contributed to an open source project",
    "Had an app idea you thought was unique but already existed",
    "Worked in a research lab",
    "Authored a research paper",
    "Programmed in Scratch",
    "Went on a date",
    "Been on a first name basis with a professor",
    "Gave up on a personal project",
    "Landed a FAANG internship",
    "Rejected an offer",
    "Built a PC",
    "Built a Chrome Extension",
    "Built a ChatGPT wrapper",
    "Got a GitHub commit streak of 100+ days",
    "Replied to a Stack Overflow question",
    "Gave up on Advent of Code",
    "Made a computer science reference in real life",
    "Lost hours of work because you forgot to push",
    "Forget how to exit Vim",
    "Pushed an API key to GitHub",
    "Submitted the wrong assignment document",
    "Overengineered a project",
    "Pushed code with '--force'",
    "Caused a massive merge conflict",
    "Used Latex or Markdown for class notes",
    "Sacrificed one course's exam to study for another",
    "Used an API without rate limiting and paid the price—literally",
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
