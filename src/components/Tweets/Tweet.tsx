"use client";
import React, { useEffect, useRef, useState } from "react";
import { Tweet } from "@the-convocation/twitter-scraper";
import { CardContent, Card } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import twitterVerifiedBadge from "../app/../../../public/Twitter_Verified_Badge.svg";
import Image from "next/image";
import User from "../../app/_types/User";
import moment from "moment";
import TweetMedia from "./TweetMedia";
import { parseTweetLength } from "@/lib/utils";

const Tweet = (props: {
  wrapper: HTMLElement;
  tweetData: Tweet;
  userData: User["user"];
  x: number;
  y: number;
}) => {
  function getOffset(el: HTMLDivElement) {
    const rect = el.getBoundingClientRect();
    return {
      left: window.scrollX + rect.left,
      top: window.scrollY + rect.top,
    };
  }

  function outerWidth(el: HTMLDivElement) {
    var width = el.offsetWidth;
    var style = getComputedStyle(el);

    width += parseInt(style.marginLeft) + parseInt(style.marginRight);

    return width;
  }

  function outerHeight(el: HTMLDivElement) {
    var height = el.offsetHeight;
    var style = getComputedStyle(el);

    height += parseInt(style.marginTop) + parseInt(style.marginBottom);
    return height;
  }

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const box = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({
    x: props.x,
    y: props.y,
  });
  function randomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  const [speed, setSpeed] = useState({
    x: randomNumber(0.1, 1),
    y: randomNumber(0.1, 1),
  });

  function update() {
    const { x, y } = position;

    const { x: xSpeed, y: ySpeed } = speed;

    if (box && box.current && props.wrapper && props.wrapper) {
      if (
        x + box.current.offsetWidth + xSpeed > props.wrapper.offsetWidth ||
        x + xSpeed < 0
      ) {
        setSpeed((prevSpeed) => ({ ...prevSpeed, x: -prevSpeed.x }));
      }

      if (
        y + box.current.offsetHeight + ySpeed > props.wrapper.offsetHeight ||
        y + ySpeed < 0
      ) {
        setSpeed((prevSpeed) => ({ ...prevSpeed, y: -prevSpeed.y }));
      }

      setPosition({ x: x + xSpeed, y: y + ySpeed });
    }
  }

  useEffect(() => {
    const intervalId = setInterval(update, 1000 / 100);
    return () => {
      clearInterval(intervalId);
    };
  }, [position, speed]);

  useEffect(() => {
    //console.log(props.x, props.y);
    if (props.wrapper && props.wrapper && box.current && box) {
      setPosition({
        x: props.x,
        y: props.y,
      });
    }
  }, []);

  return (
    <Link
      href={props.tweetData.permanentUrl ? props.tweetData.permanentUrl : ""}
      target="_blank"
    >
      <Card
        className="w-96 max-w-md fixed"
        ref={box}
        style={{
          marginLeft: `${position.x}px`,
          marginTop: `${position.y}px`,
        }}
      >
        <CardContent className="p-0 flex flex-col items-center justify-center">
          <div className="flex items-start gap-4 p-4">
            <Avatar className="w-12 h-12 border">
              <AvatarImage
                alt={props.userData.name}
                src={props.userData.avatar}
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 ">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base">
                  {props.tweetData.name}
                </span>
                <Image
                  priority
                  src={twitterVerifiedBadge}
                  alt="Verified badge on Twitter"
                />
                <span className="text-gray-500 dark:text-gray-400">
                  @{props.tweetData.username}
                </span>
                <span className="text-gray-500 dark:text-gray-400">·</span>
                <span className="text-gray-500 dark:text-gray-400 min-w-0 text-nowrap">
                  {props.tweetData.timestamp
                    ? moment.unix(props.tweetData.timestamp).fromNow()
                    : ""}
                </span>
              </div>
              <p className="text-sm">
                {parseTweetLength(props.tweetData.text)}
              </p>
            </div>
          </div>
          <TweetMedia tweetData={props.tweetData} />
        </CardContent>
      </Card>
    </Link>
  );
};

export default Tweet;
