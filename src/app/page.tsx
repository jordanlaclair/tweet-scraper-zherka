import Image from "next/image";
import { cookies } from "next/headers";
import TweetWrapper from "./TweetWrapper";
import TweetType from "./_types/Tweet";

async function getData() {
  const res = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=1871f253a7524cce8c65a68960f516b5&pageSize=3&page=3",
    { next: { revalidate: 3600 } }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  const tweetsData: TweetType[] = data.articles;
  console.log(tweetsData);

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-between">
      <TweetWrapper tweetsData={tweetsData} />
    </main>
  );
}
