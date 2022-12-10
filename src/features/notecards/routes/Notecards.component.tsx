import {
  IonPage,
  IonContent,
  IonItem,
  IonList,
  IonPopover,
  IonLabel,
  IonSpinner,
  IonModal,
  IonHeader,
  IonToolbar,
} from "@ionic/react";
import { Button, Icon, Searchbar } from "../../../components";
import { NotecardHeader } from "../components";
import { Notecard } from "../components/Notecard.component";
import { Toggle } from "../../../components/Toggle";
import { Note, useUserNotes } from "../../../store";

import aaIcon from "../../../assets/iconout/Aa.svg";
import calendarIcon from "../../../assets/iconout/calendar-days.svg";
import clockIcon from "../../../assets/iconout/clock.svg";
import graphIcon from "../../../assets/iconout/graph.svg";
import trashIcon from "../../../assets/iconout/trash.svg";
import { useEffect, useRef, useState } from "react";

export const NotecardsPage = () => {
  const { notes, isLoading, sortNotes, fullTextSearch } = useUserNotes();
  const popover = useRef<HTMLIonPopoverElement>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [searchResult, setSearchResult] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [sortToggle, setSortToggle] = useState(false);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const openPopover = (e: any) => {
    popover.current!.event = e;
    setShowPopover(true);
  };

  const dismissModal = () => {
    modal.current?.dismiss();
  };

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      const { notes } = fullTextSearch(e.target.value);
      if (notes) {
        setSearchResult(notes);
      }
    } else {
      setSearchResult([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResult([]);
  };

  return (
    <IonPage ref={page}>
      <NotecardHeader openPopover={openPopover} />
      <IonContent>
        {isLoading && (
          <div className="flex justify-center">
            <IonSpinner name="crescent" />
          </div>
        )}

        {notes && notes.length > 0 && (
          <>
            {notes.map((notecard: Note) => (
              <Notecard key={notecard.id} notecard={notecard as Note} />
            ))}
            <div className="mb-3" />
          </>
        )}

        {!isLoading && !notes && (
          <p className="mt-12 font-medium text-neutral-500 mx-auto w-fit">
            There are no notes to show you
          </p>
        )}

        <IonPopover
          ref={popover}
          isOpen={showPopover}
          onDidDismiss={() => setShowPopover(false)}
          className="[--width:235px]"
        >
          <IonContent className="popover">
            <div className="flex justify-between">
              <p className="font-display font-semibold">Sort Cards</p>
              <Toggle
                size="sm"
                icon
                checked={sortToggle}
                onIonChange={() => setSortToggle(!sortToggle)}
              />
            </div>

            <IonList>
              <IonItem
                button
                detail={false}
                lines="full"
                className="[--padding-start:0px]"
                onClick={() => {
                  sortNotes(sortToggle ? "desc" : "asc", "alphabetical");
                  setShowPopover(false);
                }}
              >
                <Icon icon={aaIcon} slot="start" className="mr-3 m-0" />
                <IonLabel className="!text-sm m-0">Alphabetical</IonLabel>
              </IonItem>
              <IonItem
                button
                detail={false}
                lines="full"
                className="[--padding-start:0px]"
                onClick={() => {
                  sortNotes(sortToggle ? "desc" : "asc", "createdAt");
                  setShowPopover(false);
                }}
              >
                <Icon icon={calendarIcon} className="mr-3" />
                <IonLabel className="!text-sm">Creation date</IonLabel>
              </IonItem>
              <IonItem
                button
                detail={false}
                lines="none"
                className="[--padding-start:0px]"
                onClick={() => {
                  sortNotes(sortToggle ? "desc" : "asc", "lastModifiedAt");
                  setShowPopover(false);
                }}
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

        <IonModal
          ref={modal}
          trigger="open-search"
          presentingElement={presentingElement!}
          canDismiss
        >
          <IonHeader>
            <IonToolbar>
              <div className="flex justify-between items-center">
                <Searchbar
                  className="!p-0"
                  value={searchQuery}
                  onIonInput={handleSearch}
                  onIonClear={clearSearch}
                />
                <Button variant="clear" size="small" onClick={dismissModal}>
                  Close
                </Button>
              </div>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {searchResult && searchResult.length > 0 && (
              <>
                {searchResult.map((notecard: Note) => (
                  <Notecard key={notecard.id} notecard={notecard as Note} />
                ))}
                <div className="mb-3" />
              </>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
