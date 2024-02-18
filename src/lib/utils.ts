import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApiError } from "@the-convocation/twitter-scraper/dist/errors";
import User from "../app/_types/User";
import { Profile, Scraper } from "@the-convocation/twitter-scraper";
import TTweet from "../app/_types/Tweet";
import constants from "./constants";

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
  //console.log(result);
  return result;
}

export function parseTweetLength(tweet: string | undefined) {
  if (!tweet) return "";

  if (tweet.length > 250) return `${tweet.substring(0, 250)}...`;

  return tweet;
}

export function getUser(scraper: Scraper) {
  let userData: Profile;
  let tweetsData: TTweet[] = [];

  return scraper
    .getProfile(constants.USER)
    .then((user) => {
      userData = user;
      if (user.userId) return scraper.getTweetsByUserId(user.userId, 150);
    })
    .then(async (tweets) => {
      if (tweets) {
        for await (const tweet of tweets) {
          if (tweet) {
            let t: TTweet = tweet;
            tweetsData.push(t);
          }
        }
      }

      const user: User = {
        user: userData,
        tweets: tweetsData,
        shuffledTweets: [],
      };

      let shuffledTweets: User["shuffledTweets"] = getRandom(
        user.tweets,
        constants.MAXTWEETS
      );
      return { ...user, shuffledTweets };
    });
}

export function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
