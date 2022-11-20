import {
  IonIcon,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonRouter,
} from "@ionic/react";
import {
  GlobeAltIcon,
  FunnelIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import notecards from "./assets/cards.svg";

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
    icon: <GlobeAltIcon className="h-[30px] w-[30px] text-warmblack" />,
  },
  {
    tab: "Notecards",
    href: "/notecards",
    icon: <IonIcon icon={notecards} />,
  },
  {
    tab: "Filter",
    href: "/filter",
    icon: <FunnelIcon className="h-[30px] w-[30px] text-warmblack" />,
  },
  {
    tab: "Profile",
    href: "/profile",
    icon: <UserIcon className="h-[30px] w-[30px] text-warmblack" />,
  },
];

export const Tabs = ({children}: TabsProps) => {
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
            selected={router.routeInfo.pathname.includes("/"+tab.href)}
            // onClick={() => router.push(tab.href)}
          >
            {tab.icon}
          </IonTabButton>
        ))}
      </IonTabBar>
    </IonTabs>
  );
};
