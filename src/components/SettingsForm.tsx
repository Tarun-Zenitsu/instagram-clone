"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import { CloudUploadIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { updateProfile } from "./actions";
import { Profile } from "@prisma/client";

const SettingsForm = ({ profile }: { profile: Profile | null }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar);
  useEffect(() => {
    if (file) {
      const data = new FormData();
      data.set("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((res) => {
        res.json().then((url) => setAvatarUrl(url));
      });
    }
  }, [file]);
  return (
    <form
      action={async (data: FormData) => {
        await updateProfile(data);
        redirect("/profile");
      }}
    >
      <input type="hidden" name="avatar" value={avatarUrl as string} />
      <div className="flex gap-8 items-center">
        <div className="bg-gray-500 rounded-full aspect-square">
          <img
            src={avatarUrl as string}
            alt={avatarUrl as string}
            className="size-24 rounded-full overflow-hidden shadow-md border-gray-400"
          />
        </div>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
          <Button
            variant="surface"
            size="4"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudUploadIcon />
            Change Avatar
          </Button>
        </div>
      </div>
      <p className="mt-2 font-bold">Username:</p>
      <TextField.Root
        name="username"
        placeholder="your_username"
        defaultValue={profile?.username}
      />
      <p className="mt-2 font-bold">Name:</p>
      <TextField.Root
        name="name"
        placeholder="Jon Doe"
        defaultValue={profile?.name || ""}
      />

      <p className="mt-2 font-bold">Subtitle:</p>
      <TextField.Root
        name="subtitle"
        placeholder="Web Developer"
        defaultValue={profile?.subtitle || ""}
      />

      <p className="mt-2 font-bold">Bio:</p>
      <TextArea
        name="bio"
        placeholder="Tell us about yourself..."
        defaultValue={profile?.bio || ""}
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
