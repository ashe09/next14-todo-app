"use client";
import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button type="submit" variant="destructive" disabled className="relative w-16">
          <LoaderCircle className="animate-spin" />
          <span className="absolute overflow-hidden opacity-0">Deleting...</span>
        </Button>
      ) : (
        <Button type="submit" variant="destructive" className="w-16">
          Delete
        </Button>
      )}
    </>
  );
}
