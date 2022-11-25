import { IonPage, IonContent } from "@ionic/react";
import { object, string } from "zod";
import { Form, ControlledInput, Button } from "../../../components";
import logo from "../assets/logo.svg";
import { SplashScreen } from '@capacitor/splash-screen';

export const SignUpPage = () => {
  const schema = object({
    email: string().email("Please enter a valid email"),
    password: string().min(8, "Password must be at least 8 characters"),
  });

  interface Inputs extends Record<string, unknown> {
    email: string;
    password: string;
  }

  const submitTest = () => {
    console.log("submit");
  };

  return (
    <IonPage>
      <IonContent className="[--background:white]">
        <img src={logo} alt="logo for noto" className="mx-auto mt-12" />

        <p className="font-display font-semibold text-xl mt-10 mx-auto w-fit">
          Sign up
        </p>

        <Form<Inputs, typeof schema>
          onSubmit={submitTest}
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
              <Button type="submit" className="!mt-10">Create account</Button>
            </>
          )}
        </Form>

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
