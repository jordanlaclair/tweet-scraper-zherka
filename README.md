# Zherkas Intro Stream

A for fun project I made for streamer/comedian [@ZherkaOfficial](https://twitter.com/ZherkaOfficial) to use during his stream intros that displays his tweets.

## Additional

You can actually fetch any users tweets by changing the name of the user in src/app/lib/constants.ts.

Or if you wanted to, add your own wrapper that lets the user change it on the front-end.

Uses one server-side component (SSC) that fetches 150 tweets on browser's initial render and caches it. Revalidation is set to every 3 days.

From what I can tell, the scraper's API fetches the users top tweets, so it will fetch a user's top 150 tweets.

### Technologies

- [@the-convocation/twitter-scraper](https://github.com/the-convocation/twitter-scraper) (Twitter scraper for Node.js)
- Next.js (App Router)
- Tailwind
- Typescript

## Inspiration

At the time of writing this, he helped me with endless value of entertainment and self-development that will impact me forever so I wanted to make him something out of gratitude and learn throughout the process.
