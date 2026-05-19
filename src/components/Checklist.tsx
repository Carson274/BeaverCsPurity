import Checkbox from '../components/Checkbox';
import type { ChecklistItem } from '../types';

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

  return (
    <div>
      {checklist.map((item) => (
        <div
          key={item.id}
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
      ))}
    </div>
  )
}
