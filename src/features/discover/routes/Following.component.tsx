import { IonPage, IonContent } from "@ionic/react";
import { GenericHeader } from "../../../components";
import { UsersList } from "../components";
import users from "../../../fake-data/users.json";
import { User } from "../../../store";

export const FollowingPage = () => {
  return (
    <IonPage>
      <GenericHeader title="Following" backBtn="/discover" />
      <IonContent>
        <div className="mt-8">
          {users.map((user, index) => (
            <>
              {/* <UsersList user={user as User} /> */}
              {index !== users.length - 1 && <hr className="my-4" />}
            </>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};
