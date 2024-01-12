"use client";

import React, { useEffect, useRef } from "react";

const Ball: React.FC = () => {
  const ballRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ball = ballRef.current;
    let speedX = 2;
    let speedY = 2;

    const animateBall = () => {
      if (ball) {
        const rect = ball.getBoundingClientRect();

        if (rect.top <= 0 || rect.bottom >= window.innerHeight) {
          speedY = -speedY;
        }

        if (rect.left <= 0 || rect.right >= window.innerWidth) {
          speedX = -speedX;
        }

        ball.style.transform = `translate(${rect.left + speedX}px, ${
          rect.top + speedY
        }px)`;
      }

      requestAnimationFrame(animateBall);
    };

    animateBall();
  }, []);

  return (
    <div
      ref={ballRef}
      className="w-16 h-16 bg-blue-500 rounded-full absolute"
    ></div>
  );
};

export default Ball;
