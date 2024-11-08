import { prisma } from "@/app/components/db";
import { auth } from "@/auth";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { CloudUploadIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

async function handleProfileUpdate(data: FormData) {
  "use server";

  const session = await auth();

  await prisma.profile.upsert({
    where: {
      email: session?.user?.email || "",
    },
    update: {
      username: data.get("username") as string,
      name: data.get("name") as string,
      subtitle: data.get("subtitle") as string,
      bio: data.get("bio") as string,
    },
    create: {
      email: session?.user?.email || "",
      username: data.get("username") as string,
      name: data.get("name") as string,
      subtitle: data.get("subtitle") as string,
      bio: data.get("bio") as string,
    },
  });

  redirect("/profile");
}

const SettingsPage = async () => {
  const session = await auth();

  const profile = prisma.profile.findFirstOrThrow({
    where: {
      email: session?.user?.email || "",
    },
  });

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile Settings</h1>
      <form action={handleProfileUpdate}>
        <div className="flex gap-8 items-center">
          <div className="bg-gray-500 size-24 rounded-full" />
          <div>
            <Button variant="surface" size="4">
              <CloudUploadIcon />
              Change Avatar
            </Button>
          </div>
        </div>
        <p className="mt-2 font-bold">Username:</p>
        <TextField.Root
          name="username"
          placeholder="your_username"
          defaultValue={(await profile).username}
        />
        <p className="mt-2 font-bold">Name:</p>
        <TextField.Root
          name="name"
          placeholder="Jon Doe"
          defaultValue={(await profile).name as string}
        />

        <p className="mt-2 font-bold">Subtitle:</p>
        <TextField.Root
          name="subtitle"
          placeholder="Web Developer"
          defaultValue={(await profile).subtitle as string}
        />

        <p className="mt-2 font-bold">Bio:</p>
        <TextArea
          name="bio"
          placeholder="Tell us about yourself..."
          defaultValue={(await profile).bio as string}
        />

        <div className="mt-2 flex justify-center">
          <Button variant="solid" size="3">
            Update Details
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
