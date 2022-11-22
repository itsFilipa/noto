import { IonRouterOutlet } from "@ionic/react"
import { Route } from "react-router"
import { NotecardsRoutes } from "../features/notecards"
import { ProfileRoutes } from "../features/profile"
import { PublicRoutes } from "./public"

export const AppRoutes = () => {
  return(
    <IonRouterOutlet>
      <PublicRoutes />

      <Route path="/profile">
        <ProfileRoutes />
      </Route>

      <Route path="/notecards">
        <NotecardsRoutes />
      </Route>
    </IonRouterOutlet>
  )
}