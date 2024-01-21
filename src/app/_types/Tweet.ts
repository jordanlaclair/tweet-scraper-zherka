import { Tweet } from "@the-convocation/twitter-scraper";

interface TTweet extends Tweet {
  blurredMedia?: string;
}

export default TTweet;
