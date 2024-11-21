import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";

const PostGrid = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {posts.map((post) => (
        <Link
          href={`/posts/${post.id}`}
          key={post.id}
          className="break-inside-avoid block overflow-hidden rounded-lg shadow-sm"
        >
          <img
            src={post.image}
            alt={post.description || "Post image"}
            className="w-full h-auto rounded-lg"
          />
        </Link>
      ))}
    </div>
  );
};

export default PostGrid;
