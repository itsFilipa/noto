import React, {cloneElement } from "react";
import { cn } from "../../lib/cn";

export type IconProps = {
  className?: string;
  size?: number;
  color?: string;
  icon: JSX.Element;
};

export const Icon = ({
  className,
  size = 6,
  color = "white",
  icon,
}: IconProps) => {
  const cloneProps = cn(
    `${size && `w-${size} h-${size}`} ${color && `text-${color}`} ${className}`
  );
  console.log(cloneProps);

  const clonedElement = cloneElement(icon, { className: cloneProps });

  return clonedElement;
};
