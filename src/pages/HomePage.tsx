import { useEffect, useRef, useState } from 'react';
import Checklist from '../components/Checklist'
import Footer from '../components/Footer'
import SectionNav from '../components/SectionNav'
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

      <SectionNav />

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
                  showering once per week, and wearing sandals without socks in class. Any major can be a
                  critter, though Computer Science remains dominant (an estimated 90%).
                </span>
                <span className='definition-origin'>
                  <span className='definition-italic'>Origin:</span> coined by{' '}
                  <a
                    href='https://www.linkedin.com/in/carson-secrest'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-link'
                  >
                    Carson Secrest
                  </a>
                  , circa 2022.
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
