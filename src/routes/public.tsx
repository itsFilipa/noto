import { IonRouterOutlet } from "@ionic/react"
import { Route } from "react-router"
import { LandingPage } from "../features/landing"

export const PublicRoutes = () => {

  return(
    <IonRouterOutlet>
      <Route exact path="/">
        <LandingPage />
      </Route>
    </IonRouterOutlet>
  )
}