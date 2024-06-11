"use server";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/db";

type Todo = {
  id?: string;
  input: string;
};

export async function createTodo(prevState: unknown, formData: FormData) {
  "use server";
  const input = formData.get("input") as string | null;

  try {
    if (input) {
      const todo: Todo = { input };
      await prisma.todo.create({
        data: todo
      });
    } else {
      return "Input is null.";
    }
  } catch (error) {
    console.error("Failed to Create todo", error);
    return "Failed to Create todo.";
  }

  revalidatePath("/");
}

export async function editTodo(formData: FormData) {
  "use server";
  const input = formData.get("input") as string | null;
  const inputId = formData.get("inputId") as string | null;

  try {
    if (input && inputId) {
      const todo: Todo = { id: inputId, input };
      await prisma.todo.update({
        where: {
          id: inputId
        },
        data: todo
      });
    } else {
      throw new Error("Input is null. Please enter your ToDo.");
    }
  } catch (error) {
    console.error("Failed to Edit todo", error);
  }
  revalidatePath("/");
}

export async function deleteTodo(formData: FormData) {
  "use server";

  const inputId = formData.get("inputId") as string;

  try {
    await prisma.todo.delete({
      where: {
        id: inputId
      }
    });
  } catch (error) {
    console.error("Failed to Delete todo");
  }
  revalidatePath("/");
}
