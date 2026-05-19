import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer'
import { items } from '../data/items';
import { logger } from '../logger';
import type { MessageItem } from '../types'

export default function ResultsPage({ score }: { score: number }) {
  const messages: MessageItem[] = [
    { floor: 100, text: "Not a single one? Are you sure you're a CS major?" },
    { floor: 80, text: "You must either be a freshman or have a social life. Congrats! Goodluck finding a j*b though." },
    { floor: 70, text: "Whoops! Looks like you're starting to fit in a little too much. You may still have hope, but it's not looking good. Your EQ is probably dropping by the hour." },
    { floor: 69, text: "Nice." },
    { floor: 50, text: "Whoops! Looks like you're starting to fit in a little too much. You may still have hope, but it's not looking good. Your EQ is probably dropping by the hour." },
    { floor: 30, text: "In case it wasn't clear, a higher score is better buddy. You've basically reached peak critter and it's not looking good. You're probably that guy wearing sandals without socks in Kelley." },
    { floor: 15, text: "Either you cheated or you're actually going to be single forever. You probably think coffee-chats are dates and I bet you only shower when you've exercised." },
    { floor: 5, text: "If you're this low and still don't have a j*b yet, I'm doomed." },
    { floor: 0, text: "Holy critter." },
  ];

  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    const url = import.meta.env.VITE_FUNCTION_URL_GET_STATS;
    if (!url) {
      setStatsError('Stats endpoint not configured.');
      return;
    }
    axios
      .get(url)
      .then((res) => setStats((res.data?.stats ?? {}) as Record<string, number>))
      .catch((err) => {
        logger.error('Failed to load stats:', err);
        setStatsError('Could not load stats.');
      });
  }, []);

  const maxCount = stats
    ? Math.max(1, ...Object.values(stats))
    : 1;

  return (
    <div className='results-div'>
      <h1 className='score-title'>Your Beaver Purity Score</h1>
      <p className='text score-text orange-text bold-text'>{score} / 100</p>

      <p className='text p-text'>{messages.find(m => score >= m.floor)?.text}</p>

      <div className='result-buttons-div'>
        <a href='/'>
          <button
            className='try-again-button'
          >
            Try Again
          </button>
        </a>
      </div>

      <details className='stats-details'>
        <summary className='stats-summary'>See how others scored each question</summary>
        <div className='stats-bars'>
          {stats === null && !statsError && (
            <p className='text p-text stats-status'>Loading…</p>
          )}
          {statsError && (
            <p className='text p-text stats-status'>{statsError}</p>
          )}
          {stats && items.map((text, idx) => {
            const key = `Q${idx + 1}`;
            const count = stats[key] ?? 0;
            const pct = (count / maxCount) * 100;
            return (
              <div key={key} className='stats-row'>
                <div className='stats-row-header'>
                  <span
                    className='stats-label'
                    dangerouslySetInnerHTML={{ __html: `${idx + 1}. ${text}` }}
                  />
                  <span className='stats-count'>{count}</span>
                </div>
                <div className='stats-bar-track'>
                  <div className='stats-bar-fill' style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </details>

      <Footer/>
    </div>
  )
}
