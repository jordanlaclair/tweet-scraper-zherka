import { Profile } from "@the-convocation/twitter-scraper";
import TTweet from "./Tweet";

type User = {
  user: Profile;
  tweets: TTweet[];
  shuffledTweets: TTweet[];
};

export default User;
