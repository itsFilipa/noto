import { IonPage, IonContent } from "@ionic/react";
import { LandingHeader } from "..";

export const ChangeLogPage = () => {

  return (
    <IonPage>
      <IonContent className="no-padding">
        <div className="h-screen bg-white px-16 pt-5 col justify-between">
          <LandingHeader />
          <div className="col gap-3 mt-12 items-center">
            <p className="text-[48px] font-display font-bold">What's new?</p>
            <p className="font-medium text-lg">
              Find out what are the latest changes
            </p>
          </div>

          <div className="mt-12 px-16">
            
            <div className="flex justify-between">
              <p className="font-display font-semibold text-3xl">0.0.1</p>
              <p className="font-medium text-neutral-500">28 Nov 2022</p>
            </div>

            <div className="mt-4 mb-12 w-fit">
              <ul className="w-fit">
                <li className="font-medium text-lg text-neutral-500">Create a new note</li>
                <li className="font-medium text-lg text-neutral-500">Delete a note</li>
                <li className="font-medium text-lg text-neutral-500">Restore a deleted note</li>
                <li className="font-medium text-lg text-neutral-500">
                  Permanently delete a note
                </li>
                <li className="font-medium text-lg text-neutral-500">Edit a note</li>
                <li className="font-medium text-lg text-neutral-500">View a note</li>
                <li className="font-medium text-lg text-neutral-500">View user all notes</li>
                <li className="font-medium text-lg text-neutral-500">Create tags</li>
                <li className="font-medium text-lg text-neutral-500">
                  Add/remove tag to/from note
                </li>
                <li className="font-medium text-lg text-neutral-500">
                  Note filtering through tags
                </li>
                <li className="font-medium text-lg text-neutral-500">Publish note</li>
                <li className="font-medium text-lg text-neutral-500">
                  Remove note from public eye
                </li>
                <li className="font-medium text-lg text-neutral-500">Add discover page</li>
                <li className="font-medium text-lg text-neutral-500">Add popular tags</li>
                <li className="font-medium text-lg text-neutral-500">Add suggested notes</li>
                <li className="font-medium text-lg text-neutral-500">Add trending cards</li>
                <li className="font-medium text-lg text-neutral-500">
                  Consult users that are followed
                </li>
                <li className="font-medium text-lg text-neutral-500">
                  Search through public cards, tags and users
                </li>
              </ul>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
