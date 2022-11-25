import { IonPage, IonContent, IonIcon } from "@ionic/react";
import { useLocation } from "react-router";
import { Button, GenericHeader, Icon } from "../../../components";
import { DiscoverNotecard } from "../components";
import { Note } from "../../../store";
import plusIcon from "../../../assets/iconout/plus-small.svg";
import userIcon from "../../../assets/iconout/user.svg";
import usersIcon from "../../../assets/iconout/users.svg";
import cardsIcon from "../../../assets/iconout/cards.svg";

import users from "../../../fake-data/users.json";
import notecards from "../../../fake-data/notecards.json";

export const UserProfilePage = () => {
  const user = users[1];

  const location = useLocation().pathname;

  const path = location.substring(0, location.lastIndexOf("/user/"));

  return (
    <IonPage>
      <GenericHeader backBtn={path} />
      <IonContent>
        <div className="mt-8 flex gap-3 items-center">
          <div className="w-16 h-16 bg-white border border-neutral-200 rounded-full flex items-center justify-center">
            {user.profile.avatarUrl ? (
              <img
                src={user.profile.avatarUrl}
                className="object-cover w-full h-full rounded-full"
                alt="portrait of user"
              />
            ) : (
              <Icon icon={userIcon} className="!w-10 !h-10 text-neutral-400" />
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
          <p className="font-medium text-sm text-neutral-400">followers •</p>
          <p className="font-medium text-sm text-neutral-500">
            {user.profile.following.length}
          </p>
          <p className="font-medium text-sm text-neutral-400">following</p>
        </div>

        <Button
          size="small"
          className="mt-4"
          prefix={<Icon icon={plusIcon} className="!w-5 !h-5 text-white" />}
        >
          Follow
        </Button>

        <div className="flex gap-2 items-center mt-8">
          <IonIcon icon={cardsIcon} className="!w-8 !h-8 text-neutral-400"/>
          <p className="font-display font-semibold text-lg text-neutral-500">Notecards</p>
        </div>

        <div className="mt-4">
          {notecards.map((notecard) => (
            <DiscoverNotecard key={notecard.id} notecard={notecard as Note} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};
