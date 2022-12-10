import {
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useRef,
} from "react";
import { mergeRefs } from "react-merge-refs";
import { IonTextarea } from "@ionic/react";
import { Note } from "../Note";
import type { VariantPropsOf } from "classname-variants/react";
import { variants } from "classname-variants";
import { cn } from "../../lib/cn";
import dangerIcon from "../../assets/iconout/exclamation-triangle.svg";

const textareaVariants = variants({
  base: "textarea",
  variants: {
    color: {
      default: "textarea--color-default",
      error: "textarea--color-error",
    },
    disabled: {
      true: "textarea--disabled",
    },
  },
  defaultVariants: {
    color: "default",
  },
});
export interface TextareaVariantProps
  extends VariantPropsOf<typeof textareaVariants> {
  label: string;
  errorText?: string;
  invalid?: boolean;
}

export type TextareaCustomProps = TextareaVariantProps &
  Omit<ComponentPropsWithoutRef<typeof IonTextarea>, "size" | "color">;

type Ref = HTMLIonTextareaElement;

export const TextareaInstance: ForwardRefRenderFunction<
  Ref,
  TextareaCustomProps
> = (
  {
    className,
    color,
    disabled = false,
    errorText,
    invalid,
    label,
    placeholder = "Write here...",
    readonly = false,
    value,
    ...rest
  },
  ref
) => {
  const textareaRef = useRef<HTMLIonTextareaElement>(null);

  const handleFocus = useCallback(() => {
    textareaRef.current?.setFocus();
  }, []);

  return (
    <div>
      <Note label={label} className="mb-1" />
      <IonTextarea
        {...rest}
        disabled={disabled}
        placeholder={placeholder}
        readonly={readonly}
        ref={mergeRefs([textareaRef, ref])}
        className={cn(
          `custom-textarea ${className} ${textareaVariants({
            color: errorText ? "error" : color,
            disabled,
          })}` 
        )}
      ></IonTextarea>
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

export const Textarea = forwardRef(TextareaInstance);
Textarea.displayName = "Textarea";
