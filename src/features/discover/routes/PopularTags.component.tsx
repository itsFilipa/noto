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
import { DiscoverNotecard, PopularTagsHeader } from "../components";
import { Note, Tag, useNotes, useTags } from "../../../store";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components";
import checkIcon from "../../../assets/iconout/check.svg";

export const PopularTagsPage = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const { listNotes, isLoading: noteLoading } = useNotes();
  const { tags, tagLoading } = useTags();

  const [filterTag, setFilterTag] = useState<Tag | null>(null);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  const [result, setResult] = useState<Note[]>([]);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const dismissModal = () => {
    modal.current?.dismiss();
  };

  const chooseFilterTag = async (tag: Tag) => {
    dismissModal();
    setFilterTag(tag);
    const { notes } = await listNotes({ tag: tag });
    setResult(notes ? notes : []);
  };

  const clearFilterTag = () => {
    dismissModal();
    setFilterTag(null);
    setResult([]);
  };

  return (
    <IonPage ref={page}>
      <PopularTagsHeader tag={filterTag?.name} clearTag={clearFilterTag} />
      <IonContent>
        <div className="mt-5">

          {/* {noteLoading && (
            <div className="mt-3 flex justify-center items-center">
              <IonSpinner
                name="crescent"
              />
            </div>
          )} */}

          {result && result.length > 0 ? (
            <>
              {result.map((note: Note) => (
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
        <IonLoading isOpen={noteLoading} animated spinner="crescent" />
      </IonContent>
    </IonPage>
  );
};
