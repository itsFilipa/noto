import { IonHeader, IonToolbar, IonButtons } from "@ionic/react";
import { Icon, Button } from "../../../components";
import searchIcon from "../../../assets/iconout/magnifying-glass.svg";
import filterIcon from "../../../assets/iconout/filter.svg";

//TODO: animate searchbar
//https://www.w3schools.com/howto/howto_css_animated_search.asp

export const FilterHeader = () => {
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
            prefix={<Icon icon={filterIcon} className="!h-5 !w-5 text-neutral-400" />}
            id="filter"
          ></Button>
        </IonButtons>
        {/* <Searchbar
          searchIcon={searchIcon}
          placeholder="Search for tags here..."
          className="header-search"
        /> */}
      </IonToolbar>
    </IonHeader>
  );
};
