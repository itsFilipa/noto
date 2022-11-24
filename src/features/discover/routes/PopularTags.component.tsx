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
} from "@ionic/react";
import { DiscoverNotecard, PopularTagsHeader, UserAction } from "../components";
import { Note, Tag } from "../../../store";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../../components";
import tags from "../../../fake-data/tags.json";
import notecards from "../../../fake-data/notecards.json";
import checkIcon from "../assets/check.svg";

export const PopularTagsPage = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const [filterTag, setFilterTag] = useState<Tag | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const dismissModal = () => {
    modal.current?.dismiss();
  };

  const chooseFilterTag = (tag: Tag) => {
    dismissModal();
    setFilterTag(tag);
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
          <UserAction />
          <DiscoverNotecard notecard={notecards[0] as Note} />
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
              {tags.map((tag) => (
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
      </IonContent>
    </IonPage>
  );
};
