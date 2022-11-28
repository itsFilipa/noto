import { IonPage, IonContent } from "@ionic/react";
import { GenericHeader } from "../../../components";
import { UsersList } from "../components";
import { useAuth, User } from "../../../store";
import { useState } from "react";

export const FollowingPage = () => {

  const {user} = useAuth();

  const [following, setFollowing] = useState<User[]>(user?.user.profile.following || []);

  return (
    <IonPage>
      <GenericHeader title="Following" backBtn="/discover" />
      <IonContent>
        <div className="mt-8">
          {following.map((user, index) => (
            <>
              <UsersList user={user as User} />
              {index !== following.length - 1 && <hr className="my-4" />}
            </>
          ))}

          {following.length === 0 && (
            <p className="text-center text-neutral-500">
              You are not following anyone yet.
            </p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};
