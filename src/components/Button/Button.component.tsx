import { IonButton, IonSpinner } from "@ionic/react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export type ButtonVariant = ComponentPropsWithRef<typeof IonButton>["fill"];
type ButtonAlign = "align-center" | "align-sb" | "align-start-sb";

export type ButtonProps = {
  align?: ButtonAlign;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  iconOnly?: boolean;
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
    align = "align-center",
    className,
    children,
    disabled = false,
    href,
    iconOnly = false,
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
          ${align && `${align}`}
          ${iconOnly && "btn-icon-only"}
          ${className}
        `)}
      expand="block"
      fill={variant}
      disabled={disabled || loading}
      href={href}
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
      {loading && (<IonSpinner name="crescent" />)}
    </IonButton>
  )
});

Button.displayName = "Button";