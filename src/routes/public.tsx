import { IonRouterOutlet } from "@ionic/react"
import { Route } from "react-router"
import { SignUpPage, LandingPage } from "../features"
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
      <Route exact path="/sign-up">
        <SignUpPage />
      </Route>
    </IonRouterOutlet>
  )
}