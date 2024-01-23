import TweetWrapper from "../components/Tweets/TweetWrapper";
import Matrix from "../components/Matrix/Matrix";
import User from "../app/_types/User";
import { getRandom } from "@/lib/utils";
import { fetchTweets } from "@/lib/utils";
import { ApiError } from "@the-convocation/twitter-scraper/dist/errors";
import TTweet from "./_types/Tweet";
import { Profile, Scraper } from "@the-convocation/twitter-scraper";
import { getPlaiceholder } from "plaiceholder";

async function setBlurredTweets(user: User) {
  try {
    for (let i = 0; i < user.tweets.length; i++) {
      let tweet: TTweet = user.tweets[i];

      let blurredMedia = "";
      let source = "";
      if (tweet.videos && tweet.videos.length > 0) {
        source = tweet.videos[0].preview;
      }
      if (tweet.photos && tweet.photos.length > 0) {
        source = tweet.photos[0].url;
      }
      if (source != "") {
        const buffer = await fetch(source, {
          next: { revalidate: 604800 },
        }).then(async (res) => Buffer.from(await res.arrayBuffer()));
        const { base64 } = await getPlaiceholder(buffer);
        blurredMedia = base64;
        user.tweets[i].blurredMedia = blurredMedia;
      }
    }
    return user;
  } catch (error) {
    throw ApiError;
  }
}

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
  // let globalUserBlurred = await setBlurredTweets(globalUser);
  // globalUser = globalUserBlurred;

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
