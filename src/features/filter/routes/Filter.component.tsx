import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonLoading,
  IonSpinner,
} from "@ionic/react";
import { Checkbox } from "../../../components/Checkbox";
import { FilterHeader } from "../components";
import { Chip } from "../../../components/Chip";
import { Tag } from "../../../store/tag";
import { useEffect, useState } from "react";
import { Note, useUserNotes, useUserTags } from "../../../store";
import { Notecard } from "../../notecards";

export const FilterPage = () => {
  const { tags, isLoading: tagLoading } = useUserTags();
  const { notes, isLoading, filterNotes } = useUserNotes();
  const [topTags, setTopTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [resultNotes, setResultNotes] = useState<Note[]>([]);

  const [checkMine, setCheckMine] = useState(true);
  const [checkLiked, setCheckLiked] = useState(true);
  const [checkForked, setCheckForked] = useState(true);

  const getTopTags = (tags: Tag[]) => {
    const sortedTags = tags.sort((a, b) => b.count - a.count);
    setTopTags(sortedTags.slice(0, 10));
  };

  useEffect(() => {
    if (tags) getTopTags(tags);
    if(notes) setResultNotes(notes);
  }, [tags, notes]);

  useEffect(() => {
    const { notes } = filterNotes({ tags: selectedTags, mine: checkMine, forked: checkForked });
    if (notes) setResultNotes(notes);
  }, [checkForked, checkMine, filterNotes, selectedTags]);

  const addSelectedTag = (tag: Tag) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const removeSelectedTag = (tag: Tag) => {
    setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
  };

  const visibleTags = topTags.filter((t) => {
    return !selectedTags.find((st) => st.id === t.id);
  });

  return (
    <IonPage>
      <FilterHeader />
      <IonContent>
        <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap mt-5 hide-scroll">
          {visibleTags.map((tag) => (
            <Chip
              className="!mr-2"
              label={tag.name}
              key={tag.id}
              onClick={() => {
                addSelectedTag(tag);
              }}
            />
          ))}
        </div>

        <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap mt-5 hide-scroll">
          {selectedTags.map((tag) => (
            <Chip
              checked
              className="!mr-2"
              label={tag.name}
              key={tag.id}
              onClick={() => {
                removeSelectedTag(tag);
              }}
            />
          ))}
        </div>

        {/* <div className="mt-5">
          {isLoading && (
            <div className="mt-3 flex justify-center items-center">
              <IonSpinner name="crescent" />
            </div>
          )}
        </div> */}

        {/* {selectedTags.length === 0 &&
          notes &&
          notes.length > 0 &&
          notes.map((note: Note) => <Notecard key={note.id} notecard={note} />)} */}

        { !notes && (
          <div className="mt-3 flex justify-center items-center gap-2">
            <p className="text-sm text-gray-500">You have no notecards</p>
            <p className="text-sm text-gray-500">Create your first one on the plus icon below</p>
          </div>
        )}

        {resultNotes.length > 0 && (
          <>
            {resultNotes.map((note: Note) => (
              <Notecard key={note.id} notecard={note} />
            ))}
          </>
        )}

        {resultNotes.length === 0 && (
          <div className="mt-3 flex justify-center items-center">
            <p className="text-sm text-gray-500">No cards found</p>
          </div>
        )}

        <IonPopover trigger="filter">
          <IonContent className="popover">
            <p className="font-display text font-semibold">Show/Hide Cards</p>
            <IonList>
              <IonItem
                button
                detail={false}
                lines="full"
                className="[--padding-start:0px]"
              >
                <Checkbox
                  checked={checkMine}
                  onIonChange={() => setCheckMine(!checkMine)}
                />
                <IonLabel className="!text-sm m-0">Mine</IonLabel>
              </IonItem>
              <IonItem
                button
                detail={false}
                lines="full"
                className="[--padding-start:0px]"
              >
                <Checkbox
                  checked={checkLiked}
                  onIonChange={() => setCheckLiked(!checkLiked)}
                />
                <IonLabel className="!text-sm">Liked</IonLabel>
              </IonItem>
              <IonItem
                button
                detail={false}
                lines="none"
                className="[--padding-start:0px]"
              >
                <Checkbox
                  checked={checkForked}
                  onIonChange={() => setCheckForked(!checkForked)}
                />
                <IonLabel className="!text-sm">Forked</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>

        <IonLoading isOpen={tagLoading} animated spinner="crescent" />
      </IonContent>
    </IonPage>
  );
};
