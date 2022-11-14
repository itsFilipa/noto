import { IonPage, IonContent } from "@ionic/react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export const InputDocs = () => {
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

            <Input
              label="Email"
              placeholder="Enter your email here"
              errorText="This is an error"
            />
          </div>
        </main>
      </IonContent>
    </IonPage>
  );
};
