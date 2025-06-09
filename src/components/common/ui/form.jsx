"use client";

import React, { useContext, useId } from "react";
import {
  Controller,
  FormProvider as RHFormProvider,
  useFormContext,
} from "react-hook-form";
import { Slot } from "@radix-ui/react-slot";
import { Label } from "@/components/common/ui/label";
import { cn } from "@/lib/utils";

// Contexts
const FormFieldContext = React.createContext(null);
const FormItemContext = React.createContext(null);

// Form Provider
export const Form = RHFormProvider;

// FormField
export const FormField = ({ name, ...props }) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller name={name} {...props} />
    </FormFieldContext.Provider>
  );
};

// Hook to access form field
export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext)
    throw new Error("FormField must be used within a FormFieldContext");

  const fieldState = getFieldState(fieldContext.name, formState);
  const id = itemContext?.id || fieldContext.name;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-item`,
    formDescriptionId: `${id}-description`,
    formMessageId: `${id}-message`,
    ...fieldState,
  };
};

// FormItem
export const FormItem = ({ className, ...props }) => {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("flex flex-col gap-2.5", className)} {...props} />
    </FormItemContext.Provider>
  );
};

// FormLabel
export const FormLabel = ({ className, ...props }) => {
  const { formItemId } = useFormField();

  return (
    <Label
      htmlFor={formItemId}
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
};

// FormControl
export const FormControl = (props) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
      }
      aria-invalid={!!error}
      {...props}
    />
  );
};

// FormDescription
export const FormDescription = ({ className, ...props }) => {
  const { formDescriptionId, error } = useFormField();
  if (error) return null;

  return (
    <p
      id={formDescriptionId}
      className={cn("text-xs text-muted", className)}
      {...props}
    />
  );
};

// FormMessage
export const FormMessage = ({ className, children, ...props }) => {
  const { error, formMessageId } = useFormField();
  const content = error?.message || children;

  if (!content) return null;

  return (
    <p
      id={formMessageId}
      className={cn("text-xs text-red-500", className)}
      {...props}
    >
      {content}
    </p>
  );
};
