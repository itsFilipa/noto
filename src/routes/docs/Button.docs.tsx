import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { Button } from "../../components/Button";
import { Icon } from "../../components/Icon";

import heartIcon from "../../assets/iconout/heart.svg";

export const ButtonDocs = () => {
  return (
    <IonPage className="mx-5">
      <IonContent>
        <header>
          <h1 className="font-display text-2xl font-bold">Travel to</h1>
          <div className="flex gap-4">
          <Button href="/components/buttons">Button</Button>
            <Button href="/components/misc">Misc</Button>
          </div>
        </header>

        <main>
          <div className="my-6">
            <h2 className="font-display text-3xl font-bold mb-6 mx-auto w-fit">
              Sizes
            </h2>
            <Button size="small">Small</Button>
            <Button>Default</Button>
            <Button size="large">Large</Button>
          </div>

          <div className="my-6">
            <h2 className="font-display text-3xl font-bold mb-6 mx-auto w-fit">
              Variants
            </h2>
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="clear">Clear</Button>
          </div>

          <div className="my-6">
            <h2 className="font-display text-3xl font-bold mb-6 mx-asuto w-fit">
              Icons
            </h2>
            <Button prefix={<Icon icon={heartIcon} className="!w-6 !h-6 text-white" />}>
              Icon Left
            </Button>
            <Button suffix={<Icon icon={heartIcon} className="!w-6 !h-6 text-white" />}>
              Icon Right
            </Button>
            <Button
              prefix={<Icon icon={heartIcon} className="!w-6 !h-6 text-white" />}
              suffix={<Icon icon={heartIcon} className="!w-6 !h-6 text-white" />}
            >
              Two Icons
            </Button>
          </div>

          <div className="my-6">
            <h2 className="font-display text-3xl font-bold mb-6 mx-auto w-fit">
              Icon Spacing
            </h2>
            <Button prefix={<Icon icon={heartIcon} className="!w-6 !h-6 text-white" />}>
              Center
            </Button>
            <Button
              suffix={<Icon icon={heartIcon} className="!w-6 !h-6 text-white" />}
              align="align-sb"
            >
              Space Between
            </Button>
            <Button
              prefix={<Icon icon={heartIcon} className="!w-6 !h-6 text-white" />}
              suffix={<Icon icon={heartIcon} className="!w-6 !h-6 text-white" />}
              align="align-start-sb"
            >
              Start & Space Between
            </Button>
          </div>

          <div className="my-6">
            <h2 className="font-display text-3xl font-bold mb-6 mx-auto w-fit">
              Loading
            </h2>
            <Button loading>Button</Button>
          </div>

          <div className="my-6">
            <h2 className="font-display text-3xl font-bold mb-6 mx-auto w-fit">
              Icon-only
            </h2>
            <div className="flex items-center justify-evenly">
              <Button
                iconOnly
                size="small"
                prefix={<Icon icon={heartIcon} />}
              ></Button>
              <Button
                iconOnly
                prefix={<Icon icon={heartIcon}  />}
              ></Button>
              <Button
                iconOnly
                size="large"
                prefix={<Icon icon={heartIcon}  />}
              ></Button>

              <Button
                iconOnly
                size="large"
                variant="outline"
                prefix={<Icon icon={heartIcon}  />}
              ></Button>
              <Button
                iconOnly
                variant="outline"
                prefix={<Icon icon={heartIcon}  />}
              ></Button>
              <Button
                iconOnly
                size="small"
                variant="outline"
                prefix={<Icon icon={heartIcon} />}
              ></Button>
            </div>
            <div className="flex items-center justify-evenly">
              <Button
                iconOnly
                size="small"
                variant="clear"
                prefix={<Icon icon={heartIcon} />}
              ></Button>
              <Button
                iconOnly
                variant="clear"
                prefix={<Icon icon={heartIcon}  />}
              ></Button>
              <Button
                iconOnly
                size="large"
                variant="clear"
                prefix={<Icon icon={heartIcon}  />}
              ></Button>
            </div>
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};
