import { NoteEntity } from "../../../types/";
import trashIcon from "../../../assets/iconout/trash.svg";
import trashOutIcon from "../../../assets/iconout/trash-out.svg";
import { useIonActionSheet, useIonAlert } from "@ionic/react";
import { useTrash } from "../../../store";

export const JunkNotecard = ({ notecard }: NoteEntity) => {
  const { restoreNote, deleteNote } = useTrash();
  
  const [presentActionSheet] = useIonActionSheet();
  const [presentAlert] = useIonAlert();

  const showActionSheet = () => {
    presentActionSheet({
      header: "Choose an action",
      buttons: [
        {
          text: "Delete permanently",
          icon: trashIcon,
          role: "destructive",
          handler: () => {
            showAlert();
          },
        },
        {
          text: "Restore note",
          icon: trashOutIcon,
          handler: () => {
            restoreNote(notecard.id);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
    });
  };

  const showAlert = () => {
    presentAlert({
      header: "Delete note",
      message:
        "Are you sure you want to delete this note? This action cannot be undone.",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Delete",
          role: "destructive",
          handler: () => {
            deleteNote(notecard.id);
          },
        },
      ],
    });
  };

  return (
    <>
      <div
        className="w-full bg-white col rounded-xl py-3 px-4 mt-4"
        onClick={showActionSheet}
      >
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
          <p className="text-sm mt-3 text-neutral-400">No content available</p>
        )}
      </div>
    </>
  );
};
