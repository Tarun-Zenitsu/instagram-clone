import { Button, TextArea, TextField } from "@radix-ui/themes";
import { CloudUploadIcon } from "lucide-react";
import React from "react";

const SettingsPage = () => {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile Settings</h1>
      <form action="">
        <div className="flex gap-8 items-center">
          <div className="bg-gray-500 size-24 rounded-full" />
          <div>
            <Button variant="surface" size={"4"}>
              <CloudUploadIcon />
              change avatar
            </Button>
          </div>
        </div>
        <p className="mt-2 font-bold">username:</p>
        <TextField.Root placeholder="your_username" />
        <p className="mt-2 font-bold">name:</p>
        <TextField.Root placeholder="Jon Deo" />
        <p className="mt-2 font-bold">subtitle:</p>
        <TextField.Root placeholder="Web devloper" />
        <p className="mt-2 font-bold">bio:</p>
        <TextArea />
        <div className="mt-2 flex justify-center">
          <Button variant="solid" size={"3"}>
            Update Details
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
