import { IonHeader, IonToolbar, IonButtons, IonTitle } from "@ionic/react";
import { Button } from "../Button";

export interface HeaderProps {
  title?: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
}

export const Header = ({ title, prefix, suffix }: HeaderProps) => {
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
