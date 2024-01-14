"use client";

import React, { useEffect, useRef, useState } from "react";
import Tweet from "./Tweet";

type Tweet = {
  body: string;
};

const TweetWrapper = (props: { tweetsData: Tweet[] }) => {
  const bigBox = useRef<HTMLDivElement>(null);
  const [pause, setPause] = useState<boolean>(true);

  const changePause = () => {
    setPause(!pause);
  };

  if (!props.tweetsData) return null;

  return (
    <div
      className="w-screen min-h-screen flex-col items-center justify-between"
      ref={bigBox}
    >
      <Tweet wrapper={bigBox} key={1} n={1} paused={pause} />
      <Tweet wrapper={bigBox} key={2} n={2} paused={pause} />
      <button style={{ position: "absolute", top: 0 }} onClick={changePause}>
        Pause
      </button>
    </div>
  );
};

export default TweetWrapper;
