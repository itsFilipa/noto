import { IonChip } from "@ionic/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
export { IonChip } from "@ionic/react";

export type ChipProps = React.ComponentProps<typeof IonChip>;

export type CustomChipProps = ChipProps & {
  checked?: boolean;
  label: string;
};

export const Chip = ({ checked, label, ...rest }: CustomChipProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleChecked = (e: React.MouseEvent<HTMLElement>) => {
    setIsChecked(!isChecked);
    e.currentTarget.classList.toggle("checked");
  };

  if (isChecked) {
    return (
      <IonChip {...rest} className="checked">
        <p className="font-medium">{label}</p>
        <div onClick={toggleChecked}>
          <XCircleIcon className="h-4.5 w-4.5" />
        </div>
      </IonChip>
    );
  }
  return (
    <IonChip {...rest} onClick={toggleChecked}>
      <p className="font-medium">{label}</p>
    </IonChip>
  );
};
