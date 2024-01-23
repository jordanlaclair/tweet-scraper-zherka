import TweetWrapper from "../components/Tweets/TweetWrapper";
import Matrix from "../components/Matrix/Matrix";
import User from "../app/_types/User";
import { getRandom } from "@/lib/utils";
import { fetchTweets } from "@/lib/utils";
import { ApiError } from "@the-convocation/twitter-scraper/dist/errors";
import TTweet from "./_types/Tweet";
import { Profile, Scraper } from "@the-convocation/twitter-scraper";

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
async function getTwitterProfile() {
  const scraper = new Scraper({
    fetch: (input, init) => {
      // Transform input and init into your function's expected types...
      return fetch(input, { ...init, next: { revalidate: 3600 } }).then(
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
