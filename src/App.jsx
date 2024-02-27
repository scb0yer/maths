import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Players from "../src/Players";
import Maths from "../src/Maths";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/defi-tables" element={<Players />} />
        <Route path="/" element={<Maths />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
