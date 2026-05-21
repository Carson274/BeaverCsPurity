import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer'
import CritterDefinition from '../components/CritterDefinition'
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

  const [pendingSubmission] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem('beaverPuritySubmission');
      if (raw) {
        localStorage.removeItem('beaverPuritySubmission');
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch { /* ignore */ }
    return [];
  });

  // The user's own checked answers, kept across refreshes to mark their rows.
  const [myChecked] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem('beaverPurityChecked');
      if (raw) {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch { /* ignore */ }
    return [];
  });

  const [explainOpen, setExplainOpen] = useState(false);
  const explainWrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!explainOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (explainWrapRef.current && !explainWrapRef.current.contains(e.target as Node)) {
        setExplainOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExplainOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [explainOpen]);

  useEffect(() => {
    const url = import.meta.env.VITE_FUNCTION_URL_GET_STATS;
    if (!url) {
      setStatsError('Stats endpoint not configured.');
      return;
    }

    const CACHE_KEY = 'beaverPurityStatsCache';
    const TTL_MS = 5 * 60 * 1000;
    // A fresh submission means cached stats are out of date — skip the cache.
    const justSubmitted = pendingSubmission.length > 0;

    if (!justSubmitted) {
      try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
          const cached = JSON.parse(raw) as { stats: Record<string, number>; fetchedAt: number };
          if (cached && Date.now() - cached.fetchedAt < TTL_MS) {
            setStats(cached.stats);
            return;
          }
        }
      } catch { /* ignore malformed cache */ }
    }

    axios
      .get(url)
      .then((res) => {
        const fetched = (res.data?.stats ?? {}) as Record<string, number>;
        setStats(fetched);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ stats: fetched, fetchedAt: Date.now() }));
        } catch { /* ignore storage failures */ }
      })
      .catch((err) => {
        logger.error('Failed to load stats:', err);
        setStatsError('Could not load stats.');
      });
  }, [pendingSubmission]);

  const displayStats = stats
    ? items.reduce<Record<string, number>>((acc, _, idx) => {
        const key = `Q${idx + 1}`;
        acc[key] = (stats[key] ?? 0) + (pendingSubmission.includes(idx) ? 1 : 0);
        return acc;
      }, {})
    : null;

  const maxCount = displayStats
    ? Math.max(1, ...Object.values(displayStats))
    : 1;

  return (
    <div className='results-div'>
      <div className='score-title-row'>
        <h1 className='score-title'>Your Beaver Purity Score</h1>
        <span className='critter-wrapper score-explain-wrapper' ref={explainWrapRef}>
          <button
            type='button'
            className='critter-trigger score-explain-trigger'
            onClick={() => setExplainOpen((o) => !o)}
            aria-expanded={explainOpen}
          >
            (what does this mean?)
          </button>
          {explainOpen && (
            <span className='definition-popover score-explain-popover' role='dialog'>
              <span className='definition-body'>
                Your score is <strong>100 minus the number of items you checked</strong>, so it reflects how{' '}
                <em>pure</em> you are, not how many boxed you checked off. A higher number means
                you've kept your purity intact. The lower it goes, the more of a <CritterDefinition label='critter' /> you are.
              </span>
            </span>
          )}
        </span>
      </div>
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
          {displayStats && items.map((text, idx) => {
            const key = `Q${idx + 1}`;
            const count = displayStats[key] ?? 0;
            const pct = (count / maxCount) * 100;
            return (
              <div key={key} className='stats-row'>
                {myChecked.includes(idx) && (
                  <span
                    className='stats-mine-dot'
                    title='You checked this one'
                    aria-label='You checked this one'
                  />
                )}
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
