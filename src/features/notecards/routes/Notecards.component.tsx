import {
  IonPage,
  IonContent,
  IonItem,
  IonList,
  IonPopover,
  IonLabel,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonSpinner,
  IonLoading,
} from "@ionic/react";
import { Icon } from "../../../components";
import { NotecardHeader } from "../components";
import { Notecard } from "../components/Notecard.component";
import { Toggle } from "../../../components/Toggle";
import { Note, useUserNotes } from "../../../store";

import aaIcon from "../../../assets/iconout/Aa.svg";
import calendarIcon from "../../../assets/iconout/calendar-days.svg";
import clockIcon from "../../../assets/iconout/clock.svg";
import graphIcon from "../../../assets/iconout/graph.svg";
import trashIcon from "../../../assets/iconout/trash.svg";

export const NotecardsPage = () => {
  const { notes, isLoading } = useUserNotes();

  const handleRefresh = async (e: CustomEvent<RefresherEventDetail>) => {
    // await listNotes({ userId: user?.id, public: false });
    e.detail.complete();
  };

  return (
    <IonPage>
      <NotecardHeader />
      <IonContent>
        {/* <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher> */}

        {notes && notes.length > 0 ? (
          notes.map((notecard: Note) => (
            <Notecard key={notecard.id} notecard={notecard as Note} />
          ))
        ) : (
          <p className="mt-12 font-medium text-neutral-500 mx-auto w-fit">
            There are no notes to show you
          </p>
        )}

        {/* {isLoading && (
          <div className="mt-3 flex justify-center items-center">
            <IonSpinner name="crescent" />
          </div>
        )} */}
        <IonPopover trigger="sort" className="[--width:235px] ">
          <IonContent className="popover">
            <div className="flex justify-between">
              <p className="font-display font-semibold">Sort Cards</p>
              <Toggle size="sm" icon />
            </div>

            <IonList>
              <IonItem
                button
                detail={false}
                lines="full"
                className="[--padding-start:0px]"
              >
                <Icon icon={aaIcon} slot="start" className="mr-3 m-0" />
                <IonLabel className="!text-sm m-0">Alphabetical</IonLabel>
              </IonItem>
              <IonItem
                button
                detail={false}
                lines="full"
                className="[--padding-start:0px]"
              >
                <Icon icon={calendarIcon} className="mr-3" />
                <IonLabel className="!text-sm">Creation date</IonLabel>
              </IonItem>
              <IonItem
                button
                detail={false}
                lines="none"
                className="[--padding-start:0px]"
              >
                <Icon icon={clockIcon} className="mr-3" />
                <IonLabel className="!text-sm">Last modified</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>

        <IonPopover trigger="options" dismissOnSelect>
          <IonContent className="popover">
            <p className="font-display text font-semibold">Go to</p>
            <IonList>
              <IonItem
                button
                detail={false}
                lines="full"
                className="[--padding-start:0px]"
              >
                <Icon icon={graphIcon} slot="start" className="mr-3 m-0" />
                <IonLabel className="!text-sm m-0">Connection graph</IonLabel>
              </IonItem>
              <IonItem
                button
                detail={false}
                lines="none"
                className="[--padding-start:0px]"
                routerLink="/notecards/junk"
                routerDirection="forward"
              >
                <Icon icon={trashIcon} className="mr-3" />
                <IonLabel className="!text-sm">Junk folder</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>
        <IonLoading isOpen={isLoading} animated spinner="crescent" />
      </IonContent>
    </IonPage>
  );
};
