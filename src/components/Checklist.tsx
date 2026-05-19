import { Fragment } from 'react';
import Checkbox from '../components/Checkbox';
import type { ChecklistItem } from '../types';
import { sections } from '../data/items';

export default function Checklist({ checklist, setChecklist }: {
    checklist: ChecklistItem[];
    setChecklist: (updatedChecklist: ChecklistItem[]) => void;
  }) {

  const toggleItem = (id: number) => {
    const updatedChecklist = checklist.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    setChecklist(updatedChecklist);
  };

  const handleRowClick = (id: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('a')) {
      return;
    }
    toggleItem(id);
  };

  const sectionByStart = new Map(sections.map((s) => [s.startId, s]));

  return (
    <div>
      {checklist.map((item) => {
        const section = sectionByStart.get(item.id);
        return (
          <Fragment key={item.id}>
            {section && (
              <h3 id={section.anchorId} className='section-heading'>
                {section.title}
              </h3>
            )}
            <div
              className='checklist-item'
              onClick={handleRowClick(item.id)}
              role='checkbox'
              aria-checked={item.isChecked}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  toggleItem(item.id);
                }
              }}
            >
              <Checkbox checkedState={item.isChecked} />
              <p
                className='text'
                dangerouslySetInnerHTML={{
                  __html: `${item.id + 1}. ${item.text}`
                }}
              />
            </div>
          </Fragment>
        );
      })}
    </div>
  )
}
