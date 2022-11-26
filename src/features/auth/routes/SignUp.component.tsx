import { IonPage, IonContent, useIonRouter } from "@ionic/react";
import { useCallback, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { object, string } from "zod";
import { Form, ControlledInput, Button, Note } from "../../../components";
import { useAuth } from "../../../store";
import logo from "../assets/logo.svg";
import dangerIcon from "../../../assets/iconout/exclamation-triangle.svg";

export const SignUpPage = () => {
  const { user, isLoading, register } = useAuth();
  const router = useIonRouter();

  const [errorMessage, setErrorMessage] = useState("");

  const schema = object({
    email: string().email("Please enter a valid email"),
    password: string().min(8, "Password must be at least 8 characters"),
  });

  interface Inputs extends Record<string, unknown> {
    email: string;
    password: string;
  }

  const onSubmit = useCallback<SubmitHandler<Inputs>>(
    async({ email, password }) => {
     
        const { error } = await register({ email, password });
        if (error) {
          console.error(error);
          setErrorMessage(error.message);
        } else {
          router.push("/sign-up/completion", "forward");
        }
    },
    [register, router]
  );

  return (
    <IonPage>
      <IonContent className="[--background:white]">
        <img src={logo} alt="logo for noto" className="mx-auto mt-12" />

        <p className="font-display font-semibold text-xl mt-10 mx-auto w-fit">
          Sign up
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
              <Button type="submit" loading={isLoading} className="!mt-10">Create account</Button>
            </>
          )}
        </Form>

        { errorMessage && <Note color="error" icon={dangerIcon} className="mt-4">{errorMessage}</Note>}

        <div className="flex justify-center items-center">
          <div className="absolute bottom-12 flex justify-center gap-1">
            <p className="font-medium text-sm">Already have an account?</p>
            <a className="font-medium text-sm text-indigo-500" href="/sign-in">Sign in here</a>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
