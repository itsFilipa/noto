import { IonIcon } from "@ionic/react"
import { cn } from "../../lib/cn";

export type IconProps = React.ComponentProps<typeof IonIcon>;

export const Icon = ({icon, className}: IconProps) => {

  return (
    <IonIcon icon={icon} className={cn(`w-5 h-5 stroke-[1.5px] ${className}`)} />
  )
}