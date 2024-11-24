import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateColor from "./components/CreateColor";
import MixColor from "./components/MixColor";
import ThrowColor from "./components/ThrowColor";
import Complete from "./components/Complete";

import "./styles/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-color" element={<CreateColor />} />
        <Route path="/mix-color" element={<MixColor />} />
        <Route path="/throw-color" element={<ThrowColor />} />
        <Route path="/complete" element={<Complete />} />
      </Routes>
    </Router>
  );
}

export default App;
