"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Tweet from "./Tweet";
import TweetType from "../../app/_types/Tweet";

const TweetWrapper = (props: { tweetsData: TweetType[] }) => {
  const [bigBox, setBigBox] = useState<HTMLDivElement | null>(null);

  const measuredRef = useCallback((node: HTMLDivElement) => {
    setBigBox(node);
  }, []);

  const calcOffset = (element: HTMLDivElement, n: number) => {
    return (element.offsetHeight / (n + 1)) % element.offsetHeight;
  };

  if (!props.tweetsData) return null;

  return (
    <div
      className="w-screen min-h-screen flex-col items-center justify-between"
      ref={measuredRef}
    >
      {props.tweetsData.map((tweet, index) => {
        if (!bigBox) return null;

        return (
          <Tweet
            key={index}
            wrapper={bigBox}
            data={tweet}
            x={0}
            y={calcOffset(bigBox, index)}
          />
        );
      })}
    </div>
  );
};

export default TweetWrapper;
