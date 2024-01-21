import TweetWrapper from "../components/Tweets/TweetWrapper";
import Matrix from "../components/Matrix/Matrix";
import User from "../app/_types/User";

async function getTwitterProfile() {
  const userResponse = await fetch("http://localhost:3000/api", {
    next: { revalidate: 3600 },
  });

  if (!userResponse.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const res = await userResponse.json();
  const { data: user }: { data: User } = res;

  return user;
}

export default async function Home() {
  //const data = await getData();
  //const tweetsData: TweetType[] = data.articles;

  const user = await getTwitterProfile();

  //console.log(user);

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-between">
      <Matrix />
      <TweetWrapper userData={user} />
    </main>
  );
}
