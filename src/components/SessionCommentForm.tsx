import { auth } from "@/auth";
import React from "react";
import { prisma } from "./db";
import { Button, TextArea } from "@radix-ui/themes";
import Avatar from "./Avatar";
import { postComment } from "./actions";
import CommentForm from "./CommentForm";

const SessionCommentForm = async ({ postId }: { postId: string }) => {
  const session = await auth();
  const profile = await prisma.profile.findFirstOrThrow({
    where: {
      email: session?.user?.email as string,
    },
  });

  return <CommentForm avatar={profile.avatar || ""} postId={postId} />;
};

export default SessionCommentForm;
