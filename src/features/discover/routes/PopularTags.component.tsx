import {
  IonPage,
  IonContent,
  IonModal,
  IonItem,
  IonLabel,
  IonList,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLoading,
  IonSpinner,
} from "@ionic/react";
import { DiscoverNotecard, PopularTagsHeader, UserAction } from "../components";
import { Note, Tag, useNotes, useTags } from "../../../store";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components";
import checkIcon from "../../../assets/iconout/check.svg";

export const PopularTagsPage = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const { notes, listNotes, isLoading: noteLoading } = useNotes();
  const { tags, tagLoading } = useTags();

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const [filterTag, setFilterTag] = useState<Tag | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      await listNotes({public: true});
    }
    fetchNotes();
  }, [listNotes]);

  const dismissModal = () => {
    modal.current?.dismiss();
  };

  const chooseFilterTag = (tag: Tag) => {
    dismissModal();
    setFilterTag(tag);
    listNotes({tag: tag, public: true});
  };

  const clearFilterTag = () => {
    dismissModal();
    setFilterTag(null);
  }

  return (
    <IonPage ref={page}>
      <PopularTagsHeader tag={filterTag?.name} clearTag={clearFilterTag} />
      <IonContent>
        <div className="mt-5">

          {noteLoading && <IonSpinner name="crescent" />}
          {notes && notes.length > 0 ? (
            <>
              {notes.map((note: Note) => (
                <DiscoverNotecard key={note.id} notecard={note} />
              ))}
            </>
          ) : (
            <p className="mt-12 font-medium text-neutral-500 mx-auto w-fit">
              No results
            </p>
          )}
          
        </div>

        <IonModal
          ref={modal}
          trigger="popular-tag-modal"
          presentingElement={presentingElement!}
          canDismiss
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle>Tags</IonTitle>
              <IonButtons slot="end">
                <Button onClick={dismissModal} variant="clear">
                  Close
                </Button>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {tags?.map((tag) => (
                <>
                  {filterTag && filterTag.id === tag.id ? (
                    <IonItem
                      key={tag.id}
                      button
                      detail
                      detailIcon={checkIcon}
                      className="[--detail-icon-opacity:1]"
                      onClick={() => {
                        clearFilterTag();
                      }}
                    >
                      <IonLabel>{tag.name}</IonLabel>
                    </IonItem>
                  ) : (
                    <IonItem
                      key={tag.id}
                      button
                      detail={false}
                      onClick={() => {
                        chooseFilterTag(tag);
                      }}
                    >
                      <IonLabel>{tag.name}</IonLabel>
                    </IonItem>
                  )}
                </>
              ))}
            </IonList>
          </IonContent>
        </IonModal>
        <IonLoading isOpen={tagLoading} animated spinner="crescent" />
      </IonContent>
    </IonPage>
  );
};
