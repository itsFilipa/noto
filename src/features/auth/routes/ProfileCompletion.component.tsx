import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import { useCallback, useState } from "react";
import { object, string } from "zod";
import { Form, ControlledInput, Button, Note, ControlledTextarea } from "../../../components";
import { useAuth } from "../../../store";
import dangerIcon from "../../../assets/iconout/exclamation-triangle.svg";
import { SubmitHandler } from "react-hook-form";

const schema = object({
  firstName: string()
    .min(3, "Please enter your first name")
    .max(20, "First name must be less than 20 characters"),
  lastName: string()
    .min(3, "Please enter your last name")
    .max(20, "Last name must be less than 20 characters"),
  username: string()
    .min(3, "Please enter a username")
    .max(20, "Username must be less than 20 characters"),
  description: string()
    .min(12, "Please enter a description")
    .max(100, "Description must be less than 100 characters"),
});

interface Inputs extends Record<string, unknown> {
  firstName: string;
  lastName: string;
  username: string;
  description: string;
}

export const ProfileCompletionPage = () => {
  const { user, isLoading, updateProfile } = useAuth();
  const router = useIonRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = useCallback<SubmitHandler<Inputs>>(
    async ({ firstName, lastName, username, description }) => {

      const { error } = await updateProfile({
        firstName,
        lastName,
        username,
        biography: description,
      }, true);
      if (error) {
        console.error(error);
        setErrorMessage(error.message);
      } else {
        router.push("/discover", "forward");
      }
    },
    [updateProfile, router]
  );

  return (
    <IonPage>
      <IonContent className="[--background:white]">
        <p className="font-display font-bold text-4xl mx-auto w-fit mt-20 bg-gradient-to-b from-[#1AC8FF] to-[#6366F1] bg-clip-text text-transparent">
          Welcome to Nōto
        </p>
        <p className="font-medium mt-5 mx-auto w-fit">
          Please fill some information first
        </p>

        <Form<Inputs, typeof schema>
          onSubmit={onSubmit}
          schema={schema}
          className="mt-8"
        >
          {({ control, formState }) => (
            <>
              <div className="flex gap-2 justify-between">
                <ControlledInput
                  control={control}
                  name="firstName"
                  label="First name"
                  size="sm"
                  errorText={formState.errors.firstName?.message}
                />
                <ControlledInput
                  control={control}
                  name="lastName"
                  label="Last name"
                  size="sm"
                  errorText={formState.errors.lastName?.message}
                />
              </div>
              <ControlledInput
                control={control}
                name="username"
                label="Username"
                errorText={formState.errors.username?.message}
              />
              <ControlledTextarea
                control={control}
                name="description"
                label="Description"
                errorText={formState.errors.description?.message}
              />
              <Button type="submit" loading={isLoading} className="!mt-10">
                Continue
              </Button>
            </>
          )}
        </Form>

        {errorMessage && (
          <Note color="error" icon={dangerIcon} className="mt-4">
            {errorMessage}
          </Note>
        )}
      </IonContent>
    </IonPage>
  );
};
