"use client";

import { postEntry } from "@/app/components/actions";
import { Button, TextArea } from "@radix-ui/themes";
import { SendIcon, UploadCloudIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const CreatePage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (file) {
      const data = new FormData();
      data.set("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((res) => {
        res.json().then((url) => setImageUrl(url));
      });
    }
  }, [file]);
  return (
    <form
      action={async (data) => {
        const id = await postEntry(data);
        router.push(`/post/${id}`);
        router.refresh();
      }}
    >
      <input type="hidden" name="image" value={imageUrl} />
      <div className="flex flex-col gap-4 justify-center items-center">
        <div>
          <div className="w-64 p-2 min-h-64 rounded-lg bg-gray-400 relative">
            {imageUrl && (
              <img src={imageUrl} alt={imageUrl} className="rounded-md" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <input
                type="file"
                name=""
                ref={fileRef}
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <Button
                variant="surface"
                type="button"
                onClick={() => fileRef.current?.click()}
              >
                <UploadCloudIcon size={16} />
                Choose Image
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-64">
          <TextArea placeholder="Add photo description" name="description" />
        </div>
        <Button>
          <SendIcon size={16} />
          Publish
        </Button>
      </div>
      <div></div>
    </form>
  );
};

export default CreatePage;
