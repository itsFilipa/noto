import { IonHeader, IonToolbar, IonButtons, IonTitle } from "@ionic/react";
import { Button, Icon } from "../../../components";
import { Note, useNotes } from "../../../store";
import chevronLeftIcon from "../../../assets/iconout/chevron-left.svg";


export interface EditNotecardHeaderProps {
  backBtn?: string;
  valueTitle: string;
  valueContent: string;
}

export const EditNotecardHeader = ({ backBtn, valueTitle, valueContent}: EditNotecardHeaderProps) => {

  const {note, updateNote} = useNotes();

  return (
  <IonHeader>
      <IonToolbar>
        {backBtn && (
          <IonButtons slot="start">
            <Button
              iconOnly
              variant="clear"
              size="large"
              prefix={
                <Icon icon={chevronLeftIcon} className="!h-[30px] !w-[30px] text-neutral-400" />
              }
              routerLink={backBtn}
              routerDirection="back"
              onClick={() => updateNote({
                ...note,
                content: valueContent,
                title: valueTitle
              })}
            ></Button>
          </IonButtons>
        )}
        <IonTitle>{valueTitle ? valueTitle : "Untitled"}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}