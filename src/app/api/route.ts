import { ApiError } from "@the-convocation/twitter-scraper/dist/errors";
import User from "../../app/_types/User";
import { Profile, Scraper, Tweet } from "@the-convocation/twitter-scraper";

export async function GET(request: Request) {
  const scraper = new Scraper();

  let userData: Profile;
  let tweetsData: Tweet[] = [];

  try {
    return scraper
      .getProfile("zherkaofficial")
      .then((user) => {
        userData = user;
        if (user.userId) return scraper.getTweetsByUserId(user.userId, 5);
      })
      .then(async (tweets) => {
        if (tweets) {
          for await (const tweet of tweets) {
            if (tweet) tweetsData.push(tweet);
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
