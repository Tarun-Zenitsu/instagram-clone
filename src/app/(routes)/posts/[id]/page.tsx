import Comment from "@/app/components/Comment";
import SessionCommentForm from "@/app/components/SessionCommentForm";
import { prisma } from "@/app/components/db";
import React from "react";
import { uniq } from "lodash";

const SinglePostPage = async ({ params }: { params: { id: string } }) => {
  // Await `params` before accessing `params.id`
  const { id } = await params;

  // Fetch the post data
  const post = await prisma.post.findFirstOrThrow({
    where: {
      id: id, // Use the awaited `id`
    },
  });

  // Fetch the author's profile data
  const authorProfile = await prisma.profile.findFirstOrThrow({
    where: {
      email: post.author,
    },
  });

  const comments = await prisma.comment.findMany({
    where: {
      postId: post.id,
    },
  });

  const commentsAuthors = await prisma.profile.findMany({
    where: {
      email: { in: uniq(comments.map((c) => c.author)) },
    },
  });

  return (
    <div className="flex justify-center bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        {/* Post Image */}
        <div>
          <img
            src={post.image}
            alt="Post Image"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Author & Description */}
        <div className="mb-4">
          <Comment
            text={post.description}
            authorProfile={authorProfile}
            createdAt={post.createdAt}
          />
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="flex flex-col gap-4 my-auto">
                <Comment
                  text={comment.text}
                  authorProfile={commentsAuthors.find(
                    (a) => a.email === comment.author
                  )}
                  createdAt={comment.createdAt}
                />
              </div>
            ))}
          </div>
          <div className="pt-8 border-t mt-8 border-t-gray-300">
            <SessionCommentForm postId={post.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
