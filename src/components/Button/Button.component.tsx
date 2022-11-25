import { IonButton, IonSpinner } from "@ionic/react";
import type { ComponentProps, ComponentPropsWithRef, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";

export type ButtonVariant = ComponentPropsWithRef<typeof IonButton>["fill"];
type ButtonAlign = "align-center" | "align-sb" | "align-start-sb";
type ButtonProps = ComponentProps<typeof IonButton>;

export type ButtonCustomProps = Omit<ButtonProps, "prefix" | "suffix"> & {
  align?: ButtonAlign;
  children?: ReactNode;
  iconOnly?: boolean;
  loading?: boolean;
  prefix?: ReactNode;
  rounded?: boolean;
  shadow?: boolean;
  size?: "small" | "default" | "large";
  suffix?: ReactNode;
  type?: "button" | "reset" | "submit";
  variant?: ButtonVariant;
};

export type Ref = HTMLIonButtonElement;



export const Button = forwardRef<Ref, ButtonCustomProps>((
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