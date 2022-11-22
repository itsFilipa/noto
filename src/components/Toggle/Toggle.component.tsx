// export {IonToggle as Toggle} from '@ionic/react';
import { IonToggle } from "@ionic/react";
import { variants } from "classname-variants";
import type { VariantPropsOf } from "classname-variants/react";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

const toggleVariants = variants({
  base: "toggle",
  variants: {
    size: {
      sm: "toggle-sm",
      default: "toggle--size-default",
    },
    icon: {
      true: "toggle-icon",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export type ToggleCustomProps = VariantPropsOf<typeof toggleVariants> &
  ComponentPropsWithoutRef<typeof IonToggle>;

export const Toggle = ({ className, icon, size, ...otherProps }: ToggleCustomProps) => {
  return <IonToggle 
  {...otherProps}
  className={cn(`custom-toggle ${className} ${toggleVariants({size, icon})}`)}
  />;
};
