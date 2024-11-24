import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateColor() {
  const navigate = useNavigate(); // 次の画面への遷移
  const [selectedColors, setSelectedColors] = useState([]); // 選択された色を保持

  const colors = ["red", "blue", "yellow", "green", "orange"]; // 色のリスト

  // 色を選択する関数
  const handleColorSelect = (color) => {
    if (selectedColors.length < 2 && !selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]); // 新しい色を追加
    }
  };

  // 次の画面に進む
  const proceed = () => {
    if (selectedColors.length === 2) {
      navigate("/mix-color", { state: { colors: selectedColors } });
    } else {
      alert("2つの色を選択してください！");
    }
  };

  return (
    <div className="screen">
      <h2>色を作る</h2>
      <div className="color-container">
        {/* 色の選択ボタン */}
        {colors.map((color) => (
          <div
            key={color}
            className="color-circle"
            style={{
              backgroundColor: color,
              border: selectedColors.includes(color) ? "3px solid black" : "none",
              cursor: "pointer",
            }}
            onClick={() => handleColorSelect(color)}
          />
        ))}
      </div>
      <button
        className="btn"
        onClick={proceed}
        disabled={selectedColors.length < 2} // 2つの色が選ばれるまで無効
      >
        次へ
      </button>
    </div>
  );
}

export default CreateColor;

