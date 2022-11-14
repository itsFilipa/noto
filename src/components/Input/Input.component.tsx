import { IonInput } from "@ionic/react";
import { Note } from "../Note";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export type InputProps = React.ComponentProps<typeof IonInput>;

export type CustomInputProps = InputProps & {
  label: string;
  errorText?: string;
  invalid?: boolean;
};

export const Input = ({
  label,
  errorText,
  invalid,
  ...rest
}: CustomInputProps) => {
  return (
    // <IonItem lines="none">
    //   <div>
    //     <IonLabel position="floating">{label}</IonLabel>
    //     <IonInput {...rest} className="custom"/>
    //   </div>
    //   <IonNote slot="helper">{helperText}</IonNote>
    //   <IonNote slot="error">{errorText}</IonNote>
    // </IonItem>

    <div>
      <Note label={label} />
      <IonInput {...rest} className="custom"></IonInput>
      {errorText && (
        <Note
          color="error"
          label={errorText}
          icon={<ExclamationTriangleIcon className="w-4 h-4 text-error" />}
        />
      )}
    </div>
  );
};
