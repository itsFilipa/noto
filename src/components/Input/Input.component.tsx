import { IonInput, IonItem, IonLabel, IonNote } from "@ionic/react";

export type InputProps = React.ComponentProps<typeof IonInput>;

export type CustomInputProps = InputProps & {
  label: string;
  errorText?: string;
  helperText?: string;
  invalid?: boolean;
};

export const Input = ({
  label,
  errorText,
  helperText,
  invalid,
  ...rest
}: CustomInputProps) => {
  return (
    <IonItem lines="none">
      <div>
        <IonLabel position="floating">{label}</IonLabel>
        <IonInput {...rest} className="custom"/>
      </div>
      <IonNote slot="helper">{helperText}</IonNote>
      <IonNote slot="error">{errorText}</IonNote>
    </IonItem>
  );
};
