import { IonButton, IonSpinner } from "@ionic/react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export type ButtonVariant = ComponentPropsWithRef<typeof IonButton>["fill"];
type ButtonAlign = "center" | "space-between";

export type ButtonProps = {
  align?: ButtonAlign;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  prefix?: ReactNode;
  rounded?: boolean;
  shadow?: boolean;
  size?: "small" | "default" | "large";
  style?: React.CSSProperties;
  suffix?: ReactNode;
  variant?: ButtonVariant;
};

export type Ref = HTMLIonButtonElement;



export const Button = forwardRef<Ref, ButtonProps>((
  {
    align = "center",
    className,
    children,
    disabled = false,
    loading = false,
    prefix,
    rounded = false,
    shadow = false,
    size = "default",
    suffix,
    style,
    variant = "default",
    ...otherProps
  }, ref
) => {
  return(
    <IonButton
      {...otherProps}
      ref={ref}
      className={cn(`
          ${shadow && "btn-shadow"}
          ${loading && "btn-loading"}
          ${className}
        `)}
      expand="block"
      fill={variant}
      disabled={disabled || loading}
      size={size}
      style={{
        ...style,
        ...(rounded && { "--border-radius": "999px" }),
      }}
    >
      <div>
          {prefix && <span slot="start">{prefix}</span>}
          {children}
          {suffix && <span slot="end">{suffix}</span>}
        </div>
      {loading && (<IonSpinner name="bubbles" />)}
    </IonButton>
  )
});

Button.displayName = "Button";