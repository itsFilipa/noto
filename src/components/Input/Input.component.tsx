import { IonInput } from "@ionic/react";
import { Note } from "../Note";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import type { VariantPropsOf } from "classname-variants/react";
import { variants } from "classname-variants";
import { cn } from "../../lib/cn";
import { ComponentPropsWithoutRef, ForwardRefRenderFunction } from "react";

const inputVariants = variants({
  base: "input",
  variants: {
    size: {
      sm: "input-sm",
      default: "input--size-default",
    },
    color: {
      default: "input--color-default",
      error: "input--color-error",
    },
    disabled: {
      true: "input--disabled",
    },
  },
  defaultVariants: {
    size: "default",
    color: "default",
  },
});
export interface InputVariantProps
  extends VariantPropsOf<typeof inputVariants> {
  label: string;
  errorText?: string;
  invalid?: boolean;
}

export type InputCustomProps = InputVariantProps &
  Omit<ComponentPropsWithoutRef<typeof IonInput>, "size" | "color">;

type Ref = HTMLIonInputElement;

export const Input:ForwardRefRenderFunction<Ref, InputCustomProps> = ({
  label,
  errorText,
  invalid,
  className,
  placeholder ="Write here...",
  size,
  color,
  value,
  disabled = false,
  readonly = false,
  ...rest
}: InputCustomProps) => {
  return (
    <div>
      <Note label={label} className="mb-1" />
      <IonInput
        placeholder={placeholder}
        disabled={disabled}
        readonly={readonly}
        value={value}
        //className={cn(`custom-input ${className}`)}
        // className={inputVariants({
        //   size,
        //   color: errorText ? "error" : color,
        //   disabled,
        // })}
        className={cn(`custom-input ${className} ${inputVariants({size,
          color: errorText ? "error" : color, disabled})}}` )}
      ></IonInput>
      {errorText && (
        <Note
          className="mt-1"
          color="error"
          label={errorText}
          icon={<ExclamationTriangleIcon className="w-4 h-4 text-error" />}
        />
      )}
    </div>
  );
};
