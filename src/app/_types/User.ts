import { Tweet, Profile } from "@the-convocation/twitter-scraper";

type User = {
  user: Profile;
  tweets: Tweet[];
};

export default User;
