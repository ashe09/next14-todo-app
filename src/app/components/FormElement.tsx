"use client";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createTodo } from "@/app/utils/action";

export function FormElement() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(createTodo, null);

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <>
        {pending ? (
          <Button type="submit" disabled className="w-20">
            <LoaderCircle className="animate-spin" />
            <span className="absolute overflow-hidden opacity-0">Submitting...</span>
          </Button>
        ) : (
          <Button type="submit" className="w-20">
            Submit
          </Button>
        )}
      </>
    );
  }

  return (
    <>
      {
        <form
          action={(formData: FormData) => {
            formAction(formData);
            formRef.current?.reset();
          }}
          ref={formRef}
        >
          <div className="flex items-center gap-x-2">
            <Input type="text" name="input" placeholder="ToDo" />
            <SubmitButton />
          </div>
          <p className="mt-2 text-red-700">{state as string}</p>
        </form>
      }
    </>
  );
}
