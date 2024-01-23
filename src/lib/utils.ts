import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApiError } from "@the-convocation/twitter-scraper/dist/errors";
import User from "../app/_types/User";
import { Profile, Scraper } from "@the-convocation/twitter-scraper";
import TTweet from "../app/_types/Tweet";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandom(arr: Array<any>, n: number) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  console.log(result);
  return result;
}

export function parseTweetLength(tweet: string | undefined) {
  if (!tweet) return "";

  if (tweet.length > 250) return `${tweet.substring(0, 250)}...`;

  return tweet;
}

async function fetchBlurredImages(link: string) {
  const url = link;

  let x = "";
  if (process.env.NEXT_PUBLIC_VERCEL_ENV == "development") {
    x = `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/tweetMedia/api?imageUrl=${url}`;
  } else {
    x = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/tweetMedia/api?imageUrl=${url}`;
  }

  const res = await fetch(x);
  const { data }: { data: string } = await res.json();
  return data;
}

export async function fetchTweets() {
  const scraper = new Scraper();

  let userData: Profile;
  let tweetsData: TTweet[] = [];

  try {
    return scraper
      .getProfile("zherkaofficial")
      .then((user) => {
        userData = user;
        if (user.userId) return scraper.getTweetsByUserId(user.userId, 100);
      })
      .then(async (tweets) => {
        if (tweets) {
          for await (const tweet of tweets) {
            if (tweet) {
              let t: TTweet = tweet;
              if (tweet.videos && tweet.videos.length > 0) {
                const blurredMedia = await fetchBlurredImages(
                  tweet.videos[0].preview
                );
                t = { ...tweet, blurredMedia };
              }

              if (tweet.photos && tweet.photos.length > 0) {
                const blurredMedia = await fetchBlurredImages(
                  tweet.photos[0].url
                );
                t = { ...tweet, blurredMedia };
              }
              tweetsData.push(t);
            }
          }
        }

        const user: User = {
          user: userData,
          tweets: tweetsData,
        };
        return user;
      })
      .then((user) => {
        return Response.json(
          { data: user },
          {
            status: 200,
          }
        );
      });
  } catch (error) {
    throw ApiError;
  }
}
