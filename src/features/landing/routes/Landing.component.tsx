import { IonPage, IonContent, IonButton } from "@ionic/react";
import logo from "../assets/logo.svg";
import watermind from "../assets/watermind.svg";

export const LandingPage = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="h-screen bg-white px-16 pt-5 col justify-between">
          <div className="flex justify-between items-center">
            <img src={logo} alt="logo for noto" />
            <div className="flex justify-between items-center gap-8">
              <a href="#" className="text-neutral-500 font-medium">
                What's new
              </a>
              <a href="#" className="text-neutral-500 font-medium">
                Features
              </a>
              <a href="#" className="text-neutral-500 font-medium">
                Download
              </a>
              <a href="#" className="text-neutral-500 font-medium">
                Docs
              </a>
            </div>
            <IonButton className="rounded-xl shadow-[0_4px_10px_0_rgba(99,102,241,0.5)]">
              Download here
            </IonButton>
          </div>

          <div>
            <p className="font-display font-semibold text-[48px] w-fit mx-auto">
              Water your mind
            </p>
            <p className="font-display font-semibold text-[24px] w-fit mx-auto">
              Share your knowledge
            </p>
          </div>
          <p className="font-semibold text-sm w-[25%] mx-auto text-center">
            Nōto is an app that allows you to capture thoughts and ideas at the
            'speed of thought'
          </p>

          <img
            src={watermind}
            alt="drawing of a woman's face whose head is being watered by smaller people"
            className="mx-auto aspect-[7.1/4.42] w-[45%] mb-4"
          />
        </div>

        <div className="h-screen bg-indigo-100">

        </div>
      </IonContent>
    </IonPage>
  );
};
