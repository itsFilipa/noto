import { IonRouterOutlet } from "@ionic/react"
import { Route } from "react-router"
import { Tabs } from "../../../components/Tabs"
import { DiscoverPage } from "./Discover.component"
import { FollowingPage } from "./Following.component"
import { PickedForYouPage } from "./PickedForYou.component"
import { PopularTagsPage } from "./PopularTags.component"
import { TrendingCardsPage } from "./TrendingCards.component"

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
        <Route exact path="/discover/trending">
          <TrendingCardsPage />
        </Route>
        <Route exact path="/discover/suggestions">
          <PickedForYouPage />
        </Route>
        <Route exact path="/discover/following">
          <FollowingPage />
        </Route>
      </IonRouterOutlet>
    </Tabs>
  )
}