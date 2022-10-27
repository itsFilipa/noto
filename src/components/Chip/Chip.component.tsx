import { IonChip } from "@ionic/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
export { IonChip } from "@ionic/react";

export type ChipProps = React.ComponentProps<typeof IonChip>;

export type CustomChipProps = ChipProps & {
  checked?: boolean;
  label: string;
};

export const Chip = ({ checked, label, ...rest }: CustomChipProps) => {
  
  //make function to handle click that will toggle checked from classname
  
  if (checked) {
    return (
      <IonChip {...rest} className="checked" onClick={() => {}}>
        <p className="font-medium">{label}</p>
        <XCircleIcon className="h-4.5 w-4.5" />
      </IonChip>
    );
  }
  return (
    <IonChip {...rest}>
      <p className="font-medium">{label}</p>
    </IonChip>
  );
};
