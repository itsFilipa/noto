import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { Tabs } from "../../../components/Tabs";
import { ProfilePage } from "./Profile.component";

export const ProfileRoutes = () => {
  return (
    <Tabs>
        <IonRouterOutlet>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
        </IonRouterOutlet>
    </Tabs>
  );
};
