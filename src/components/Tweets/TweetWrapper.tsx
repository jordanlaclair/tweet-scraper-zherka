"use client";

import React, { useEffect, useRef, useState } from "react";
import Tweet from "./Tweet";
import TweetType from "../../app/_types/Tweet";

const TweetWrapper = (props: { tweetsData: TweetType[] }) => {
  const bigBox = useRef<HTMLDivElement>(null);

  if (!props.tweetsData) return null;

  return (
    <div
      className="w-screen min-h-screen flex-col items-center justify-between"
      ref={bigBox}
    >
      {props.tweetsData.map((tweet, index) => (
        <Tweet key={index} wrapper={bigBox} data={tweet} />
      ))}
    </div>
  );
};

export default TweetWrapper;
