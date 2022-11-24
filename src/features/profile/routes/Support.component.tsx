import { IonPage, IonContent } from "@ionic/react";
import { GenericHeader } from "../../../components";

export const SupportPage = () => {
  return (
    <IonPage>
      <GenericHeader title="Support" backBtn="/profile" />
      <IonContent>
        <p className="mt-5">
          Welcome to Support! This page will soon be available.
        </p>
      </IonContent>
    </IonPage>
  );
};