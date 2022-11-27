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
} from "@ionic/react";
import { Button, GenericHeader, Searchbar } from "../../../components";
import { FullPageInput } from "../../../components/Input/FullPageInput.component";
import eyeIcon from "../../../assets/iconout/eye.svg";
import plusIcon from "../../../assets/iconout/plus-small.svg";
import tagIcon from "../../../assets/iconout/hashtag.svg";
import shareIcon from "../../../assets/iconout/cloud-arrow-up.svg";
import { useEffect, useRef, useState } from "react";

export const NewNotecardPage = () => {
  const [presentActionSheet] = useIonActionSheet();
  const [presentAlert] = useIonAlert();

  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const showAlert = () => {
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
            console.log("Publishing note");
          },
        },
      ],
    });
  };

  const showActionSheet = () => {
    presentActionSheet({
      header: "Choose an action",
      buttons: [
        {
          text: "Add a tag",
          icon: tagIcon,
          handler: () => {
            setShowModal(true);
          }
        },
        {
          text: "Publish this note",
          icon: shareIcon,
          handler: () => {
            showAlert();
          }
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
      <GenericHeader title="Untitled" backBtn="/notecards" />
      <IonContent>
        <FullPageInput className="fullpage-title mt-2" placeholder="Untitled" />
        <FullPageInput
          className="fullpage"
          autoGrow
          placeholder="Write your notes here..."
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
            onClick={() => showActionSheet()}
          >
            <IonIcon icon={plusIcon} className="!w-5 !h-5 stroke-2" />
          </IonFabButton>
        </IonFab>

        <IonModal
          isOpen={showModal}
        >
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
                <Button variant="clear" size="small" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </div>
            </IonToolbar>
          </IonHeader>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
