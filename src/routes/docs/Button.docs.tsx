import { IonContent, IonPage } from "@ionic/react";
import { Button } from "../../components/Button";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Icon } from "../../components/Icon";

export const ButtonDocs = () => {
  return (
    <IonPage className="mx-5">
      <IonContent>
        <header>
          <h1 className="font-display text-2xl font-bold">Travel to</h1>
        </header>

        <main>
          <div className="my-6">
            <h2 className="font-display text-3xl font-bold mb-6 mx-auto w-fit">Sizes</h2>
            <Button size="small">Small</Button>
            <Button>Default</Button>
            <Button size="large">Large</Button>          
          </div>

          <div className="my-6">
            <h2 className="font-display text-3xl font-bold mb-6 mx-auto w-fit">Variants</h2>
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="clear">Clear</Button>          
          </div>

          <div className="my-6">
            <h2 className="font-display text-3xl font-bold mb-6 mx-auto w-fit">Icons</h2>
            <Button prefix={
              <Icon color="red-500" icon={<HeartIcon />}></Icon>
            }>Icon Left</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="clear">Clear</Button>          
          </div>

          <Icon color="red-500" icon={<HeartIcon />}></Icon>
        </main>
      </IonContent>
    </IonPage>
  );
};
