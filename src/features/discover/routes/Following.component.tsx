import { UserIcon } from "@heroicons/react/24/outline";
import { IonPage, IonContent } from "@ionic/react";
import { GenericHeader } from "../../../components";

import users from "../../../fake-data/users.json";
import { UsersList } from "../components";

export const FollowingPage = () => {
  return (
    <IonPage>
      <GenericHeader title="Following" backBtn="/discover" />
      <IonContent>
        <div className="mt-8">
          {users.map((user, index) => (
            <>
              <UsersList user={user} />
              {index !== users.length - 1 && <hr className="my-4" />}
            </>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};
