import { useState } from 'react';
import { GoCheck } from "react-icons/go";

export default function Checkbox({ checkedState }: { checkedState: boolean }) {
  const [isChecked, setIsChecked] = useState(checkedState);

  return (
    <div 
      onClick={() => setIsChecked(!isChecked)}
      className={isChecked ? 'checkbox-checked' : 'checkbox-unchecked'}
    >
      {isChecked && (
        <GoCheck color='white' />
      )}
    </div>
  );
}