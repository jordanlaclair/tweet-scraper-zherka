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
      className="rounded-lg border overflow-hidden object-cover"
      fill={true}
      sizes="(max-width: 768px) 200px, (max-width: 1200px) 250px, 250px"
      src={props.photos[0].url}
    />
  );
};

export default TweetImage;
