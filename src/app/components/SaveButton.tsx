"use client";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button type="submit" disabled className="sm:w-32">
          <LoaderCircle className="animate-spin" />
          <span className="absolute overflow-hidden opacity-0">Saving...</span>
        </Button>
      ) : (
        <Button type="submit" className="sm:w-32">
          Save changes
        </Button>
      )}
    </>
  );
}
