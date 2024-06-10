import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ModeToggle } from "@/app/components/themeToggle";

export default function Home() {
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
        <div className="relative z-0 w-full rounded-md bg-white px-5 py-10 drop-shadow-2xl dark:bg-slate-700 md:max-w-screen-sm">
          <form action="">
            <div className="flex items-center gap-x-2">
              <Input type="text" placeholder="ToDo" />
              <Button type="submit" className="">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
