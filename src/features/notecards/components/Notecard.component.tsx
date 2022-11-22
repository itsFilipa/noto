import {
  PencilIcon,
  TrashIcon,
  ClockIcon,
  CalendarDaysIcon,
  EyeIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/outline";
import { IonIcon } from "@ionic/react";
import { Button } from "../../../components/Button";
import { NotecardEntity } from "../types";
import infoIcon from "../assets/info.svg";

export const Notecard = ({ notecard }: NotecardEntity) => {
  return (
    <>
      <div className="w-full bg-white col rounded-xl py-3 px-4 mt-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="font-display font-semibold">
              {notecard?.title || "Undefined"}
            </p>
            {notecard.inlineLinks > 0 && (
              <p className="text-indigo-500 text-[11px]">
                {notecard.inlineLinks}
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

        <p className="text-sm line-clamp-4 mt-3 w-[93%]">{notecard.text}</p>

        {/* Footer */}

        <div className="flex items-center justify-between mt-4">
          {notecard.tags && (
            <div className="flex items-center gap-1">
              {notecard.tags.map((tag) => (
                <p className="text-indigo-500 text-xs">#{tag}</p>
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

      {/* <div className="mt-2">
        <div></div>
      </div> */}
    </>
  );
};
