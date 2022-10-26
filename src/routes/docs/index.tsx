import { IonRouterOutlet } from "@ionic/react"
import { Route } from "react-router"
import { ButtonDocs } from "./Button.docs"

export const DocsRoutes = () => {
  return(
    <IonRouterOutlet>
      <Route exact path="/components/buttons">
        <ButtonDocs />
      </Route>
    </IonRouterOutlet>
  )
}