import TweetWrapper from "../components/Tweets/TweetWrapper";
import Matrix from "../components/Matrix/Matrix";
import User from "../app/_types/User";
import { getRandom } from "@/lib/utils";

async function getTwitterProfile() {
  let link = "";
  if (process.env.NEXT_PUBLIC_VERCEL_ENV == "development") {
    link = `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;
  } else {
    link = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;
  }

  const userResponse = await fetch(link, {
    //1 week of cache
    next: { revalidate: 604800, tags: ["user"] },
  });

  if (!userResponse.ok) {
    throw new Error("Failed to fetch data");
  }

  const res = await userResponse.json();
  let { data: user }: { data: User } = res;

  return user;
}

export default async function Home() {
  let globalUser = await getTwitterProfile();

  let shuffledTweets: User["tweets"] = getRandom(globalUser.tweets, 10);
  let shuffledUser = { ...globalUser, tweets: shuffledTweets };
  //console.log(shuffledUser);

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-between">
      <Matrix />
      <TweetWrapper allUserData={globalUser} shuffledUserData={shuffledUser} />
    </main>
  );
}
