import { IonPage, IonContent, IonLoading } from "@ionic/react";
import { GenericHeader } from "../../../components";
import { Note, useNotes } from "../../../store";
import { DiscoverNotecard } from "../components";

export const PickedForYouPage = () => {
  const { notes, isLoading } = useNotes();

  return (
    <IonPage>
      <GenericHeader title="Our Suggestions" backBtn="/discover" />
      <IonContent>
        {notes && notes.length > 0 ? (
          <>
            {notes.map((note: Note) => (
              <DiscoverNotecard key={note.id} notecard={note} />
            ))}
            <div className="mb-4" />
          </>
        ) : (
          <p className="mt-12 font-medium text-neutral-500 mx-auto w-fit">
            There are no notes to show you
          </p>
        )}
        <IonLoading isOpen={isLoading} spinner="crescent" animated />
      </IonContent>
    </IonPage>
  );
};
