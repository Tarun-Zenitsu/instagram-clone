import SettingsForm from "@/app/components/SettingsForm";
import { prisma } from "@/app/components/db";
import { auth, signOut } from "@/auth";
import { Button } from "@radix-ui/themes";
import React from "react";

const SettingsPage = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    return "not login";
  }
  const profile = await prisma.profile.findFirst({
    where: { email: session.user.email },
  });

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile Settings</h1>
      <p className="text-gray-500 text-sm text-center -mt-3">
        {session.user.email}
      </p>
      <SettingsForm profile={profile} />
      <div className="flex justify-center mt-4 pt-4 border-t border-gray-300">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit" variant="outline">
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
