import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import { useCallback, useState } from "react";
import { object, string } from "zod";
import { Form, ControlledInput, Button, Note } from "../../../components";
import { useAuth } from "../../../store";
import logo from "../assets/logo.svg";
import dangerIcon from "../../../assets/iconout/exclamation-triangle.svg";
import { SubmitHandler } from "react-hook-form";

export const SignInPage = () => {
  const schema = object({
    email: string().email("Please enter a valid email"),
    password: string().min(1, "Please enter a password"),
  });
  interface Inputs extends Record<string, unknown> {
    email: string;
    password: string;
  }

  const { user, login, isLoading } = useAuth();
  const router = useIonRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = useCallback<SubmitHandler<Inputs>>(
    async ({ email, password }) => {
      const { error } = await login({ email, password });
      if (error) {
        console.error(error);
        setErrorMessage(error.message);
      } else {
        router.push("/discover", "root");
      }
    },
    [login, router]
  );

  return (
    <IonPage>
      <IonContent className="[--background:white]">
        <img src={logo} alt="logo for noto" className="mx-auto mt-12" />

        <p className="font-display font-semibold text-xl mt-10 mx-auto w-fit">
          Sign in
        </p>

        <Form<Inputs, typeof schema>
          onSubmit={onSubmit}
          schema={schema}
          className="mt-8"
        >
          {({ control, formState }) => (
            <>
              <ControlledInput
                control={control}
                name="email"
                label="Email"
                errorText={formState.errors.email?.message}
              />
              <ControlledInput
                control={control}
                name="password"
                label="Password"
                type="password"
                errorText={formState.errors.password?.message}
              />
              <Button type="submit" className="!mt-10" loading={isLoading}>
                Sign in
              </Button>
            </>
          )}
        </Form>

        {errorMessage && (
          <Note color="error" icon={dangerIcon} className="mt-4">
            {errorMessage}
          </Note>
        )}

        <div className="flex justify-center items-center">
          <div className="absolute bottom-12 flex justify-center gap-1">
            <p className="font-medium text-sm">Don't have an account?</p>
            <a className="font-medium text-sm text-indigo-500" href="/sign-up">
              Sign up here
            </a>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
