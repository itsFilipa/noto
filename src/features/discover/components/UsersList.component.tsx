import { UserEntity } from "../../../types";
import { Icon } from "../../../components";
import userIcon from "../../../assets/iconout/user.svg";

export const UsersList = ({ user }: UserEntity) => {

  return (
    // <IonRouterLink routerLink={path} routerDirection="forward">
      <div className="flex gap-4 mt-4">
        <div className="w-[52px] h-[52px] bg-white border border-neutral-200 rounded-full flex items-center justify-center">
          {user.profile.avatarUrl ? (
            <img
              src={user.profile.avatarUrl}
              className="object-cover w-full h-full rounded-full"
              alt="portrait of user"
            />
          ) : (
            <Icon icon={userIcon} className="!w-8 !h-8 text-neutral-400" />
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
    // </IonRouterLink>
  );
};
