import Comment from "@/app/components/Comment";
import SessionCommentForm from "@/app/components/SessionCommentForm";
import { prisma } from "@/app/components/db";
import React from "react";
import { uniq } from "lodash";
import { BookmarkIcon, HeartIcon } from "lucide-react";
import LikesInfo from "@/app/components/LikesInfo";
import { getSessionEmailOrThrow } from "@/app/components/actions";

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

  const myLike = await prisma.like.findFirst({
    where: {
      author: await getSessionEmailOrThrow(),
      postId: post.id,
    },
  });

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {/* Post Image */}
        <div className="">
          <img
            src={post.image}
            alt="Post Image"
            className="w-full h-auto rounded-lg shadow-md max-h-[85vh]"
          />
          <div className="flex text-gray-700 items-center mt-3 justify-between ">
            <LikesInfo post={post} sessionLike={myLike} />
            <div>
              <BookmarkIcon />
            </div>
          </div>
        </div>

        {/* Author & Description */}
        <div className="md:relative max-h-[80vh] overflow-hidden">
          {/* Scrollable Area */}
          <div className="overflow-y-auto h-full pb-52">
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
          </div>

          {/* Fixed Comment Form */}
          <div className="md:absolute bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4">
            <SessionCommentForm postId={post.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
