"use client";

import React, { useEffect, useState } from "react";
import { Tweet } from "@the-convocation/twitter-scraper";
import Image from "next/image";
//import { getPlaiceholder } from "plaiceholder";

const TweetImage = (props: {
  photos: Tweet["photos"];
  blurredPreview: string;
}) => {
  if (!props.photos || !(props.photos.length > 0)) return null;

  return (
    <Image
      alt="Media content"
      placeholder="blur"
      blurDataURL={props.blurredPreview}
      className="rounded-lg border overflow-hidden"
      fill={true}
      objectFit="cover"
      src={props.photos[0].url}
    />
  );
};

export default TweetImage;
