"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
const Ball = ({}) => {
  const box = useRef<HTMLDivElement>(null);
  const bigBox = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [speed, setSpeed] = useState({ x: 1, y: 1 });

  function update() {
    const { x, y } = position;
    const { x: xSpeed, y: ySpeed } = speed;

    if (box && box.current && bigBox && bigBox.current) {
      console.log(
        `y: ${y} + ${box.current.offsetHeight} > ${bigBox.current.offsetHeight}`
      );
      console.log(speed);

      if (
        x + box.current.offsetHeight + xSpeed > bigBox.current.offsetWidth ||
        x + xSpeed < 0
      ) {
        setSpeed((prevSpeed) => ({ ...prevSpeed, x: -prevSpeed.x }));
      }

      if (
        y + box.current.offsetHeight + ySpeed > bigBox.current.offsetHeight ||
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

  return (
    <div>
      <div ref={bigBox} className={styles.bigbox}>
        <div
          ref={box}
          style={{
            width: "50px",
            height: "50px",
            background: "lime",
            marginLeft: `${position.x}px`,
            marginTop: `${position.y}px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Ball;
