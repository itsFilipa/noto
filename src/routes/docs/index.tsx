import { IonRouterOutlet } from "@ionic/react"
import { Route } from "react-router"
import { ButtonDocs } from "./Button.docs"
import { MiscDocs } from "./Misc.docs"

export const DocsRoutes = () => {
  return(
    <IonRouterOutlet>
      <Route exact path="/components/buttons">
        <ButtonDocs />
      </Route>
      <Route exact path="/components/toggles">
        <MiscDocs />
      </Route>
    </IonRouterOutlet>
  )
}