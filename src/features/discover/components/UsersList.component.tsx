import { UserIcon } from "@heroicons/react/24/outline";
import { IonRouterLink } from "@ionic/react";
import { useLocation } from "react-router-dom";
import { UserEntity } from "../../../types";

export const UsersList = ({ user }: UserEntity) => {

  const path = useLocation().pathname + "/user/" + user.id;

  return (
    <IonRouterLink routerLink={path}>
      <div className="flex gap-4">
        <div className="w-[52px] h-[52px] bg-white border border-neutral-200 rounded-full flex items-center justify-center">
          {user.profile.avatarUrl ? (
            <img
              src={user.profile.avatarUrl}
              className="object-cover w-full h-full rounded-full"
              alt="portrait of user"
            />
          ) : (
            <UserIcon className="w-8 h-8 text-neutral-400" />
          )}
        </div>
        <div>
          <p className="font-medium font-display mb-1 text-warmblack">
            {user.profile.firstName} {user.profile.lastName}
          </p>
          <p className="font-medium text-neutral-500">
            @{user.profile.username}
          </p>

          {user.profile.biography && (
            <p className="font-medium text-sm text-warmblack mt-1 max-w-[264px]">
              {user.profile.biography}
            </p>
          )}
        </div>
      </div>
    </IonRouterLink>
  );
};
