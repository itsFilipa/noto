import { IonPage, IonContent } from "@ionic/react"
import { GenericHeader } from "../../../components"

export const ChangePasswordPage = () => {
   
  return(
    <IonPage>
      <GenericHeader title="Change Password" backBtn="/profile" />
      <IonContent>
        Hello
      </IonContent>
    </IonPage>
  )
}