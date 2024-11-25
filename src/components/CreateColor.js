import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import "../styles/CreateColor.css";

function CreateColor() {
  const navigate = useNavigate();
  const [selectedColors, setSelectedColors] = useState([]); //選択した色を管理

  //20色
  const colors = [
    "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF",
    "#00FFFF", "#FF8000", "#8000FF", "#80FF00", "#00FF80",
    "#FF0080", "#8080FF", "#80FFFF", "#FF8080", "#808000",
    "#800080", "#008080", "#FFBF00", "#40E0D0", "#7FFF00"
  ];

  const handleSelectColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color)); // 選択を解除
    } else if (selectedColors.length < 2) {
      setSelectedColors([...selectedColors, color]); //新しい色追加
    }
  };

  const handleNext = () => {
    if (selectedColors.length === 2) {
      navigate("/mix-color", { state: { colors: selectedColors } });
    } else {
      alert("2つの色を選択してください！");
    }
  };

  return (
    <div className="create-color-screen">
      <div className="header">
        <h2>色を作る</h2>
        <p>カラーボールを2つ選んでください</p>
      </div>
      <div className="double-circle-container">
        {/* 内側の円 */}
        <div className="circle inner-circle">
          {colors.slice(0, 10).map((color, index) => (
            <div
              key={index}
              className={`rotating-ball ${selectedColors.includes(color) ? "selected" : ""}`}
              style={{
                backgroundColor: color,
                transform: `rotate(${index * (360 / 10)}deg) translate(90px)`,
              }}
              onClick={() => handleSelectColor(color)}
            ></div>
          ))}
        </div>
        {/* 外側の円 */}
        <div className="circle outer-circle">
          {colors.slice(10).map((color, index) => (
            <div
              key={index}
              className={`rotating-ball ${selectedColors.includes(color) ? "selected" : ""}`}
              style={{
                backgroundColor: color,
                transform: `rotate(${index * (360 / 10)}deg) translate(150px)`,
              }}
              onClick={() => handleSelectColor(color)}
            ></div>
          ))}
        </div>
      </div>
      <button
        className={`next-button ${selectedColors.length === 2 ? "visible" : ""}`}
        onClick={handleNext}
      >
        次へ
      </button>
    </div>
  );
}

export default CreateColor;
