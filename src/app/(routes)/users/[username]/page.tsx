import { ProfilePageContent } from "@/components/ProfilePageContent";
import { prisma } from "@/components/db";

const UserProfilePage = async ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const profile = await prisma.profile.findFirstOrThrow({
    where: {
      username,
    },
  });
  return <ProfilePageContent profile={profile} />;
};

export default UserProfilePage;
