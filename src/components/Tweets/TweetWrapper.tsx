"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import User from "../../app/_types/User";
import Tweet from "./Tweet";

const TweetWrapper = (props: { userData: User }) => {
  const [bigBox, setBigBox] = useState<HTMLDivElement | null>(null);

  const measuredRef = useCallback((node: HTMLDivElement) => {
    setBigBox(node);
  }, []);

  const calcOffset = (element: HTMLDivElement, n: number) => {
    return (element.offsetHeight / (n + 1)) % element.offsetHeight;
  };

  if (!props.userData.tweets || !props.userData.tweets) return null;

  return (
    <div
      className="w-screen min-h-screen flex-col items-center justify-between"
      ref={measuredRef}
    >
      {props.userData.tweets.map((tweet, index) => {
        if (!bigBox) return null;

        return (
          <Tweet
            key={index}
            wrapper={bigBox}
            tweetData={tweet}
            userData={props.userData.user}
            x={0}
            y={calcOffset(bigBox, index)}
          />
        );
      })}
    </div>
  );
};

export default TweetWrapper;
