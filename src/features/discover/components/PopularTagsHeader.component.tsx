import {
  ChevronDownIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { IonHeader, IonToolbar, IonButtons, IonTitle } from "@ionic/react";
import { Button } from "../../../components";

type Header = {
  tag?: string;
  clearTag: () => void;
};

export const PopularTagsHeader = ({ tag, clearTag }: Header) => {
  return (
    <IonHeader className="header-picker">
      <IonToolbar>
        <IonButtons slot="start">
          <Button
            iconOnly
            variant="clear"
            size="large"
            prefix={
              <ChevronLeftIcon className="h-[30px] w-[30px] text-neutral-400" />
            }
            routerLink="/discover"
            routerDirection="back"
          ></Button>
        </IonButtons>
        <IonTitle>Popular tags</IonTitle>
      </IonToolbar>
      <IonToolbar>
        <div className="flex items-center">
          <Button
            size="small"
            variant="outline"
            suffix={<ChevronDownIcon className="w-4 h-4 text-neutral-500" />}
            align="align-sb"
            className="w-[50%]"
            id="popular-tag-modal"
          >
            {tag ? tag : "Choose tag"}
          </Button>
          {tag && (
            <Button size="small" variant="clear" onClick={clearTag}>
              Clear
            </Button>
          )}
        </div>
      </IonToolbar>
    </IonHeader>
  );
};
