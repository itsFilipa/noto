import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactNode } from "react";
import type {
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  SubmitErrorHandler,
} from "react-hook-form";
import { useForm } from "react-hook-form";
import type { ZodType, ZodTypeDef } from "zod";

interface FormProps<
  TFormValues extends Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >
> {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  onError?: SubmitErrorHandler<TFormValues>;
  children?: (methods: UseFormReturn<TFormValues>) => ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  schema?: Schema;
}

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >
>({
  onSubmit,
  onError,
  children,
  className,
  options,
  id,
  schema,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    mode: "onSubmit",
    shouldFocusError: true,
    resolver: schema && zodResolver(schema),
    ...options,
  });
  return (
    <form
      id={id}
      className={className}
      onSubmit={methods.handleSubmit(onSubmit, onError)}
    >
      <div className="col space-y-3">{children?.(methods)}</div>
      <button aria-hidden="true" className="hidden" type="submit" />
    </form>
  );
};
