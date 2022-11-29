import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { Tabs } from "../../../components/Tabs";
import { EditNotecardPage } from "./EditNotecard.component";
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
        <Route exact path="/notecards/:id">
          <EditNotecardPage />
        </Route>
      </IonRouterOutlet>
    </Tabs>
  );
};