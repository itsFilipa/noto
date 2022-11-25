import { IonPage, IonContent } from "@ionic/react";
import logo from "../assets/logo.svg";

export const SignUpPage = () => {

  return(
    <IonPage>
      <IonContent className="[--background:white]">
        <img src={logo} alt="logo for noto" />
      </IonContent>
    </IonPage>
  )
}