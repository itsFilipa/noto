import {
  ChevronRightIcon,
  HashtagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { Button } from "../../../components/Button";
import { DiscoverHeader, DiscoverNotecard, UserAction } from "../components";
import cards from "../assets/cards.svg";
import notecards from "../../../fake-data/notecards.json";
import { Note } from "../../../store/note";

export const DiscoverPage = () => {
  const date = new Date();
  const day = date.getDate();
  const mon = date.toLocaleString("default", { month: "short" });
  const month = mon.charAt(0).toUpperCase() + mon.slice(1, 3);

  return (
    <IonPage>
      <DiscoverHeader />
      <IonContent>
        <div className="mt-8 ml-8">
          <p className="font-display font-bold text-[40px]">
            {day} {month}
          </p>
          <p className="font-display text-xl">Hey Jane</p>
        </div>

        <p className="font-display font-bold text-lg mt-8 mb-4">Discover</p>

        <div className="col gap-1/2">
          <Button
            prefix={<HashtagIcon className="w-6 h-6 text-white" />}
            suffix={<ChevronRightIcon className="w-6 h-6 text-white" />}
            align="align-start-sb"
            size="small"
            routerDirection="forward"
            routerLink="/discover/popular-tags"
          >
            Popular tags
          </Button>
          <Button
            prefix={<IonIcon icon={cards} className="w-6 h-6" />}
            suffix={<ChevronRightIcon className="w-6 h-6 text-white" />}
            align="align-start-sb"
            size="small"
            routerDirection="forward"
            routerLink="/discover/trending"
          >
            Trending cards
          </Button>
          <Button
            prefix={<UserIcon className="w-6 h-6 text-white" />}
            suffix={<ChevronRightIcon className="w-6 h-6 text-white" />}
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
      </IonContent>
    </IonPage>
  );
};
