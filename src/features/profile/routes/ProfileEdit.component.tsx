import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import { object, string } from "zod";
import { Button } from "../../../components/Button";
import { Form } from "../../../components/Form";
import { Header } from "../../../components/Header";
import { ControlledInput } from "../../../components/Input";
import { Icon, Note } from "../../../components";
import { useAlert, useAuth } from "../../../store";
import { useCallback, useState } from "react";
import { SubmitHandler } from "react-hook-form";

import userIcon from "../../../assets/iconout/user.svg";
import dangerIcon from "../../../assets/iconout/exclamation-triangle.svg";

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

export const ProfileEditPage = () => {
  const { user, isLoading, updateProfile } = useAuth();
  const { setAlert } = useAlert();
  const router = useIonRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = useCallback<SubmitHandler<Inputs>>(
    async ({ username, firstName, lastName, description }) => {
      const { error } = await updateProfile({
        username,
        firstName,
        lastName,
        biography: description,
      });
      if (error) {
        console.error(error);
        setErrorMessage(error.message);
      } else {
        setAlert({success: true, message: "Profile updated successfully"});
        router.push("/profile", "back");
      }
    },
    [updateProfile, setAlert, router]
  );

  return (
    <IonPage>
      <Header title="Edit Profile" backBtn />
      <IonContent>
        <div className="mt-8 w-20 h-20 rounded-full border border-neutral-200 mx-auto relative">
          {user?.user.profile.avatarUrl ? (
            <>
              <img
                src={user.user.profile.avatarUrl}
                alt="portrait of user"
                className="h-full w-full object-cover rounded-full"
              />
            </>
          ) : (
            <Icon icon={userIcon} className="text-neutral-400" />
          )}
        </div>

        <Form<Inputs, typeof userSchema>
          onSubmit={onSubmit}
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
                    placeholder={user?.user.profile.firstName}
                    errorText={formState.errors.firstName?.message}
                  />
                  <ControlledInput
                    control={control}
                    label="Last name"
                    size="sm"
                    name="lastName"
                    placeholder={user?.user.profile.lastName}
                    errorText={formState.errors.lastName?.message}
                  />
                </div>
                <ControlledInput
                  control={control}
                  label="Username"
                  name="username"
                  placeholder={user?.user.profile.username}
                  errorText={formState.errors.username?.message}
                />
                <ControlledInput
                  control={control}
                  label="Description"
                  name="description"
                  placeholder={user?.user.profile.biography}
                  errorText={formState.errors.description?.message}
                />
                <Button type="submit" loading={isLoading}>
                  Save Changes
                </Button>
              </div>
            </>
          )}
        </Form>
        {errorMessage && (
          <Note color="error" icon={dangerIcon}>
            {errorMessage}
          </Note>
        )}
      </IonContent>
    </IonPage>
  );
};
