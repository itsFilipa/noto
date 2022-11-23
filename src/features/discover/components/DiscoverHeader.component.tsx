import { MagnifyingGlassIcon, UsersIcon } from "@heroicons/react/24/outline"
import { IonHeader, IonToolbar, IonButtons } from "@ionic/react"
import { Button } from "../../../components/Button"

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
              <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />
            }
          ></Button>
        </IonButtons>
        <IonButtons slot="end">
          <Button
            iconOnly
            size="large"
            variant="outline"
            prefix={<UsersIcon className="h-5 w-5 text-neutral-400" />}
            routerLink="/discover/following"
            routerDirection="forward"
          ></Button>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  )
}