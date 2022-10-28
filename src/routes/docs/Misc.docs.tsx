import { IonPage, IonContent, IonRadioGroup } from "@ionic/react";
import { Button } from "../../components/Button";
import { Chip, DiscoverChip } from "../../components/Chip";
import { Radio } from "../../components/Radio";
import { Toggle } from "../../components/Toggle";

export const MiscDocs = () => {
  return (
    <IonPage className="mx-5">
      <IonContent>
        <header>
          <h1 className="font-display text-2xl font-bold">Travel to</h1>
          <div className="flex gap-4">
            <Button href="/components/buttons">Button</Button>
            <Button href="/components/inputs">Input</Button>
          </div>
        </header>

        <main>
          <div className="my-6">
            <h2 className="font-display text-3xl font-bold mb-6 mx-auto w-fit">
              Chip
            </h2>
            <div className="flex justify-evenly">
              <div className="col justify-center items-center gap-2">
                <Chip label="Tag" />
                <p className="text-sm text-neutral-500">Unchecked</p>
              </div>
              <div className="col justify-center items-center gap-2">
                <Chip checked label="Tag" />
                <p className="text-sm text-neutral-500">Checked</p>
              </div>
            </div>
          </div>

          <div className="my-6">
            <h2 className="font-display text-3xl font-bold mb-6 mx-auto w-fit">
              Discover Chip
            </h2>
            <div className="flex justify-evenly">
              <div className="col justify-center items-center gap-2">
                <DiscoverChip label="Tag" />
                <p className="text-sm text-neutral-500">Unchecked</p>
              </div>
              <div className="col justify-center items-center gap-2">
                <DiscoverChip checked label="Tag" />
                <p className="text-sm text-neutral-500">Checked</p>
              </div>
            </div>
          </div>

          <div className="my-6">
            <h2 className="font-display text-3xl font-bold mb-6 mx-auto w-fit">
              Radio
            </h2>
            <div className="col justify-center items-center gap-2">
              <IonRadioGroup allowEmptySelection>
                <Radio />
              </IonRadioGroup>
              <p className="text-sm text-neutral-500">Default</p>
            </div>
          </div>

          <div className="my-6">
            <h2 className="font-display text-3xl font-bold mb-6 mx-auto w-fit">
              Toggle
            </h2>
            <div className="col justify-center items-center gap-2">
              <Toggle />
              <p className="text-sm text-neutral-500">Default</p>
            </div>
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};
