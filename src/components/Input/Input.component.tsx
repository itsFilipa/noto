import {
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useRef,
} from "react";
import { mergeRefs } from "react-merge-refs";
import { IonInput } from "@ionic/react";
import { Note } from "../Note";
import type { VariantPropsOf } from "classname-variants/react";
import { variants } from "classname-variants";
import { cn } from "../../lib/cn";
import { Icon } from "../Icon";
import dangerIcon from "../../assets/iconout/exclamation-triangle.svg";

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

export const InputInstance: ForwardRefRenderFunction<Ref, InputCustomProps> = (
  {
    className,
    color,
    disabled = false,
    errorText,
    invalid,
    label,
    placeholder = "Write here...",
    readonly = false,
    size,
    value,
    ...rest
  },
  ref
) => {
  const inputRef = useRef<HTMLIonInputElement>(null);

  const handleFocus = useCallback(() => {
    inputRef.current?.setFocus();
  }, []);

  return (
    <div>
      <Note label={label} className="mb-1" />
      <IonInput
        {...rest}
        disabled={disabled}
        placeholder={placeholder}
        readonly={readonly}
        ref={mergeRefs([inputRef, ref])}
        // value={value}
        //className={cn(`custom-input ${className}`)}
        // className={inputVariants({
        //   size,
        //   color: errorText ? "error" : color,
        //   disabled,
        // })}
        className={cn(
          `custom-input ${className} ${inputVariants({
            size,
            color: errorText ? "error" : color,
            disabled,
          })}}`
        )}
      ></IonInput>
      {errorText && (
        <Note
          className="mt-1"
          color="error"
          label={errorText}
          onClick={handleFocus}
          icon={dangerIcon}
        />
      )}
    </div>
  );
};

export const Input = forwardRef(InputInstance);
Input.displayName = "Input";
