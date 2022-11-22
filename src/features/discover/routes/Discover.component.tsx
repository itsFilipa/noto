import {
  ChevronRightIcon,
  HashtagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { Button } from "../../../components/Button";
import { DiscoverHeader } from "../components";
import cards from "../assets/cards.svg";

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

        <p className="font-display font-bold text-lg mt-8">Discover</p>

        <div className="col gap-1/2">
          <Button
            prefix={<HashtagIcon className="w-6 h-6 text-white" />}
            suffix={<ChevronRightIcon className="w-6 h-6 text-white" />}
            align="align-start-sb"
          >
            Popular tags
          </Button>
          <Button
            prefix={<IonIcon icon={cards} className="w-6 h-6" />}
            suffix={<ChevronRightIcon className="w-6 h-6 text-white" />}
            align="align-start-sb"
          >
            Trending cards
          </Button>
          <Button
            prefix={<UserIcon className="w-6 h-6 text-white" />}
            suffix={<ChevronRightIcon className="w-6 h-6 text-white" />}
            align="align-start-sb"
          >
            Picked for you
          </Button>
        </div>

        <p className="font-display font-bold text-lg mt-8">Activity</p>
      </IonContent>
    </IonPage>
  );
};
