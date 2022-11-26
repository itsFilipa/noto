import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonRouter,
} from "@ionic/react";
import { Icon } from "../Icon";
import filterIcon from "../../assets/iconout/funnel.svg";
import globeIcon from "../../assets/iconout/globe-alt.svg";
import notecards from "../../assets/iconout/cards.svg";
import plusIcon from "../../assets/iconout/plus-circle.svg";
import userIcon from "../../assets/iconout/user.svg";

export interface Tab {
  tab: string;
  href: string;
  icon: JSX.Element;
}

export interface TabsProps {
  children: JSX.Element;
}

export const TabArray = [
  {
    tab: "Discover",
    href: "/discover",
    icon: <Icon icon={globeIcon} className="text-warmblack !h-6 !w-6" />,
  },
  {
    tab: "Notecards",
    href: "/notecards",
    icon: <Icon icon={notecards} className="text-warmblack !w-6 !h-6" />,
  },
  {
    tab: "New Card",
    href: "/new",
    icon: <Icon icon={plusIcon} className="text-warmblack !h-6 !w-6" />,
  },
  {
    tab: "Filter",
    href: "/filter",
    icon: <Icon icon={filterIcon} className="text-warmblack !w-6 !h-6" />,
  },
  {
    tab: "Profile",
    href: "/profile",
    icon: <Icon icon={userIcon} className="text-warmblack !w-6 !h-6" />,
  },
];

export const Tabs = ({ children }: TabsProps) => {
  const router = useIonRouter();

  return (
    <IonTabs>
      {children}
        <IonTabBar slot="bottom">
          {TabArray.map((tab: Tab) => (
            <IonTabButton
              key={tab.tab}
              tab={tab.tab}
              href={tab.href}
              selected={router.routeInfo.pathname.includes(tab.href)}
              // onClick={() => router.push(tab.href)}
            >
              {tab.icon}
            </IonTabButton>
          ))}
        </IonTabBar>
    </IonTabs>
  );
};
