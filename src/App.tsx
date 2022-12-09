import { IonApp, setupIonicReact } from "@ionic/react";
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
import { useAuth } from "./store";
import { createFakeNotes, createFakeTags, createFakeUsers } from "./utils/fakedata";

setupIonicReact();

const populateFakeData = async () => {


  const {data: isPopulated} = await DB.get("isPopulated", 0);

  if(isPopulated) {
    return;
  }

  const users = createFakeUsers(10);
  const tags = createFakeTags(10, users);
  const notes = createFakeNotes(10, users, tags);
  // DB.createTable("users", users);
  // DB.createTable("tags", tags);
  // DB.createTable("notes", notes);
  await DB.set("users", users, 0);
  await DB.set("tags", tags, 0);
  await DB.set("notes", notes, 0);
  DB.createTable("isPopulated", true);
};


const setupTables = () => {
  DB.createTable("currentUser", {});
  DB.createTable("users", []);
  DB.createTable("notes", []);
  DB.createTable("usernotes", []);
  DB.createTable("trash", []);
  DB.createTable("usertags", []);
  DB.createTable("tags", []);
  DB.createTable("alert", {});
};

const App: React.FC = () => {
  
  const {setCurrentUser} = useAuth();

  useEffect(() => {
    setupTables();
    populateFakeData();
    setCurrentUser();
  }, [setCurrentUser]);

  return (
    <IonApp>
      <IonReactRouter>
        <AppRoutes />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
