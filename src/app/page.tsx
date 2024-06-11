import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { DeleteButton } from "@/app/components/DeleteButton";
import { FormElement } from "@/app/components/FormElement";
import { SaveButton } from "@/app/components/SaveButton";
import { ModeToggle } from "@/app/components/ThemeToggle";
import { deleteTodo, editTodo } from "@/app/utils/action";
import prisma from "@/lib/db";

async function getTodo() {
  const todoData = await prisma.todo.findMany({
    select: {
      input: true,
      id: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  return todoData;
}

export default async function Home() {
  const todoData = await getTodo();

  return (
    <main className="h-dvh w-full px-6 py-10 md:p-10">
      <div className="fixed right-8 top-8 z-0">
        <ModeToggle />
      </div>
      <div className="grid h-full place-items-center">
        <Image
          src="/images/background_light.png"
          alt=""
          fill
          className="fixed left-0 top-0 -z-10 h-full w-full object-cover dark:hidden"
        />
        <Image
          src="/images/background_dark.jpg"
          alt=""
          fill
          className="fixed left-0 top-0 -z-10 hidden h-full w-full object-cover dark:block"
        />
        <div className="relative z-0 w-full max-w-full overflow-hidden rounded-md bg-white px-5 py-10 drop-shadow-2xl dark:bg-slate-700 dark:drop-shadow-2xl-white md:max-w-screen-sm">
          <FormElement />
          <ul className="prose mt-5 list-disc dark:text-gray-300">
            {todoData.map((todo, index) => (
              <li key={index} className="flex items-center gap-x-2 py-2">
                <span className="w-4/5 overflow-x-scroll px-2 sm:overflow-x-auto">{todo.input}</span>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    {
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      <form id="form" action={editTodo}>
                        <DialogHeader>
                          <DialogTitle>Edit ToDo Item</DialogTitle>
                        </DialogHeader>
                        <input type="hidden" name="inputId" value={todo.id} />
                        <Input name="input" defaultValue={todo.input} className="mt-7 w-full" />
                        <DialogFooter className="mt-5 sm:justify-center">
                          <SaveButton />
                        </DialogFooter>
                      </form>
                    }
                  </DialogContent>
                </Dialog>
                {
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  <form action={deleteTodo}>
                    <input type="hidden" name="inputId" value={todo.id} />
                    <DeleteButton />
                  </form>
                }
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
