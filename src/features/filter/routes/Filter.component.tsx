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
import { Tag, useTags } from "../../../store/tag";
import { useEffect, useState } from "react";
import { Note, useAuth, useNotes } from "../../../store";
import { Notecard } from "../../notecards";

export const FilterPage = () => {
  const { user } = useAuth();
  const { getTagByUserId, tagLoading } = useTags();
  const { notes, listNotes, isLoading } = useNotes();
  const [topTags, setTopTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const getTopTags = (tags: Tag[]) => {
    const sortedTags = tags.sort((a, b) => b.count - a.count);
    setTopTags(sortedTags.slice(0, 10));
  };

  useEffect(() => {
    async function fetchTags() {
      if (!user) return;
      return await getTagByUserId(user.id);
    }
    if (user) {
      fetchTags().then((tags) => {
        if (tags?.tags) getTopTags(tags.tags);
      });
    }
  }, [getTagByUserId, user]);

  useEffect(() => {
    async function fetchNotes() {
      await listNotes({public: false, tags: selectedTags});
    }
    fetchNotes();
  }, [listNotes, selectedTags]);

  // const topTags = getTopTags(tags);


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

        <div className="mt-5">
          {isLoading && (
            <IonSpinner name="crescent" className="w-fit mx-auto" />
          )}
          {notes && notes.length > 0 ? (
            <>
              {notes.map((note: Note) => (
                <Notecard key={note.id} notecard={note} />
              ))}
            </>
          ) : (
            <p className="text-center text-gray-500">
              No notes found
            </p>
          )}
        </div>

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
                <Checkbox checked />
                <IonLabel className="!text-sm m-0">Mine</IonLabel>
              </IonItem>
              <IonItem
                button
                detail={false}
                lines="full"
                className="[--padding-start:0px]"
              >
                <Checkbox checked />
                <IonLabel className="!text-sm">Liked</IonLabel>
              </IonItem>
              <IonItem
                button
                detail={false}
                lines="none"
                className="[--padding-start:0px]"
              >
                <Checkbox checked />
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
