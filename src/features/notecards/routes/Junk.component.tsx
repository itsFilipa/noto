import { IonPage, IonContent, IonLoading } from "@ionic/react";
import { GenericHeader } from "../../../components";
import { useTrash } from "../../../store";
import { JunkNotecard } from "../components";

export const JunkPage = () => {
  const { trash, isLoading } = useTrash();

  return (
    <IonPage>
      <GenericHeader title="Junk Folder" backBtn="/notecards" />
      <IonContent>
        {trash ? (
          trash.map((notecard) => (
            <JunkNotecard key={notecard.id} notecard={notecard} />
          ))
        ) : (
          <>
            {!isLoading && (
              <p className="mt-12 font-medium text-neutral-500 mx-auto w-fit">
                Your junk folder is empty
              </p>
            )}
          </>
        )}
        <div className="mb-3" />
        <IonLoading isOpen={isLoading} animated spinner="crescent" />
      </IonContent>
    </IonPage>
  );
};
