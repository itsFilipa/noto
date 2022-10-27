import React, { cloneElement, createElement } from "react";
import { cn } from "../../lib/cn";
import { styled } from "classname-variants/react";

export type IconProps = {
  className?: string;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "dark" | "white";
  icon: JSX.Element;
};

export const Icon = ({
  className,
  size = "medium",
  color = "primary",
  icon,
}: IconProps) => {
  const cloneProps = cn(
    `${size && `w-${size} h-${size}`} ${color && `text-${color}`} ${className}`
  );
  console.log(cloneProps);

  // const clonedElement = cloneElement(icon, { className: cloneProps });

  const clonedElement = cloneElement(icon, {size:size, color:color}, null);

  const newElement = createElement(CustomIcon, {size, color}, null);

  return cloneElement;
};

export const CustomIcon = styled("svg", {
  base: "w-6 h-6 text-white",
  variants: {
    color: {
      primary: "text-indigo-500",
      secondary: "text-neutral-400",
      dark: "text-warmblack",
      white: "text-white",
    },
    size: {
      small: "w-4 h-4",
      medium: "w-6 h-6",
      large: "w-8 h-8",
    }
  }
})

// function CustomComponent({
//   className,
//   size,
//   color,
//   icon,
//   ...props
// }: IconProps) {
//   return <div {...props}>{icon}</div>;
// }

// export const Icon = styled(CustomComponent, {
//   base: "w-6 h-6 text-white",
//   variants: {
//     color: {
//       primary: "text-indigo-500",
//       secondary: "text-neutral-400",
//       dark: "text-warmblack",
//       white: "text-white",
//     },
//     size: {
//       small: "w-4 h-4",
//       medium: "w-6 h-6",
//       large: "w-8 h-8",
//     }
//   }
// })

