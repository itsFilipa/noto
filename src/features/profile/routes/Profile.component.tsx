import { IonContent, IonPage } from "@ionic/react";
import { Button } from "../../../components/Button";
import { PowerIcon, UserIcon } from "@heroicons/react/24/outline";
import { Header } from "../../../components/Header";

import user from "../user.json";

export type User = {
  avatar?: string;
  name: string;
  username: string;
  description: string;
  followers: number;
  following: number;
}

export const ProfilePage = () => {
  return (
    <IonPage>
      <Header suffix={<PowerIcon className="text-neutral-400" />} />
      <IonContent>
        <div className="mt-6">
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
        </div>
      </IonContent>
    </IonPage>
  );
};
