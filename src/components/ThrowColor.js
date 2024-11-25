import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ThrowColor.css";

function ThrowColor() {
  const navigate = useNavigate();
  const location = useLocation();
  const mixedColor = location.state?.mixedColor || "#FF0000"; // 完成した色
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let ball = { x: canvas.width / 2, y: canvas.height / 2, radius: 20 };
    let trail = []; // 軌跡を保持する配列
    const trailLength = 15; // 軌跡の最大長さ
    const shakeThreshold = 40; // 閾値
    let isThrown = false;

    const drawBall = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 画面をクリア

      // 軌跡を描画
      trail.forEach((point, index) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, ball.radius * (1 - index / trailLength), 0, Math.PI * 2);
        ctx.fillStyle = `${mixedColor}${Math.floor((255 * (trailLength - index)) / trailLength).toString(16)}`;
        ctx.fill();
      });

      // ボールを描画
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = mixedColor;
      ctx.fill();
    };

    const animate = () => {
      if (isThrown) {
        ball.y -= 5; // ボールを上に移動
        ball.x += Math.random() * 4 - 2; // 軌跡にランダム性を追加

        trail.push({ x: ball.x, y: ball.y });
        if (trail.length > trailLength) {
          trail.shift(); // 軌跡が長すぎる場合は古いものを削除
        }

        drawBall();

        if (ball.y + ball.radius < 0) {
          // ボールが画面外に出たら遷移
          navigate("/complete");
        } else {
          requestAnimationFrame(animate);
        }
      }
    };

    const handleThrow = (event) => {
      const acceleration = event.acceleration || {};
      const { x = 0, y = 0 } = acceleration;

      if (!isThrown && (Math.abs(x) > shakeThreshold || Math.abs(y) > shakeThreshold)) {
        isThrown = true; // 投げる状態に
        trail.push({ x: ball.x, y: ball.y }); // 軌跡の開始点を追加
        animate();
      }
    };

    window.addEventListener("devicemotion", handleThrow);

    return () => {
      window.removeEventListener("devicemotion", handleThrow);
    };
  }, [mixedColor, navigate]);

  return (
    <div className="throw-color-screen">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ display: "block", background: "black" }}
      ></canvas>
      <p>スマホを振って色を投げてください！</p>
    </div>
  );
}

export default ThrowColor;
