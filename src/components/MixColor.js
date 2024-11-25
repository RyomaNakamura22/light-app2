import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/MixColor.css";

function MixColor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mixProgress, setMixProgress] = useState(0); // 混ざり具合
  const colors = location.state?.colors || ["#FF0000", "#0000FF"]; // デフォルトの2色
  const shakeThreshold = 40; // 振る閾値（調整可能）
  const [cooldown, setCooldown] = useState(false); // クールダウンフラグ

  // 色をブレンドする関数
  const blendColors = (color1, color2, progress) => {
    const hexToRgb = (hex) =>
      hex
        .replace("#", "")
        .match(/.{1,2}/g)
        .map((x) => parseInt(x, 16));
    const rgbToHex = ([r, g, b]) =>
      `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    const blended = rgb1.map((c, i) =>
      Math.floor(c + (rgb2[i] - c) * (progress / 100))
    );
    return rgbToHex(blended);
  };

  useEffect(() => {
    const requestPermission = async () => {
      if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof DeviceMotionEvent.requestPermission === "function"
      ) {
        try {
          const permission = await DeviceMotionEvent.requestPermission();
          if (permission !== "granted") {
            alert("加速度センサーの使用が許可されませんでした。");
          }
        } catch (error) {
          console.error("加速度センサーの使用許可リクエスト中にエラー:", error);
        }
      }
    };

    const addSafariPermissionListener = () => {
      const handleClick = () => {
        requestPermission();
        window.removeEventListener("click", handleClick);
      };
      window.addEventListener("click", handleClick);
    };

    if (
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome")
    ) {
      addSafariPermissionListener(); // Safari
    } else {
      requestPermission(); // Chrome
    }

    const handleShake = (event) => {
      const acceleration = event.acceleration || {};
      const y = acceleration.y || 0; // Y軸の加速度を取得（上下方向）

      console.log("加速度 (Y軸):", y);

      if (!cooldown && Math.abs(y) > shakeThreshold) {
        console.log("振り検出:", y);
        setMixProgress((prev) => Math.min(prev + 10, 100)); // プログレスを更新
        setCooldown(true); // クールダウンを開始

        // ディレイを300ms設定
        setTimeout(() => setCooldown(false), 300);
      }
    };

    window.addEventListener("devicemotion", handleShake);

    return () => {
      window.removeEventListener("devicemotion", handleShake);
    };
  }, [cooldown]);

  const blendedColor = blendColors(colors[0], colors[1], mixProgress);

  const handleClick = () => {
    if (mixProgress >= 100) {
      navigate("/throw-color", { state: { mixedColor: blendedColor } });
    }
  };

  return (
    <div className="mix-color-screen">
      <div
        className="loading-text"
        style={{
          "--progress": `${mixProgress}%`,
          "--blended-color": blendedColor,
        }}
      >
        START
      </div>
      <p>スマホを上下に振って色を完成させましょう</p>
      <button
        className={`start-button ${mixProgress >= 100 ? "active" : ""}`}
        onClick={handleClick}
        disabled={mixProgress < 100}
      >
        START
      </button>
    </div>
  );
}

export default MixColor;
