"use server";

import { auth } from "@/auth";
import { prisma } from "./db";
import { uniq } from "lodash";

export async function getSessionEmail(): Promise<string | null | undefined> {
  const session = await auth();
  return session?.user?.email;
}

export async function getSessionEmailOrThrow(): Promise<string> {
  const userEmail = await getSessionEmail();
  if (!userEmail) {
    throw "not logged in";
  }
  return userEmail;
}

export async function updateProfile(data: FormData) {
  const userEmail = await getSessionEmailOrThrow();
  const newUserInfo = {
    username: data.get("username") as string,
    name: data.get("name") as string,
    subtitle: data.get("subtitle") as string,
    bio: data.get("bio") as string,
    avatar: data.get("avatar") as string,
  };
  await prisma.profile.upsert({
    where: {
      email: userEmail,
    },
    update: newUserInfo,
    create: {
      email: userEmail,
      ...newUserInfo,
    },
  });
}

export async function postEntry(data: FormData) {
  const sessionEmail = await getSessionEmailOrThrow();
  const postDoc = await prisma.post.create({
    data: {
      author: sessionEmail,
      image: data.get("image") as string,
      description: (data.get("description") as string) || "",
    },
  });
  return postDoc.id;
}

export async function postComment(data: FormData) {
  const authorEmail = await getSessionEmailOrThrow();
  return prisma.comment.create({
    data: {
      author: authorEmail,
      text: data.get("text") as string,
      postId: data.get("postId") as string,
    },
  });
}

async function updatePostLikesCount(postId: string) {
  await prisma.post.update({
    where: { id: postId },
    data: {
      likesCount: await prisma.like.count({ where: { postId } }),
    },
  });
}

export async function likePost(data: FormData) {
  const postId = data.get("postId") as string;
  await prisma.like.create({
    data: {
      author: await getSessionEmailOrThrow(),
      postId,
    },
  });
  await updatePostLikesCount(postId);
}

export async function removeLikeFromPost(data: FormData) {
  const postId = data.get("postId") as string;
  await prisma.like.deleteMany({
    where: {
      postId,
      author: await getSessionEmailOrThrow(),
    },
  });
  await updatePostLikesCount(postId);
}

export async function getSinglePostData(postId: string) {
  const post = await prisma.post.findFirstOrThrow({
    where: {
      id: postId,
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

  return {
    post,
    comments,
    authorProfile,
    commentsAuthors,
    myLike,
  };
}
