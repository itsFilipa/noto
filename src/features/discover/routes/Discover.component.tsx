import {
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonSpinner,
  IonToast,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { Button } from "../../../components/Button";
import {
  DiscoverHeader,
  DiscoverNotecard,
  UserAction,
  UsersList,
} from "../components";
import { Note, useNotes } from "../../../store/note";
import { memo, useEffect, useRef, useState } from "react";
import { DiscoverChip, Icon, Searchbar } from "../../../components";
import { useAlert, UserSimplified, useUser } from "../../../store";

import hashtagIcon from "../../../assets/iconout/hashtag.svg";
import cardsIcon from "../../../assets/iconout/cards.svg";
import chevronRight from "../../../assets/iconout/chevron-right.svg";
import userIcon from "../../../assets/iconout/user.svg";
import { useLocation } from "react-router-dom";

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

export const DiscoverPage = memo(() => {
  const { notes, isLoading, listNotes } = useNotes();
  const { query } = useUser();
  const { alert, deleteAlert } = useAlert();

  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterArray, setFilterArray] = useState(searchFilters);
  const [filter, setFilter] = useState("Best results");
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserSimplified[]>([]);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  useEffect(() => {
    const querySearch = async () => {
      if (searchQuery.length > 0) {
        if (filter === "Best results" || filter === "Cards") {
          const { notes: result } = await listNotes({ query: searchQuery });
          setFilteredUsers([]);
          setFilteredNotes(result ? result : []);
        }
        if (filter === "Tags") {
          const { notes: result } = await listNotes({ tagName: searchQuery });
          setFilteredUsers([]);
          setFilteredNotes(result ? result : []);
        }
        if (filter === "Users") {
          const results = await query(searchQuery);
          setFilteredNotes([]);
          setFilteredUsers(results ? results : []);
        }
      } else {
        setFilteredNotes([]);
        setFilteredUsers([]);
      }
    };
    querySearch();
  }, [filter]);

  const handleSearch = async (e: any) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      if (filter === "Best results" || filter === "Cards") {
        const { notes: result } = await listNotes({ query: e.target.value });
        setFilteredUsers([]);
        setFilteredNotes(result ? result : []);
      }
      if (filter === "Tags") {
        const { notes: result } = await listNotes({ tagName: e.target.value });
        setFilteredUsers([]);
        setFilteredNotes(result ? result : []);
      }
      if (filter === "Users") {
        const results = await query(e.target.value);
        setFilteredNotes([]);
        setFilteredUsers(results ? results : []);
      }
    } else {
      setFilteredNotes([]);
      setFilteredUsers([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredNotes([]);
    setFilteredUsers([]);
  };

  const dismissModal = () => {
    modal.current?.dismiss();
  };

  const path = useLocation().pathname + "/user/";

  const router = useIonRouter();

  const redirect = (path: string) => {
    router.push(path);
  };

  return (
    <IonPage ref={page}>
      <DiscoverHeader />
      <IonContent>
        <p className="font-display font-bold text-lg mt-6 mb-4">Discover</p>

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

        {notes && notes.length > 0 ? (
          <>
            {notes.map((note) => (
              <div key={note.id} className="mt-5">
                <UserAction user={note.author} />
                <DiscoverNotecard notecard={note} />
              </div>
            ))}
            <div className="mb-3" />
          </>
        ) : (
          <div className="col gap-2 items-center mt-12">
            <p className="font-medium text-neutral-500">
              There's nothing to show here
            </p>
            <p className="font-medium text-neutral-500">
              Discover and follow people
            </p>
          </div>
        )}

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
                              setFilter(item.label);
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

          <IonContent>
            {isLoading && (
              <div className="mt-3 flex justify-center items-center">
                <IonSpinner name="crescent" />
              </div>
            )}
            {filteredNotes.length === 0 && filteredUsers.length === 0 && (
              <p className="mt-12 font-medium text-sm text-neutral-500 w-fit mx-auto">
                No results
              </p>
            )}
            {filteredNotes.length > 0 && (
              <>
                {filteredNotes.map((note) => (
                  <DiscoverNotecard key={note.id} notecard={note} />
                ))}
              </>
            )}

            {filteredUsers.map((user, index) => (
              <div
                key={index}
                onClick={() => {
                  dismissModal();
                  redirect(path + user.id);
                }}
              >
                <UsersList user={user} />
                {index !== filteredUsers.length - 1 && <hr className="my-4" />}
              </div>
            ))}
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={alert !== null}
          color="success"
          message={alert?.message}
          duration={3000}
          onDidDismiss={() => deleteAlert()}
        />
      </IonContent>
    </IonPage>
  );
});
