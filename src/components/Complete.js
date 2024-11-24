import React from "react";
import { Link } from "react-router-dom";

function Complete() {
  return (
    <div className="screen">
      <h2>完了しました！</h2>
      <Link to="/" className="btn">ホームに戻る</Link>
    </div>
  );
}

export default Complete;
