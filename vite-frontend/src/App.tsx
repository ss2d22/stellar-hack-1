"use client";

import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import Login from "./pages/login";
import Home from "./pages/home";
import Offer from "./pages/offer";
import Dashboard from "./pages/dashboard";
import { useAuthStore } from "./store/store"; // Import Zustand store

// PrivateRoute component to protect authenticated routes
const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // Use Zustand state
  return isAuthenticated ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/offers" element={<Offer />} />
        
        {/* Protected route: only accessible if authenticated */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
