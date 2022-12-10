import { IonHeader, IonToolbar, IonButtons } from "@ionic/react";
import { Button } from "../../../components/Button";
import searchIcon from "../../../assets/iconout/magnifying-glass.svg";
import chevronDownIcon from "../../../assets/iconout/chevron-down.svg";
import ellipsisHorizontalIcon from "../../../assets/iconout/ellipsis-horizontal.svg";
import { Icon } from "../../../components";
import { MouseEvent } from "react";

type NotecardHeaderProps = {
  openPopover: (e: MouseEvent<HTMLIonButtonElement>) => void;
};

export const NotecardHeader = ({ openPopover }: NotecardHeaderProps) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <Button
            iconOnly
            variant="outline"
            size="large"
            prefix={
              <Icon icon={searchIcon} className="!h-5 !w-5 text-neutral-400" />
            }
          ></Button>
        </IonButtons>
        <IonButtons slot="end">
          <Button
            iconOnly
            size="large"
            variant="outline"
            prefix={
              <Icon
                icon={chevronDownIcon}
                className="!h-5 !w-5 text-neutral-400"
              />
            }
            onClick={(e) => openPopover(e)}
          ></Button>
          <Button
            iconOnly
            size="large"
            variant="outline"
            id="options"
            prefix={
              <Icon
                icon={ellipsisHorizontalIcon}
                className="!h-5 !w-5 text-neutral-400"
              />
            }
          ></Button>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
