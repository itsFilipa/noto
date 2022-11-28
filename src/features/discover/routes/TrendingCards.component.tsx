import { IonPage, IonContent, IonLoading } from "@ionic/react";
import { GenericHeader } from "../../../components";
import { Note, useNotes } from "../../../store";
import { DiscoverNotecard } from "../components";
import { useEffect } from "react";

export const TrendingCardsPage = () => {
  const { notes, listNotes, isLoading } = useNotes();

  useEffect(() => {
    async function fetchNotes() {
      await listNotes({public: true});
    }
    fetchNotes();
  }, [listNotes]);

  return (
    <IonPage>
      <GenericHeader title="Trending Cards" backBtn="/discover" />
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
