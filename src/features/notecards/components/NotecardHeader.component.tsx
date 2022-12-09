import { IonHeader, IonToolbar, IonButtons } from "@ionic/react";
import { Button } from "../../../components/Button";
import searchIcon from "../../../assets/iconout/magnifying-glass.svg";
import chevronDownIcon from "../../../assets/iconout/chevron-down.svg";
import ellipsisHorizontalIcon from "../../../assets/iconout/ellipsis-horizontal.svg";
import { Icon } from "../../../components";

type ActionSheet = {
  showActionSheet: () => void;
}

export const NotecardHeader = ({showActionSheet}: ActionSheet) => {

  return (
    
    <IonHeader>
      <IonToolbar>
          <IonButtons slot="start">
            <Button
              iconOnly
              variant="outline"
              size="large"
              prefix={<Icon icon={searchIcon} className="!h-5 !w-5 text-neutral-400" />}
            ></Button>
          </IonButtons>
          <IonButtons slot="end">
            <Button
              iconOnly
              size="large"
              variant="outline"
              prefix={<Icon icon={chevronDownIcon} className="!h-5 !w-5 text-neutral-400" />}
              id="sort"
              onClick={() => console.log("Clicked")}
            ></Button>
            <Button
              iconOnly
              size="large"
              variant="outline"
              // id="options"
              prefix={<Icon icon={ellipsisHorizontalIcon} className="!h-5 !w-5 text-neutral-400" />}
              onClick={showActionSheet}
            ></Button>
            {/* <Button
              iconOnly
              size="large"
              variant="outline"
              prefix={<IonIcon icon={graphIcon} className="h-6 w-6" />}
            ></Button>
            <Button
              iconOnly
              size="large"
              variant="outline"
              prefix={<TrashIcon className="h-5 w-5 text-neutral-400" />}
            ></Button> */}
          </IonButtons>
      </IonToolbar>
    </IonHeader>

  );
}