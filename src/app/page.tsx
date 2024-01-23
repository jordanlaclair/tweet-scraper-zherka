import TweetWrapper from "../components/Tweets/TweetWrapper";
import Matrix from "../components/Matrix/Matrix";
import User from "../app/_types/User";
import { getRandom } from "@/lib/utils";
import { ApiError } from "@the-convocation/twitter-scraper/dist/errors";
import TTweet from "./_types/Tweet";
import { Profile, Scraper } from "@the-convocation/twitter-scraper";

async function getTwitterProfile() {
  const scraper = new Scraper({
    fetch: (input, init) => {
      // Transform input and init into your function's expected types...
      return fetch(input, { ...init, next: { revalidate: 604800 } }).then(
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
              tweetsData.push(t);
            }
          }
        }

        const user: User = {
          user: userData,
          tweets: tweetsData,
        };

        return user;
      });
  } catch (error) {
    throw ApiError;
  }
  //const userResponse = await fetchTweets();
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
