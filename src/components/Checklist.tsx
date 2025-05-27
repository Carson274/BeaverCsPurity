import Checkbox from '../components/Checkbox';
import type { ChecklistItem } from '../types';

export default function Checklist({ checklist, setChecklist }: {
    checklist: ChecklistItem[];
    setChecklist: (updatedChecklist: ChecklistItem[]) => void;
  }) {

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    const updatedChecklist = checklist.map((item) =>
      item.id === id ? { ...item, isChecked } : item
    );
    setChecklist(updatedChecklist);
  };

  return (
    <div>
      {checklist.map((item) => (
        <div key={item.id} className='checklist-item'>
          <Checkbox 
            checkedState={item.isChecked} 
            onChange={(isChecked) => handleCheckboxChange(item.id, isChecked)}
          />
          <p className='text'>
            {item.id + 1}. {item.text}
          </p>
        </div>
      ))}
    </div>
  )
}
