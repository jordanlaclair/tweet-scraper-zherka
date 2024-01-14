"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";

const Tweet = (props: {
  wrapper: RefObject<HTMLElement>;
  n: number;
  paused: boolean;
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
    if (!props.paused) {
      const { x, y } = position;
      if (!x || !y) return;
      const { x: xSpeed, y: ySpeed } = speed;

      if (box && box.current && props.wrapper && props.wrapper.current) {
        if (props.n == 2) {
          console.log(
            `y: ${y} + ${box.current.offsetHeight} > ${props.wrapper.current.offsetHeight}`
          );
        }
        //console.log(speed);

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
          console.log("here");
          setSpeed((prevSpeed) => ({ ...prevSpeed, y: -prevSpeed.y }));
        }

        setPosition({ x: x + xSpeed, y: y + ySpeed });
      }
    }
  }

  useEffect(() => {
    const intervalId = setInterval(update, 1000 / 100);
    return () => {
      clearInterval(intervalId);
    };
  }, [position, speed, props.paused]);

  useEffect(() => {
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

  useEffect(() => {
    console.log(props.wrapper.current?.offsetHeight);
    console.log(position);
  }, [position]);

  return (
    <div
      ref={box}
      style={{
        marginLeft: `${position.x}px`,
        marginTop: `${position.y}px`,
      }}
      className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto fixed"
    >
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
