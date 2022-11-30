import { faker } from "@faker-js/faker";
import userIcon  from "../../../assets/iconout/user.svg";
import { Icon } from "../../../components";

export const UserAction = () => {

  const time = faker.date.recent(5).getDate();

  const now = new Date().getDate();

  const days = now - time;

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <div className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
          <Icon icon={userIcon} className="!w-6 !h-6 text-neutral-400" />
        </div>
        <p className="font-medium">User posted a new note</p>
      </div>
      <p className="font-sm font-medium text-neutral-500">1{days} days ago</p>
    </div>
  );
};
