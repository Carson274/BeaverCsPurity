import { useEffect, useState } from 'react';
import { sections } from '../data/items';

export default function SectionNav() {
  const [active, setActive] = useState<string>(sections[0]?.anchorId ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-15% 0px -80% 0px', threshold: 0 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.anchorId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (anchorId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className='section-nav' aria-label='Test sections'>
      {sections.map((s, idx) => {
        const isActive = active === s.anchorId;
        return (
          <a
            key={s.anchorId}
            href={`#${s.anchorId}`}
            onClick={handleClick(s.anchorId)}
            className={`section-nav-item${isActive ? ' section-nav-active' : ''}`}
            aria-current={isActive ? 'true' : undefined}
          >
            <span className='section-nav-num'>{idx + 1}</span>
            <span className='section-nav-label'>{s.shortTitle}</span>
          </a>
        );
      })}
    </nav>
  );
}
