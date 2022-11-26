import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { AppRoutes } from "./routes";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

/* Theme variables */
import "./theme/variables.css";
import "./theme/tailwind.css";
import "./theme/ionic.css";
import { DB } from "./lib/db";
import { useEffect, useState } from "react";

setupIonicReact();

const populateFakeData = () => {
  // create fake data
};


const setupTables = async () => {
  DB.createTable("currentUser", {});
  DB.createTable("users", []);
  DB.createTable("notes", []);
  DB.createTable("trash", []);
};

const App: React.FC = () => {
  // create the database tables if they don't exist
  useEffect(() => {
    setupTables();
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        {/* <IonRouterOutlet> */}
        <AppRoutes />
        {/* </IonRouterOutlet> */}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
