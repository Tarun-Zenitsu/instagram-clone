import PostGrid from "@/app/components/PostGrid";
import ProfilePosts from "@/app/components/ProfilePost";
import { prisma } from "@/app/components/db";
import { auth } from "@/auth";
import { CheckIcon, ChevronLeft, Settings } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

const ProfilePage = async () => {
  const session = await auth();
  const profile = await prisma.profile.findFirstOrThrow({
    where: {
      email: session?.user?.email || "",
    },
  });
  return (
    <main>
      <section className="flex justify-between items-center">
        <Link href="/">
          <ChevronLeft />
        </Link>
        <div className="font-bold flex items-center gap-1">
          {profile.username}
          <div className="size-5 rounded-full bg-ig-red inline-flex justify-center items-center text-white">
            <CheckIcon size={16} />
          </div>
        </div>
        <Link href="/settings">
          <Settings />
        </Link>
      </section>
      <section className="mt-7 flex justify-center">
        <div className="size-48 p-2 bg-gradient-to-tr from-ig-orange to-ig-red rounded-full">
          <div className="size-44 p-2 bg-white rounded-full">
            <div className="size-40 aspect-square overflow-hidden rounded-full">
              <img src={profile.avatar as string} alt={profile.username} />
            </div>
          </div>
        </div>
      </section>
      <section className="text-center">
        <h1 className="text-xl font-bold">{profile.name}</h1>
        <p className="text-gray-500 my-1">{profile.subtitle}</p>
        <p>
          {profile.bio} <br />
          contact: {profile.email}
        </p>
      </section>
      <section>
        <div className="mt-2 flex justify-center gap-2 font-bold">
          <Link href="/posts"> post</Link>
          <Link href="/posts" className="text-gray-500">
            {" "}
            higling
          </Link>
        </div>
        <section className="mt-4">
          <Suspense fallback="Loading....">
            <ProfilePosts email={profile.email} />
          </Suspense>
        </section>
      </section>
    </main>
  );
};

export default ProfilePage;
