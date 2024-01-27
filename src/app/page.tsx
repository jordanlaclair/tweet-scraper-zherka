import TweetWrapper from "../components/Tweets/TweetWrapper";
import Matrix from "../components/Matrix/Matrix";
import User from "../app/_types/User";
import { getRandom } from "@/lib/utils";
import { ApiError } from "@the-convocation/twitter-scraper/dist/errors";
import TTweet from "./_types/Tweet";
import { Profile, Scraper } from "@the-convocation/twitter-scraper";
import constants from "../lib/constants";

async function getTwitterProfile() {
  const scraper = new Scraper({
    fetch: (input, init) => {
      // Transform input and init into your function's expected types...
      return fetch(input, { ...init, next: { revalidate: 259200 } }).then(
        (res) => {
          // Transform res into a web-compliant response...
          return res;
        }
      );
    },
  });

  let userData: Profile;
  let tweetsData: TTweet[] = [];

  try {
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
  } catch (error) {
    throw ApiError;
  }
}

export default async function Home() {
  let user = await getTwitterProfile();

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-between">
      <Matrix />
      <TweetWrapper user={user} />
    </main>
  );
}
