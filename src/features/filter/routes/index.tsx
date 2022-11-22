import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { Tabs } from "../../../components/Tabs";
import { FilterPage } from "./Filter.component";

export const FilterRoutes = () => {
  return (
    <Tabs>
      <IonRouterOutlet>
        <Route exact path="/filter">
          <FilterPage />
        </Route>
      </IonRouterOutlet>
    </Tabs>
  );
};