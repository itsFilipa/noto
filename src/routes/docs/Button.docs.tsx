import { IonContent, IonIcon, IonPage } from "@ionic/react";
import { Button } from "../../components/Button";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Icon } from "../../components/Icon";

export const ButtonDocs = () => {
  return (
    <IonPage className="mx-5">
      <IonContent>
        <header>
          <h1 className="font-display text-2xl font-bold">Travel to</h1>
          <div className="flex gap-4">
            <Button href="/components/toggles">Misc</Button>
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
            <h2 className="font-display text-3xl font-bold mb-6 mx-auto w-fit">
              Icons
            </h2>
            <Button prefix={<HeartIcon className="w-6 h-6 text-white" />}>
              Icon Left
            </Button>
            <Button suffix={<HeartIcon className="w-6 h-6 text-white" />}>
              Icon Right
            </Button>
            <Button
              prefix={<HeartIcon className="w-6 h-6 text-white" />}
              suffix={<HeartIcon className="w-6 h-6 text-white" />}
            >
              Two Icons
            </Button>
          </div>

          <div className="my-6">
            <h2 className="font-display text-3xl font-bold mb-6 mx-auto w-fit">
              Icon Spacing
            </h2>
            <Button prefix={<HeartIcon className="w-6 h-6 text-white" />}>
              Center
            </Button>
            <Button
              suffix={<HeartIcon className="w-6 h-6 text-white" />}
              align="align-sb"
            >
              Space Between
            </Button>
            <Button
              prefix={<HeartIcon className="w-6 h-6 text-white" />}
              suffix={<HeartIcon className="w-6 h-6 text-white" />}
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
                prefix={<HeartIcon />}
              ></Button>
              <Button
                iconOnly
                prefix={<HeartIcon  />}
              ></Button>
              <Button
                iconOnly
                size="large"
                prefix={<HeartIcon  />}
              ></Button>

              <Button
                iconOnly
                size="large"
                variant="outline"
                prefix={<HeartIcon  />}
              ></Button>
              <Button
                iconOnly
                variant="outline"
                prefix={<HeartIcon  />}
              ></Button>
              <Button
                iconOnly
                size="small"
                variant="outline"
                prefix={<HeartIcon />}
              ></Button>
            </div>
            <div className="flex items-center justify-evenly">
              <Button
                iconOnly
                size="small"
                variant="clear"
                prefix={<HeartIcon />}
              ></Button>
              <Button
                iconOnly
                variant="clear"
                prefix={<HeartIcon  />}
              ></Button>
              <Button
                iconOnly
                size="large"
                variant="clear"
                prefix={<HeartIcon  />}
              ></Button>
            </div>
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};
