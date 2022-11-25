import { UserIcon, CameraIcon } from "@heroicons/react/24/outline";
import { IonPage, IonContent } from "@ionic/react";
import { object, string } from "zod";
import { Button } from "../../../components/Button";
import { Form } from "../../../components/Form";
import { Header } from "../../../components/Header";
import { ControlledInput } from "../../../components/Input";

import user from "../user.json";

const userSchema = object({
  username: string()
    .min(3, "Please choose a username")
    .max(30, "Username is too long")
    .regex(/^\S*$/u, "Cannot have spaces"),
  firstName: string()
    .min(3, "Please write your name")
    .max(25, "Name is too long"),
  lastName: string()
    .min(3, "Please write your last name")
    .max(25, "Last name is too long"),
  description: string()
    .min(3, "Write something about you")
    .max(100, "Description is too long"),
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
          {({ control, formState }) => (
            <>
            
              <div className="col gap-5">
                <div className="flex justify-between">
                <ControlledInput
                  control={control}
                  label="First name"
                  name="firstName"
                  size="sm"
                  errorText={formState.errors.firstName?.message}
                />
                <ControlledInput
                  control={control}
                  label="Last name"
                  size="sm"
                  name="lastName"
                  errorText={formState.errors.lastName?.message}
                />
                </div>
                <ControlledInput
                  control={control}
                  label="Username"
                  name="username"
                  errorText={formState.errors.username?.message}
                />
                <ControlledInput
                  control={control}
                  label="Description"
                  name="description"
                  errorText={formState.errors.description?.message}
                />
                <Button type="submit">Save Changes</Button>
              </div>
            </>
          )}
        </Form>
      </IonContent>
    </IonPage>
  );
};
