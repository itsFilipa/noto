import {
  IonPage,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  useIonActionSheet,
  useIonAlert,
  IonModal,
  IonHeader,
  IonToolbar,
  IonLoading,
  IonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { Button, Icon, Searchbar } from "../../../components";
import { NewNotecardHeader } from "../components";
import { FullPageInput } from "../../../components/Input/FullPageInput.component";
import { Tag, useAuth, useNotes, useTags } from "../../../store";

import eyeIcon from "../../../assets/iconout/eye.svg";
import plusIcon from "../../../assets/iconout/plus-small.svg";
import tagIcon from "../../../assets/iconout/hashtag.svg";
import shareIcon from "../../../assets/iconout/cloud-arrow-up.svg";
import unshareIcon from "../../../assets/iconout/cloud-arrow-down.svg";
import checkIcon from "../../../assets/iconout/check.svg";

export const NewNotecardPage = () => {
  const [presentActionSheet] = useIonActionSheet();
  const [presentAlert] = useIonAlert();
  const { note, createNote, updateNote, isLoading } = useNotes();
  const { tags, tag, createTag, getTagByUserId, tagLoading } = useTags();
  const { user } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [valueTitle, setvalueTitle] = useState("Untitled");
  const [valueContent, setvalueContent] = useState("");
  const [noteTags, setNoteTags] = useState<Tag[]>(note?.tags || []);

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  console.log(noteTags);

  useEffect(() => {
    createNote();
    if (user) getTagByUserId(user.id);
  }, [createNote, getTagByUserId, user]);

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const onCreateTag = async () => {
    const { tag, error } = await createTag(searchQuery);
    if (tag) {
      const tagsToSave = Array.isArray(noteTags) ? [...noteTags, tag] : [tag];
      const { note: noteUpdated } = await updateNote({
        ...note,
        tags: tagsToSave,
      });
      clearSearch();
      setNoteTags(noteUpdated?.tags ? noteUpdated.tags : []);
    } else {
      console.log(error);
    }
  };

  const publishNote = async () => {
    const result = await updateNote({
      ...note,
      title: valueTitle,
      content: valueContent,
      visibility: "public",
    });
    if (result.error === null) {
      setShowToast(true);
      setToastMessage("Note published");
    }
  };

  const privatizeNote = async () => {
    const result = await updateNote({
      ...note,
      title: valueTitle,
      content: valueContent,
      visibility: "private",
    });
    if (result.error === null) {
      setShowToast(true);
      setToastMessage("Note has been made");
    }
  };

  const showAlertPublish = () => {
    presentAlert({
      header: "Publish note",
      message:
        "The note will be public for people to read, like and fork. Publish?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Yes",
          role: "confirm",
          handler: () => {
            publishNote();
          },
        },
      ],
    });
  };

  const showAlertPrivate = () => {
    presentAlert({
      header: "Make note private",
      message: "The note will be hidden from public view. Make private?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Yes",
          role: "confirm",
          handler: () => {
            privatizeNote();
          },
        },
      ],
    });
  };

  const showActionSheetPublic = () => {
    presentActionSheet({
      header: "Choose an action",
      buttons: [
        {
          text: "Add a tag",
          icon: tagIcon,
          handler: () => {
            setShowModal(true);
          },
        },
        {
          text: "Publish this note",
          icon: shareIcon,
          handler: () => {
            showAlertPublish();
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
    });
  };

  const showActionSheetPrivate = () => {
    presentActionSheet({
      header: "Choose an action",
      buttons: [
        {
          text: "Add a tag",
          icon: tagIcon,
          handler: () => {
            setShowModal(true);
          },
        },
        {
          text: "Make note private",
          icon: unshareIcon,
          handler: () => {
            showAlertPrivate();
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
    });
  };

  return (
    <IonPage>
      <NewNotecardHeader
        backBtn="/notecards"
        valueTitle={valueTitle}
        valueContent={valueContent}
      />
      <IonContent>
        <FullPageInput
          className="fullpage-title mt-2"
          placeholder="Untitled"
          debounce={0}
          onIonChange={(e) =>
            setvalueTitle(e.detail.value ? e.detail.value : "Untitled")
          }
        />
        <FullPageInput
          className="fullpage"
          autoGrow
          placeholder="Write your notes here..."
          debounce={500}
          onIonChange={(e) =>
            setvalueContent(e.detail.value ? e.detail.value : "")
          }
        />

        <IonFab
          slot="fixed"
          vertical="top"
          horizontal="end"
          className="mr-3 mt-1"
        >
          <IonFabButton
            size="small"
            className="w-6 h-6"
            onClick={() => {
              note?.visibility === "private"
                ? showActionSheetPublic()
                : showActionSheetPrivate();
            }}
          >
            <IonIcon icon={plusIcon} className="!w-5 !h-5 stroke-2" />
          </IonFabButton>
        </IonFab>

        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar>
              <div className="flex justify-between items-center">
                <Searchbar
                  className="!p-0"
                  placeholder="Find/create tags..."
                  value={searchQuery}
                  onIonInput={handleSearch}
                  onIonClear={clearSearch}
                />
                <Button
                  variant="clear"
                  size="small"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
              </div>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {searchQuery !== "" && (
              <>
                <Button
                  size="small"
                  align="align-start-sb"
                  prefix={<Icon icon={plusIcon} />}
                  onClick={() => {
                    onCreateTag();
                  }}
                  loading={isLoading || tagLoading}
                >
                  {searchQuery}
                </Button>
                <IonList>
                  {tags?.map((tag) => (
                    <IonItem key={tag.id} button detail={false}>
                      <IonLabel>{tag.name}</IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </>
            )}
            {searchQuery === "" && (
              <>
                {noteTags.length > 0 ? (
                  <IonList>
                    {noteTags?.map((tag) => (
                      <IonItem
                        key={tag.id}
                        button
                        detail
                        detailIcon={checkIcon}
                        className="[--detail-icon-opacity:1] [--detail-icon-color:var(--ion-color-primary)]"
                      >
                        <IonLabel>{tag.name}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                ) : (
                  <p className="mt-3 text-neutral-500 font-medium w-fit mx-auto">
                    This note has no tags
                  </p>
                )}
              </>
            )}
          </IonContent>
        </IonModal>
        <IonLoading
          isOpen={isLoading || tagLoading}
          animated
          spinner="crescent"
        />
      </IonContent>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        color="success"
      />
    </IonPage>
  );
};
