"use client";

import { auth } from "@/auth";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { CloudUploadIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { prisma } from "./db";
import { updateProfile } from "./actions";
import { Profile } from "@prisma/client";

const SettingsForm = ({
  userEmail,
  profile,
}: {
  userEmail: string;
  profile: Profile;
}) => {
  return (
    <form
      action={async (data: FormData) => {
        await updateProfile(data, userEmail);
        redirect("/profile");
      }}
    >
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
        defaultValue={profile.username}
      />
      <p className="mt-2 font-bold">Name:</p>
      <TextField.Root
        name="name"
        placeholder="Jon Doe"
        defaultValue={profile.name as string}
      />

      <p className="mt-2 font-bold">Subtitle:</p>
      <TextField.Root
        name="subtitle"
        placeholder="Web Developer"
        defaultValue={profile.subtitle as string}
      />

      <p className="mt-2 font-bold">Bio:</p>
      <TextArea
        name="bio"
        placeholder="Tell us about yourself..."
        defaultValue={profile.bio as string}
      />

      <div className="mt-2 flex justify-center">
        <Button variant="solid" size="3">
          Update Details
        </Button>
      </div>
    </form>
  );
};

export default SettingsForm;
