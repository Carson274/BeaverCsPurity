import React, { useState } from 'react'
import Checkbox from '../components/Checkbox';

interface ChecklistItem {
  id: number;
  text: string;
  isChecked: boolean;
}

export default function Checklist() {
  const items = [
    "Spent money on an LLM.",
    "Used ChatGPT on an assignment.",
    "Failed a test.",
    "Failed a course.",
    "Took 20+ credits in one term.",
    "Survived CS 162."
  ]

  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    items.map(item => ({
      id: items.indexOf(item),
      text: item,
      isChecked: false
    }))
  );

  return (
    <div>
      {checklist.map((item) => (
        <div key={item.id} className='checklist-item'>
          <Checkbox checkedState={item.isChecked} />
          <p className='text'>
            {item.id + 1}. {item.text}
          </p>
        </div>
      ))}
    </div>
  )
}
