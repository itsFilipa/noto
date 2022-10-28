import { IonRouterOutlet } from "@ionic/react"
import { Route } from "react-router"
import { ButtonDocs } from "./Button.docs"
import { InputDocs } from "./Input.docs"
import { MiscDocs } from "./Misc.docs"

export const DocsRoutes = () => {
  return(
    <IonRouterOutlet>
      <Route exact path="/components/buttons">
        <ButtonDocs />
      </Route>
      <Route exact path="/components/inputs">
        <InputDocs />
      </Route>
      <Route exact path="/components/misc">
        <MiscDocs />
      </Route>
    </IonRouterOutlet>
  )
}