import { IonHeader, IonToolbar, IonButtons, IonTitle } from "@ionic/react";
import { Button, Icon } from "..";
import chevronLeftIcon from "../../assets/iconout/chevron-left.svg";


export interface GenericHeaderProps {
  title?: string;
  backBtn?: string;
}

export const GenericHeader = ({title, backBtn}: GenericHeaderProps) => {
  return (
  <IonHeader>
      <IonToolbar>
        {backBtn && (
          <IonButtons slot="start">
            <Button
              iconOnly
              variant="clear"
              size="large"
              prefix={
                <Icon icon={chevronLeftIcon} className="!h-[30px] !w-[30px] text-neutral-400" />
              }
              routerLink={backBtn}
              routerDirection="back"
            ></Button>
          </IonButtons>
        )}
        {title && <IonTitle>{title}</IonTitle>}
      </IonToolbar>
    </IonHeader>
  );
}