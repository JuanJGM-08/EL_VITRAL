import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Catalogo from "./pages/Catalogo";
import Cotizar from "./pages/Cotizar";
import Admin from "./pages/Admin";

function App() {

  return (
    <Router>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/catalogo" element={<Catalogo />} />

        <Route path="/cotizar" element={<Cotizar />} />

        <Route path="/admin" element={<Admin />} />

      </Routes>

    </Router>
  );

}

export default App;