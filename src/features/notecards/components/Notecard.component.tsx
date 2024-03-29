import { useIonAlert, useIonRouter } from "@ionic/react";
import { Button } from "../../../components/Button";
import { NoteEntity } from "../../../types/";
import { Icon } from "../../../components";
import infoIcon from "../../../assets/iconout/info.svg";
import forkIcon from "../../../assets/iconout/fork.svg";
import pencilIcon from "../../../assets/iconout/pencil.svg";
import trashIcon from "../../../assets/iconout/trash.svg";
import clockIcon from "../../../assets/iconout/clock.svg";
import calendarIcon from "../../../assets/iconout/calendar-days.svg";
import eyeIcon from "../../../assets/iconout/eye.svg";
import heartIcon from "../../../assets/iconout/heart.svg";
import chartIcon from "../../../assets/iconout/chart-bar-square.svg";
import { useUserNotes } from "../../../store";
import { useState } from "react";

//Create a function to convert ISO Date to the format 'dd MMM yyyy'
const convertDate = (date: string) => {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return newDate.toLocaleDateString("en-GB", options);
};

//function to calculate the time difference until now
const getTimeSince = (dateString: string) => {
  // Parse the given date using the Date object
  const date = new Date(dateString);

  // Calculate the difference in milliseconds between the given date and the current moment
  const diff = Date.now() - date.getTime();

  // Round down the difference to the nearest whole number
  const roundedDiff = Math.floor(diff);

  // Determine the unit of time to use for the result
  // If the rounded difference is less than 1 minute, return the result in minutes
  if (roundedDiff < 1000 * 60) {
    return "just moments ago";
  }
  else if( 1000 * 60 < roundedDiff && roundedDiff < 1000 * 60 * 60){
    return Math.floor(roundedDiff / (1000 * 60)).toString() + " minutes ago";
    // If the rounded difference is less than 1 hour, return the result in hours
  } else if (1000 * 60 * 60 < roundedDiff && roundedDiff < 1000 * 60 * 60 * 24) {
    return Math.floor(roundedDiff / (1000 * 60 * 60)).toString() + " hours ago";
    
    // If the rounded difference is greater than or equal to 1 hour, return the result in days
  } else {
    return Math.floor(roundedDiff / (1000 * 60 * 60 * 24)).toString() + " days ago";
  }
}

export const Notecard = ({ notecard }: NoteEntity) => {
  
  const [infoOpen, setInfoOpen] = useState(false);
  const { moveToTrash } = useUserNotes();
  const [presentAlert] = useIonAlert();
  const router = useIonRouter();
  
  let width = 0;

  const verifyWidth = (w: number) => {
    if (width + w < 220) {
      width = width + w;
      return true;
    } else {
      return false;
    }
  };

  const redirect = () => {
    router.push(`/notecards/id/${notecard.id}`);
  }

  return (
    <>
      <div className="w-full bg-white col rounded-xl py-3 px-4 mt-4" onClick={redirect}>
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
          {/* <Button
            size="default"
            variant="outline"
            iconOnly
            prefix={
              <Icon icon={pencilIcon} className="!w-5 !h-5 text-neutral-400" />
            }
            onClick={(e) => {redirect(); e.stopPropagation()}}
          /> */}
        </div>

        {/* Body */}

        {notecard.content ? (
          <p className="text-sm line-clamp-4 mt-3 w-[93%]">
            {notecard.content}
          </p>
        ) : (
          <p className="text-sm mt-3 text-neutral-400">
            Continue writing this note..
          </p>
        )}

        {/* Footer */}

        <div className="flex items-center justify-between mt-4">
          {notecard.tags && (
            <div className="flex items-center gap-1 max-w-[220px]">
              {notecard.tags.map((tag) => (
                <>
                  {verifyWidth(tag.name.length * 7) && (
                    <p key={tag.id} className="text-indigo-500 text-xs">
                      #{tag.name}
                    </p>
                  )}
                </>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              size="default"
              variant="clear"
              iconOnly
              prefix={
                <Icon icon={infoIcon} className="!w-5 !h-5 text-neutral-400" />
              }
              href={`/notecards#${notecard.id}`}
              onClick={(e) => e.stopPropagation()}
            />
            <Button
              size="default"
              variant="outline"
              iconOnly
              prefix={
                <Icon icon={trashIcon} className="!w-5 !h-5 text-neutral-400" />
              }
              onClick={(e) =>
                {
                presentAlert({
                  header: "Delete note",
                  message: "Are you sure you want to delete this note?",
                  buttons: [
                    {
                      text: "Cancel",
                      role: "cancel",
                    },
                    {
                      text: "Delete",
                      role: "destructive",
                      handler: () => {
                        moveToTrash(notecard.id);
                      },
                    },
                  ],
                });
              e.stopPropagation();
              }
              }
            />
          </div>
        </div>
      </div>

      {/* For animating check:
        https://dzone.com/articles/pure-css-slide-down-animation-1
        https://javascript.plainenglish.io/how-to-create-a-collapsable-panel-with-smooth-animations-in-react-bb10c22edb5e
      */}

      <div className="mt-2 px-4 expandable-info" id={notecard.id}>
        <div className="mb-3">
          <div className="flex gap-2 mb-1 items-center">
            <Icon icon={clockIcon} className="w-4 h-4 text-neutral-500" />
            <p className="font-semibold text-xs text-neutral-500">
              Last Modified
            </p>
          </div>
          <p className="font-semibold text-xs text-neutral-400">
            {getTimeSince(notecard.lastModifiedAt)}
          </p>
        </div>

        <div className="mb-3">
          <div className="flex gap-2 mb-1 items-center">
            <Icon icon={calendarIcon} className="w-4 h-4 text-neutral-500" />
            <p className="font-semibold text-xs text-neutral-500">
              Created at
            </p>
          </div>
          <p className="font-semibold text-xs text-neutral-400">
            {convertDate(notecard.createdAt)} by @{notecard.author.profile.username}
          </p>
        </div>

        <div className="mb-3">
          <div className="flex gap-2 mb-1 items-center">
            <Icon icon={chartIcon} className="w-4 h-4 text-neutral-500" />
            <p className="font-semibold text-xs text-neutral-500">
              Stats
            </p>
          </div>
          <div className="flex gap-6">
              <div className="flex gap-2 items-center">
                <p className="font-semibold text-xs text-neutral-400">{notecard.likes.length}</p>
                <Icon icon={heartIcon} className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="flex gap-2 items-center">
                <p className="font-semibold text-xs text-neutral-400">{notecard.forks.length}</p>
                <Icon icon={forkIcon} className="w-4 h-4 text-neutral-400" />
              </div>
          </div>
        </div>

        <div>
          <div className="flex gap-2 mb-1 items-center">
            <Icon icon={eyeIcon} className="w-4 h-4 text-neutral-500" />
            <p className="font-semibold text-xs text-neutral-500">
              Visibility
            </p>
          </div>
          <p className="font-semibold text-xs text-neutral-400">
            {notecard.visibility.charAt(0).toUpperCase() + notecard.visibility.slice(1)}
          </p>
        </div>
      </div>
    </>
  );
};
