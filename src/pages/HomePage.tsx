import { useState } from 'react';
import Checklist from '../components/Checklist'
import Footer from '../components/Footer'
import SectionNav from '../components/SectionNav'
import CritterDefinition from '../components/CritterDefinition'
import type { ChecklistItem } from '../types';
import axios from 'axios';
import { getCurrentBrowserFingerPrint } from '@rajesh896/broprint.js';
import { logger } from '../logger';
import { items } from '../data/items';

export default function HomePage({ setScore } : { setScore: (score: number) => void }) {

  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    items.map(item => ({
      id: items.indexOf(item),
      text: item,
      isChecked: false
    }))
  );

  const handleSubmit = () => {
    logger.log('handleSubmit called!');
    const score = 100 - checklist.filter(item => item.isChecked).length;
    logger.log('Score calculated:', score);
    setScore(score);

    const checkedIds = checklist.filter(item => item.isChecked).map(item => item.id);
    localStorage.setItem('beaverPuritySubmission', JSON.stringify(checkedIds));
    // Persistent copy used to mark the user's own answers in the stats section.
    localStorage.setItem('beaverPurityChecked', JSON.stringify(checkedIds));
    
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

      <SectionNav />

      <div className='website-description'>
        <p className='text p-text'>
          The official purity test for the true <CritterDefinition />. Click on every item you have done.
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
