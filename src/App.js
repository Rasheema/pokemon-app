import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Favourite from "./pages/Favourite/Favourite";
import Detail from "./pages/Detail/Detail"; // fixed folder name

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favourite" element={<Favourite />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
  );
}

export default App;
