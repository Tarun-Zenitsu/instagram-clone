import Modal from "@/components/Modal";
import SinglePostContent from "@/components/SinglePostContent";
import { getSinglePostData } from "@/components/actions";
import React from "react";

const PostInModal = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const { post, comments, authorProfile, commentsAuthors, myLike } =
    await getSinglePostData(id);

  return (
    <Modal>
      <SinglePostContent
        post={post}
        authorProfile={authorProfile}
        comments={comments}
        commentsAuthors={commentsAuthors}
        myLike={myLike}
      />
    </Modal>
  );
};

export default PostInModal;
