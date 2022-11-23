import { IonRouterOutlet } from "@ionic/react"
import { Route } from "react-router"
import { Tabs } from "../../../components/Tabs"
import { DiscoverPage } from "./Discover.component"
import { PopularTagsPage } from "./PopularTags.component"

export const DiscoverRoutes = () => {

  return(
    <Tabs>
      <IonRouterOutlet>
        <Route exact path="/discover">
          <DiscoverPage />
        </Route>
        <Route exact path="/discover/popular-tags">
          <PopularTagsPage />
        </Route>
      </IonRouterOutlet>
    </Tabs>
  )
}