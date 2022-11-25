import { IonPage, IonContent } from "@ionic/react";
import { object, string } from "zod";
import { Form, ControlledInput, Button } from "../../../components";

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

const submitTest = () => {
  console.log("submit");
};

export const ProfileCompletionPage = () => {
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
          onSubmit={submitTest}
          schema={schema}
          className="mt-8"
        >
          {({ control, formState }) => (
            <>
              <div className="flex gap-2">
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
              <ControlledInput
                control={control}
                name="description"
                label="Description"
                errorText={formState.errors.description?.message}
              />
              <Button type="submit" className="!mt-10">
                Continue
              </Button>
            </>
          )}
        </Form>
      </IonContent>
    </IonPage>
  );
};
