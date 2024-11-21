import { prisma } from "@/components/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import { ProfilePageContent } from "@/components/ProfilePageContent";

const ProfilePage = async () => {
  const session = await auth();
  const profile = await prisma.profile.findFirst({
    where: {
      email: session?.user?.email as string,
    },
  });
  if (!profile) {
    return redirect("/settings");
  }
  return (
    <ProfilePageContent
      profile={profile}
      isOurProfile={true}
      ourFollow={null}
    />
  );
};

export default ProfilePage;
