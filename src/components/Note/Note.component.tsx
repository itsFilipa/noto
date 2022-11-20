import { cn } from "../../lib/cn";

import React, { cloneElement } from "react";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { variantProps, VariantPropsOf } from "classname-variants/react";

const noteProps = variantProps({
  base: "flex justify-start items-center",
  variants: {
    size: {
      small: "text-xs [&>div:first-child]:mt-[2px]",
      default: "text-sm [&>div:first-child]:mt-[0.35px]",
      large: "text-base [&>div:first-child]:mt-[0.5px]",
    },
    color: {
      default: "text-gray-500",
      primary: "text-indigo-500",
      error: "text-error",
      warning: "text-warning",
      success: "text-success",
    },
  },
  defaultVariants: {
    size: "default",
    color: "default",
  },
});

interface NoteVariantProps
  extends Omit<VariantPropsOf<typeof noteProps>, "label"> {
  label?: string | boolean;
  icon?: JSX.Element;
  children?: ReactNode;
}

export type NoteProps = NoteVariantProps & ComponentPropsWithoutRef<"div">;

export const Note = ({
  label,
  children,
  icon,
  size,
  ...otherProps
}: NoteProps) => {
  return (
    <div
      {...noteProps({
        ...otherProps,
        size,
      })}
    >
      <div>
        {icon && cloneElement(icon, { className: "h-4 w-4 text-error" }, null)}
      </div>
      <div className={cn(`${icon ? "ml-2" : ""} items-center break-words`)}>
        {label && <span className="mr-1 font-medium">{label}</span>}
        {children}
      </div>
    </div>
  );
};
