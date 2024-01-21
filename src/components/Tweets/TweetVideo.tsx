"use client";
import { Tweet } from "@the-convocation/twitter-scraper";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TweetVideo = (props: {
  video: Tweet["videos"];
  blurredPreview: string;
}) => {
  if (!props.video || !(props.video.length > 0)) return null;

  return (
    <Image
      alt="Media content"
      placeholder="blur"
      blurDataURL={props.blurredPreview}
      className="rounded-lg border overflow-hidden"
      fill={true}
      objectFit="cover"
      src={props.video[0].preview}
    />
  );
};

export default TweetVideo;
