import { useEffect, useRef, useState } from 'react';
import Checklist from '../components/Checklist'
import Footer from '../components/Footer'
import type { ChecklistItem } from '../types';
import axios from 'axios';
import { getCurrentBrowserFingerPrint } from '@rajesh896/broprint.js';
import { logger } from '../logger';

export default function HomePage({ setScore } : { setScore: (score: number) => void }) {
  const items = [
    "Survived CS 162",
    "Took 18+ credits in one term",
    "Used Latex or Markdown for class notes",
    "Skipped every lecture for a class after week 1",
    "Submitted the wrong assignment document",
    "Got 100% on an exam",
    "Finished a course with over 100%",
    "Emailed a professor for an extension",
    "Been denied an extension",
    "Cried over an assignment/exam",
    "Sacrificed one course's exam to study for another's",
    "Joined and didn't drop out of the Honors College",
    "Used ChatGPT on an assignment",
    "Spent money on an LLM",
    "Went 2 days in a row without showering",
    "Went 3+ days in a row without showering",
    "Attended a club meeting only for the food",
    "Attended an <a href='https://acm.oregonstate.edu' target='_blank' rel='noopener noreferrer' class='text-link'>ACM</a> club meeting (shameless plug)",
    "Joined a club officer board",
    "Attended a <a href='https://beaverhacks.org/' target='_blank' rel='noopener noreferrer' class='text-link'>BeaverHacks</a> hackathon",
    "Attended a hackathon outside of Oregon",
    "Placed in a hackathon",
    "'sudo rm -rf'd something you weren't supposed to",
    "Pulled an all-nighter",
    "Pulled 2+ all-nighters in a row",
    "Spent the night in Kelley",
    "Bought a Subway sandwich after 2am",
    "Studied on the library 6th floor",
    "Left the library at 12am",
    "Got an interview from a career fair",
    "Applied to 100+ positions",
    "Applied to 1000+ positions",
    "Got an internship",
    "Got a j*b offer",
    "Did an unpaid internship",
    "Got a 100% of test cases on an OA",
    "Corrected the interviewer during a technical interview",
    "Didn't have to take Operating Systems II",
    "Inducted into the Hess Hall of Fame",
    "Delayed taking a course to take it with a specific professor",
    "Fell asleep in class",
    "Fork bombed the OS1 or flip server",
    "Considered switching majors",
    "Sat in the front row of a class",
    "Used Jake's Resume template (or Peter's new <a href='https://formacv.org/' target='_blank' rel='noopener noreferrer' class='text-link'>resume builder</a>)",
    "Moved seats because of someone's B.O.",
    "Drank 400+ mg of caffeine in one day",
    "Made 500+ connections on LinkedIn",
    "Made a LinkedIn post",
    "Commented on a LinkedIn post",
    "Maintained a 4.0",
    "Completed LeetCode's 'Two Sum'",
    "Bought LeetCode Premium",
    "Completed 500+ LeetCode problems",
    "Completed a LeetCode hard (without looking at the solution)",
    "Coded outside",
    "Coded at Dixon",
    "Coded inebriated",
    "Coded on a Friday night",
    "Coded in high school",
    "Coded on your phone",
    "Had to get glasses mid-degree",
    "Grew a beard",
    "Been mock interviewed",
    "Mock interviewed someone",
    "Owned an RGB keyboard",
    "Used a personal mouse in class",
    "Stuttered while talking to someone",
    "Put 'REST' or 'RESTful API' on your resume",
    "Built a personal website",
    "Raised your hand in class",
    "Had the dawgs out in class",
    "Ate a whole meal in class",
    "Solved a LeetCode problem in class",
    "Added a review on RateMyProfessor",
    "Contributed to an open source project",
    "Built a PC",
    "Built a Chrome Extension",
    "Built a ChatGPT wrapper",
    "Overengineered a project",
    "Had an app idea you thought was unique but already existed",
    "Used an API without rate limiting and <i>literally</i> paid the price",
    "Pushed code with '--force'",
    "Caused a massive merge conflict",
    "Had a GitHub commit streak of 100+ days",
    "Made a computer science reference IRL",
    "Lost hours of work because you forgot to push",
    "Forgot how to exit Vim",
    "Pushed an API key to GitHub",
    "Never attended a party",
    "Never went on a date",
    "Replied to a Stack Overflow question",
    "Completed Advent of Code",
    "Been on a first name basis with a professor",
    "Worked in a research lab",
    "Authored a research paper",
    "Did a Master's to delay unemployment",
    "Reneged an internship or j*b offer",
    "Landed a FAANG internship or j*b",
    "Graduated 🥳",
  ]
  
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    items.map(item => ({
      id: items.indexOf(item),
      text: item,
      isChecked: false
    }))
  );

  const [defOpen, setDefOpen] = useState(false);
  const popoverWrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!defOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (popoverWrapRef.current && !popoverWrapRef.current.contains(e.target as Node)) {
        setDefOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDefOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [defOpen]);

  const handleSubmit = () => {
    logger.log('handleSubmit called!');
    const score = 100 - checklist.filter(item => item.isChecked).length;
    logger.log('Score calculated:', score);
    setScore(score);
    
    getCurrentBrowserFingerPrint().then((fingerprint) => {
      logger.log('Fingerprint:', fingerprint);

      axios
        .post(import.meta.env.VITE_FUNCTION_URL_SUBMIT_SCORE, 
          { 
            score: score,
            userId: fingerprint,
            checklist: checklist,
          }, 
          {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(response => {
          logger.log('Success:', response.data);
        })
        .catch(error => {
          logger.error('Error:', error);
        });
    })
  }

  return (
    <div className='home-div'>
      <h1 className='text h1-text orange-text title-text'>Beaver Purity Test</h1>
      <h2 className='text italic-text subtitle-text h2-text'>Computer Science Edition</h2>

      <div className='website-description'>
        <p className='text p-text'>
          The official purity test for the true{' '}
          <span className='critter-wrapper' ref={popoverWrapRef}>
            <button
              type='button'
              className='critter-trigger'
              onClick={() => setDefOpen((o) => !o)}
              aria-expanded={defOpen}
            >
              STEM critters
            </button>
            {defOpen && (
              <span className='definition-popover' role='dialog'>
                <span className='definition-header'>
                  <span className='definition-word'>STEM crit·ter</span>
                  <span className='definition-pron'>/stɛm ˈkrɪd.ər/</span>
                  <span className='definition-pos'>noun · informal</span>
                </span>
                <span className='definition-body'>
                  A student exhibiting peculiar "critter"-like academic habits. These include haunting Kelley Engineering Center past midnight, 
                  showering once per week, and wearing sandals withouth socks in class. Any major can be a
                  critter, though Computer Science remains dominant (an estimated 90%).
                </span>
                <span className='definition-origin'>
                  <span className='definition-italic'>Origin:</span> coined by Carson Secrest, circa 2022.
                </span>
              </span>
            )}
          </span>
          . Click on every item you have done.
        </p>
        <p className='text p-text bold-text'>Caution: This is NOT a bucket list. Completion of all items on this test will make you a critter.</p>
      </div>

      <Checklist checklist={checklist} setChecklist={setChecklist}/>

      <div className='calculate-button-div'>
        <a href='/results'>
          <button 
            className='calculate-button'
            onClick={handleSubmit}
          >
            Calculate my score.
          </button>
        </a>
      </div>

      <Footer />
    </div>
  )
}
