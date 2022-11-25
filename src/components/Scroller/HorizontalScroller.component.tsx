import { cn } from "../../lib/cn";
import { Chip } from "../Chip";

export interface HorizontalScrollerProps {
  children: React.ReactNode[];
  className: string;
}

export const HorizontalScroller = ({children, className}: HorizontalScrollerProps) => {
  return (
    <div className={cn(`overflow-x-scroll overflow-y-hidden whitespace-nowrap ${className}`)}>
      {/* {children.map((child) => (
        <Chip 
           key={child.key}
           label={child.name}
        />
       )) */}
    </div>
  );
};
