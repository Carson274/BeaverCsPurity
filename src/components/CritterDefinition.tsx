import { useEffect, useRef, useState } from 'react';

export default function CritterDefinition({ label = 'STEM critters' }: { label?: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <span className='critter-wrapper' ref={wrapRef}>
      <button
        type='button'
        className='critter-trigger'
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {label}
      </button>
      {open && (
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
  );
}
