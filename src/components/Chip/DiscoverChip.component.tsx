import { IonChip } from "@ionic/react";
import { cn } from "../../lib/cn";
export { IonChip } from "@ionic/react";

export type DiscoverChipProps = React.ComponentProps<typeof IonChip>;

export type CustomDiscoverChipProps = DiscoverChipProps & {
  checked?: boolean;
  label: string;
};

export const DiscoverChip = ({
  checked,
  label,
  ...rest
}: CustomDiscoverChipProps) => {
  const toggleChecked = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.classList.toggle("checked");
  };

  return (
    <IonChip
      {...rest}
      className={cn(`
    ${checked && "checked"}
    discover-chip
  `)}
      // onClick={toggleChecked}
    >
      <p className="font-medium">{label}</p>
    </IonChip>
  );
};
