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
  id?: string;
  loading?: boolean;
  onClick?: () => void;
  prefix?: ReactNode;
  rounded?: boolean;
  routerDirection?: "back" | "forward" | "root";
  routerLink?: string;
  shadow?: boolean;
  size?: "small" | "default" | "large";
  style?: React.CSSProperties;
  suffix?: ReactNode;
  type?: "button" | "reset" | "submit";
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
    routerLink,
    routerDirection,
    iconOnly = false,
    id,
    loading = false,
    onClick,
    prefix,
    rounded = false,
    shadow = false,
    size = "default",
    suffix,
    style,
    type,
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
      id={id}
      href={href}
      onClick={onClick}
      size={size}
      routerLink={routerLink}
      routerDirection={routerDirection}
      style={{
        ...style,
        ...(rounded && { "--border-radius": "999px" }),
      }}
      type={type}
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