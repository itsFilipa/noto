import { IonContent, IonItem, IonLabel, IonPage, IonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { ProfileHeader } from "../components";
import { Icon } from "../../../components";
import { useAlert, useAuth } from "../../../store";

import userIcon from "../../../assets/iconout/user.svg";
import usersIcon from "../../../assets/iconout/users.svg";

export const ProfilePage = () => {
  
  const { user } = useAuth();
  const { alert, getAlert, deleteAlert } = useAlert();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (alert) {
      getAlert();
      setToastMessage(alert.message);
      setShowToast(true);
      deleteAlert();
    }
  }, [alert, deleteAlert, getAlert]);

  return (
    <IonPage>
      <ProfileHeader />
      <IonContent>
        <div className="mt-6 flex items-center gap-3">
          <div className="w-16 h-16 border border-neutral-200 rounded-full">
            {user?.user.profile.avatarUrl ? (
              <img
                src={user.user.profile.avatarUrl}
                alt="portrait of the user"
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <Icon icon={userIcon} className="text-neutral-400" />
            )}
          </div>
          <div className="col gap-px">
            <p className="font-display text-lg font-medium">
              {user?.user.profile.firstName} {user?.user.profile.lastName}
            </p>
            <p className="text-neutral-500 ">@{user?.user.profile.username}</p>
          </div>
        </div>

        <div className="mt-3">
          <p className="font-medium">{user?.user.profile.biography}</p>
        </div>

        <div className="mt-5 flex gap-1 items-center">
          <Icon icon={usersIcon} className="text-neutral-400" />
          <p className="font-medium text-sm text-neutral-500">
            {user?.user.profile.followers.length}
          </p>
          <p className="font-medium text-sm text-neutral-400">followers •</p>
          <p className="font-medium text-sm text-neutral-500">
            {user?.user.profile.following.length}
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

        <div className="mt-8 item-mul">
          <IonItem routerLink="profile/change-email" routerDirection="forward">
            <IonLabel>Change Email</IonLabel>
          </IonItem>
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

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};
