import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function MixColor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mixProgress, setMixProgress] = useState(0);
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 }); //加速度値を表示するための状態

  const shakeThreshold = 10; //振動の閾値
  const [colors] = useState(location.state?.colors || []);

  useEffect(() => {
    console.log("選択された色:", colors);
  }, [colors]);


  useEffect(() => {
    const handleShake = (event) => {
      const { x, y, z } = event.acceleration || {};
      setAcceleration({
        x: x ? x.toFixed(2) : 0,
        y: y ? y.toFixed(2) : 0,
        z: z ? z.toFixed(2) : 0,
      }); //加速度を状態にセット

      if (
        Math.abs(x) > shakeThreshold ||
        Math.abs(y) > shakeThreshold
      ) {
        setMixProgress((prev) => Math.min(prev + 10, 100)); //振動で進捗を増加
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
