import React from "react";
import Comment from "./Comment";
import SessionCommentForm from "./SessionCommentForm";
import LikesInfo from "./LikesInfo";
import { BookmarkIcon } from "lucide-react";
import { Like, Post, Profile, comment } from "@prisma/client";

const SinglePostContent = async ({
  post,
  authorProfile,
  comments,
  commentsAuthors,
  myLike,
}: {
  post: Post;
  authorProfile: Profile;
  comments: comment[];
  commentsAuthors: Profile[];
  myLike: Like | null;
}) => {
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

export default SinglePostContent;
