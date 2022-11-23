import { HeartIcon } from "@heroicons/react/24/outline";
import { IonIcon } from "@ionic/react";
import { Button } from "../../../components/Button";
import { NoteEntity } from "../../../types";
import infoIcon from "../assets/info.svg";
import forkIcon from "../assets/fork.svg";

export const DiscoverNotecard = ({ notecard }: NoteEntity) => {
  return (
    <div className="w-full bg-white col rounded-xl py-3 px-4 mt-4">
      {/* Header */}
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

      {/* Body */}

      <p className="text-sm line-clamp-4 mt-3 w-[93%]">{notecard.content}</p>

      {/* Footer */}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <Button
            size="default"
            variant="outline"
            iconOnly
            prefix={<HeartIcon className="w-5 h-5 text-neutral-400" />}
          />
          <Button
            size="default"
            variant="outline"
            iconOnly
            prefix={
              <IonIcon icon={forkIcon} className="w-5 h-5 text-neutral-400" />
            }
          />
        </div>

        <Button
          size="default"
          variant="clear"
          iconOnly
          prefix={
            <IonIcon icon={infoIcon} className="w-5 h-5 text-neutral-400" />
          }
        />
      </div>

      {notecard.tags && (
        <div className="flex items-center gap-1 border border-transparent border-t-neutral-200 mt-2 pt-1 truncate">
          {notecard.tags.map((tag) => (
            <p key={tag.id} className="text-indigo-500 text-xs">
              #{tag.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
