import { IonRouterOutlet } from "@ionic/react"
import { Route } from "react-router"
import { LandingPage } from "../features/landing"
import { DocsRoutes } from "./docs"

export const PublicRoutes = () => {

  return(
    <IonRouterOutlet>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route path="/components">
        <DocsRoutes />
      </Route>
    </IonRouterOutlet>
  )
}