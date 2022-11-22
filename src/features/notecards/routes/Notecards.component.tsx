import {
  IonPage,
  IonContent,
  IonItem,
  IonList,
  IonPopover,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { NotecardHeader } from "../components";
import { Notecard } from "../components/Notecard.component";
import { Note } from "../../../store/note";
import { Toggle } from "../../../components/Toggle";
import { CalendarDaysIcon, ClockIcon, TrashIcon } from "@heroicons/react/24/outline";
import aaIcon from "../assets/Aa.svg";
import graphIcon from "../assets/graph.svg";
import notecards from "../../../fake-data/notecards.json";

export const NotecardsPage = () => {
  return (
    <IonPage>
      <NotecardHeader />
      <IonContent>
        {notecards.map((notecard) => (
          <Notecard key={notecard.id} notecard={notecard as Note} />
        ))}

        <IonPopover trigger="sort" className="[--width:235px] ">
          <IonContent className="popover">
            <div className="flex justify-between">
              <p className="font-display font-semibold">Sort Cards</p>
              <Toggle size="sm" icon />
            </div>

            <IonList>
              <IonItem button detail={false} lines="full" className="[--padding-start:0px]">
                <IonIcon icon={aaIcon} slot="start" className="mr-3 w-5 m-0" />
                <IonLabel className="!text-sm m-0">Alphabetical</IonLabel>
              </IonItem>
              <IonItem button detail={false} lines="full" className="[--padding-start:0px]">
                <CalendarDaysIcon className="w-5 h-5 mr-3" />
                <IonLabel className="!text-sm">Creation date</IonLabel>
              </IonItem>
              <IonItem button detail={false} lines="none" className="[--padding-start:0px]">
                <ClockIcon className="w-5 h-5 mr-3" />
                <IonLabel className="!text-sm">Last modified</IonLabel>
              </IonItem>
            </IonList>

          </IonContent>
        </IonPopover>

        <IonPopover trigger="options">
          <IonContent className="popover">
          <p className="font-display text font-semibold">Go to</p>
          <IonList>
              <IonItem button detail={false} lines="full" className="[--padding-start:0px]">
                <IonIcon icon={graphIcon} slot="start" className="mr-3 w-5 m-0" />
                <IonLabel className="!text-sm m-0">Connection graph</IonLabel>
              </IonItem>
              <IonItem button detail={false} lines="none" className="[--padding-start:0px]">
                <TrashIcon className="w-5 h-5 mr-3" />
                <IonLabel className="!text-sm">Junk folder</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>

      </IonContent>
    </IonPage>
  );
};
