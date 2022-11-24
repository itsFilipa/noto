import { IonPage, IonContent } from "@ionic/react";
import { GenericHeader } from "../../../components";

export const PrivacyPolicyPage = () => {
  return (
    <IonPage>
      <GenericHeader title="Privacy Policy" backBtn="/profile" />
      <IonContent>
        <p className="my-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lacus
          enim, vehicula lacinia dignissim id, tristique vitae purus. Donec
          pulvinar sem suscipit nisi congue, facilisis congue nisi bibendum.
          Etiam justo tortor, imperdiet nec semper eget, viverra pellentesque
          libero. Cras iaculis, ante id tristique imperdiet, orci dolor
          ultricies tortor, sit amet feugiat erat diam sed nibh. Suspendisse eu
          dui sollicitudin, pharetra massa vel, tempor nunc. Proin non mauris
          non felis imperdiet blandit. Quisque venenatis porttitor cursus. In
          hac habitasse platea dictumst. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Morbi gravida at purus sed tristique. Etiam ac
          dapibus leo. Cras id sapien nunc. Morbi nec tincidunt lorem, id
          pulvinar massa. Nulla sit amet aliquet ipsum. Aliquam vel ante
          consequat, facilisis felis vel, egestas nunc. Nulla accumsan molestie
          metus, at dictum est vestibulum ut. Donec porttitor sagittis magna,
          vel accumsan elit. Vivamus feugiat molestie leo, vel tristique mauris
          elementum et. Donec dapibus sodales odio, at suscipit nunc fringilla
          vel. Praesent in turpis tellus. Sed egestas euismod libero, et
          efficitur mi rutrum nec. Vestibulum nibh justo, lacinia ac suscipit
          nec, vulputate vel nibh. Sed mollis vel elit ut interdum. Praesent in
          sapien sollicitudin justo blandit posuere sed ac enim. Etiam eget
          elementum nisl, id consectetur nibh. Etiam varius nibh eget
          sollicitudin dictum. Donec nec orci auctor, facilisis orci ut, feugiat
          erat. Proin nec ipsum nec sapien gravida mollis vitae at nunc. Nullam
          et nisi turpis. Proin ultricies non nisi at tincidunt. Duis eu
          convallis quam. Duis sagittis ac mi non tincidunt.
        </p>
      </IonContent>
    </IonPage>
  );
};
