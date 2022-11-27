import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { Tabs } from "../../../components/Tabs";
import { JunkPage } from "./Junk.component";
import { NotecardsPage } from "./Notecards.component";

export const NotecardsRoutes = () => {
  return (
    <Tabs>
      <IonRouterOutlet>
        <Route exact path="/notecards">
          <NotecardsPage />
        </Route>
        <Route exact path="/notecards/junk">
          <JunkPage />
        </Route>
      </IonRouterOutlet>
    </Tabs>
  );
};