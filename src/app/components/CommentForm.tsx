"use client";

import React from "react";
import Avatar from "./Avatar";
import { postComment } from "./actions";
import { Button, TextArea } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const CommentForm = ({
  avatar,
  postId,
}: {
  avatar: string;
  postId: string;
}) => {
  const router = useRouter();
  return (
    <form
      action={async (data) => {
        await postComment(data);
        router.refresh();
      }}
      className=""
    >
      <input type="hidden" value={postId} name="postId" />
      <div className="flex gap-2">
        <div>
          <Avatar src={avatar} />
        </div>
        <div className="w-full flex flex-col gap-3">
          <TextArea
            placeholder="Tell the world what you think..."
            name="text"
          />
          <div className="text-end">
            <Button>Post comment</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
