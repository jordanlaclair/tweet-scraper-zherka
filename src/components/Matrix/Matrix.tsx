"use client";

import React, { useEffect, useRef, useState } from "react";

const Matrix = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [letters, setLetters] = useState(
    "ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ"
  );
  const dropsRef = useRef<number[]>([]);

  const draw = () => {
    // Setting up the letters
    const fontSize = 10;
    if (canvasRef && canvasRef.current && ctxRef && ctxRef.current) {
      ctxRef.current.fillStyle = "rgba(0, 0, 0, .1)";

      ctxRef.current.fillRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      for (let i = 0; i < dropsRef.current.length; i++) {
        const text =
          letters.split("")[Math.floor(Math.random() * letters.length)];
        ctxRef.current.fillStyle = "#0f0";

        ctxRef.current.fillText(
          text,
          i * fontSize,
          dropsRef.current[i] * fontSize
        );
        dropsRef.current[i]++;
        if (
          dropsRef.current[i] * fontSize > canvasRef.current.height &&
          Math.random() > 0.95
        ) {
          dropsRef.current[i] = 0;
        }
      }
    }
  };

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d");
    }

    if (canvasRef.current && canvasRef) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;

      const fontSize = 10;
      // Setting up the columns
      const columns = Math.floor(canvasRef.current.width / fontSize);

      // Setting up the drops
      dropsRef.current = new Array(columns).fill(1);

      // Loop the animation
      const animationInterval = setInterval(draw, 45);

      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(animationInterval);
    }
  }, []);

  return (
    <canvas
      className="w-screen min-h-screen absolute"
      style={{ display: "block" }}
      ref={canvasRef}
    ></canvas>
  );
};

export default Matrix;
