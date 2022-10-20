import { IonRouterOutlet } from "@ionic/react"
import { PublicRoutes } from "./public"

export const AppRoutes = () => {
  return(
    <IonRouterOutlet>
      <PublicRoutes />
    </IonRouterOutlet>
  )
}