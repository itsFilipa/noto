import { IonPage, IonContent } from "@ionic/react";
import { GenericHeader } from "../../../components";

export const FaqPage = () => {
  return (
    <IonPage>
      <GenericHeader title="FAQ" backBtn="/profile" />
      <IonContent>
        <p className="mt-5">
          Welcome to FAQ! This page will soon be available.
        </p>
      </IonContent>
    </IonPage>
  );
};