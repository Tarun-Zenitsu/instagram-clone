import { signOut } from "@/auth";

export default async function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="bg-blue-500 text-white flex items-center justify-center px-4 rounded-lg p-2 text-xl font-semibold cursor-pointer"
      >
        Logout
      </button>
    </form>
  );
}
