import React from "react";
import { prisma } from "./db";
import PostGrid from "./PostGrid";

const ProfilePosts = async ({ email }: { email: string }) => {
  const posts = await prisma.post.findMany({
    where: {
      author: email,
    },
  });
  return (
    <div>
      <PostGrid posts={posts} />
    </div>
  );
};

export default ProfilePosts;
