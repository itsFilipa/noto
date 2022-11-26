import { IonHeader, IonToolbar, IonButtons, useIonAlert, useIonRouter } from "@ionic/react";
import { Button, Icon } from "../../../components";
import powerIcon from "../../../assets/iconout/power.svg";
import { useAuth } from "../../../store";

export const ProfileHeader = () => {

  const {user, logout} = useAuth();
  const [presentAlert] = useIonAlert();
  const router = useIonRouter();

  const onLogout = async () => {
    const {error} = await logout();
    if (error) {
      console.log(error);
      presentAlert({
        header: "Error",
        message: "There was an error logging out",
        buttons: ["OK"],
      });
    } else {
      router.push("/sign-in", "none", "replace");
    }
  };

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
                      onLogout();
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
