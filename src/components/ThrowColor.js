import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ThrowColor() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mixedColor } = location.state || { mixedColor: "gray" };

  const throwColor = () => {
    alert(`${mixedColor}を照明に送信しました！`);
    navigate("/complete");
  };

  return (
    <div className="screen">
      <h2>スマホを振り上げて色を送信してください</h2>
      <div
        className="color-circle"
        style={{ backgroundColor: mixedColor, margin: "20px auto" }}
      />
      <button className="btn" onClick={throwColor}>
        色を送信
      </button>
    </div>
  );
}

export default ThrowColor;
