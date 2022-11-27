import { IonPage, IonContent, useIonActionSheet, useIonAlert, IonLoading } from "@ionic/react"
import { useEffect } from "react";
import { GenericHeader } from "../../../components"
import { useTrash } from "../../../store";
import { JunkNotecard } from "../components";

export const JunkPage = () => {

  const { trash, isLoading, listNotes } = useTrash();

  useEffect(() => {
    listNotes();
  }, [listNotes]);

  return (
    <IonPage>
      <GenericHeader title="Junk Folder" backBtn="/notecards" />
      <IonContent>
        {
          trash?.map((notecard) => (
              <JunkNotecard key={notecard.id} notecard={notecard} />
          ))
        }
        <IonLoading isOpen={isLoading} animated spinner="crescent" />
      </IonContent>
    </IonPage>
  )
}