import { IonPage, IonContent, IonLoading } from "@ionic/react";
import { GenericHeader } from "../../../components";
import { Note, useNotes } from "../../../store";
import { UserAction, DiscoverNotecard } from "../components";
import notecards from "../../../fake-data/notecards.json";
import { useEffect } from "react";

export const PickedForYouPage = () => {
  const { notes, listNotes, isLoading } = useNotes();

  useEffect(() => {
    async function fetchNotes() {
      await listNotes({allPublic: true});
    }
    fetchNotes();
  }, [listNotes]);

  return (
    <IonPage>
      <GenericHeader title="Our Suggestions" backBtn="/discover" />
      <IonContent>
        {notes && notes.length > 0 ? (
          <>
            {notes.map((note: Note) => (
              <DiscoverNotecard key={note.id} notecard={note} />
            ))}
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
