import { Control, Controller, Path } from "react-hook-form";
import { Input, InputCustomProps } from "./Input.component"

export type ControlledInputProps<TFormValues extends Record<string, InputCustomProps["value"]>> = {
  control: Control<any> | undefined;
  name: Path<TFormValues>;
  required?: boolean;
} & Omit<InputCustomProps, "value" | "registration" | "onChange" | "onBlur">;


export const ControlledInput = <TFormValues extends Record<string, InputCustomProps["value"]>>({
  control,
  name,
  onIonChange,
  onIonBlur,
  ...inputProps
}: ControlledInputProps<TFormValues>) => {

  return(
    <Controller<TFormValues>
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Input
          {...inputProps}
          ref={ref}
          onIonChange={(e) => {
            onChange(e);
            onIonChange?.(e);
          }}
          onIonBlur={(e) => {
            onBlur();
            onIonBlur?.(e);
          }}
          value={value}
        />
      )}
    />
  )
}