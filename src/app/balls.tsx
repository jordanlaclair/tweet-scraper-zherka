"use client";
import React, { useEffect, useRef } from "react";
import Ball from "./ball";

const Balls = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const widthRef = useRef<number>(0);
  const heightRef = useRef<number>(0);
  const ballsRef = useRef<any>([]);

  const loop = () => {
    if (ctxRef.current && ctxRef) {
      ctxRef.current.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctxRef.current.fillRect(0, 0, widthRef.current, heightRef.current);

      while (ballsRef.current.length < 5) {
        const size = random(50, 60);
        const x = random(0 + size, widthRef.current - size);
        const y = random(0 + size, heightRef.current - size);
        const speedX = random(0.2, 0.5);
        const speedY = random(0.2, 0.5);

        const ball = new Ball(
          ctxRef.current,
          x,
          y,
          speedX,
          speedY,
          "blue",
          size
        );
        ballsRef.current.push(ball);
      }

      for (let i = 0; i < ballsRef.current.length; i++) {
        ballsRef.current[i].draw();
        ballsRef.current[i].update(widthRef.current, heightRef.current);
        //ballsRef.current[i].collisionDetect(ballsRef.current);
      }

      requestAnimationFrame(loop);
    }
  };

  const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d");
      widthRef.current = window.innerWidth;
      heightRef.current = window.innerHeight;

      canvasRef.current.width = widthRef.current;
      canvasRef.current.height = heightRef.current;

      loop();
    }

    // Cleanup function
  }, []);

  return <canvas id="canvas" ref={canvasRef} />;
};

export default Balls;
