"use server";

import { prisma } from "./db";

// import { auth } from "@/auth";
// import { prisma } from "./db";

// export async function getSessionEmail(): Promise<string | null | undefined> {
//   const session = await auth();
//   return session?.user?.email;
// }

// export async function getSessionEmailOrThrow(): Promise<string> {
//   const userEmail = await getSessionEmail();
//   if (!userEmail) {
//     throw "not logged in";
//   }
//   return userEmail;
// }

export async function updateProfile(data: FormData, userEmail: string) {
  //   const userEmail = await getSessionEmailOrThrow();
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
