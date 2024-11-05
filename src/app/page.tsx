import Image from "next/image";
import SignIn from "./components/sign-in";
import { auth } from "@/auth";
import SignOut from "./components/sign-out";

export default async function Home() {
  const session = await auth();
  return (
    <main className="">
      hi there
      <br />
      {session && (
        <div className="flex items-center justify-center cursor-pointer">
          <SignOut />
        </div>
      )}
      {!session && (
        <div className="flex items-center justify-center cursor-pointer">
          <SignIn />
        </div>
      )}
    </main>
  );
}
