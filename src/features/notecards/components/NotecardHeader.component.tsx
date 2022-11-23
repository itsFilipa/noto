import { IonHeader, IonToolbar, IonButtons } from "@ionic/react";
import { Button } from "../../../components/Button";
import { MagnifyingGlassIcon, ChevronDownIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export const NotecardHeader = () => {

  return (
    
    <IonHeader>
      <IonToolbar>
          <IonButtons slot="start">
            <Button
              iconOnly
              variant="outline"
              size="large"
              prefix={<MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />}
            ></Button>
          </IonButtons>
          <IonButtons slot="end">
            <Button
              iconOnly
              size="large"
              variant="outline"
              prefix={<ChevronDownIcon className="h-5 w-5 text-neutral-400" />}
              id="sort"
              onClick={() => console.log("Clicked")}
            ></Button>
            <Button
              iconOnly
              size="large"
              variant="outline"
              id="options"
              prefix={<EllipsisHorizontalIcon className="h-5 w-5 text-neutral-400" />}
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