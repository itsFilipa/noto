import {
  IonPage,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import { Checkbox } from "../../../components/Checkbox";
import { FilterHeader } from "../components";

import tags from "../../../fake-data/tags.json";
import { Chip } from "../../../components/Chip";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Tag } from "../../../store/note";
import { useState } from "react";

const getTopTags = (tags: Tag[]) => {
  const sortedTags = tags.sort((a, b) => b.count - a.count);
  return sortedTags.slice(0, 10);
};

export const FilterPage = () => { 

  const topTags = getTopTags(tags);

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const addSelectedTag = (tag: Tag) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const removeSelectedTag = (tag: Tag) => {
    setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
  };

  const visibleTags = topTags.filter((t) => {
    return !selectedTags.find((st) => st.id === t.id);
  })

  return (
    <IonPage>
      <FilterHeader />
      <IonContent>
        
        <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap mt-5">
          {visibleTags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              onClick={() => {
                addSelectedTag(tag);
              }}
              className="mr-2"
            />
          ))}
        </div>

        <div className="flex overflow-x-scroll overflow-y-hidden whitespace-nowrap mt-10">
          {selectedTags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              checked
              onClick={() => {
                removeSelectedTag(tag);
              }}
              className="mr-2"
            />
          ))}
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
      </IonContent>
    </IonPage>
  );
};
