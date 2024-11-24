import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css"; // 必要に応じてスタイルを調整

function Home() {
  const navigate = useNavigate();

  const handleOkClick = () => {
    navigate("/create-color"); // 次の画面に遷移
  };

  return (
    <div className="home-screen">
      <div className="text-container">
        <p>１：２つの色を選択して自分だけの色を作ろう！</p>
        <p>２：ライトに向かって自分の色を投げてみよう！</p>
      </div>
      <button className="ok-button" onClick={handleOkClick}>
        OK
      </button>
    </div>
  );
}

export default Home;
