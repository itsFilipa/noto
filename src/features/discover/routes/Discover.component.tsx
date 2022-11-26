import {
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { Button } from "../../../components/Button";
import { DiscoverHeader, DiscoverNotecard, UserAction } from "../components";
import notecards from "../../../fake-data/notecards.json";
import { Note } from "../../../store/note";
import { useEffect, useRef, useState } from "react";
import { DiscoverChip, Icon, Searchbar } from "../../../components";

import hashtagIcon from "../../../assets/iconout/hashtag.svg";
import cardsIcon from "../../../assets/iconout/cards.svg";
import chevronRight from "../../../assets/iconout/chevron-right.svg";
import userIcon from "../../../assets/iconout/user.svg";
import { useAuth } from "../../../store";

const searchFilters = [
  {
    id: 0,
    label: "Best results",
    checked: true,
  },
  {
    id: 1,
    label: "Cards",
    checked: false,
  },
  {
    id: 2,
    label: "Tags",
    checked: false,
  },
  {
    id: 3,
    label: "Users",
    checked: false,
  },
];

export const DiscoverPage = () => {
  const date = new Date();
  const day = date.getDate();
  const mon = date.toLocaleString("default", { month: "short" });
  const month = mon.charAt(0).toUpperCase() + mon.slice(1, 3);

  const {user} = useAuth();

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterArray, setFilterArray] = useState(searchFilters);
  const [likedNotes, setLikedNotes] = useState<Note[]>([]);
  const [forkedNotes, setForkedNotes] = useState<Note[]>([]);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const handleSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const dismissModal = () => {
    modal.current?.dismiss();
  };

  return (
    <IonPage ref={page}>
      <DiscoverHeader />
      <IonContent>
        <div className="mt-8 ml-8">
          <p className="font-display font-bold text-[40px]">
            {day} {month}
          </p>
          <p className="font-display text-xl">Hey {user?.user.profile.firstName}</p>
        </div>

        <p className="font-display font-bold text-lg mt-8 mb-4">Discover</p>

        <div className="col gap-1/2">
          <Button
            prefix={<Icon icon={hashtagIcon} />}
            suffix={<Icon icon={chevronRight} />}
            align="align-start-sb"
            size="small"
            routerDirection="forward"
            routerLink="/discover/popular-tags"
          >
            Popular tags
          </Button>
          <Button
            prefix={<Icon icon={cardsIcon} />}
            suffix={<Icon icon={chevronRight} />}
            align="align-start-sb"
            size="small"
            routerDirection="forward"
            routerLink="/discover/trending"
          >
            Trending cards
          </Button>
          <Button
            prefix={<Icon icon={userIcon} />}
            suffix={<Icon icon={chevronRight} />}
            align="align-start-sb"
            size="small"
            routerDirection="forward"
            routerLink="/discover/suggestions"
          >
            Picked for you
          </Button>
        </div>

        <p className="font-display font-bold text-lg mt-8 mb-4">Activity</p>

        <UserAction />

        <DiscoverNotecard notecard={notecards[0] as Note} />

        <IonModal
          ref={modal}
          trigger="open-search-modal"
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
            {searchQuery.length > 0 && (
              <IonToolbar className="h-9 flex justify-center shadow-[0_10px_10px_-10px_rbga(24,24,23,0.1)]">
                <div className="flex items-center justify-between">
                  {filterArray.map((filter) => (
                    <DiscoverChip
                      key={filter.id}
                      label={filter.label}
                      checked={filter.checked}
                      onClick={() => {
                        setFilterArray(
                          filterArray.map((item) => {
                            if (item.id === filter.id) {
                              item.checked = true;
                            } else {
                              item.checked = false;
                            }
                            return item;
                          })
                        );
                      }}
                    />
                  ))}
                </div>
              </IonToolbar>
            )}
          </IonHeader>

          <IonContent>Hello</IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};
