import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { Tabs } from "../../../components/Tabs";
import { ChangeEmailPage } from "./ChangeEmail.component";
import { ChangePasswordPage } from "./ChangePassword.component";
import { FaqPage } from "./Faq.component";
import { PrivacyPolicyPage } from "./PrivacyPolicy.component";
import { ProfilePage } from "./Profile.component";
import { ProfileEditPage } from "./ProfileEdit.component";
import { SupportPage } from "./Support.component";
import { TermsOfServicePage } from "./TermsOfService.component";

export const ProfileRoutes = () => {
  return (
    <Tabs>
        <IonRouterOutlet>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/profile/edit">
            <ProfileEditPage />
          </Route>
          <Route exact path="/profile/change-password">
            <ChangePasswordPage />
          </Route>
          <Route exact path="/profile/change-email">
            <ChangeEmailPage />
          </Route>
          <Route exact path="/profile/terms-of-service">
            <TermsOfServicePage />
          </Route>
          <Route exact path="/profile/faq">
            <FaqPage />
          </Route>
          <Route exact path="/profile/support">
            <SupportPage />
          </Route>
          <Route exact path="/profile/privacy-policy">
            <PrivacyPolicyPage />
          </Route>
        </IonRouterOutlet>
    </Tabs>
  );
};
