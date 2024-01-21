import TweetWrapper from "../components/Tweets/TweetWrapper";
import Matrix from "../components/Matrix/Matrix";
import { Profile, Scraper, Tweet } from "@the-convocation/twitter-scraper";
import User from "../app/_types/User";
import { ApiError } from "@the-convocation/twitter-scraper/dist/errors";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getTwitterProfile() {
  const scraper = new Scraper();

  let userData: Profile;
  let tweetsData: Tweet[] = [];
  const test = await fetch("http://localhost:3000/api", {
    next: { revalidate: 3600 },
  });

  console.log(await test.json());

  // try {
  //   return scraper
  //     .getProfile("zherkaofficial")
  //     .then((user) => {
  //       userData = user;
  //       if (user.userId) return scraper.getTweetsByUserId(user.userId, 5);
  //     })
  //     .then(async (tweets) => {
  //       if (tweets) {
  //         for await (const tweet of tweets) {
  //           if (tweet) tweetsData.push(tweet);
  //         }
  //       }

  //       const final: User = {
  //         user: userData,
  //         tweets: tweetsData,
  //       };

  //       return final;
  //     })
  //     .then((data) => {
  //       //console.log(data);
  //       return data;
  //     });
  // } catch (error) {
  //   throw ApiError;
  // }
}

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
  //const data = await getData();
  //const tweetsData: TweetType[] = data.articles;

  const user = await getTwitterProfile();

  console.log(user);

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-between">
      <Matrix />
      {/* <TweetWrapper userData={user} /> */}
    </main>
  );
}
