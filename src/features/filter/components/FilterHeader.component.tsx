import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { IonHeader, IonToolbar, IonButtons } from "@ionic/react";
import { Button } from "../../../components/Button";
import { Searchbar } from "../../../components/Searchbar";
import searchIcon from "../../../components/Searchbar/assets/magnifying-glass.svg";

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
              <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />
            }
          ></Button>
        </IonButtons>
        <IonButtons slot="end">
          <Button
            iconOnly
            size="large"
            variant="outline"
            prefix={<ChevronDownIcon className="h-5 w-5 text-neutral-400" />}
            id="filter"
            onClick={() => console.log("Clicked")}
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
