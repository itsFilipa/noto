import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import {
  SignUpPage,
  LandingPage,
  SignInPage,
  ProfileCompletionPage,
  DownloadPage,
  ChangeLogPage,
} from "../features";
import { DocsRoutes } from "./docs";

export const PublicRoutes = () => {
  return (
    <IonRouterOutlet>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/download">
        <DownloadPage />
      </Route>
      <Route exact path="/changelog">
        <ChangeLogPage />
      </Route>
      <Route path="/components">
        <DocsRoutes />
      </Route>
      <Route exact path="/sign-up">
        <SignUpPage />
      </Route>
      <Route exact path="/sign-up/completion">
        <ProfileCompletionPage />
      </Route>
      <Route exact path="/sign-in">
        <SignInPage />
      </Route>
    </IonRouterOutlet>
  );
};
