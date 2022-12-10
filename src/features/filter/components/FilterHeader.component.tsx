import { IonHeader, IonToolbar, IonButtons } from "@ionic/react";
import { Icon, Button } from "../../../components";
import searchIcon from "../../../assets/iconout/magnifying-glass.svg";
import filterIcon from "../../../assets/iconout/filter.svg";

export const FilterHeader = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <Button
            iconOnly
            variant="outline"
            size="large"
            id="open-search-filter"
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
            prefix={<Icon icon={filterIcon} className="!h-5 !w-5 text-neutral-400" />}
            id="filter"
          ></Button>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
