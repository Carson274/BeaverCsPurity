import { useState } from 'react';
import { GoCheck } from "react-icons/go";

export default function Checkbox({ checkedState, onChange }: { checkedState: boolean; onChange: (isChecked: boolean) => void; }) {
  const [isChecked, setIsChecked] = useState(checkedState);

  const handleClick = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState); // Call the onChange callback
  };

  return (
    <div 
      onClick={handleClick}
      className={isChecked ? 'checkbox-checked' : 'checkbox-unchecked'}
    >
      {isChecked && (
        <GoCheck color='white' />
      )}
    </div>
  );
}