import { signIn } from "@/auth";

export default async function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="bg-blue-500 text-white flex items-center justify-center px-4 rounded-lg p-2 text-xl font-semibold"
      >
        Signin with Google
      </button>
    </form>
  );
}
