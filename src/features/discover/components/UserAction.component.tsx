import { faker } from "@faker-js/faker";
import { useIonRouter } from "@ionic/react";
import { useLocation } from "react-router";
import userIcon from "../../../assets/iconout/user.svg";
import { Icon } from "../../../components";
import { UserEntity } from "../../../types";

export const UserAction = ({user}: UserEntity) => {

  const router = useIonRouter();
  const location = useLocation().pathname;

  const time = faker.date.recent(5).getDate();

  const now = new Date().getDate();

  const days = now - time;

  const goToProfile = () => {
    router.push(`${location}/user/${user.id}`, "forward");
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center" onClick={goToProfile}>
        <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
          {user.profile.avatarUrl ? (
            <img
              src={user.profile.avatarUrl}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <Icon icon={userIcon} className="!w-6 !h-6 text-neutral-400" />
          )}
        </div>
        <p className="font-medium text-sm">
          {user.profile.firstName} posted a new note
        </p>
      </div>
      <p className="text-xs font-medium text-neutral-500">1{days} days ago</p>
    </div>
  );
};
