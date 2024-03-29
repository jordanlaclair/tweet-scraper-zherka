"use client";

import React, { useCallback, useState } from "react";
import User from "../../app/_types/User";
import Tweet from "./Tweet";
import { getRandom } from "@/lib/utils";
import { Cinzel } from "next/font/google";
import constants from "@/lib/constants";
const cinzel = Cinzel({ subsets: ["latin"] });

const TweetWrapper = (props: { user: User }) => {
  const [user, setUser] = useState<User>(props.user);
  const [bigBox, setBigBox] = useState<HTMLDivElement | null>(null);

  const measuredRef = useCallback((node: HTMLDivElement) => {
    setBigBox(node);
  }, []);

  function shuffleTweets() {
    const shuffledTweets: User["tweets"] = getRandom(
      user.tweets,
      constants.MAXTWEETS
    );
    const newUser: User = { ...user, shuffledTweets };
    setUser(newUser);
  }

  const calcOffsetY = (element: HTMLDivElement, n: number) => {
    return (element.offsetHeight / (n + 1)) % element.offsetHeight;
  };

  const calcOffsetX = (element: HTMLDivElement, n: number) => {
    return (element.offsetWidth / (n + 1)) % element.offsetWidth;
  };

  if (!user.shuffledTweets) return null;

  return (
    <div
      className="min-w-full min-h-screen flex-col items-center justify-between overflow-x-scroll relative"
      ref={measuredRef}
    >
      <button
        type="button"
        onClick={shuffleTweets}
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium  text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green dark:hover:bg-black focus:outline-none dark:focus:ring-green-800 fixed"
      >
        <span className={cinzel.className}>Shuffle</span>
      </button>

      {user.shuffledTweets.map((tweet, index) => {
        if (!bigBox) return null;

        return (
          <Tweet
            key={index}
            wrapper={bigBox}
            tweetData={tweet}
            userData={user.user}
            x={calcOffsetX(bigBox, index)}
            y={calcOffsetY(bigBox, index)}
          />
        );
      })}
    </div>
  );
};

export default TweetWrapper;
