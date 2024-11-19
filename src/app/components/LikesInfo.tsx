"use client";

import { Like, Post } from "@prisma/client";
import { HeartIcon } from "lucide-react";
import React, { useState } from "react";
import { likePost, removeLikeFromPost } from "./actions";
import { useRouter } from "next/navigation";

const LikesInfo = ({
  post,
  sessionLike,
}: {
  post: Post;
  sessionLike: Like;
}) => {
  const router = useRouter();
  const [likedByMe, setLikedByMe] = useState(!!sessionLike);
  return (
    <form
      action={async (data: FormData) => {
        setLikedByMe((prev) => !prev);
        if (likedByMe) {
          await removeLikeFromPost(data);
        } else {
          await likePost(data);
        }

        router.refresh();
      }}
    >
      <div className="flex items-center gap-2">
        <input type="hidden" name="postId" value={post.id} />
        <button type="submit">
          <HeartIcon
            className={likedByMe ? "text-red-500 fill-red-500" : " "}
          />
        </button>
        {post.likesCount} people like this.
      </div>
    </form>
  );
};

export default LikesInfo;
