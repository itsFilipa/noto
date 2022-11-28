import { Button } from "../../../components/Button";
import { NoteEntity } from "../../../types";
import { Icon } from "../../../components";
import infoIcon from "../../../assets/iconout/info.svg";
import forkIcon from "../../../assets/iconout/fork.svg";
import forkFullIcon from "../../../assets/iconout/fork-full.svg";
import heartIcon from "../../../assets/iconout/heart.svg";
import heartFullIcon from "../../../assets/iconout/heart-full.svg";

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
        <div className="flex items-center gap-2">
          <Button
            size="default"
            variant="outline"
            iconOnly
            prefix={<Icon icon={heartIcon} className=" text-neutral-400" />}
            
          />
          <Button
            size="default"
            variant="outline"
            iconOnly
            prefix={
              <Icon icon={forkIcon} className="text-neutral-400" />
            }
          />
        </div>

        <Button
          size="default"
          variant="clear"
          iconOnly
          prefix={
            <Icon icon={infoIcon} className="text-neutral-400" />
          }
        />
      </div>

      {notecard.tags && notecard.tags.length > 0 && (
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
