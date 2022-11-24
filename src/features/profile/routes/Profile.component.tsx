import { IonContent, IonItem, IonLabel, IonPage } from "@ionic/react";
import { Button } from "../../../components/Button";
import { PowerIcon, UserIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Header } from "../../../components/Header";

import user from "../user.json";
import { ProfileHeader } from "../components";

export type User = {
  avatar?: string;
  name: string;
  username: string;
  description: string;
  followers: number;
  following: number;
};

export const ProfilePage = () => {
  return (
    <IonPage>
      <ProfileHeader />
      <IonContent>
        <div className="mt-6 flex items-center gap-3">
          <div className="w-16 h-16 border border-neutral-200 rounded-full">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt="portrait of the user"
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <UserIcon className="text-neutral-400" />
            )}
          </div>
          <div className="col gap-px">
            <p className="font-display text-lg font-medium">{user.firstName} {user.lastName}</p>
            <p className="text-neutral-500 ">@{user.username}</p>
          </div>
        </div>

        <div className="mt-3">
          <p className="font-medium">{user.description}</p>
        </div>

        <div className="mt-5 flex gap-1 items-center">
          <UsersIcon className="w-5 h-5 text-neutral-400" />
          <p className="font-medium text-sm text-neutral-500">
            {user.followers}
          </p>
          <p className="font-medium text-sm text-neutral-400">followers •</p>
          <p className="font-medium text-sm text-neutral-500">
            {user.following}
          </p>
          <p className="font-medium text-sm text-neutral-400">following</p>
        </div>

        <div className="mt-7">
          <p className="font-semibold text-lg font-display">Settings</p>
        </div>

        <div className="mt-5 item-single">
          <IonItem
            routerLink="/profile/edit"
            lines="none"
            routerDirection="forward"
          >
            <IonLabel>Edit Profile</IonLabel>
          </IonItem>
        </div>

        <div className="mt-8 item-single">
          {/* <IonItem routerLink="profile/change-email" routerDirection="forward">
            <IonLabel>Change Email</IonLabel>
          </IonItem> */}
          <IonItem
            routerLink="profile/change-password"
            lines="none"
            routerDirection="forward"
          >
            <IonLabel>Change Password</IonLabel>
          </IonItem>
        </div>

        <div className="mt-8 item-mul">
          <IonItem
            routerLink="profile/terms-of-service"
            routerDirection="forward"
          >
            <IonLabel>Terms of Service</IonLabel>
          </IonItem>
          <IonItem
            routerLink="profile/privacy-policy"
            lines="none"
            routerDirection="forward"
          >
            <IonLabel>Privacy Policy</IonLabel>
          </IonItem>
        </div>

        <div className="mt-8 item-mul">
          <IonItem routerLink="profile/support" routerDirection="forward">
            <IonLabel>Support</IonLabel>
          </IonItem>
          <IonItem
            routerLink="profile/faq"
            lines="none"
            routerDirection="forward"
          >
            <IonLabel>FAQ</IonLabel>
          </IonItem>
        </div>

        <div className="my-8">
          <IonItem className="item-danger" lines="none">
            <IonLabel>Delete Account</IonLabel>
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
};
