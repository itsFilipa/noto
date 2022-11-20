import { IonRouterOutlet } from "@ionic/react"
import { Route } from "react-router"
import { ProfileRoutes } from "../features/profile"
import { PublicRoutes } from "./public"

export const AppRoutes = () => {
  return(
    <IonRouterOutlet>
      <PublicRoutes />

      <Route path="/profile">
        <ProfileRoutes />
      </Route>
    </IonRouterOutlet>
  )
}