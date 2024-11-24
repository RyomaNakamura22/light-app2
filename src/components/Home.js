import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="screen">
      <h1>Lighting App</h1>
      <p>スマホで色を作り、照明を操作するアプリです。</p>
      <Link to="/create-color" className="btn">色を作る</Link>
    </div>
  );
}

export default Home;
