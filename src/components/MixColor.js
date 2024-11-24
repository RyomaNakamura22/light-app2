import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function MixColor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mixProgress, setMixProgress] = useState(0);

  const shakeThreshold = 10;
  const [colors] = useState(location.state?.colors || []);

  useEffect(() => {
    const handleShake = (event) => {
      const acceleration = event.acceleration || {};
      if (
        Math.abs(acceleration.x) > shakeThreshold ||
        Math.abs(acceleration.y) > shakeThreshold
      ) {
        setMixProgress((prev) => Math.min(prev + 1, 100));
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
    </div>
  );
}

export default MixColor;
