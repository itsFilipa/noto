import {
  PencilIcon,
  TrashIcon,
  ClockIcon,
  CalendarDaysIcon,
  EyeIcon,
  HeartIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/outline";
import { IonIcon } from "@ionic/react";
import { Button } from "../../../components/Button";
import { NoteEntity } from "../../../types/";
import infoIcon from "../assets/info.svg";
import forkIcon from "../assets/fork.svg";

//Create a function to convert ISO Date to the format 'dd MMM yyyy'
const convertDate = (date: string) => {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
  return newDate.toLocaleDateString("en-GB", options);
};

export const Notecard = ({ notecard }: NoteEntity) => {
  return (
    <>
      <div className="w-full bg-white col rounded-xl py-3 px-4 mt-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="font-display font-semibold">
              {notecard?.title || "Undefined"}
            </p>
            {notecard.inlineLinks.length > 0 && (
              <p className="text-indigo-500 text-[11px]">
                {notecard.inlineLinks.length}
              </p>
            )}
          </div>
          <Button
            size="default"
            variant="outline"
            iconOnly
            prefix={<PencilIcon className="w-5 h-5 text-neutral-400" />}
          />
        </div>

        {/* Body */}

        <p className="text-sm line-clamp-4 mt-3 w-[93%]">{notecard.content}</p>

        {/* Footer */}

        <div className="flex items-center justify-between mt-4">
          {notecard.tags && (
            <div className="flex items-center gap-1">
              {notecard.tags.map((tag) => (
                <p key={tag.id} className="text-indigo-500 text-xs">
                  #{tag.name}
                </p>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              size="default"
              variant="clear"
              iconOnly
              prefix={
                <IonIcon icon={infoIcon} className="w-5 h-5 text-neutral-400" />
              }
            />
            <Button
              size="default"
              variant="outline"
              iconOnly
              prefix={<TrashIcon className="w-5 h-5 text-neutral-400" />}
            />
          </div>
        </div>
      </div>

      {/* For animating check:
        https://dzone.com/articles/pure-css-slide-down-animation-1
        https://javascript.plainenglish.io/how-to-create-a-collapsable-panel-with-smooth-animations-in-react-bb10c22edb5e
      */}

      {/* <div className="mt-2 px-4">
        <div className="mb-3">
          <div className="flex gap-2 mb-1">
            <ClockIcon className="w-4 h-4 text-neutral-500" />
            <p className="font-semibold text-xs text-neutral-500">
              Last Modified
            </p>
          </div>
          <p className="font-semibold text-xs text-neutral-400">
            {notecard.lastModifiedAt}
          </p>
        </div>

        <div className="mb-3">
          <div className="flex gap-2 mb-1">
            <CalendarDaysIcon className="w-4 h-4 text-neutral-500" />
            <p className="font-semibold text-xs text-neutral-500">
              Created at
            </p>
          </div>
          <p className="font-semibold text-xs text-neutral-400">
            {convertDate(notecard.createdAt)} by @{notecard.author.profile.username}
          </p>
        </div>

        <div className="mb-3">
          <div className="flex gap-2 mb-1">
            <ChartBarSquareIcon className="w-4 h-4 text-neutral-500" />
            <p className="font-semibold text-xs text-neutral-500">
              Stats
            </p>
          </div>
          <div className="flex gap-6">
              <div className="flex gap-2 items-center">
                <p className="font-semibold text-xs text-neutral-400">{notecard.likes}</p>
                <HeartIcon className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="flex gap-2 items-center">
                <p className="font-semibold text-xs text-neutral-400">{notecard.forks}</p>
                <IonIcon icon={forkIcon} className="text-neutral-400" />
              </div>
          </div>
        </div>

        <div>
          <div className="flex gap-2 mb-1">
            <EyeIcon className="w-4 h-4 text-neutral-500" />
            <p className="font-semibold text-xs text-neutral-500">
              Visibility
            </p>
          </div>
          <p className="font-semibold text-xs text-neutral-400">
            {notecard.visibility.charAt(0).toUpperCase() + notecard.visibility.slice(1)}
          </p>
        </div>
      </div> */}
    </>
  );
};
