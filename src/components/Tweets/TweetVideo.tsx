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
      className="rounded-lg border overflow-hidden object-cover"
      fill={true}
      sizes="(max-width: 768px) 200px, (max-width: 1200px) 250px, 250px"
      src={props.video[0].preview}
    />
  );
};

export default TweetVideo;
