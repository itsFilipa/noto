import { IonPage, IonContent } from "@ionic/react";
import { GenericHeader } from "../../../components";
import { Note } from "../../../store";
import { UserAction, DiscoverNotecard } from "../components";
import notecards from "../../../fake-data/notecards.json";

export const PickedForYouPage = () => {
  return (
    <IonPage>
      <GenericHeader title="Our Suggestions" backBtn="/discover" />
      <IonContent>
        <div className="mt-5">
          <UserAction />
          <DiscoverNotecard notecard={notecards[0] as Note} />
        </div>

        <div className="my-5">
          <UserAction />
          <DiscoverNotecard notecard={notecards[1] as Note} />
        </div>
      </IonContent>
    </IonPage>
  );
};
