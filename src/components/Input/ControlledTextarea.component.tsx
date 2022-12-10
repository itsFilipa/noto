import { Control, Controller, Path } from "react-hook-form";
import { Textarea, TextareaCustomProps } from ".";

export type ControlledTextareaProps<TFormValues extends Record<string, TextareaCustomProps["value"]>> = {
  control: Control<any> | undefined;
  name: Path<TFormValues>;
  required?: boolean;
} & Omit<TextareaCustomProps, "value" | "registration" | "onChange" | "onBlur">;


export const ControlledTextarea = <TFormValues extends Record<string, TextareaCustomProps["value"]>>({
  control,
  name,
  onIonChange,
  onIonBlur,
  ...inputProps
}: ControlledTextareaProps<TFormValues>) => {

  return(
    <Controller<TFormValues>
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Textarea
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