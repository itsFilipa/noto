import { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonLoading,
  IonSpinner,
} from "@ionic/react";
import { useLocation, useParams } from "react-router";
import { Button, GenericHeader, Icon } from "../../../components";
import { DiscoverNotecard } from "../components";
import { Note, useAuth, useNotes, User, useUser } from "../../../store";
import userPlusIcon from "../../../assets/iconout/user-plus.svg";
import userMinusIcon from "../../../assets/iconout/user-minus.svg";
import userIcon from "../../../assets/iconout/user.svg";
import usersIcon from "../../../assets/iconout/users.svg";
import cardsIcon from "../../../assets/iconout/cards.svg";
import Fuse from "fuse.js";

export const UserProfilePage = () => {
  const { getUser, isLoading, follow, unfollow } = useUser();
  const { listNotes, isLoading: loadingNotes } = useNotes();
  const { user: auth } = useAuth();

  const location = useLocation().pathname;
  const path = location.substring(0, location.lastIndexOf("/user/"));

  const { id } = useParams<{ id: string }>();

  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<User>();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { user } = await getUser(id);
      setUser(user ? user : undefined);
      if (auth && user) {
        const fuse = new Fuse(user.profile.followers, {
          keys: ["id"],
          threshold: 0.0,
        });
        const result = fuse.search(auth.id);
        setIsFollowing(result.length > 0 ? true : false);
      }
      const { notes } = await listNotes({ userId: id });
      setNotes(notes ? notes : []);
    }
    fetchData();
  }, [getUser, id, listNotes, auth]);

  return (
    <IonPage>
      <GenericHeader backBtn={path} />
      <IonContent>
        {!user ? (
          !isLoading && <p className="inset-center text-sm">User not found</p>
        ) : (
          <>
            <div className="mt-8 flex gap-3 items-center">
              <div className="w-16 h-16 bg-white border border-neutral-200 rounded-full flex items-center justify-center">
                {user.profile.avatarUrl ? (
                  <img
                    src={user.profile.avatarUrl}
                    className="object-cover w-full h-full rounded-full"
                    alt="portrait of user"
                  />
                ) : (
                  <Icon
                    icon={userIcon}
                    className="!w-10 !h-10 text-neutral-400"
                  />
                )}
              </div>

              <div>
                <p className="font-medium font-display text-lg mb-px">
                  {user.profile.firstName} {user.profile.lastName}
                </p>
                <p className="font-medium text-neutral-500">
                  @{user.profile.username}
                </p>
              </div>
            </div>

            <p className="font-medium mt-3">{user.profile.biography}</p>

            <div className="flex gap-1 mt-4">
              <Icon icon={usersIcon} className="!w-5 !h-5 text-neutral-400" />
              <p className="font-medium text-sm text-neutral-500">
                {user.profile.followers.length}
              </p>
              <p className="font-medium text-sm text-neutral-400">
                followers •
              </p>
              <p className="font-medium text-sm text-neutral-500">
                {user.profile.following.length}
              </p>
              <p className="font-medium text-sm text-neutral-400">following</p>
            </div>

            {isFollowing ? (
              <Button
                size="small"
                color="secondary"
                className="mt-4"
                prefix={
                  <Icon icon={userMinusIcon} className="!w-5 !h-5 text-white" />
                }
                onClick={() => {unfollow(id)}}
              >
                Unfollow
              </Button>
            ) : (
              <Button
                size="small"
                className="mt-4"
                prefix={
                  <Icon icon={userPlusIcon} className="!w-5 !h-5 text-white" />
                }
                onClick={() => {follow(id)}}
              >
                Follow
              </Button>
            )}

            <div className="flex gap-2 items-center mt-8">
              <IonIcon
                icon={cardsIcon}
                className="!w-8 !h-8 text-neutral-400"
              />
              <p className="font-display font-semibold text-lg text-neutral-500">
                Notecards
              </p>
            </div>

            <div className="mt-4">
              {loadingNotes && (
                <div className="mt-3 flex justify-center items-center">
                  <IonSpinner name="crescent" />
                </div>
              )}
              {!notes && !loadingNotes && (
                <p className="text-center text-neutral-500">
                  No notecards found
                </p>
              )}
              {notes &&
                !loadingNotes &&
                notes.map((notecard) => (
                  <DiscoverNotecard
                    key={notecard.id}
                    notecard={notecard as Note}
                  />
                ))}
            </div>
          </>
        )}

        <IonLoading isOpen={isLoading} />
      </IonContent>
    </IonPage>
  );
};
