import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function MixColor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mixProgress, setMixProgress] = useState(0);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 }); // 加速度を表示用
  const shakeThreshold = 10;

  useEffect(() => {
    // センサーの許可をリクエスト（必要なら）
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      DeviceMotionEvent.requestPermission()
        .then((response) => {
          if (response === "granted") {
            console.log("センサーの使用が許可されました");
          } else {
            alert("センサーの使用を許可してください！");
          }
        })
        .catch((error) => {
          console.error("センサーの許可リクエストに失敗しました:", error);
        });
    } else {
      console.log("センサーの許可リクエストは不要です");
    }
  }, []);

  useEffect(() => {
    const handleShake = (event) => {
      const { x, y, z } = event.acceleration || {};
      setAcceleration({
        x: x ? x.toFixed(2) : 0,
        y: y ? y.toFixed(2) : 0,
        z: z ? z.toFixed(2) : 0,
      }); // 加速度を更新

      // 振る動作の検出
      if (
        Math.abs(x) > shakeThreshold ||
        Math.abs(y) > shakeThreshold ||
        Math.abs(z) > shakeThreshold
      ) {
        setMixProgress((prev) => Math.min(prev + 10, 100)); // 進捗を更新
      }
    };

    window.addEventListener("devicemotion", handleShake);

    return () => {
      window.removeEventListener("devicemotion", handleShake);
    };
  }, []);

  useEffect(() => {
    if (mixProgress >= 100) {
      navigate("/throw-color", { state: { mixedColor: "purple" } });
    }
  }, [mixProgress, navigate]);

  return (
    <div className="screen">
      <h2>スマホを振って色を混ぜてください</h2>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${mixProgress}%`, backgroundColor: "purple" }}
        ></div>
      </div>
      <div className="debug-info">
        <h3>加速度センサーデータ</h3>
        <p>X軸: {acceleration.x}</p>
        <p>Y軸: {acceleration.y}</p>
        <p>Z軸: {acceleration.z}</p>
      </div>
    </div>
  );
}

export default MixColor;
