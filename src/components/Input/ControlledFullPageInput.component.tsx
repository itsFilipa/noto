import { Control, Controller, Path } from "react-hook-form";
import { FullPageInput, FullPageInputProps } from "./FullPageInput.component"

export type ControlledFullPageInputProps<TFormValues extends Record<string, FullPageInputProps["value"]>> = {
  control: Control<any> | undefined;
  name: Path<TFormValues>;
  required?: boolean;
} & Omit<FullPageInputProps, "value" | "registration" | "onChange" | "onBlur">;


export const ControlledFullPageInput = <TFormValues extends Record<string, FullPageInputProps["value"]>>({
  control,
  name,
  onIonChange,
  onIonBlur,
  ...inputProps
}: ControlledFullPageInputProps<TFormValues>) => {

  return(
    <Controller<TFormValues>
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <FullPageInput
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