import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
} from "@ionic/react";
import { Button } from "../Button";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export interface HeaderProps {
  title?: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  backBtn?: boolean;
}

export const Header = ({ title, prefix, suffix, backBtn }: HeaderProps) => {
  return (
    <IonHeader>
      <IonToolbar>
        {prefix && (
          <IonButtons slot="start">
            <Button
              iconOnly
              variant="outline"
              size="large"
              prefix={prefix}
            ></Button>
          </IonButtons>
        )}
        {backBtn && (
          <IonButtons slot="start">
            <Button
              iconOnly
              variant="clear"
              size="large"
              prefix={
                <ChevronLeftIcon className="h-[30px] w-[30px] text-neutral-400" />
              }
              routerLink="/profile"
              routerDirection="back"
            ></Button>
          </IonButtons>
        )}
        {title && <IonTitle>{title}</IonTitle>}
        {suffix && (
          <IonButtons slot="end">
            <Button
              iconOnly
              size="large"
              variant="outline"
              prefix={suffix}
            ></Button>
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
};
