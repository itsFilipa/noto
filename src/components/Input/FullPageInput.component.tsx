import { IonTextarea } from "@ionic/react";
import {
  ComponentPropsWithoutRef,
  ForwardRefRenderFunction,
  forwardRef,
  useRef,
} from "react";
import { mergeRefs } from "react-merge-refs";

export type FullPageInputProps = ComponentPropsWithoutRef<typeof IonTextarea>;

type Ref = HTMLIonTextareaElement;

export const FullPageInputInstance: ForwardRefRenderFunction<
  Ref,
  FullPageInputProps
> = ({ ...rest }, ref) => {
  const inputRef = useRef<HTMLIonTextareaElement>(null);

  return <IonTextarea {...rest} ref={mergeRefs([inputRef, ref])} />;
};

export const FullPageInput = forwardRef(FullPageInputInstance);
FullPageInput.displayName = "FullPageInput";
