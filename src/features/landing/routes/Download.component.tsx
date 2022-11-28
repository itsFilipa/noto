import { IonPage, IonContent } from "@ionic/react";
import logo from "../assets/logo.svg";

export const DownloadPage = () => {
  return (
    <IonPage>
      <IonContent>
        <img src={logo} alt="logo for noto" className="w-[80%] mx-auto mt-12" />

        <p className="font-medium text-neutral-500 mt-8 mx-auto w-fit">
          Thank you for downloading Nōto
        </p>
      </IonContent>
    </IonPage>
  );
};
