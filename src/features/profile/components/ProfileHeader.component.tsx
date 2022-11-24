import { IonHeader, IonToolbar, IonButtons, useIonAlert } from "@ionic/react";
import { Button, Icon } from "../../../components";
import powerIcon from "../../../assets/iconout/power.svg";

export const ProfileHeader = () => {

  const [presentAlert] = useIonAlert();

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="end">
          <Button
            variant="outline"
            iconOnly
            size="large"
            suffix={
              <Icon icon={powerIcon} className="!w-6 !h-6 text-neutral-400" />
            }
            onClick={() =>
              presentAlert({
                header: "Logout",
                message: "Are you sure you want to quit?",
                buttons: [
                  {
                    text: "Cancel",
                    role: "cancel",
                  },
                  {
                    text: "Yes",
                    role: "confirm",
                    handler: () => {
                      console.log("Logged out")
                    },
                  },
                ],
              })
            }
          />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};
