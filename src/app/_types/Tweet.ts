import { Tweet } from "@the-convocation/twitter-scraper";

interface TTweet extends Tweet {
  blurredMedia?: string | undefined;
}

export default TTweet;
