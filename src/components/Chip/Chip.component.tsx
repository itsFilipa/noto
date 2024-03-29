import { IonChip } from "@ionic/react";
import { useState } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../Icon";
import xIcon from "../../assets/iconout/x-circle.svg";

export type ChipProps = React.ComponentProps<typeof IonChip>;

export type CustomChipProps = ChipProps & {
  checked?: boolean;
  label: string;
};

export const Chip = ({ checked, label, className, ...rest }: CustomChipProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleChecked = (e: React.MouseEvent<HTMLElement>) => {
    setIsChecked(!isChecked);
    e.currentTarget.classList.toggle("checked");
  };

  if (isChecked) {
    return (
      <IonChip {...rest} className={cn(`checked ${className}`)}>
        <p className="font-medium">{label}</p>
        <div
        // onClick={toggleChecked}
        >
          <Icon icon={xIcon} className="h-4.5 w-4.5 text-white" />
        </div>
      </IonChip>
    );
  }
  return (
    <IonChip
      className={className}
      {...rest}
      // onClick={toggleChecked}
    >
      <p className="font-medium">{label}</p>
    </IonChip>
  );
};
