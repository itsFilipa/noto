import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { IonHeader, IonToolbar, IonButtons } from "@ionic/react"
import { Button } from "../../../components/Button"
import usersIcon from "../../../assets/iconout/users.svg";
import searchIcon from "../../../assets/iconout/magnifying-glass.svg";
import { Icon } from "../../../components";

export const DiscoverHeader = () => {

  return(
    <IonHeader>
      <IonToolbar>
      <IonButtons slot="start">
          <Button
            iconOnly
            variant="outline"
            size="large"
            prefix={
              <Icon icon={searchIcon} className="text-neutral-400" />
            }
            id="open-search-modal"
          ></Button>
        </IonButtons>
        <IonButtons slot="end">
          <Button
            iconOnly
            size="large"
            variant="outline"
            prefix={<Icon icon={usersIcon} className="text-neutral-400 !stroke-2" />}
            routerLink="/discover/following"
            routerDirection="forward"
          ></Button>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}