import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import { useCallback, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { object, string } from "zod";
import { Button, ControlledInput, Form, GenericHeader, Note } from "../../../components";
import { useAlert, useAuth } from "../../../store";
import dangerIcon from "../../../assets/iconout/exclamation-triangle.svg";

interface Inputs extends Record<string, unknown> {
  oldPwd: string;
  newPwd: string;
}

const schema = object({
  oldPwd: string().min(1, "This field cannot be empty"),
  newPwd: string().min(8, "Password must be at least 8 characters"),
});

export const ChangePasswordPage = () => {
  const { user, isLoading, updateCredentials } = useAuth();
  const { setAlert } = useAlert();
  const router = useIonRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = useCallback<SubmitHandler<Inputs>>(
    async ({ oldPwd, newPwd }) => {
      const { error } = await updateCredentials({
        email: oldPwd,
        password: newPwd,
      });
      if (error) {
        console.error(error);
        setErrorMessage(error.message);
      } else {
        setAlert({ success: true, message: "Password updated successfully" });
        router.push("/profile", "back");
      }
    },
    [updateCredentials, setAlert, router]
  );

  return (
    <IonPage>
      <GenericHeader title="Change Password" backBtn="/profile" />
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
                label="Current password"
                name="oldPwd"
                placeholder="Write your current password here"
                errorText={formState.errors.oldPwd?.message}
              />
              <ControlledInput
                control={control}
                label="New password"
                name="newPwd"
                placeholder="Write your new password here"
                errorText={formState.errors.newPwd?.message}
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
