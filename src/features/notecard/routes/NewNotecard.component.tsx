import { IonPage, IonContent } from "@ionic/react";
import { GenericHeader } from "../../../components";
import eyeIcon from "../../../assets/iconout/eye.svg";
import { FullPageInput } from "../../../components/Input/FullPageInput.component";

export const NewNotecardPage = () => {
  return (
    <IonPage>
      <GenericHeader title="Untitled" backBtn="/notecards" />
      <IonContent>
        <FullPageInput />
      </IonContent>
    </IonPage>
  );
};
