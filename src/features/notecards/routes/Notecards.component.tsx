import { IonPage, IonContent } from "@ionic/react";
import { NotecardHeader } from "../components";
import { Notecard } from "../components/Notecard.component";
import notecards from "../../../fake-data/notecards.json";
import { NotecardProps } from "../types";

export const NotecardsPage = () => {
  return (
    <IonPage>
      <NotecardHeader />
      <IonContent>
        {notecards.map((notecard) => (
          <Notecard notecard={notecard as NotecardProps} />
        ))}
      </IonContent>
    </IonPage>
  );
};
