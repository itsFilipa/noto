import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { Tabs } from "../../../components/Tabs";
import { NotecardsPage } from "./Notecards.component";

export const NotecardsRoutes = () => {
  return (
    <Tabs>
      <IonRouterOutlet>
        <Route exact path="/notecards">
          <NotecardsPage />
        </Route>
      </IonRouterOutlet>
    </Tabs>
  );
};