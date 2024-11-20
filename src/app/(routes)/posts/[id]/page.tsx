import SinglePostContent from "@/app/components/SinglePostContent";
import { getSinglePostData } from "@/app/components/actions";

const SinglePostPage = async ({ params }: { params: { id: string } }) => {
  const id = await params.id;
  const { post, comments, authorProfile, commentsAuthors, myLike } =
    await getSinglePostData(id);
  return (
    <SinglePostContent
      post={post}
      authorProfile={authorProfile}
      comments={comments}
      commentsAuthors={commentsAuthors}
      myLike={myLike}
    />
  );
};

export default SinglePostPage;
