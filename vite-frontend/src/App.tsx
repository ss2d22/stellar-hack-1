"use client";

import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import Login from "./pages/login";
import Home from "./pages/home";
import Offer from "./pages/offer";
import Dashboard from "./pages/dashboard";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/offers" element={<Offer />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
