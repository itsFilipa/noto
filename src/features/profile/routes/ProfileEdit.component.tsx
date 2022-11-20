import { UserIcon, CameraIcon } from "@heroicons/react/24/outline";
import { IonPage, IonContent } from "@ionic/react";
import { object, string } from "zod";
import { Button } from "../../../components/Button";
import { Form } from "../../../components/Form";
import { Header } from "../../../components/Header";
import { Input } from "../../../components/Input";

import user from "../user.json";

const userSchema = object({
  username: string().min(3).max(30).regex(/^\S*$/u, "Cannot have spaces"),
  firstName: string().min(3).max(25),
  lastName: string().min(3).max(25),
  description: string().min(3).max(100),
});

interface Inputs extends Record<string, unknown> {
  username: string;
  firstName: string;
  lastName: string;
  description: string;
}

const submitTest = () => {
  console.log("submit");
};

export const ProfileEditPage = () => {
  return (
    <IonPage>
      <Header title="Edit Profile" backBtn />
      <IonContent>
        <div className="mt-8 w-20 h-20 rounded-full border border-neutral-200 mx-auto relative">
          {user.avatar ? (
            <>
              <div className="bg-warmblack/30 w-20 h-20 absolute rounded-full" />
              <CameraIcon className="h-8 text-white absolute inset-center" />
              <img
                src={user.avatar}
                alt="portrait of user"
                className="h-full w-full object-cover rounded-full"
              />
            </>
          ) : (
            <UserIcon className="text-neutral-400" />
          )}
        </div>

        <Form<Inputs, typeof userSchema>
          onSubmit={submitTest}
          schema={userSchema}
          className="mt-7"
        >
          {({ register, formState }) => (
            <div className="col gap-5">
              <div className="flex justify-between">
                <Input
                  label="First name"
                  size="sm"
                  value={user.firstName}
                  errorText={formState.errors.firstName?.message}
                />
                <Input
                  label="Last name"
                  size="sm"
                  value={user.lastName}
                  errorText={formState.errors.lastName?.message}
                />
              </div>

              <Input
                label="Username"
                value={user.username}
                errorText={formState.errors.username?.message}
              />

              <Input
                label="Description"
                value={user.description}
                errorText={formState.errors.description?.message}
              />

              <Button type="submit">Save Changes</Button>
            </div>
          )}
        </Form>
      </IonContent>
    </IonPage>
  );
};
