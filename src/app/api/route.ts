import { ApiError } from "@the-convocation/twitter-scraper/dist/errors";
import User from "../../app/_types/User";
import { Profile, Scraper } from "@the-convocation/twitter-scraper";
import TTweet from "../../app/_types/Tweet";

async function fetchBlurredImages(link: string) {
  const url = link;
  const res = await fetch(
    `http://localhost:3000/tweetMedia/api?imageUrl=${url}`
  );
  const { data }: { data: string } = await res.json();
  return data;
}

export async function GET(request: Request) {
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
