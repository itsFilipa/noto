import { UserIcon } from "@heroicons/react/24/outline";
import { UserEntity } from "../../../types";

export const UsersList = ({ user }: UserEntity) => {
  return (
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
          <p className="font-medium font-display mb-1">
            {user.profile.firstName} {user.profile.lastName}
          </p>
          <p className="font-medium text-neutral-500">
            @{user.profile.username}
          </p>

          {user.profile.biography && (
            <p className="font-medium text-sm mt-2 max-w-[264px]">
              {user.profile.biography}
            </p>
          )}
        </div>
      </div>
  );
};
