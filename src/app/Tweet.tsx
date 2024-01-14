"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import TweetType from "./_types/Tweet";
import { CardContent, Card } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";

const Tweet = (props: { wrapper: RefObject<HTMLElement>; data: TweetType }) => {
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
    console.log(width);
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
    x: 0,
    y: 0,
  });

  const [speed, setSpeed] = useState({ x: 1, y: 1 });

  function update() {
    const { x, y } = position;

    const { x: xSpeed, y: ySpeed } = speed;

    if (box && box.current && props.wrapper && props.wrapper.current) {
      if (
        x + box.current.offsetWidth + xSpeed >
          props.wrapper.current.offsetWidth ||
        x + xSpeed < 0
      ) {
        setSpeed((prevSpeed) => ({ ...prevSpeed, x: -prevSpeed.x }));
      }

      if (
        y + box.current.offsetHeight + ySpeed >
          props.wrapper.current.offsetHeight ||
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
    console.log(props.data.author);
    if (props.wrapper.current && props.wrapper && box.current && box) {
      setPosition({
        x: getRandomInt(
          props.wrapper.current.offsetWidth -
            box.current.offsetWidth -
            parseInt(getComputedStyle(box.current).marginLeft)
        ),
        y: getRandomInt(
          props.wrapper.current.offsetHeight -
            box.current.offsetHeight -
            parseInt(getComputedStyle(box.current).marginTop)
        ),
      });
    }
  }, []);

  return (
    <Card
      className="w-full max-w-md fixed"
      ref={box}
      style={{
        marginLeft: `${position.x}px`,
        marginTop: `${position.y}px`,
      }}
    >
      <CardContent className="p-0">
        <div className="flex items-start gap-4 p-4">
          <Avatar className="w-12 h-12 border">
            <AvatarImage alt="@johndoe" src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Link className="font-medium" href="#">
                {props.data.author}
              </Link>
              <span className="text-gray-500 dark:text-gray-400">@johndoe</span>
              <span className="text-gray-500 dark:text-gray-400">·</span>
              <span className="text-gray-500 dark:text-gray-400">
                2 hours ago
              </span>
            </div>
            <p className="text-sm">
              Just had the most delicious pizza for dinner! 🍕 #FoodieLife
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Tweet;
