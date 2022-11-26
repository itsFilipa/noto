import { IonInput } from "@ionic/react";
import {
  ComponentPropsWithoutRef,
  ForwardRefRenderFunction,
  forwardRef,
  useRef,
} from "react";
import { mergeRefs } from "react-merge-refs";

export type FullPageInputProps = ComponentPropsWithoutRef<typeof IonInput>;

type Ref = HTMLIonInputElement;

export const FullPageInputInstance: ForwardRefRenderFunction<
  Ref,
  FullPageInputProps
> = ({ ...rest }, ref) => {
  const inputRef = useRef<HTMLIonInputElement>(null);

  return <IonInput className="full-page" {...rest} ref={mergeRefs([inputRef, ref])} />;
};

export const FullPageInput = forwardRef(FullPageInputInstance);
FullPageInput.displayName = "FullPageInput";
