import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import { useCallback, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { object, string } from "zod";
import { Button, ControlledInput, Form, GenericHeader, Note } from "../../../components";
import { useAlert, useAuth } from "../../../store";
import dangerIcon from "../../../assets/iconout/exclamation-triangle.svg";

interface Inputs extends Record<string, unknown> {
  email: string;
  password: string;
}

const schema = object({
  email: string().email("Please enter a valid email"),
  password: string().min(1, "This field cannot be empty"),
});

export const ChangeEmailPage = () => {
  const { user, isLoading, updateCredentials } = useAuth();
  const { setAlert } = useAlert();
  const router = useIonRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = useCallback<SubmitHandler<Inputs>>(
    async ({ email, password }) => {
      const { error } = await updateCredentials({
        email: email,
        password: password,
      });
      if (error) {
        console.error(error);
        setErrorMessage(error.message);
      } else {
        setAlert({ success: true, message: "Email updated successfully" });
        router.push("/profile", "back");
      }
    },
    [updateCredentials, setAlert, router]
  );

  return (
    <IonPage>
      <GenericHeader title="Change Email" backBtn="/profile" />
      <IonContent>
        <Form<Inputs, typeof schema>
          schema={schema}
          onSubmit={onSubmit}
          className="mt-7"
        >
          {({ control, formState }) => (
            <>
              <ControlledInput
                control={control}
                label="New email"
                name="email"
                placeholder="Write your new email here"
                errorText={formState.errors.email?.message}
              />
              <ControlledInput
                control={control}
                label="Confirm with your password"
                name="password"
                placeholder="Write your password here"
                errorText={formState.errors.password?.message}
              />
              <Button type="submit" loading={isLoading} className="!mt-12">Save Changes</Button>
            </>
          )}
        </Form>
        {errorMessage && <Note color="error" icon={dangerIcon} className="mt-6">{errorMessage}</Note>}
      </IonContent>
    </IonPage>
  );
};
