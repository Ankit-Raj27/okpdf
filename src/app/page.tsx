import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
// import { Button } from "@radix-ui/themes";
import { BaseButton } from "@radix-ui/themes/src/components/base-button.jsx";
import { LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="text-5xl mr-3 font-semibold">Chat with any PDF!</h1>
            <UserButton afterSwitchSessionUrl="/" />
          </div>

          <div className="flex mt-2">
            {isAuth && <Button>Go to chats!</Button>}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Join millions of students, researchers and professionals to
            instantly answer questions and research with AI.
          </p>
          <div className="w-full mt-4">
            {isAuth ? (
              
                <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
