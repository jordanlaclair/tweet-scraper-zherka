import TweetWrapper from "../components/Tweets/TweetWrapper";
import Matrix from "../components/Matrix/Matrix";
import { getUser } from "@/lib/utils";
import { ApiError } from "@the-convocation/twitter-scraper/dist/errors";
import { Scraper } from "@the-convocation/twitter-scraper";

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
  try {
    const user = await getUser(scraper);
    return user;
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
