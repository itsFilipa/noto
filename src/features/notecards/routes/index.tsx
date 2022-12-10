import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { Tabs } from "../../../components/Tabs";
import { ConnectionGraphPage } from "../../graph/routes/ConnectionGraph.component";
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
        <Route exact path="/notecards/id/:id">
          <EditNotecardPage />
        </Route>
        <Route exact path="/notecards/graph">
          <ConnectionGraphPage />
        </Route>
      </IonRouterOutlet>
    </Tabs>
  );
};