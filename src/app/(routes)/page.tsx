import SignIn from "../../components/sign-in";
import { auth } from "@/auth";
import SignOut from "../../components/sign-out";
import HomeTopRow from "@/components/HomeTopRow";
import UserHome from "@/components/UserHome";

export default async function Home() {
  const session = await auth();
  return (
    <main className="">
      {session && <UserHome session={session} />}
      {!session && (
        <div className="flex items-center justify-center cursor-pointer">
          <SignIn />
        </div>
      )}
    </main>
  );
}
