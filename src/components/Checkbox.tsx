import { GoCheck } from "react-icons/go";

export default function Checkbox({ checkedState }: { checkedState: boolean; }) {
  return (
    <div
      className={checkedState ? 'checkbox-checked' : 'checkbox-unchecked'}
    >
      {checkedState && (
        <GoCheck color='white' />
      )}
    </div>
  );
}